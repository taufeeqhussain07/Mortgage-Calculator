/**
 * Validation function for mortgage calculator inputs
 */
export function validateMortgageInputs(inputs) {
  const errors = {}

  // Validate loan amount
  if (!inputs.loanAmount || inputs.loanAmount === '') {
    errors.loanAmount = 'Loan amount is required'
  } else if (isNaN(inputs.loanAmount) || parseFloat(inputs.loanAmount) <= 0) {
    errors.loanAmount = 'Loan amount must be a positive number'
  } else if (parseFloat(inputs.loanAmount) > 10000000) {
    errors.loanAmount = 'Loan amount cannot exceed $10,000,000'
  }

  // Validate interest rate
  if (!inputs.interestRate || inputs.interestRate === '') {
    errors.interestRate = 'Interest rate is required'
  } else if (isNaN(inputs.interestRate) || parseFloat(inputs.interestRate) < 0) {
    errors.interestRate = 'Interest rate must be a non-negative number'
  } else if (parseFloat(inputs.interestRate) > 20) {
    errors.interestRate = 'Interest rate seems unusually high (>20%)'
  }

  // Validate loan term
  if (!inputs.loanTerm || inputs.loanTerm === '') {
    errors.loanTerm = 'Loan term is required'
  } else if (isNaN(inputs.loanTerm) || parseFloat(inputs.loanTerm) <= 0) {
    errors.loanTerm = 'Loan term must be a positive number'
  } else if (parseFloat(inputs.loanTerm) > 50) {
    errors.loanTerm = 'Loan term cannot exceed 50 years'
  }

  // Validate property value if provided (for LTV calculation)
  if (inputs.propertyValue && inputs.propertyValue !== '') {
    if (isNaN(inputs.propertyValue) || parseFloat(inputs.propertyValue) <= 0) {
      errors.propertyValue = 'Property value must be a positive number'
    } else if (parseFloat(inputs.loanAmount) > parseFloat(inputs.propertyValue)) {
      errors.propertyValue = 'Loan amount cannot exceed property value'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Calculate fixed-rate mortgage payment
 */
function calculateFixedMortgage(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12
  const numPayments = years * 12

  // Avoid division by zero for 0% interest
  if (monthlyRate === 0) {
    const monthlyPayment = principal / numPayments
    const totalPayment = principal
    const totalInterest = 0
    return { monthlyPayment, totalPayment, totalInterest }
  }

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)

  const totalPayment = monthlyPayment * numPayments
  const totalInterest = totalPayment - principal

  return { monthlyPayment, totalPayment, totalInterest }
}

/**
 * Calculate adjustable-rate mortgage (simplified model)
 * Assumes initial fixed period of 5 years, then adjusts
 */
function calculateAdjustableMortgage(principal, initialRate, years) {
  const fixedYears = 5
  const adjustableYears = years - fixedYears

  // Calculate for fixed period
  const { monthlyPayment: fixedPayment, totalPayment: fixedTotal } =
    calculateFixedMortgage(principal, initialRate, fixedYears)

  // After fixed period, calculate remaining balance
  const remainingBalance = principal - (fixedPayment * fixedYears * 12 - fixedTotal / fixedYears)
  
  // For adjustable period, assume rate increases by 1% (conservative estimate)
  const adjustableRate = initialRate + 1
  const { monthlyPayment: adjustablePayment, totalPayment: adjustableTotal } =
    calculateFixedMortgage(remainingBalance, adjustableRate, adjustableYears)

  // Average monthly payment
  const fixedPeriodTotal = fixedPayment * fixedYears * 12
  const adjustablePeriodTotal = adjustablePayment * adjustableYears * 12
  const totalPayment = fixedPeriodTotal + adjustablePeriodTotal
  const monthlyPayment = totalPayment / (years * 12)
  const totalInterest = totalPayment - principal

  return { monthlyPayment, totalPayment, totalInterest }
}

/**
 * Calculate interest-only mortgage
 */
function calculateInterestOnlyMortgage(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12
  const monthlyPayment = principal * monthlyRate
  const totalPayment = monthlyPayment * years * 12
  const totalInterest = totalPayment - principal

  return { monthlyPayment, totalPayment, totalInterest }
}

/**
 * Calculate Loan-to-Value ratio
 */
function calculateLTV(loanAmount, propertyValue) {
  if (!propertyValue || propertyValue === 0) {
    return null
  }
  return (loanAmount / propertyValue) * 100
}

/**
 * Main calculator function
 */
export function calculateMortgage(inputs) {
  const { loanAmount, interestRate, loanTerm, mortgageType, propertyValue } = inputs

  let calculation

  switch (mortgageType) {
    case 'adjustable':
      calculation = calculateAdjustableMortgage(loanAmount, interestRate, loanTerm)
      break
    case 'interestOnly':
      calculation = calculateInterestOnlyMortgage(loanAmount, interestRate, loanTerm)
      break
    case 'fixed':
    default:
      calculation = calculateFixedMortgage(loanAmount, interestRate, loanTerm)
  }

  const ltv = calculateLTV(loanAmount, propertyValue)

  return {
    loanAmount: loanAmount.toFixed(2),
    interestRate: interestRate.toFixed(2),
    loanTerm: loanTerm.toFixed(0),
    mortgageType,
    monthlyPayment: calculation.monthlyPayment.toFixed(2),
    totalPayment: calculation.totalPayment.toFixed(2),
    totalInterest: calculation.totalInterest.toFixed(2),
    ltv: ltv !== null ? ltv.toFixed(2) : null,
    propertyValue: propertyValue ? propertyValue.toFixed(2) : null,
  }
}
