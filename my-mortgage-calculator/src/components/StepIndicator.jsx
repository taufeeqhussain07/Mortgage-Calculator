import React from "react";

export default function StepIndicator({ currentStep = 1 }) {
  const steps = [
    { id: 1, label: "Your Details" },
    { id: 2, label: "Review" },
    { id: 3, label: "Results" }
  ];

  return (
    <div className="steps" aria-hidden="false">
      {steps.map(s => (
        <div key={s.id} className={`step ${currentStep === s.id ? "active" : ""}`}>
          <div className="step-index">{s.id}</div>
          <div className="step-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
