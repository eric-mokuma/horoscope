import React, { useState } from 'react'
import { getZodiacSign } from './HoroscopeForm'

interface BirthDateFormProps {
  onSubmit: (zodiacSign: string) => void
  setError: (error: string | null) => void
}

export default function BirthDateForm({
  onSubmit,
  setError,
}: BirthDateFormProps) {
  const [month, setMonth] = useState<string>('')
  const [day, setDay] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const monthNumber = parseInt(month)
    const dayNumber = parseInt(day)

    if (
      isNaN(monthNumber) ||
      isNaN(dayNumber) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      dayNumber < 1 ||
      dayNumber > 31
    ) {
      setError('Please enter a valid month and day.')
      return
    }

    const zodiacSign = getZodiacSign(monthNumber, dayNumber)
    onSubmit(zodiacSign)
  }

  return (
    <>
      <label>
        Month of Birth:
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </label>
      <label>
        Day of Birth:
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </label>
      <button onClick={handleSubmit}>Get Horoscope</button>
    </>
  )
}
