import React, { useState, useEffect } from 'react'
import HoroscopeInfo from './components/HoroscopeInfo'
import HoroscopeForm from './components/HoroscopeForm'
import { getHoroscope } from './components/HoroscopeApi'
import './index.css'
import { HoroscopeData } from './../models/horoscope'

const App: React.FC = () => {
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [sign, setSign] = useState<string>('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    const loadHoroscopeData = async () => {
      if (!sign) return

      setLoading(true)
      setError(null)
      try {
        const data = await getHoroscope(sign)
        setHoroscopeData(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    }

    loadHoroscopeData()
  }, [sign])

  const handleFormSubmit = (zodiacSign: string, fullName: string) => {
    setSign(zodiacSign)
    setName(fullName)
  }

  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="App">
      <h1>Horoscope App</h1>
      <HoroscopeForm onSubmit={handleFormSubmit} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {horoscopeData && (
        <div className="horoscope-result">
          <p>Date: {currentDate}</p>
          <p>Mr/Ms {name},</p>
          <HoroscopeInfo horoscopeData={horoscopeData} />
        </div>
      )}
    </div>
  )
}

export default App
