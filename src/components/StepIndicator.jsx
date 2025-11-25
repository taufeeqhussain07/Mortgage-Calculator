export default function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`step ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  )
}
