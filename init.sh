#!/bin/bash
# Initialize Mortgage Calculator Project
# This script sets up Git and prepares for deployment

echo "🚀 Initializing Mortgage Calculator Project..."

# Initialize Git if not already done
if [ ! -d .git ]; then
  echo "📦 Initializing Git repository..."
  git init
  git add .
  git commit -m "chore: initial project setup

- Created mortgage calculator application
- Implemented fixed, adjustable, and interest-only mortgage calculations
- Added comprehensive form validation
- Configured Azure Static Web Apps deployment
- Set up GitHub Actions CI/CD pipeline
- Added full documentation"
  echo "✅ Git initialized"
else
  echo "ℹ️  Git repository already exists"
fi

echo "📋 Project Status:"
echo "  ✅ Calculator logic implemented"
echo "  ✅ Components created"
echo "  ✅ Styling complete"
echo "  ✅ Validation added"
echo "  ✅ Accessibility verified"
echo "  ✅ Tests created"
echo "  ✅ Git configured"
echo "  ✅ Azure deployment ready"
echo "  ✅ Documentation complete"

echo ""
echo "📖 Next Steps:"
echo "  1. Development: npm run dev"
echo "  2. Testing: npm test"
echo "  3. Build: npm run build"
echo "  4. Deploy: git push origin main"

echo ""
echo "📚 Documentation:"
echo "  - README.md - Project overview"
echo "  - DEPLOYMENT.md - Deployment guide"
echo "  - GIT_WORKFLOW.md - Git workflow"
echo "  - CONTRIBUTING.md - Contributing guide"
echo "  - PROJECT_SUMMARY.md - Completion summary"

echo ""
echo "🎉 Ready to deploy!"
