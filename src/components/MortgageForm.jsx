import { useState } from 'react'
import '../styles/form.css'
import { validateMortgageInputs, calculateMortgage } from '../utils/calculator'

export default function MortgageForm({ onCalculate }) {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [mortgageType, setMortgageType] = useState('fixed')
  const [propertyValue, setPropertyValue] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validationResult = validateMortgageInputs({
      loanAmount,
      interestRate,
      loanTerm,
      mortgageType,
      propertyValue,
    })

    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      return
    }

    setErrors({})

    const result = calculateMortgage({
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTerm),
      mortgageType,
      propertyValue: propertyValue ? parseFloat(propertyValue) : null,
    })

    onCalculate(result)
  }

  return (
    <form className="mortgage-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="form-section-title">Property & Loan Information</legend>
        
        <div className="form-group">
          <label htmlFor="loanAmount">
            Loan Amount ($)
            <span aria-label="required">*</span>
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="250000"
            min="1"
            step="1000"
            aria-describedby="loanAmount-error"
            aria-required="true"
          />
          {errors.loanAmount && (
            <span id="loanAmount-error" className="error-message" role="alert">
              {errors.loanAmount}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="propertyValue">
            Property Value ($)
            <span className="optional">(Optional - for LTV calculation)</span>
          </label>
          <input
            type="number"
            id="propertyValue"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="300000"
            min="1"
            step="1000"
            aria-describedby="propertyValue-error"
          />
          {errors.propertyValue && (
            <span id="propertyValue-error" className="error-message" role="alert">
              {errors.propertyValue}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="interestRate">
            Interest Rate (%)
            <span aria-label="required">*</span>
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="5.5"
            min="0.01"
            step="0.1"
            aria-describedby="interestRate-error"
            aria-required="true"
          />
          {errors.interestRate && (
            <span id="interestRate-error" className="error-message" role="alert">
              {errors.interestRate}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="loanTerm">
            Loan Term (Years)
            <span aria-label="required">*</span>
          </label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="30"
            min="1"
            max="50"
            step="1"
            aria-describedby="loanTerm-error"
            aria-required="true"
          />
          {errors.loanTerm && (
            <span id="loanTerm-error" className="error-message" role="alert">
              {errors.loanTerm}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="mortgageType">
            Mortgage Type
            <span aria-label="required">*</span>
          </label>
          <select
            id="mortgageType"
            value={mortgageType}
            onChange={(e) => setMortgageType(e.target.value)}
            aria-required="true"
          >
            <option value="fixed">Fixed Rate Mortgage</option>
            <option value="adjustable">Adjustable Rate Mortgage (ARM)</option>
            <option value="interestOnly">Interest-Only Mortgage</option>
          </select>
        </div>
      </fieldset>

      <button type="submit" className="submit-btn">
        Calculate Mortgage Payment
      </button>
    </form>
  )
}
