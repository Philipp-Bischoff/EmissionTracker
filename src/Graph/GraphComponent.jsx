import React from 'react'
import VerticalBar from './VerticalBar'
import SateliteGif from '../assets/Spinner_white.gif'

function GraphComponent (props) {
  return (
    <div className='graph-container'>
      {!props.isLoading ? (
        <VerticalBar
          className='vertical-bar'
          values={props.values}
          labels={props.labels}
          country={props.selectedCountry}
          maxTick={props.maxTick}
        />
      ) : (
        <div className='spinner-div'>
          <img src={SateliteGif} alt='Loading..'></img>
        </div>
      )}
    </div>
  )
}

export default GraphComponent
