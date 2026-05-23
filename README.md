# Automation Case Studies

**Kandaswamy Subramaniyam** — Senior IT Leader · TPM · AI Operations · Delivery Automation

A JSON-driven portfolio platform showcasing enterprise automation case studies with interactive diagrams, process flows, and downloadable PDF summaries. Built for recruiters, hiring managers, and technical reviewers.

**Live site:** [subramaniyam22.github.io/automation-case-studies](https://subramaniyam22.github.io/automation-case-studies/)

---

## Portfolio Overview

This repository is a **static, data-driven case study platform**. The homepage (`index.html`) dynamically renders all projects from a single JSON file — no manual HTML editing required when adding new case studies.

| Project | Category | Diagrams | PDF |
|---------|----------|----------|-----|
| **AutonOps** | AI-Assisted Delivery Operations Platform | [Workflow](case-studies/autonops/workflow.html) | [PDF](pdf/autonops-case-study.pdf) |
| **DAISY** | Delivery Automation Intelligence System Yield | [Architecture](case-studies/daisy/architecture.html) · [Process Flow](case-studies/daisy/process-flow.html) · [Execution Lifecycle](case-studies/daisy/execution-lifecycle.html) · [Coordination Flow](case-studies/daisy/coordination-flow.html) | [PDF](pdf/daisy-case-study.pdf) |

---

## Repository Architecture

```
automation-case-studies/
│
├── index.html                    # Portfolio homepage (GitHub Pages entry point)
│
├── assets/
│   ├── case-studies.json         # Single source of truth — add projects here
│   ├── app.js                    # Dynamic card rendering from JSON
│   ├── styles.css                # Shared styles (homepage + diagram chrome)
│   ├── diagram-chrome.js         # Shared nav/footer for diagram pages
│   └── images/                   # Optional project images
│
├── case-studies/
│   ├── autonops/
│   │   └── workflow.html
│   └── daisy/
│       ├── architecture.html
│       ├── process-flow.html
│       ├── execution-lifecycle.html
│       └── coordination-flow.html
│
├── pdf/
│   ├── autonops-case-study.pdf
│   └── daisy-case-study.pdf
│
└── README.md
```

---

## How JSON-Driven Rendering Works

1. **`assets/case-studies.json`** defines all portfolio projects (title, summary, metrics, tags, tech stack, PDF path, diagram page links).
2. **`assets/app.js`** reads the JSON and auto-generates:
   - Case study cards on the homepage
   - Tag and tech badges per project
   - Metrics lists
   - Links to interactive diagrams and PDFs
   - Aggregated technical stack section
3. **Adding a new project** updates the homepage automatically — no changes to `index.html` required.

The homepage loads JSON via a `<script type="application/json">` tag for compatibility with both **GitHub Pages** and **local file opening**.

---

## How to Add a Future Case Study

### Step 1 — Create diagram folder

```
case-studies/your-project/
├── architecture.html
└── process-flow.html
```

Add shared navigation to each HTML file:

```html
<link rel="stylesheet" href="../../assets/styles.css">
<!-- keep existing embedded diagram CSS -->
<script src="../../assets/case-studies.json" type="application/json" id="case-studies-data"></script>
<script src="../../assets/diagram-chrome.js" data-project="your-project"></script>
```

Use the same `id` value in JSON (`"id": "your-project"`) as the `data-project` attribute.

### Step 2 — Add PDF

Place the case study PDF in `pdf/`:

```
pdf/your-project-case-study.pdf
```

### Step 3 — Add one JSON entry

Add a new object to `assets/case-studies.json`:

```json
{
  "id": "your-project",
  "title": "Your Project",
  "category": "Short category label",
  "summary": "One-paragraph project description.",
  "metrics": ["Metric 1", "Metric 2"],
  "tags": ["Tag 1", "Tag 2"],
  "tech": ["Tech 1", "Tech 2"],
  "pdf": "pdf/your-project-case-study.pdf",
  "pages": [
    { "title": "Architecture", "link": "case-studies/your-project/architecture.html" }
  ]
}
```

**Done.** The homepage updates automatically on the next deploy.

---

## GitHub Pages Setup

1. Open **Settings → Pages** in the repository.
2. Set **Source** to **Deploy from a branch**.
3. Choose **Branch:** `main`, **Folder:** `/ (root)`.
4. Save. The site will be live at `https://subramaniyam22.github.io/automation-case-studies/` within a few minutes.

The homepage is served from `index.html` at the repository root.

---

## Local Preview

Open `index.html` directly in a browser, or run a local server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

---

## Tech Stack (Platform)

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (no frameworks) |
| Logic | Vanilla JavaScript |
| Data | JSON |
| Hosting | GitHub Pages |

No build tools, npm, or frameworks — fully static and maintainable.

---

## Contact

**Kandaswamy Subramaniyam**

- **Email:** [kandaswamysubramaniyam@gmail.com](mailto:kandaswamysubramaniyam@gmail.com)
- **GitHub:** [subramaniyam22/automation-case-studies](https://github.com/subramaniyam22/automation-case-studies)
- **LinkedIn:** [linkedin.com/in/kandaswamy-subramaniyam](https://www.linkedin.com/in/kandaswamy-subramaniyam)

---

*Case study materials are shared for portfolio and recruitment purposes.*
