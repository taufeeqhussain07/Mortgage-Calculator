import React, { useState } from "react";
import Header from "./components/Header";
import StepIndicator from "./components/StepIndicator";
import MortgageForm from "./components/MortgageForm";
import ResultPage from "./components/ResultPage";
import Footer from "./components/Footer";

export default function App() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    loanAmount: "",
    interestRate: "",
    loanTerm: ""
  });

  const handleNext = (values) => {
    setFormValues(prev => ({ ...prev, ...values }));
    setStep((s) => Math.min(3, s + 1));
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="app-container">
      <Header />
      <main className="main-content" role="main">
        <StepIndicator currentStep={step} />
        {step === 1 && (
          <MortgageForm defaultValues={formValues} onNext={handleNext} />
        )}
        {step === 2 && (
          <MortgageForm defaultValues={formValues} onNext={handleNext} onBack={handleBack} reviewMode />
        )}
        {step === 3 && (
          <ResultPage data={formValues} onBack={() => setStep(2)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
