import React, { useState, useEffect } from "react";
import Tooltip from "./Tooltip";

function currencyNormalize(value) {
  // remove non-digits except dot
  return value.replace(/[^\d.]/g, "");
}

export default function MortgageForm({ defaultValues = {}, onNext, onBack, reviewMode = false }) {
  const [loanAmount, setLoanAmount] = useState(defaultValues.loanAmount || "");
  const [interestRate, setInterestRate] = useState(defaultValues.interestRate || "");
  const [loanTerm, setLoanTerm] = useState(defaultValues.loanTerm || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoanAmount(defaultValues.loanAmount || "");
    setInterestRate(defaultValues.interestRate || "");
    setLoanTerm(defaultValues.loanTerm || "");
  }, [defaultValues]);

  const validate = () => {
    const e = {};
    if (!loanAmount || Number(loanAmount) <= 0) e.loanAmount = "Enter a valid loan amount";
    if (interestRate === "" || Number(interestRate) < 0) e.interestRate = "Enter a valid interest rate";
    if (!loanTerm || Number(loanTerm) <= 0) e.loanTerm = "Enter a valid loan term";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onNext({
      loanAmount: String(loanAmount),
      interestRate: String(interestRate),
      loanTerm: String(loanTerm)
    });
  };

  return (
    <section className="form-section" aria-labelledby="mortgage-form-title">
      <h2 id="mortgage-form-title">{reviewMode ? "Review your details" : "Tell us about your mortgage"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label className="form-row">
          <div className="label-with-tip">
            Loan Amount
            <Tooltip text="Enter the total loan you want (numbers only).">
              <span className="info-icon" aria-hidden="true">ⓘ</span>
            </Tooltip>
          </div>
          <input
            inputMode="numeric"
            name="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(currencyNormalize(e.target.value))}
            aria-invalid={errors.loanAmount ? "true" : "false"}
            aria-describedby={errors.loanAmount ? "loanAmount-error" : undefined}
            placeholder="e.g. 250000"
          />
          {errors.loanAmount && <div id="loanAmount-error" className="error">{errors.loanAmount}</div>}
        </label>

        <label className="form-row">
          <div className="label-with-tip">
            Interest Rate (%)
            <Tooltip text="Annual nominal interest rate (e.g. 3.5).">
              <span className="info-icon" aria-hidden="true">ⓘ</span>
            </Tooltip>
          </div>
          <input
            inputMode="decimal"
            name="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(currencyNormalize(e.target.value))}
            aria-invalid={errors.interestRate ? "true" : "false"}
            aria-describedby={errors.interestRate ? "interestRate-error" : undefined}
            placeholder="e.g. 3.5"
          />
          {errors.interestRate && <div id="interestRate-error" className="error">{errors.interestRate}</div>}
        </label>

        <label className="form-row">
          <div className="label-with-tip">
            Loan Term (years)
            <Tooltip text="Typical mortgage terms range 10–30 years.">
              <span className="info-icon" aria-hidden="true">ⓘ</span>
            </Tooltip>
          </div>
          <input
            inputMode="numeric"
            name="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(currencyNormalize(e.target.value))}
            aria-invalid={errors.loanTerm ? "true" : "false"}
            aria-describedby={errors.loanTerm ? "loanTerm-error" : undefined}
            placeholder="e.g. 25"
          />
          {errors.loanTerm && <div id="loanTerm-error" className="error">{errors.loanTerm}</div>}
        </label>

        <div className="form-actions">
          {onBack && (
            <button type="button" className="btn-secondary" onClick={onBack}>
              ← Back
            </button>
          )}
          <button type="submit" className="btn-primary">
            {reviewMode ? "Confirm & Continue" : "Next →"}
          </button>
        </div>
      </form>
    </section>
  );
}
