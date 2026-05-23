# Automation Case Studies

**Kandaswamy Subramaniyam** — Delivery automation, workflow orchestration, and AI-assisted operations platforms.

This repository showcases end-to-end automation case studies with interactive architecture diagrams, process flows, and downloadable PDF summaries. It is intended for recruiters and hiring managers who want a quick, structured view of how these systems were designed and built.

**Live site (GitHub Pages):** [subramaniyam22.github.io/automation-case-studies](https://subramaniyam22.github.io/automation-case-studies/)

---

## Case Studies

### AutonOps — Delivery Operations Platform

End-to-end platform for work intake, AI-assisted assignment recommendations, rule governance, OKR goals, checklist workflows, and performance analytics. Built for delivery teams that need one unified space to align work, compliance, and reporting.

| Resource | Description |
|----------|-------------|
| [Interactive diagrams](case-studies/AutonOps_Workflow.html) | Architecture, process flow, execution lifecycle, and role coordination (tabbed view) |
| [PDF case study](pdf/AutonOps_CaseStudy.pdf) | Full written case study for offline review |

**Stack:** React 19 · Vite · Node.js · Express 5 · PostgreSQL 15+ · OpenAI GPT-4o-mini · JWT RBAC (5 roles)

---

### DAISY — Delivery Automation Intelligence System Yield

MVP platform for intelligent delivery automation — coordinating jobs through a multi-stage pipeline with role-based access, agent orchestration, and cloud-native infrastructure.

| Resource | Description |
|----------|-------------|
| [Architecture diagram](case-studies/DAISY_01_Architecture_Diagram.html) | System layers, services, and integrations |
| [Process flow](case-studies/DAISY_02_Process_Flow.html) | 7-stage delivery pipeline |
| [Execution lifecycle](case-studies/DAISY_03_Execution_Lifecycle.html) | Job state transitions from intake to completion |
| [Coordination flow](case-studies/DAISY_04_Coordination_Flow.html) | Role-based responsibilities and handoffs |
| [PDF case study](pdf/DAISY_CaseStudy.pdf) | Full written case study for offline review |

**Stack:** FastAPI · LangGraph · Next.js 16 · PostgreSQL · S3 · CloudFront

---

## Repository Layout

```
automation-case-studies/
├── case-studies/     # Interactive HTML diagrams (open in browser)
├── pdf/              # PDF case study documents
├── assets/           # Supporting images and diagram assets
└── README.md
```

---

## How to View

1. **GitHub Pages** — Enable Pages on the `main` branch (root `/`) in repository Settings → Pages. The live URL will be `https://subramaniyam22.github.io/automation-case-studies/`.
2. **Interactive diagrams** — Open any file under `case-studies/` directly in your browser.
3. **PDF summaries** — Download from the `pdf/` folder for sharing or printing.

---

## Contact

**Kandaswamy Subramaniyam**  
[kandaswamysubramaniyam@gmail.com](mailto:kandaswamysubramaniyam@gmail.com)

---

*Case study materials are shared for portfolio and recruitment purposes.*
