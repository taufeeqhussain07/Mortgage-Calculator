import { useState } from 'react'
import Header from './components/Header'
import MortgageForm from './components/MortgageForm'
import ResultPage from './components/ResultPage'
import Footer from './components/Footer'
import './styles/layout.css'

function App() {
  const [results, setResults] = useState(null)

  const handleCalculate = (mortgageData) => {
    setResults(mortgageData)
  }

  return (
    <div className="app">
      <Header />
      {!results ? (
        <MortgageForm onCalculate={handleCalculate} />
      ) : (
        <ResultPage results={results} onReset={() => setResults(null)} />
      )}
      <Footer />
    </div>
  )
}

export default App
