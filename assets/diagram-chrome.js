(function () {
  'use strict';

  var GITHUB_REPO = 'https://github.com/subramaniyam22/automation-case-studies';
  var HOME_HREF = '../../index.html';

  var FALLBACK_PROJECTS = {
    autonops: {
      id: 'autonops',
      title: 'AutonOps',
      pdf: 'pdf/autonops-case-study.pdf',
      pages: [{ title: 'Workflow', link: 'case-studies/autonops/workflow.html' }]
    },
    daisy: {
      id: 'daisy',
      title: 'DAISY',
      pdf: 'pdf/daisy-case-study.pdf',
      pages: [
        { title: 'Architecture', link: 'case-studies/daisy/architecture.html' },
        { title: 'Process Flow', link: 'case-studies/daisy/process-flow.html' },
        { title: 'Execution Lifecycle', link: 'case-studies/daisy/execution-lifecycle.html' },
        { title: 'Coordination Flow', link: 'case-studies/daisy/coordination-flow.html' }
      ]
    }
  };

  function loadCaseStudies() {
    return new Promise(function (resolve, reject) {
      var dataEl = document.getElementById('case-studies-data');

      function parseDataEl() {
        if (dataEl && dataEl.textContent.trim()) {
          try {
            resolve(JSON.parse(dataEl.textContent));
            return true;
          } catch (err) {
            reject(err);
            return true;
          }
        }
        return false;
      }

      if (parseDataEl()) return;

      if (dataEl) {
        dataEl.addEventListener('load', function () {
          if (!parseDataEl()) fetchJsonFallback(resolve, reject);
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
    fetch('../../assets/case-studies.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load case studies');
        return res.json();
      })
      .then(resolve)
      .catch(reject);
  }

  function getCurrentFile() {
    var path = window.location.pathname;
    var parts = path.split('/');
    return parts[parts.length - 1] || '';
  }

  function toRelativePage(fullLink) {
    var parts = fullLink.split('/');
    return parts[parts.length - 1];
  }

  function toRelativePdf(pdfPath) {
    return '../../' + pdfPath.replace(/^\//, '');
  }

  function getProject(projectId, studies) {
    if (studies) {
      var fromJson = studies.find(function (s) { return s.id === projectId; });
      if (fromJson) return fromJson;
    }
    return FALLBACK_PROJECTS[projectId] || null;
  }

  function buildNav(project) {
    var currentFile = getCurrentFile();
    var pageLinks = project.pages.map(function (page) {
      var href = toRelativePage(page.link);
      var active = href === currentFile ? ' active' : '';
      return '<a href="' + href + '"' + active + '>' + page.title + '</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML =
      '<div class="container">' +
        '<a class="nav-brand" href="' + HOME_HREF + '">' + project.title + ' <span>Diagrams</span></a>' +
        '<div class="nav-links">' +
          '<a href="' + HOME_HREF + '">Portfolio Home</a>' +
          pageLinks +
          '<a class="nav-pdf" href="' + toRelativePdf(project.pdf) + '" target="_blank" rel="noopener">PDF Case Study</a>' +
          '<a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">GitHub</a>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.add('diagram-page');
  }

  function buildFooter(project) {
    var pdfHref = toRelativePdf(project.pdf);
    var footerHtml =
      'Built by <strong>Kandaswamy Subramaniyam</strong> · ' +
      '<a href="mailto:kandaswamysubramaniyam@gmail.com">kandaswamysubramaniyam@gmail.com</a> · ' +
      project.title + ' · ' +
      '<a href="' + HOME_HREF + '">Portfolio Home</a> · ' +
      '<a href="' + pdfHref + '" target="_blank" rel="noopener">PDF</a>';

    var existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.className = 'site-footer diagram-site-footer';
      existingFooter.innerHTML = '<div class="container"><p>' + footerHtml + '</p></div>';
      return;
    }

    var footer = document.createElement('footer');
    footer.className = 'site-footer diagram-site-footer';
    footer.innerHTML = '<div class="container"><p>' + footerHtml + '</p></div>';
    document.body.appendChild(footer);
  }

  function init() {
    var script = document.currentScript;
    var projectId = script && script.getAttribute('data-project');
    if (!projectId) return;

    loadCaseStudies()
      .then(function (studies) {
        var project = getProject(projectId, studies);
        if (!project) return;
        buildNav(project);
        buildFooter(project);
      })
      .catch(function () {
        var project = getProject(projectId, null);
        if (!project) return;
        buildNav(project);
        buildFooter(project);
      });
  }

  init();
})();
