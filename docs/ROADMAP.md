# Prioritized roadmap · MT ContentLab

This is an illustrative product roadmap, not a commitment to implement every feature. Priorities reflect the portfolio demo's goals and assumptions, not a validated customer backlog.

## Now — v1: Make content workflows tangible (implemented)

- [x] Fictional sample content and content model
- [x] Create, edit, and delete records
- [x] Search, filter, sort
- [x] Overview and review queue
- [x] Reader preview and workflow validation
- [x] Browser persistence and JSON import/export
- [x] Responsive static deployment files

## Next — Improve editorial confidence

### P1 · Save-time field validation and completeness score

**User story:** As an editor, I want to know which required fields are missing before I submit an item for review.

**Acceptance criteria:**
- Missing/invalid fields are named next to their inputs.
- The form shows a clear, explainable completeness indicator.
- Drafts can still be saved with incomplete optional fields.
- Validation rules are documented per status and content type.

**Why next:** Most directly addresses avoidable review handoffs.

### P1 · Revision history (local demo)

**User story:** As an editor, I want to inspect previous revisions so I can understand what changed.

**Acceptance criteria:**
- Saving a record produces a dated revision snapshot.
- A record view can compare the current version with a prior one.
- The UI distinguishes restoring a version from publishing it.

**Why next:** Reveals a common editorial workflow pain point while staying within the scope of a browser prototype.

### P2 · Metadata-focused search

**User story:** As a content operations partner, I want precise filters for section, owner, tags and status to find records without knowing the exact title.

**Acceptance criteria:**
- Multiple filters can be combined.
- Matching records and active filters are always visible.
- Clear filters returns the complete list.
- Search matching rules and empty states are understandable.

## Later — Validate platform extensions

### P2 · Multi-channel preview

Compare the same structured record as a web article, mobile card and resource listing. Evaluate which shared fields support reuse and which need channel-specific overrides.

### P3 · AI-assisted metadata suggestions (research first)

Explore whether an LLM can suggest content tags or summaries with human review. Define accuracy, accept/reject rate, cost, and privacy requirements **before** implementation. Never silently publish or overwrite editorial content.

### P3 · Authenticated backend and collaboration

Only if the research validates it: add accounts, role-based reviews, shared persistent storage, audit events, and real publishing integrations.

## Suggested GitHub issues

Create one GitHub Issue per numbered roadmap item. Labels could include `discovery`, `ux`, `workflow`, `content-model`, `P1`, `P2`, and `P3`. Tie each issue to a user problem and acceptance criteria rather than a technology-only task.
