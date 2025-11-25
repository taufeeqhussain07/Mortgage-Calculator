# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:5173
```

---

## 📋 Available Commands

### Development
```bash
npm run dev        # Start dev server with hot reload
```

### Production
```bash
npm run build      # Build optimized production version
npm run preview    # Preview production build locally
```

### Testing
```bash
npm test          # Run calculator test suite
```

---

## 🧪 Test the Calculator

### Scenario: Basic Mortgage
1. Enter Loan Amount: **150000**
2. Enter Interest Rate: **3.5**
3. Enter Loan Term: **25**
4. Select Type: **Fixed Rate Mortgage**
5. Click "Calculate"
6. **Expected**: Monthly payment ~$707, Total interest ~$62,040

### Try Other Scenarios
See [README.md](README.md) for all 8 test scenarios.

---

## 📚 Documentation

- **[README.md](README.md)** - Complete project documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - How to deploy
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** - Git guidelines
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Detailed summary
- **[DELIVERABLES.md](DELIVERABLES.md)** - What's included

---

## ⚡ Key Features

✅ **Three Mortgage Types**
- Fixed-Rate Mortgage
- Adjustable-Rate Mortgage (ARM)
- Interest-Only Mortgage

✅ **Complete Calculations**
- Monthly payment
- Total payment
- Total interest
- Loan-to-Value (LTV) ratio

✅ **Fully Responsive**
- Works on desktop, tablet, mobile
- Touch-friendly interface
- High contrast mode support

✅ **Accessible**
- WCAG 2.1 Level AA compliant
- Full keyboard navigation
- Screen reader compatible

---

## 🔧 Troubleshooting

### Port Already in Use?
```bash
npm run dev  # Vite will automatically try next available port
```

### Build Errors?
```bash
# Clear and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Tests Not Found?
```bash
npm test
# Or manually run in browser console:
# import { runTests } from './src/utils/tests.js'
# runTests()
```

---

## 🌐 Deploy to Azure

```bash
# 1. Push to main branch
git push origin main

# 2. GitHub Actions automatically:
#    - Installs dependencies
#    - Runs tests
#    - Builds project
#    - Deploys to Azure

# 3. Check Azure portal for live URL
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for full instructions.

---

## 💡 Next Steps

1. **Explore the code** - Check `src/` folder
2. **Run tests** - `npm test`
3. **Try scenarios** - See [README.md](README.md)
4. **Build for production** - `npm run build`
5. **Deploy** - Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Happy calculating! 🏠💰**

For help, see [README.md](README.md) or [CONTRIBUTING.md](CONTRIBUTING.md)
