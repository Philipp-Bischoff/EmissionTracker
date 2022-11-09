import React from 'react'
import Emissionsmap from './EmissionsMap'
import './MapComponent.css'

function MapComponent (props) {
  return (
    <div className='map-container'>
      {props.geoData ? (
        <Emissionsmap
          geoData={props.geoData}
          lati={props.lat}
          long={props.lon}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default MapComponent
