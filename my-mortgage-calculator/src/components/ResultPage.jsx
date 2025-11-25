import React from "react";

function computeMonthlyPayment(P, annualRate, years) {
  const principal = Number(P);
  const r = Number(annualRate) / 100 / 12;
  const n = Number(years) * 12;

  if (!isFinite(principal) || !isFinite(r) || !isFinite(n) || principal <= 0 || n <= 0) return null;

  if (r === 0) {
    return principal / n;
  }
  const numerator = principal * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  return numerator / denominator;
}

export default function ResultPage({ data = {}, onBack }) {
  const monthly = computeMonthlyPayment(data.loanAmount, data.interestRate, data.loanTerm);
  const n = Number(data.loanTerm) * 12;
  const totalPayment = monthly !== null ? monthly * n : null;
  const totalInterest = totalPayment !== null ? totalPayment - Number(data.loanAmount) : null;

  return (
    <section className="results" aria-labelledby="results-title">
      <h2 id="results-title">Your results</h2>
      {!monthly && <p className="error">Unable to compute – please go back and check your inputs.</p>}
      {monthly && (
        <div className="results-grid">
          <div className="result-card">
            <div className="result-label">Monthly payment</div>
            <div className="result-value">£{monthly.toFixed(2)}</div>
          </div>
          <div className="result-card">
            <div className="result-label">Total to be repaid</div>
            <div className="result-value">£{totalPayment.toFixed(2)}</div>
          </div>
          <div className="result-card">
            <div className="result-label">Total interest</div>
            <div className="result-value">£{totalInterest.toFixed(2)}</div>
          </div>
        </div>
      )}
      <div className="form-actions">
        <button className="btn-secondary" onClick={onBack}>← Edit</button>
        <button className="btn-primary" onClick={() => alert("This would link to application/next steps.")}>Proceed</button>
      </div>
    </section>
  );
}
