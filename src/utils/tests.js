/**
 * Test calculator logic with the provided scenarios
 */
import { calculateMortgage } from './calculator'

const testScenarios = [
  {
    name: 'Basic Mortgage',
    input: { loanAmount: 150000, interestRate: 3.5, loanTerm: 25, mortgageType: 'fixed', propertyValue: null },
    expected: {
      monthlyPayment: 706.80, // approximately
      totalPayment: 212039.64,
      totalInterest: 62039.64,
      ltv: null,
    },
  },
  {
    name: 'Large Loan',
    input: { loanAmount: 500000, interestRate: 4.2, loanTerm: 30, mortgageType: 'adjustable', propertyValue: null },
    expected: {
      monthlyPayment: 2573, // approximately
      ltv: null,
    },
  },
  {
    name: 'Short Term',
    input: { loanAmount: 200000, interestRate: 3, loanTerm: 15, mortgageType: 'fixed', propertyValue: null },
    expected: {
      monthlyPayment: 1380.21, // approximately
      totalPayment: 248237.48,
      totalInterest: 48237.48,
      ltv: null,
    },
  },
  {
    name: 'High Interest',
    input: { loanAmount: 120000, interestRate: 5.5, loanTerm: 20, mortgageType: 'fixed', propertyValue: null },
    expected: {
      monthlyPayment: 717.34, // approximately
      totalPayment: 172161.76,
      totalInterest: 52161.76,
      ltv: null,
    },
  },
  {
    name: 'Low Loan, Adjustable',
    input: { loanAmount: 75000, interestRate: 2.8, loanTerm: 10, mortgageType: 'adjustable', propertyValue: null },
    expected: {
      monthlyPayment: 728, // approximately
      ltv: null,
    },
  },
  {
    name: 'Interest-Only',
    input: { loanAmount: 250000, interestRate: 4, loanTerm: 25, mortgageType: 'interestOnly', propertyValue: null },
    expected: {
      monthlyPayment: 833.33, // exactly (250000 * 0.04 / 12)
      totalPayment: 250000,
      totalInterest: 0,
      ltv: null,
    },
  },
  {
    name: 'High LTV',
    input: { loanAmount: 350000, interestRate: 4.5, loanTerm: 30, mortgageType: 'fixed', propertyValue: 400000 },
    expected: {
      monthlyPayment: 1772.75, // approximately
      ltv: 87.5,
    },
  },
  {
    name: 'Low LTV',
    input: { loanAmount: 100000, interestRate: 3.75, loanTerm: 20, mortgageType: 'fixed', propertyValue: 250000 },
    expected: {
      monthlyPayment: 554.60, // approximately
      ltv: 40,
    },
  },
]

export function runTests() {
  console.log('🧪 Running Mortgage Calculator Tests...\n')

  let passCount = 0
  let failCount = 0

  testScenarios.forEach((scenario) => {
    const result = calculateMortgage(scenario.input)

    console.log(`\n📊 Test: ${scenario.name}`)
    console.log(`   Input: $${scenario.input.loanAmount} @ ${scenario.input.interestRate}% for ${scenario.input.loanTerm} years (${scenario.input.mortgageType})`)

    const tests = [
      { key: 'monthlyPayment', tolerance: 5 },
      { key: 'totalPayment', tolerance: 10 },
      { key: 'totalInterest', tolerance: 10 },
      { key: 'ltv', tolerance: 0.5 },
    ]

    let scenarioPassed = true

    tests.forEach(({ key, tolerance }) => {
      if (scenario.expected[key] !== null && scenario.expected[key] !== undefined) {
        const resultValue = parseFloat(result[key])
        const expectedValue = scenario.expected[key]
        const diff = Math.abs(resultValue - expectedValue)
        const passed = diff <= tolerance

        if (!passed) {
          scenarioPassed = false
          console.log(`   ❌ ${key}: ${resultValue} (expected ~${expectedValue}, diff: ${diff.toFixed(2)})`)
        } else {
          console.log(`   ✅ ${key}: ${resultValue} (matches expected ~${expectedValue})`)
        }
      }
    })

    if (scenarioPassed) {
      passCount++
      console.log(`   ✅ PASSED`)
    } else {
      failCount++
      console.log(`   ❌ FAILED`)
    }
  })

  console.log(`\n\n📈 Test Summary:`)
  console.log(`   ✅ Passed: ${passCount}/${testScenarios.length}`)
  console.log(`   ❌ Failed: ${failCount}/${testScenarios.length}`)

  return { passCount, failCount, total: testScenarios.length }
}

// For debugging - log individual test result details
export function debugScenario(scenarioIndex) {
  if (scenarioIndex < 0 || scenarioIndex >= testScenarios.length) {
    console.error('Invalid scenario index')
    return
  }

  const scenario = testScenarios[scenarioIndex]
  const result = calculateMortgage(scenario.input)

  console.log(`\n🔍 Debug: ${scenario.name}`)
  console.log('Input:', scenario.input)
  console.log('Result:', result)
  console.log('Expected:', scenario.expected)
}
