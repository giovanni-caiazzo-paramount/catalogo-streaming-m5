---
name: Issue Triage
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: read
  pull-requests: read
engine: copilot
network:
  allowed: [defaults, github]
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  add-labels:
    max: 3
  add-comment:
  # gh-aw enables failure-reporting safe-outputs by default (noop/missing-tool/
  # missing-data/report-incomplete), some of which can CREATE new issues. This
  # workflow's scope is strictly "apply labels + post one comment", so disable
  # them to keep the compiled job at least privilege.
  noop: false
  missing-tool: false
  missing-data: false
  report-incomplete: false
---

# Issue Triage

A new issue has been opened in this repository. Read the issue title and body,
then triage it.

1. Read the issue that triggered this workflow (title, body, and any existing labels).
2. Choose up to 3 labels that best describe the issue. Prefer labels that already
   exist in the repository (e.g. `bug`, `enhancement`, `documentation`, `question`,
   `ci`, `good first issue`). Do not invent labels that don't fit.
3. Post a single, short comment that:
   - summarizes the issue in one or two sentences,
   - states which labels you applied and why,
   - and, if the issue is missing key information (reproduction steps, expected vs.
     actual behavior, environment), politely asks the author to provide it.

Be concise and friendly. Do not modify code, close the issue, or take any action
beyond applying labels and adding the one comment.
