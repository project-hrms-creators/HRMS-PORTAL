# HRMS-PORTAL
--------------
# GitHub Collaboration Guide
---

# 1. Prerequisites

Install:

* Git
* GitHub Account
* GitHub Desktop (Optional)
* VS Code (Recommended)

Verify Git installation:

```bash
git --version
```

Configure Git:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Check configuration:

```bash
git config --list
```

---

# 2. Repository Setup

One team member creates the repository.

Example:

```text
project-name/
```

Repository structure:

```text
project-name/
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       ├── mobile-ci.yml
│       ├── tests.yml
│       ├── security.yml
│       └── deploy.yml
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   ├── deployment/
│   ├── ui-ux/
│   ├── coding-guidelines.md
│   ├── contributing.md
│   └── changelog.md
│
├── mobile/
│   ├── android/
│   ├── ios/
│   ├── assets/
│   │
│   ├── src/
│   │
│   │   ├── app/
│   │   │
│   │   ├── navigation/
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── api/
│   │   │   ├── theme/
│   │   │   ├── constants/
│   │   │   ├── utils/
│   │   │   ├── validation/
│   │   │   ├── storage/
│   │   │   └── types/
│   │   │
│   │   ├── features/
│   │   │
│   │   │   ├── authentication/
│   │   │   │   ├── components/
│   │   │   │   ├── screens/
│   │   │   │   ├── hooks/
│   │   │   │   ├── api/
│   │   │   │   ├── store/
│   │   │   │   ├── types/
│   │   │   │   └── validation/
│   │   │   │
│   │   │   ├── profile/
│   │   │   ├── dashboard/
│   │   │   ├── notifications/
│   │   │   ├── chat/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   │
│   │   └── App.tsx
│   │
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── backend/
│   │
│   ├── app/
│   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── security.py
│   │   │   ├── logging.py
│   │   │   ├── cache.py
│   │   │   └── settings.py
│   │   │
│   │   ├── common/
│   │   │   ├── middleware/
│   │   │   ├── exceptions/
│   │   │   ├── responses/
│   │   │   ├── validators/
│   │   │   ├── permissions/
│   │   │   ├── pagination/
│   │   │   ├── dependencies/
│   │   │   └── utils/
│   │   │
│   │   ├── modules/
│   │   │
│   │   │   ├── auth/
│   │   │   │   ├── routes.py
│   │   │   │   ├── controller.py
│   │   │   │   ├── service.py
│   │   │   │   ├── repository.py
│   │   │   │   ├── model.py
│   │   │   │   ├── schema.py
│   │   │   │   ├── dependencies.py
│   │   │   │   ├── constants.py
│   │   │   │   └── tests/
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── routes.py
│   │   │   │   ├── controller.py
│   │   │   │   ├── service.py
│   │   │   │   ├── repository.py
│   │   │   │   ├── model.py
│   │   │   │   ├── schema.py
│   │   │   │   └── tests/
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   ├── notifications/
│   │   │   ├── chat/
│   │   │   ├── analytics/
│   │   │   ├── uploads/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   │
│   │   ├── websocket/
│   │   │
│   │   ├── background/
│   │   │   ├── celery.py
│   │   │   ├── scheduler.py
│   │   │   └── tasks/
│   │   │
│   │   └── main.py
│   │
│   ├── alembic/
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── api/
│   │   └── performance/
│   │
│   ├── scripts/
│   │
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── Dockerfile
│   ├── .python-version
│   ├── .env.example
│   ├── README.md
│   └── alembic.ini
│
├── database/
│   ├── erd/
│   ├── schema/
│   ├── migrations/
│   ├── seed/
│   ├── backups/
│   └── performance/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   ├── monitoring/
│   ├── production/
│   └── terraform/
│
├── scripts/
│   ├── setup.sh
│   ├── dev.sh
│   ├── lint.sh
│   ├── format.sh
│   ├── migrate.sh
│   ├── seed.sh
│   ├── backup.sh
│   ├── test.sh
│   └── deploy.sh
│
├── .editorconfig
├── .gitignore
├── .dockerignore
├── .env.example
├── docker-compose.yml
├── Makefile
├── README.md
├── LICENSE
└── CHANGELOG.md
```

Add collaborators:

GitHub Repository → Settings → Collaborators → Add teammate.

---

# 3. Branching Strategy

Never work directly on `main`.

Example:

```text
main
│
├── siddharth-feature
│
└── sinchana-feature
```

Each developer works on their own branch.

---

# 4. Cloning the Repository

```bash
git clone https://github.com/username/repository.git

cd repository
```

Check branches:

```bash
git branch -a
```

---

# 5. Creating Your Branch

Developer 1:

```bash
git checkout -b siddharth-feature
```

Developer 2:

```bash
git checkout -b sinchana-feature
```

Push the branch:

```bash
git push -u origin siddharth-feature
```

---

# 6. Making Changes

After editing files:

Check status:

```bash
git status
```

View changes:

```bash
git diff
```

---

# 7. Staging Files

Stage specific files:

```bash
git add filename
```

Stage everything:

```bash
git add .
```

---

# 8. Commiting Changes

Good commit messages:

```bash
git commit -m "Add login functionality"
```

```bash
git commit -m "Fix navbar responsiveness"
```

```bash
git commit -m "Update dashboard UI"
```

Avoid:

```bash
git commit -m "changes"
```

```bash
git commit -m "update"
```

---

# 9. Pushing Changes

```bash
git push origin siddharth-feature
```

---

# 10. Creating a Pull Request

1. Open GitHub.
2. Go to the repository.
3. Click "Compare & Pull Request."
4. Add:

   * Title
   * Description
   * Screenshots (if needed)
5. Request review.

Example:

```text
Title:
Add user authentication module

Description:
- Added login page
- Added JWT authentication
- Updated API routes
```

---

# 11. Code Review Process

Reviewer checks:

* Code quality
* Naming conventions
* Bugs
* Performance
* Documentation

Options:

* Approve
* Request Changes
* Comment

---

# 12. Merging Pull Requests

After approval:

```text
Merge Pull Request
```

Delete branch if work is complete.

---

# 13. Pull Latest Main Branch Changes

Before starting work every day:

```bash
git checkout main

git pull origin main
```

Switch back:

```bash
git checkout siddharth-feature
```

Merge main into your branch:

```bash
git merge main
```

Push updates:

```bash
git push origin siddharth-feature
```

---

# 14. Alternative: Rebase Method

```bash
git checkout main

git pull origin main

git checkout siddharth-feature

git rebase main
```

Push:

```bash
git push --force-with-lease
```

---

# 15. Fetch Latest Changes

```bash
git fetch origin
```

View remote branches:

```bash
git branch -r
```

---

# 16. Resolving Merge Conflicts

Conflict example:

```text
<<<<<<< HEAD
New code
=======
Old code
>>>>>>> main
```

Edit manually:

```text
Final code
```

Then:

```bash
git add .

git commit
```

Push:

```bash
git push
```

---

# 17. Daily Workflow

### Step 1

```bash
git checkout main
git pull origin main
```

### Step 2

```bash
git checkout your-branch
git merge main
```

### Step 3

Write code.

### Step 4

```bash
git add .
git commit -m "Meaningful message"
git push
```

### Step 5

Create Pull Request.

---

# 18. Branch Naming Convention

Feature:

```text
feature/login
feature/dashboard
```

Bug fix:

```text
bugfix/navbar
```

Documentation:

```text
docs/readme
```

Testing:

```text
test/api
```

---

# 19. Commit Message Convention

Feature:

```text
feat: add login system
```

Fix:

```text
fix: resolve navbar issue
```

Documentation:

```text
docs: update README
```

Refactor:

```text
refactor: optimize API code
```

Style:

```text
style: improve button design
```

---

# 20. Important Commands

Check status:

```bash
git status
```

View branches:

```bash
git branch
```

Switch branch:

```bash
git checkout branch-name
```

Create branch:

```bash
git checkout -b branch-name
```

Delete local branch:

```bash
git branch -d branch-name
```

Delete remote branch:

```bash
git push origin --delete branch-name
```

View commit history:

```bash
git log
```

View compact history:

```bash
git log --oneline
```

Undo last commit:

```bash
git reset --soft HEAD~1
```

Discard changes:

```bash
git restore filename
```

---

# 21. Pull Before Push Rule

Always do:

```bash
git checkout main

git pull origin main

git checkout your-branch

git merge main
```

before:

```bash
git push
```

This prevents conflicts later.

---

# 22. Files That Should Not Be Pushed

Add to `.gitignore`:

```text
node_modules/
.env
.env.local
dist/
build/
__pycache__/
*.log
.vscode/
```

---

# 23. Pull Request Checklist

Before creating a PR:

* Code runs successfully.
* No unnecessary files.
* No merge conflicts.
* Latest main branch merged.
* Proper commit messages.
* Documentation updated.
* Tests passed.

---

# 24. Team Rules

1. Never push directly to main.
2. Create a separate branch.
3. Pull latest main before working.
4. Make small commits.
5. Write meaningful commit messages.
6. Review pull requests.
7. Resolve conflicts immediately.
8. Keep branches updated.
9. Delete merged branches.
10. Communicate major changes.

---

# Complete Workflow Example

Developer 1:

```bash
git checkout main
git pull origin main

git checkout -b feature-login

# Write code

git add .
git commit -m "Add login page"

git push origin feature-login
```

Create Pull Request.

Developer 2:

```bash
git checkout main
git pull origin main

git checkout -b feature-dashboard

# Write code

git add .
git commit -m "Add dashboard"

git push origin feature-dashboard
```

After one PR merges:

```bash
git checkout main
git pull origin main

git checkout feature-dashboard

git merge main

git push
```

Continue development.

---

# Final Golden Rules

* Pull frequently.
* Commit frequently.
* Push regularly.
* Review carefully.
* Never force push to main.
* Keep PRs small.
* Communicate with teammates.
* Resolve conflicts early.

Following these practices ensures smooth collaboration and prevents code loss, conflicts, and deployment issues.
