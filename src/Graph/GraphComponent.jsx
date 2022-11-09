import React from 'react'
import VerticalBar from './VerticalBar'

function GraphComponent (props) {
  return (
    <div className='graph-container'>
      <VerticalBar
        className='vertical-bar'
        values={props.values}
        labels={props.labels}
        country={props.selectedCountry}
        maxTick={props.maxTick}
      />
    </div>
  )
}

export default GraphComponent
