(function () {
  'use strict';

  var GITHUB_REPO = 'https://github.com/subramaniyam22/automation-case-studies';
  var HOME_HREF = '../../index.html';

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

  function buildNav(project) {
    var currentFile = getCurrentFile();
    var pageLinks = project.pages.map(function (page) {
      var href = toRelativePage(page.link);
      var active = href === currentFile ? ' class="active"' : '';
      return '<a href="' + href + '"' + active + '>' + page.title + '</a>';
    }).join('');

    var nav = document.createElement('nav');
    nav.className = 'diagram-chrome';
    nav.innerHTML =
      '<div class="diagram-chrome-inner">' +
        '<div class="chrome-brand"><span>' + project.title + '</span> · Diagrams</div>' +
        '<div class="chrome-links">' +
          '<a href="' + HOME_HREF + '">Portfolio Home</a>' +
          pageLinks +
          '<a class="pdf-link" href="' + toRelativePdf(project.pdf) + '" target="_blank" rel="noopener">PDF Case Study</a>' +
          '<a href="' + GITHUB_REPO + '" target="_blank" rel="noopener">GitHub</a>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.add('has-diagram-chrome');
  }

  function buildFooter(project) {
    var pdfHref = toRelativePdf(project.pdf);
    var footerHtml =
      'Built by <strong style="color:#e8eaf6">Kandaswamy Subramaniyam</strong> · ' +
      '<a href="mailto:kandaswamysubramaniyam@gmail.com">kandaswamysubramaniyam@gmail.com</a> · ' +
      project.title + ' · ' +
      '<a href="' + HOME_HREF + '">Portfolio Home</a> · ' +
      '<a href="' + pdfHref + '" target="_blank" rel="noopener">PDF</a>';

    var existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.className = 'diagram-site-footer';
      existingFooter.innerHTML = footerHtml;
      return;
    }

    var footer = document.createElement('footer');
    footer.className = 'diagram-site-footer';
    footer.innerHTML = footerHtml;
    document.body.appendChild(footer);
  }

  function init() {
    var script = document.currentScript;
    var projectId = script && script.getAttribute('data-project');
    if (!projectId) return;

    loadCaseStudies()
      .then(function (studies) {
        var project = studies.find(function (s) { return s.id === projectId; });
        if (!project) return;
        buildNav(project);
        buildFooter(project);
      })
      .catch(function () {
        /* Nav is optional enhancement; diagrams remain fully usable without it */
      });
  }

  init();
})();
