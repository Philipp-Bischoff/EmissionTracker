import React, { useEffect, useState } from 'react'
import Card from './Card'
import CountrySizes from './countrySizes.json'
import Arrow from './Arrow.jsx'
import { FaWeightHanging } from 'react-icons/fa'
import { BsFillBarChartFill } from 'react-icons/bs'
import './InfoComponent.css'

function InfoComponent (props) {
  const [dataLastYear, setDataLastYear] = useState()
  const [dataLastYearUntilTodayDate, setDataLastYearUntilTodayDate] = useState()
  const [dataThisYearUntilTodayDate, setDataThisYearUntilTodayDate] = useState()
  const [percentageCompareYear, setPercentageCompareYear] = useState()
  const [percentageCompareToday, setPercentageCompareToday] = useState()
  const [tonneAmount, setTonneAmount] = useState()
  const [isLoading, setIsLoading] = useState(false)

  /*Fetches the data when the selected Country changed*/
  useEffect(() => {
    fetchDifference()
    setIsLoading(true)
  }, [props.selectedCountry])

  /*Calculates the difference once the data is 
  retrieved (I'm aware this is an awful way to do it)*/
  useEffect(() => {
    if (
      dataLastYear &&
      dataThisYearUntilTodayDate &&
      dataLastYearUntilTodayDate
    ) {
      calculateDifference()
    }
  }, [dataLastYear, dataThisYearUntilTodayDate, dataLastYearUntilTodayDate])

  /*Get todays date or go back n months and y years,
  returns API-complicit format (YY-MM-DD)*/
  const CalenderToAPI = (date, m, y) => {
    let year = parseInt(date.getFullYear()) - y
    let month = parseInt(date.getMonth()) + 1 - m
    let day = date.getDate()
    return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)
  }

  /*Fetching data from which the statistics are calculated*/
  const fetchDifference = () => {
    /*Get all of last year*/
    const today = new Date()
    const thisYear = new Date().getFullYear()
    const lastYear = today.getFullYear() - 1

    /*Fetch all of last year*/
    fetch(
      'https://api.v2.emissions-api.org/api/v2/' +
        String(props.selectedEmission.name).toLowerCase() +
        '/average.json?country=' +
        props.selectedCountry +
        '&begin=' +
        lastYear +
        '-01-01&end=' +
        lastYear +
        '-12-31'
    )
      .then(response => response.json())
      .then(data => {
        let values = data.map(x => x.average)
        setDataLastYear(values)
      })
      .catch(error => {
        console.log('Error' + error.message)
      })

    /*Fetch last year until todays' date*/
    fetch(
      'https://api.v2.emissions-api.org/api/v2/' +
        String(props.selectedEmission.name).toLowerCase() +
        '/average.json?country=' +
        props.selectedCountry +
        '&begin=' +
        lastYear +
        '-01-01&end=' +
        CalenderToAPI(today, 0, 1)
    )
      .then(response => response.json())
      .then(data => {
        let values = data.map(x => x.average)
        setDataLastYearUntilTodayDate(values)
      })
      .catch(error => {
        console.log('Error' + error.message)
      })

    /*Fetch this year until today*/
    fetch(
      'https://api.v2.emissions-api.org/api/v2/' +
        String(props.selectedEmission.name).toLowerCase() +
        '/average.json?country=' +
        props.selectedCountry +
        '&begin=' +
        thisYear +
        '-01-01&end=' +
        CalenderToAPI(today, 0, 0)
    )
      .then(response => response.json())
      .then(data => {
        let values = data.map(x => x.average)
        setDataThisYearUntilTodayDate(values)
      })
      .catch(error => {
        console.log('Error' + error.message)
      })
  }

  /*This function calculates how much has been emitted so far compared to last year,
  how much of last year's co2 "allowance" has already been reached and how many tonnes have been emitted*/
  const calculateDifference = () => {
    /*All of last year*/
    let storeAveragePast = 0
    /*All of this year until today's date*/
    let storeAveragePresent = 0
    /*All of last year until today's date*/
    let storeAveragePastUntilToday = 0

    dataLastYearUntilTodayDate.forEach(function (i, j) {
      storeAveragePastUntilToday += j
    })
    dataLastYear.forEach(function (i, j) {
      storeAveragePast += j
    })
    dataThisYearUntilTodayDate.forEach(function (i, j) {
      storeAveragePresent += j
    })

    setPercentageCompareYear(
      ((storeAveragePresent / storeAveragePast) * 100).toFixed(2)
    )

    setPercentageCompareToday(
      ((storeAveragePresent / storeAveragePastUntilToday) * 100).toFixed(2)
    )
    calulcateMolToTonne(storeAveragePresent, props.countryInformation.name)
    setIsLoading(false)
  }

  /*This function finds the selected countries size in sq km and multiplies the area
  by the emitted co2/sqm2, returns the amount in tonnes*/
  const calulcateMolToTonne = (amountMol, selectedCountry) => {
    CountrySizes.map(country => {
      if (country.Country.trimEnd() === selectedCountry) {
        const amountEmitted = Math.trunc(
          (amountMol * 44.0095 * country.Area) / 1000000
        )
        setTonneAmount(amountEmitted)
      }
    })
  }

  return (
    <div className='info-container'>
      <div className='info-country'>
        <h1>{props.countryInformation.name}</h1>
        <p style={{ lineHeight: '1.3' }}></p>
      </div>
      <div className='card-container'>
        <Card
          icon={<BsFillBarChartFill />}
          isLoading={isLoading}
          percentage={percentageCompareYear + '%'}
          text={"of last year's emissions"}
        ></Card>
        <Card
          icon={<Arrow angleArrow={100 - percentageCompareToday} />}
          isLoading={isLoading}
          percentage={percentageCompareToday + '%'}
          text={'compared to this date last year'}
        ></Card>
        <Card
          icon={<FaWeightHanging />}
          isLoading={isLoading}
          percentage={tonneAmount}
          text={'million tonnes CO2 emitted so far this year'}
        ></Card>
      </div>
    </div>
  )
}

export default InfoComponent
