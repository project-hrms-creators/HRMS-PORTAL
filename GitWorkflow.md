
# GitWorkflow.md

> **Document:** Enterprise Git & GitHub Workflow Guide
> **Project:** HRMS Portal
> **Version:** 2.0
> **Audience:** All Contributors

---

# 1. Purpose

This guide defines the complete Git and GitHub workflow used by the HRMS Portal project. It standardizes repository management, collaboration, code reviews, releases, and recovery procedures.

---

# 2. Collaboration Models

## Internal Team (Recommended)

- Repository owner creates the repository.
- Team members are added as collaborators.
- Contributors **clone** the repository directly.

## External/Open Source

- Fork the repository.
- Clone your fork.
- Add the original repository as `upstream`.
- Submit Pull Requests from your fork.

---

# 3. Repository Initialization

Repository owner should:

- Create repository
- Add LICENSE
- Add README
- Protect `main`
- Enable Issues and Projects
- Configure branch protection
- Add collaborators
- Configure GitHub Actions

Branch protection for `main`:

- No direct pushes
- Pull Request required
- Passing CI required
- At least one approval
- Conversation resolution required

---

# 4. First-Time Setup

```bash
git clone https://github.com/<org>/hrms-portal.git
cd hrms-portal
git remote -v
git fetch --all
```

Open-source contributors:

```bash
git clone https://github.com/<your-username>/hrms-portal.git
git remote add upstream https://github.com/<org>/hrms-portal.git
git fetch upstream
```

Install project dependencies after cloning.

---

# 5. Branch Strategy

```text
main
│
├── develop
│
├── feature/*
├── bugfix/*
├── hotfix/*
├── docs/*
├── refactor/*
└── release/*
```

Never commit directly to `main`.

---

# 6. Branch Naming

Examples:

```text
feature/auth-login
feature/attendance-module
feature/leave-management
bugfix/login-validation
hotfix/jwt-refresh
docs/update-readme
release/v1.0.0
```

---

# 7. Daily Development Workflow

## New Feature

```bash
git switch develop
git pull origin develop
git switch -c feature/auth-login
```

Develop, then:

```bash
git add .
git commit -m "feat(auth): implement login endpoint"
git push -u origin feature/auth-login
```

Open a Pull Request to `develop`.

## Continuing Existing Feature

```bash
git switch develop
git pull origin develop
git switch feature/auth-login
git merge develop
```

Resolve conflicts if required before continuing.

---

# 8. Commit Convention

Use Conventional Commits.

```text
feat:
fix:
docs:
style:
refactor:
test:
build:
ci:
perf:
chore:
```

Example:

```text
feat(attendance): add clock-in API
```

---

# 9. Pull Request Workflow

PR must include:

- Summary
- Related issue
- Testing performed
- Screenshots (UI changes)
- Breaking changes
- Checklist

Checklist:

- Tests pass
- Documentation updated
- No secrets committed
- CI successful

---

# 10. Code Review

Reviewers verify:

- Architecture compliance
- Coding standards
- Security
- Performance
- Error handling
- Documentation
- Tests

---

# 11. Merge Strategy

Preferred:

- Squash Merge for feature branches

Use Rebase only when appropriate.

Delete merged branches.

---

# 12. Syncing Your Branch

```bash
git switch develop
git pull origin develop
git switch feature/auth-login
git merge develop
```

Avoid long-lived stale branches.

---

# 13. Conflict Resolution

```bash
git status
```

Resolve conflicts manually.

Then:

```bash
git add .
git commit
git push
```

---

# 14. GitHub Features

Use:

- Issues
- Projects
- Labels
- Milestones
- Discussions
- Releases

Suggested labels:

```text
bug
feature
documentation
security
performance
blocked
good first issue
```

---

# 15. Release Workflow

```text
feature/*
      ↓
develop
      ↓
release/*
      ↓
main
      ↓
tag v1.0.0
```

Use Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

---

# 16. CI/CD Requirements

A PR cannot be merged until:

- Build passes
- Lint passes
- Tests pass
- Required approvals received

---

# 17. Recovery Commands

Stash:

```bash
git stash
git stash pop
```

Reflog:

```bash
git reflog
```

Cherry-pick:

```bash
git cherry-pick <commit>
```

Soft reset:

```bash
git reset --soft HEAD~1
```

---

# 18. Repository Maintenance

Regularly:

- Delete merged branches
- Prune remotes
- Update dependencies
- Review open issues
- Archive completed milestones

---

# 19. Team Rules

1. Never push to `main`.
2. Small focused PRs.
3. One feature per branch.
4. Pull latest changes before work.
5. Keep commits meaningful.
6. Update documentation.
7. Resolve conflicts immediately.
8. Ask for review before merge.

---

# 20. HRMS Development Lifecycle

```text
Issue
 ↓
Planning
 ↓
Feature Branch
 ↓
Implementation
 ↓
Tests
 ↓
Pull Request
 ↓
Code Review
 ↓
CI/CD
 ↓
Merge to develop
 ↓
Release Branch
 ↓
Production
```

---

# 21. Quick Command Reference

```bash
git status
git switch develop
git pull origin develop
git switch -c feature/new-module
git add .
git commit -m "feat(module): description"
git push -u origin feature/new-module
git fetch --all
git merge develop
git stash
git reflog
git log --oneline
```

---

# 22. Final Golden Rules

- Protect `main`
- Work from issues
- One logical change per PR
- Keep branches short-lived
- Review before merging
- Automate testing
- Document decisions
- Never commit secrets
- Prefer clarity over cleverness

This workflow is the official collaboration standard for the HRMS Portal and should be followed by every contributor.
