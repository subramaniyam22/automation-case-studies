(function () {
  'use strict';

  var GITHUB_REPO = 'https://github.com/subramaniyam22/automation-case-studies';
  var LINKEDIN_URL = 'https://www.linkedin.com/in/kandaswamy-subramaniyam';

  function loadCaseStudies() {
    return new Promise(function (resolve, reject) {
      var dataEl = document.getElementById('case-studies-data');

      function parseDataEl() {
        if (dataEl && dataEl.textContent.trim()) {
          try {
            resolve(JSON.parse(dataEl.textContent));
          } catch (err) {
            reject(err);
          }
          return true;
        }
        return false;
      }

      if (parseDataEl()) return;

      if (dataEl) {
        dataEl.addEventListener('load', function () {
          if (!parseDataEl()) {
            fetchJsonFallback(resolve, reject);
          }
        });
        dataEl.addEventListener('error', function () {
          fetchJsonFallback(resolve, reject);
        });
        return;
      }

      fetchJsonFallback(resolve, reject);
    });
  }

  function fetchJsonFallback(resolve, reject) {
    fetch('assets/case-studies.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load case studies');
        return res.json();
      })
      .then(resolve)
      .catch(reject);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
          renderPageLinks(study.pages) +
          '<a class="btn btn-pdf" href="' + escapeHtml(study.pdf) + '" target="_blank" rel="noopener">PDF Case Study</a>' +
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
    var container = document.getElementById('stack-badges');
    if (!container) return;

    var tech = collectUniqueTech(studies);
    container.innerHTML = tech.map(function (item) {
      return '<span class="stack-badge">' + escapeHtml(item) + '</span>';
    }).join('');
  }

  function renderCaseStudies(studies) {
    var grid = document.getElementById('case-study-grid');
    if (!grid) return;

    if (!studies.length) {
      grid.innerHTML = '<p class="loading-message">No case studies available.</p>';
      return;
    }

    grid.innerHTML = studies.map(renderCaseStudyCard).join('');
    renderStackBadges(studies);
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
      .catch(function () {
        var grid = document.getElementById('case-study-grid');
        if (grid) {
          grid.innerHTML = '<p class="loading-message">Unable to load case studies. Please refresh or open via GitHub Pages.</p>';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
