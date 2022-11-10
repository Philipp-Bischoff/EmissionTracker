import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { FlyToInterpolator } from 'deck.gl'
import { HexagonLayer } from '@deck.gl/aggregation-layers'

function EmissionMap ({ geoData, lati, long }) {
  const [INITIAL_VIEW_STATE, setINITIAL_VIEW_STATE] = useState({
    longitude: long,
    latitude: lati,
    zoom: 3,
    pitch: 10
  })

  useEffect(() => {
    setINITIAL_VIEW_STATE({
      longitude: long,
      latitude: lati,
      zoom: 3,
      pitch: 10,
      bearing: 0,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator()
    })
  }, [lati, long])

  return (
    <>
      <DeckGL
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        /*mapboxAccessToken={
          'pk.eyJ1IjoidmluY2VudHZlZ2E5NSIsImEiOiJjbDd2enI4OGQwODB0M3d1YnhnZXB1ZjUzIn0.UX-Z9XdNuo0RRSOxfwjZlA'
        }*/
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        layers={[
          new HexagonLayer({
            extruded: true,
            radius: 30000,
            data: geoData,
            dataTransform: d => d.features,
            elevationScale: 300,
            getColorValue: points =>
              points.reduce((sum, point) => sum + point.properties.value, 0) /
              points.length,
            getElevationValue: points =>
              points.reduce((sum, point) => sum + point.properties.value, 0) /
              points.length,
            getPosition: d => d.geometry.coordinates
          })
        ]}
      >
        {
          <ReactMapGL
            mapboxAccessToken={
              'pk.eyJ1IjoidmluY2VudHZlZ2E5NSIsImEiOiJjbDd2enI4OGQwODB0M3d1YnhnZXB1ZjUzIn0.UX-Z9XdNuo0RRSOxfwjZlA'
            }
            mapStyle='mapbox://styles/mapbox/dark-v9'
            onViewportChange={viewport => {
              setINITIAL_VIEW_STATE(viewport)
            }}
          />
        }
      </DeckGL>
    </>
  )
}

export default EmissionMap
