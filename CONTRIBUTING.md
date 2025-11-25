# Contributing to Mortgage Calculator

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code, not the coder
- Help others learn

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Git
- GitHub account

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/your-org/my-mortgage-calculator.git
cd my-mortgage-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

## Development Guidelines

### Code Style

- Use ES6+ JavaScript
- No TypeScript (per project requirements)
- Use functional components with React Hooks
- Use meaningful variable names
- Keep functions small and focused
- Write self-documenting code

Example:
```javascript
// ✅ Good
function calculateMonthlyPayment(principal, rate, years) {
  const monthlyRate = rate / 100 / 12
  const payments = years * 12
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments))
}

// ❌ Bad
function calc(p, r, y) {
  let mr = r / 100 / 12
  let n = y * 12
  return (p * mr) / (1 - Math.pow(1 + mr, -n))
}
```

### Testing

Before committing:

```bash
# Verify calculations
npm test

# Check for console errors
npm run dev
# Open browser console and use the calculator

# Test all input scenarios
# See README.md for test scenarios
```

### Components

New components should:
- Be in `src/components/`
- Export a default function
- Have clear prop types in comments
- Include ARIA attributes where relevant

Example:
```javascript
/**
 * MortgageInput - Renders a labeled input field
 * @param {string} label - Field label
 * @param {string} value - Current value
 * @param {function} onChange - Change handler
 * @param {string} errorMessage - Validation error
 */
export default function MortgageInput({ label, value, onChange, errorMessage }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input value={value} onChange={onChange} aria-invalid={!!errorMessage} />
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  )
}
```

### Styling

- Use CSS modules or scoped styles
- Follow existing style structure
- Support mobile-first responsive design
- Ensure sufficient color contrast (WCAG AA)
- Test with keyboard navigation

### Accessibility

Every change must maintain accessibility:
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

```javascript
// ✅ Good
<input
  id="loanAmount"
  type="number"
  placeholder="Enter loan amount"
  aria-label="Loan Amount in dollars"
  aria-describedby="loan-help"
  required
/>
<small id="loan-help">The principal amount to borrow</small>

// ❌ Bad
<input type="text" placeholder="Loan" />
```

## Making Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

See [GIT_WORKFLOW.md](GIT_WORKFLOW.md) for naming conventions.

### 2. Make Your Changes

- Keep commits small and logical
- Write clear commit messages
- Test frequently

```bash
# Make changes
git add .
git commit -m "feat(calculator): add new feature

- Detailed description of changes
- List key changes
- Reference any related issues #123"
```

### 3. Keep Branch Updated

```bash
git fetch origin
git rebase origin/development
git push origin feature/your-feature-name --force-with-lease
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then on GitHub:
1. Click "New Pull Request"
2. Set base to `development`
3. Fill in PR template
4. Request reviewers

## Pull Request Guidelines

### PR Title
Use format: `[TYPE] Concise description`

Examples:
- `[FEATURE] Add adjustable-rate mortgage support`
- `[BUGFIX] Fix LTV calculation with decimals`
- `[DOCS] Update deployment guide`
- `[REFACTOR] Simplify calculator logic`

### PR Description

```markdown
## Description
Brief description of changes and why they're needed.

## Related Issues
Closes #123

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [x] Tested with fixed-rate mortgage
- [x] Tested with ARM
- [x] Tested validation errors
- [x] Tested accessibility

## Screenshots (if applicable)
Before/after screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Added/updated documentation
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] No breaking changes
```

### Review Process

Reviewers will check:
- ✅ Code quality and style
- ✅ Tests pass
- ✅ Accessibility maintained
- ✅ Documentation updated
- ✅ No breaking changes
- ✅ Commit messages are clear

## Bug Reports

When reporting bugs:

### Title
`[BUG] Clear, concise description`

### Description
```markdown
## Description
Clear description of the bug.

## Steps to Reproduce
1. Enter loan amount of $150,000
2. Enter interest rate of 3.5%
3. Click Calculate

## Expected Behavior
Monthly payment should be ~$707

## Actual Behavior
Monthly payment shows $7,070

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop

## Screenshots
[If applicable]

## Additional Context
[Any other relevant info]
```

## Feature Requests

When suggesting features:

### Title
`[FEATURE] Clear description of desired feature`

### Description
```markdown
## Problem
What problem does this solve?

## Proposed Solution
How should this work?

## Example Usage
How would users use this feature?

## Alternatives Considered
Other approaches considered

## Additional Context
Why is this important?
```

## Questions?

- 📖 Check [README.md](README.md) for documentation
- 🔄 Review [GIT_WORKFLOW.md](GIT_WORKFLOW.md) for Git help
- 💬 Open a Discussion on GitHub
- 📧 Contact maintainers

## Recognition

Contributors will be recognized:
- In README.md contributors section
- In release notes for their PRs
- As collaborators on the project

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
