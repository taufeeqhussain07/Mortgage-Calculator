export default function ResultPage({ results, onReset }) {
  const getMortgageTypeLabel = (type) => {
    const labels = {
      fixed: 'Fixed Rate Mortgage',
      adjustable: 'Adjustable Rate Mortgage (ARM)',
      interestOnly: 'Interest-Only Mortgage',
    }
    return labels[type] || type
  }

  return (
    <div className="results-container">
      <h2>Mortgage Calculation Results</h2>

      <div className="results-summary">
        <h3 className="summary-title">Loan Details</h3>
        <div className="result-item">
          <span className="label">Loan Amount:</span>
          <span className="value">${parseFloat(results.loanAmount).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
        </div>

        <div className="result-item">
          <span className="label">Interest Rate:</span>
          <span className="value">{results.interestRate}%</span>
        </div>

        <div className="result-item">
          <span className="label">Loan Term:</span>
          <span className="value">{results.loanTerm} years</span>
        </div>

        <div className="result-item">
          <span className="label">Mortgage Type:</span>
          <span className="value">{getMortgageTypeLabel(results.mortgageType)}</span>
        </div>

        {results.propertyValue && (
          <div className="result-item">
            <span className="label">Property Value:</span>
            <span className="value">${parseFloat(results.propertyValue).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
          </div>
        )}
      </div>

      <div className="results-payment">
        <div className="payment-highlight">
          <span className="label">Monthly Payment</span>
          <span className="value large">${parseFloat(results.monthlyPayment).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="results-totals">
        <h3 className="summary-title">Payment Summary</h3>
        <div className="result-item">
          <span className="label">Total Payment (over term):</span>
          <span className="value">${parseFloat(results.totalPayment).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
        </div>

        <div className="result-item">
          <span className="label">Total Interest:</span>
          <span className="value">${parseFloat(results.totalInterest).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
        </div>

        {results.ltv !== null && (
          <div className="result-item">
            <span className="label">Loan-to-Value (LTV):</span>
            <span className="value">{results.ltv}%</span>
          </div>
        )}
      </div>

      <div className="button-group">
        <button className="reset-btn" onClick={onReset}>
          Calculate Another Mortgage
        </button>
      </div>
    </div>
  )
}
