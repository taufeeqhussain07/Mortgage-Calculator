# Git Workflow Guide

This document outlines the Git workflow and best practices for the Mortgage Calculator project.

## Overview

We use a modified Git Flow with:
- **main**: Production-ready code
- **development**: Integration branch for features
- **feature/\***: Feature branches
- **bugfix/\***: Bugfix branches
- **release/\***: Release branches

## Branch Naming Convention

```
feature/short-description          # New features
bugfix/issue-number-description    # Bug fixes
refactor/area-of-improvement       # Code refactoring
docs/what-was-documented           # Documentation changes
perf/performance-improvement       # Performance improvements
test/test-type-added               # Test additions
```

Examples:
- `feature/arm-mortgage-support`
- `bugfix/fix-ltv-calculation`
- `refactor/calculator-logic`

## Workflow Steps

### 1. Starting a New Feature

```bash
# Update local main branch
git checkout main
git pull origin main

# Create feature branch from development
git checkout -b feature/your-feature-name

# Start developing
# Make commits as you work
git add .
git commit -m "feat: initial structure for new feature"
git commit -m "feat: add new functionality"

# Push to remote
git push origin feature/your-feature-name
```

### 2. Creating a Pull Request

On GitHub:
1. Go to the repository
2. Click "New Pull Request"
3. Set:
   - **base**: `development`
   - **compare**: `feature/your-feature-name`
4. Fill in PR title and description
5. Request reviewers
6. Submit PR

PR Title format: `[TYPE] Short description`
Examples:
- `[FEATURE] Add ARM mortgage calculation`
- `[BUGFIX] Fix LTV calculation edge case`
- `[DOCS] Update README with new features`

### 3. Code Review

Reviewers will:
- Check code quality
- Verify tests pass
- Review commit messages
- Suggest improvements

Address feedback:
```bash
# Make requested changes
git add .
git commit -m "refactor: address PR feedback on calculation logic"
git push origin feature/your-feature-name

# Conversation continues on PR
```

### 4. Merging to Development

Once approved:
- Click "Squash and merge" (for cleaner history)
- OR click "Create a merge commit" (to preserve history)
- Delete the feature branch

### 5. Release Process

When ready to release:

```bash
# Create release branch from development
git checkout -b release/v1.0.0

# Update version in package.json
# Update CHANGELOG
git add .
git commit -m "chore: bump version to 1.0.0"

# Merge to main with tag
git checkout main
git pull origin main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# Merge back to development
git checkout development
git merge --no-ff release/v1.0.0
git push origin development

# Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

## Commit Message Convention

Follow Conventional Commits format:

```
type(scope): subject

body

footer
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of code
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or dependencies

### Examples

```bash
# Feature commit
git commit -m "feat(calculator): add interest-only mortgage support

- Implement calculateInterestOnlyMortgage function
- Update form to include I-O option
- Add tests for edge cases"

# Fix commit
git commit -m "fix(validation): handle zero interest rates correctly"

# Documentation
git commit -m "docs(readme): add deployment instructions for Azure"

# Refactor
git commit -m "refactor(calculator): improve code organization and readability"

# Chore
git commit -m "chore(deps): update React to 18.2.0"
```

## Handling Conflicts

### Before Merge

```bash
# Update your feature branch with latest development
git fetch origin
git rebase origin/development

# Fix any conflicts
# Then force push (only on your feature branch!)
git push origin feature/your-feature-name --force-with-lease
```

### During Merge

If conflicts occur during PR merge:

1. **Resolve locally**
   ```bash
   git fetch origin
   git merge origin/development
   ```

2. **Find conflicts**
   ```bash
   git status
   ```

3. **Edit conflicted files**
   Look for markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> origin/development
   ```

4. **Resolve and commit**
   ```bash
   git add .
   git commit -m "resolve: merge conflicts from development"
   git push origin feature/your-feature-name
   ```

### Merge Strategies

Use appropriate merge strategies:

```bash
# 3-way merge (default)
git merge development

# Rebase and fast-forward (clean history)
git merge --ff-only development

# Force merge commit (clear integration point)
git merge --no-ff development
```

## Common Scenarios

### Sync Feature Branch with Development

```bash
git fetch origin
git rebase origin/development
git push origin feature/your-feature-name --force-with-lease
```

### Update Main Branch

```bash
git checkout main
git pull origin main
git log --oneline -5  # View recent commits
```

### View All Branches

```bash
# Local branches
git branch

# Remote branches
git branch -r

# All branches
git branch -a
```

### Delete Old Branches

```bash
# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

### Revert a Commit

```bash
# View commit to revert
git log --oneline

# Revert a specific commit (creates new commit)
git revert <commit-hash>

# Revert multiple commits
git revert <oldest-hash>^..<newest-hash>
```

### Cherry-pick a Commit

```bash
# Copy a specific commit to current branch
git cherry-pick <commit-hash>

# Or multiple commits
git cherry-pick <hash1> <hash2> <hash3>
```

## Best Practices

### 1. Keep Branches Small

- One feature per branch
- Easier to review
- Faster to merge
- Simpler conflict resolution

### 2. Commit Often

```bash
# Good: Logical, small commits
git commit -m "feat: add form validation"
git commit -m "feat: add error messages"
git commit -m "test: add validation tests"

# Avoid: Everything in one commit
git commit -m "added validation, errors, tests, updated docs"
```

### 3. Write Clear Messages

```bash
# ✅ Good
feat(calculator): add adjustable-rate mortgage support

- Implement ARM calculation logic
- Add 5-year initial fixed period
- Tests verify ARM calculations match specifications

# ❌ Bad
updated code
fixed stuff
more changes
```

### 4. Pull Regularly

```bash
# Keep your branch updated
git fetch origin
git pull origin development
```

### 5. Review Your Own Changes

Before requesting review:
```bash
# See all changes
git diff development

# See changes in a file
git diff development -- src/calculator.js

# See commit history
git log -3
```

## CI/CD Integration

### GitHub Actions

Workflows run automatically on:
- **Push to any branch**: Run tests, lint
- **PR created/updated**: Run tests, build, preview
- **Merge to main**: Deploy to Azure

View status in PR checks section.

### Pre-commit Hooks (Optional)

```bash
# Install
npm install husky --save-dev
npx husky install

# Create hook
npx husky add .husky/pre-commit "npm run build"
```

## Troubleshooting

### Accidentally committed to wrong branch

```bash
# Get the commit hash
git log --oneline

# Move it to correct branch
git checkout correct-branch
git merge <commit-hash>

# Remove from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

### Committed but not pushed

```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --mixed HEAD~1 # Undo commit, keep unstaged
git reset --hard HEAD~1  # Undo commit, discard changes
```

### Can't push (remote has changes)

```bash
git pull --rebase origin feature/your-branch
git push origin feature/your-branch
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Rebase vs Merge](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

## Questions?

For Git workflow questions, check:
1. This guide
2. Team documentation
3. GitHub Issues
4. Ask the team lead
