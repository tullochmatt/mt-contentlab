# Product brief · MT ContentLab

## Problem

Small content teams often track drafts, review status, metadata, and publishing plans in disconnected tools. This can obscure ownership, complicate findability, and make it hard to understand what needs attention. The prototype investigates whether a single, lightweight workspace can make these activities easier to understand.

**This is a hypothetical product problem**, not a claim based on quantified customer research.

## Users and jobs to be done

| Persona | Job to be done | What this prototype demonstrates |
| --- | --- | --- |
| Content editor | Create and revise content without losing track of metadata | Structured authoring form and preview |
| Managing editor | Identify content needing review | Review queue, status counts and filters |
| Content operations partner | Understand portfolio status and find specific content | Search, status distribution, and content taxonomy |

## V1 product goal

Demonstrate an understandable authoring-to-review workflow using a small structured content model. The experience should be usable without an account, server, onboarding call, or realistic enterprise integration.

## Assumptions to validate

1. Editors benefit from a visible, consistent workflow status for every record.
2. Type, section, owner, and tags are enough metadata to demonstrate useful filtering.
3. Basic quality requirements before review or scheduling can prevent incomplete handoffs.
4. A live reader preview can make authoring more concrete without a full page-rendering system.

## Proposed success metrics (not measured results)

- **Task completion rate:** Can test participants create a draft, edit metadata, and put it in review without assistance?
- **Time to find content:** How quickly can participants locate a record by title or topic?
- **Review readiness:** What fraction of review submissions pass required-field validation on the first attempt?
- **Workflow comprehension:** Can participants accurately explain the difference between draft, review, scheduled, and published states?
- **Perceived clarity:** Brief qualitative feedback from editors on what feels obvious vs. confusing.

## Scope

**Included:** sample content, structured authoring, client-side records, title/metadata search, status filters, queue, simple preview, import/export, responsive layout.

**Excluded:** accounts, roles/permissions, collaboration, revision history, real publishing, notifications, media library, full-text indexing, API integrations, scheduled jobs, analytics, and AI-generated content.

## Workflow model

```text
Draft → In review → Scheduled → Published
  ↑         ↓           ↓
  └─────────┴───────────┘ (edits or returns are allowed)
```

This diagram is conceptual. In v1, a user may choose any status directly; there is no enforced transition graph or role-based approval. The editor requires a title for every record, summary/body for any non-draft status, and a planned publish date when the status is Scheduled.

## Content model

| Field | Type | Why it exists |
| --- | --- | --- |
| id | String | Stable local record identifier |
| title | String | Reader-facing label and primary search field |
| slug | String | Human-readable future URL identifier; no live route is created |
| type | Enum | Distinguish articles, guides, resources, announcements |
| section | Enum | Topical organization |
| summary | Text | Short description for discovery and previews |
| body | Plain text | Core authored content in this prototype |
| owner | String | Responsibility and review triage |
| tags | String array | Flexible supplemental taxonomy |
| status | Enum | Workflow state |
| publishAt | ISO date or null | Planned timing metadata, not an actual scheduler |
| updatedAt | ISO timestamp | Sorting and recency context |

## Usability considerations

- Prioritize a familiar document list; expose important status information without opening the editor.
- Keep status changes deliberate inside the editing form rather than adding unconfirmed one-click transitions.
- Use clear language about what the demo *does not* do (particularly publishing and persistence).
- Allow a way to export local edits so evaluators can preserve their changes.

## Next research step

Conduct 3–5 short usability walkthroughs using scripted tasks, record observable friction, and revise the highest-impact problem before extending the feature set.
