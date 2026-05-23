(function () {
  'use strict';

  var GITHUB_REPO = 'https://github.com/subramaniyam22/automation-case-studies';
  var LINKEDIN_URL = 'https://www.linkedin.com/in/kandaswamy-subramaniyam';
  var JSON_PATH = './assets/case-studies.json';

  /* Embedded fallback — mirrors assets/case-studies.json */
  var FALLBACK_CASE_STUDIES = [
    {
      id: 'autonops',
      title: 'AutonOps',
      category: 'AI-Assisted Delivery Operations Platform',
      summary: 'AI-assisted enterprise delivery operations platform providing centralized execution visibility, assignment intelligence, SLA governance, and operational coordination.',
      metrics: [
        '75% reduction in manual coordination',
        '$29,230 annual cost savings',
        '~1,500 defects prevented monthly',
        '168 operational hours saved monthly'
      ],
      tags: [
        'AI Operations',
        'Workflow Automation',
        'Program Governance',
        'SLA Tracking',
        'Delivery Intelligence'
      ],
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'OpenAI', 'JWT RBAC'],
      pdf: 'pdf/autonops-case-study.pdf',
      pages: [{ title: 'Workflow', link: 'case-studies/autonops/workflow.html' }]
    },
    {
      id: 'daisy',
      title: 'DAISY',
      category: 'Delivery Automation Intelligence System Yield',
      summary: 'Multi-stage enterprise delivery orchestration platform with AI-assisted workflow automation, SLA visibility, governance, and release coordination.',
      metrics: [
        '55+ users across India and US',
        '75% reduction in repetitive activities',
        '43% execution quality improvement',
        '40 FTE to 3 FTE operational scale-down'
      ],
      tags: [
        'Delivery Automation',
        'Workflow Orchestration',
        'Execution Governance',
        'SLA Visibility',
        'Release Coordination'
      ],
      tech: ['FastAPI', 'LangGraph', 'Next.js', 'PostgreSQL', 'S3', 'CloudFront'],
      pdf: 'pdf/daisy-case-study.pdf',
      pages: [
        { title: 'Architecture', link: 'case-studies/daisy/architecture.html' },
        { title: 'Process Flow', link: 'case-studies/daisy/process-flow.html' },
        { title: 'Execution Lifecycle', link: 'case-studies/daisy/execution-lifecycle.html' },
        { title: 'Coordination Flow', link: 'case-studies/daisy/coordination-flow.html' }
      ]
    }
  ];

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function validateStudies(data) {
    if (!Array.isArray(data) || !data.length) {
      throw new Error('case-studies.json must be a non-empty array');
    }

    data.forEach(function (study, index) {
      var required = ['id', 'title', 'category', 'summary', 'metrics', 'tags', 'tech', 'pdf', 'pages'];
      required.forEach(function (field) {
        if (study[field] === undefined || study[field] === null) {
          throw new Error('Missing "' + field + '" in case study at index ' + index);
        }
      });

      if (!Array.isArray(study.metrics) || !Array.isArray(study.tags) ||
          !Array.isArray(study.tech) || !Array.isArray(study.pages)) {
        throw new Error('metrics, tags, tech, and pages must be arrays in case study "' + study.id + '"');
      }
    });

    return data;
  }

  function parseScriptTagJson() {
    var dataEl = document.getElementById('case-studies-data');
    if (!dataEl || !dataEl.textContent.trim()) {
      return null;
    }

    try {
      return validateStudies(JSON.parse(dataEl.textContent));
    } catch (err) {
      console.warn('[Portfolio] Script tag JSON parse failed:', err.message);
      return null;
    }
  }

  function fetchCaseStudies() {
    console.log('[Portfolio] Fetching case studies from:', JSON_PATH);

    return fetch(JSON_PATH)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status + ' loading ' + JSON_PATH);
        }
        return res.json();
      })
      .then(function (data) {
        console.log('[Portfolio] Loaded', data.length, 'case studies from JSON');
        return validateStudies(data);
      });
  }

  function loadCaseStudies() {
    return fetchCaseStudies()
      .catch(function (fetchErr) {
        console.warn('[Portfolio] Fetch failed:', fetchErr.message);

        var fromScript = parseScriptTagJson();
        if (fromScript) {
          console.log('[Portfolio] Loaded case studies from embedded script tag');
          return fromScript;
        }

        console.warn('[Portfolio] Using embedded fallback case studies');
        throw fetchErr;
      });
  }

  function showLoadError(message) {
    var section = document.getElementById('case-studies');
    if (!section) return;

    var existing = section.querySelector('.load-error-banner');
    if (existing) return;

    var banner = document.createElement('div');
    banner.className = 'load-error-banner';
    banner.setAttribute('role', 'alert');
    banner.innerHTML =
      '<strong>Could not load case-studies.json.</strong> ' +
      escapeHtml(message) +
      ' Showing cached fallback content. ' +
      'For local testing, run <code>python -m http.server 8080</code> and open ' +
      '<code>http://localhost:8080</code> — do not open index.html directly as a file.';

    var container = section.querySelector('.container');
    var grid = document.getElementById('caseStudyGrid');
    if (container && grid) {
      container.insertBefore(banner, grid);
    }
  }

  function renderTags(tags) {
    return tags.map(function (tag) {
      return '<span class="tag">' + escapeHtml(tag) + '</span>';
    }).join('');
  }

  function renderTech(tech) {
    return tech.map(function (item) {
      return '<span class="tech-badge">' + escapeHtml(item) + '</span>';
    }).join('');
  }

  function renderMetrics(metrics) {
    return metrics.map(function (metric) {
      return '<li>' + escapeHtml(metric) + '</li>';
    }).join('');
  }

  function renderPageLinks(pages) {
    return pages.map(function (page) {
      return '<a class="btn btn-secondary" href="' + escapeHtml(page.link) + '">' + escapeHtml(page.title) + '</a>';
    }).join('');
  }

  function renderCaseStudyCard(study) {
    return (
      '<article class="case-card" id="case-' + escapeHtml(study.id) + '">' +
        '<div class="case-card-header">' +
          '<h3>' + escapeHtml(study.title) + '</h3>' +
          '<div class="category">' + escapeHtml(study.category) + '</div>' +
        '</div>' +
        '<p class="summary">' + escapeHtml(study.summary) + '</p>' +
        '<ul class="metrics-list">' + renderMetrics(study.metrics) + '</ul>' +
        '<div class="tag-row">' + renderTags(study.tags) + '</div>' +
        '<div class="tech-row">' + renderTech(study.tech) + '</div>' +
        '<div class="card-links">' +
          '<a class="btn btn-pdf" href="' + escapeHtml(study.pdf) + '" target="_blank" rel="noopener">PDF Case Study</a>' +
          renderPageLinks(study.pages) +
        '</div>' +
      '</article>'
    );
  }

  function collectUniqueTech(studies) {
    var seen = {};
    var result = [];
    studies.forEach(function (study) {
      study.tech.forEach(function (item) {
        if (!seen[item]) {
          seen[item] = true;
          result.push(item);
        }
      });
    });
    return result;
  }

  function renderStackBadges(studies) {
    var container = document.getElementById('stackGrid');
    if (!container) {
      console.error('[Portfolio] Missing container: #stackGrid');
      return;
    }

    var tech = collectUniqueTech(studies);
    if (!tech.length) {
      container.innerHTML = '<p class="loading-message">No technologies listed.</p>';
      return;
    }

    container.innerHTML = tech.map(function (item) {
      return '<span class="stack-badge">' + escapeHtml(item) + '</span>';
    }).join('');

    console.log('[Portfolio] Rendered', tech.length, 'stack badges');
  }

  function renderCaseStudies(studies) {
    var grid = document.getElementById('caseStudyGrid');
    if (!grid) {
      console.error('[Portfolio] Missing container: #caseStudyGrid');
      return;
    }

    if (!studies.length) {
      grid.innerHTML = '<p class="loading-message">No case studies available.</p>';
      return;
    }

    grid.innerHTML = studies.map(renderCaseStudyCard).join('');
    renderStackBadges(studies);
    console.log('[Portfolio] Rendered', studies.length, 'case study cards');
  }

  function renderFallback(errorMessage) {
    showLoadError(errorMessage);
    renderCaseStudies(FALLBACK_CASE_STUDIES);
  }

  function wireContactLinks() {
    var githubLink = document.getElementById('contact-github');
    var linkedinLink = document.getElementById('contact-linkedin');

    if (githubLink) githubLink.href = GITHUB_REPO;
    if (linkedinLink) linkedinLink.href = LINKEDIN_URL;
  }

  function init() {
    wireContactLinks();

    loadCaseStudies()
      .then(renderCaseStudies)
      .catch(function (err) {
        console.error('[Portfolio] Failed to load case studies:', err);
        renderFallback(err && err.message ? err.message : 'Unknown error');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
