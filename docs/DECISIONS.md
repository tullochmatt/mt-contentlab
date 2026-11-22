# Product decision log

The choices below are **prototype decisions**, not workplace project disclosures.

## 001 — Build static first

**Decision:** Use HTML, CSS and JavaScript with `localStorage` rather than add a backend.

**Why:** The immediate goal is to demonstrate a believable workflow in a public portfolio. No account, setup, database, or ongoing hosting infrastructure is required. A static build can run on GitHub Pages.

**Tradeoff:** No shared data, server-side audit trail, permissions, or real publishing. A browser reset clears local records unless exported.

**Revisit when:** Collaboration and persistence become necessary to validate the core value proposition.

## 002 — Start with a compact content model

**Decision:** Define four types, four sections, and a small set of common authoring fields.

**Why:** A manageable content model makes filtering and workflow use cases visible without burying the viewer in dozens of fields.

**Tradeoff:** The model does not support localization, nested components, media, schemas by type, or content references.

**Revisit when:** Research shows a concrete need for content reuse, conditional fields, or different editorial domains.

## 003 — Use flexible status selection with readiness checks

**Decision:** Allow any status to be selected, while requiring a title for all content, body and summary for non-drafts, and a date for Scheduled.

**Why:** The portfolio demo should show basic validation without inventing complex stakeholder approvals.

**Tradeoff:** A user can mark an item Published without a real review; this would not be acceptable in many production workflows.

**Revisit when:** Defining roles, permissions, audit history, and formal review rules.

## 004 — Do not simulate an AI feature

**Decision:** Exclude AI-assisted tagging/summarization from v1.

**Why:** A button that produces hard-coded "AI" output would be misleading, and integrating an API would require secrets, cost controls, and error handling beyond this stage.

**Tradeoff:** Does not yet demonstrate AI feature design. This is deliberately listed as a future discovery opportunity rather than a completed capability.

**Revisit when:** A specific use case can be evaluated with quality measures and human review.

## 005 — Fictional data only

**Decision:** Use a fictional workspace and invented records.

**Why:** Enables public demonstration without exposing proprietary content, internal software, real editorial performance metrics, or employer-specific workflows.
