import React from 'react'
import { useEffect, useState } from 'react'
import countryCodes from './country-codes.json'
import SateliteGif from './Spinner.gif'
import InfoComponent from '../CountryInformation/InfoComponent'
import MapComponent from '../Map/MapComponent'
import GraphComponent from '../Graph/GraphComponent'
import FilterGroup from '../FilterBar/FilterGroup'
import './Interface.css'

/*Get todays date or go back n months in API format (DD-MM-YY)*/
const CalenderToAPI = (date, n) => {
  let year = date.getFullYear()
  let month = parseInt(date.getMonth()) + 1 - n
  let day = date.getDate()
  return year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const integerIntoMonth = i => {
  return months[i - 1]
}

function Interface (props) {
  const [timeFrame, setTimeFrame] = useState(1)
  const [maxTick, setMaxTick] = useState(32)
  const [values, setValues] = useState([])
  const [labels, setLabels] = useState([])
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [begin, setBegin] = useState(CalenderToAPI(new Date(), 1))
  const [end, setEnd] = useState(CalenderToAPI(new Date(), 0))
  const [geoData, setGeoData] = useState()
  const [countryInformation, setCountryInformation] = useState({})

  useEffect(() => {
    console.log('Begin' + begin)
    console.log('End' + end)
  }, [])

  useEffect(() => {
    console.log('emission+' + props.selectedEmission.name)
  })

  /*fetches the country coordinates (for the map), the average emission data 
  and GeoJSON emission data when either the country, the emission, or the time frame is changed*/
  useEffect(() => {
    getCountryCoordinates(props.selectedCountry)
    fetchEmissionData(
      props.selectedEmission.name,
      props.selectedCountry,
      begin,
      end
    )
    fetchGeoData(props.selectedCountry, props.selectedEmission.name)
  }, [props.selectedCountry, props.selectedEmission, begin, end])

  /*Returns an object containing the full name of the country, its longitude and latitude*/
  const getCountryCoordinates = chosenCountry => {
    countryCodes.filter(country => {
      if ((country.alpha2 || country.alpha3) === chosenCountry) {
        setLat(country.latitude)
        setLon(country.longitude)
        setCountryInformation({
          ...countryInformation,
          name: country.country,
          longitude: country.longitude,
          latitude: country.latitude
        })
      }
    })
  }

  const fetchEmissionData = (emission, country, begin, end) => {
    const requestURL =
      'https://api.v2.emissions-api.org/api/v2/' +
      String(emission).toLowerCase() +
      '/average.json' +
      '?country=' +
      country +
      '&begin=' +
      begin +
      '&end=' +
      end

    fetch(requestURL)
      .then(response => response.json())
      .then(data => {
        let values_list = data.map(x => x.average)
        setValues(values_list)
        let labels_list = data.map(x => ({
          day: x.start.substring(8, 10),
          month: integerIntoMonth(x.start.substring(5, 7))
        }))
        setLabels(labels_list)
      })
  }

  const fetchGeoData = (country, emission) => {
    const URL =
      'https://api.v2.emissions-api.org/api/v2/' +
      String(emission).toLowerCase() +
      '/geo.json' +
      '?country=' +
      country +
      '&begin=' +
      begin +
      '&end=' +
      end
    fetch(URL)
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => {
        window.alert(error.message)
      })
  }

  /*This function calculates the beginning and end of the 
  last 1 Month, 6 Months or 12 Months*/
  const calculatedateFrame = dateFrame => {
    const current = new Date()
    /*Go back 12 months*/
    if (dateFrame == 12) {
      current.setFullYear(current.getFullYear() - 1)
      const previousDate = current.toISOString().slice(0, 10)
      setBegin(previousDate)
    } else {
      /*Get back either 1 or 6 months*/
      current.setMonth(current.getMonth() - dateFrame)
      const previousDate = current.toISOString().slice(0, 10)
      setBegin(previousDate)
    }
  }

  return (
    <div className='interface'>
      {geoData && props.selectedCountry && props.selectedEmission ? (
        <>
          <FilterGroup
            calculatedateFrame={calculatedateFrame}
            setTimeFrame={setTimeFrame}
            setMaxTick={setMaxTick}
          />
          <MapComponent geoData={geoData} lat={lat} lon={lon} />
          <GraphComponent
            setBegin={setBegin}
            setEnd={setEnd}
            values={values}
            labels={
              timeFrame == 1 ? labels.map(a => a.day) : labels.map(a => a.month)
            }
            country={props.selectedCountry}
            description={props.selectedEmission.description}
            maxTick={maxTick}
          ></GraphComponent>
          <InfoComponent
            selectedEmission={props.selectedEmission}
            countryInformation={countryInformation}
            selectedCountry={props.selectedCountry}
            end={end}
          />
        </>
      ) : (
        <div className='spinner-div'>
          <img src={SateliteGif} alt='Loading..'></img>
        </div>
      )}
    </div>
  )
}

export default Interface
