import React from 'react'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Calender ({ changeStartDate, changeEndDate }) {
  const [startDate, setStartDate] = useState(new Date('2019/02/01'))
  const [endDate, setEndDate] = useState(new Date('2019/03/01'))
  const [validDates, setValidDates] = useState(null)

  /*Function that takes in a Date-Object and returns a date that works with the
  API*/
  const CalenderToAPI = time => {
    let year = time.getFullYear()
    let month = parseInt(time.getMonth()) + 1
    let day = time.getDate()
    /*Because months start at 0, thanks JS*/
    return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)
  }

  /*Runs on mount and fetches valid dates*/
  useEffect(() => {
    fetch(
      'https://api.v2.emissions-api.org/api/v2/carbonmonoxide/data-range.json'
    )
      .then(response => response.json())
      //.then(data => console.log('Valid dates:' + JSON.stringify(data)))
      .then(setValidDates)
  }, [])

  useEffect(() => {
    let newStart = CalenderToAPI(startDate)
    changeStartDate(newStart)
  }, [startDate])

  useEffect(() => {
    let newEnd = CalenderToAPI(endDate)
    changeEndDate(newEnd)
  }, [endDate])

  return (
    <div className='datepicker'>
      <DatePicker
        wrapperClassName='datePicker'
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        wrapperClassName='datePicker'
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  )
}

export default Calender
