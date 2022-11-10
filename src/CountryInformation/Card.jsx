import React from 'react'
import './Card.css'

/*This is a generic card component that displays statistical values*/
function Card (props) {
  return (
    <div className='info-card'>
      <div className='info-card-item'>
        {' '}
        <div style={{ width: '100%', padding: '50%' }}>{props.icon}</div>
      </div>
      <div className='info-card-text'>
        {!props.isLoading ? (
          <h2>{props.percentage}</h2>
        ) : (
          <div className='placeholder-div'></div>
        )}
        <p>{props.text}</p>
      </div>
    </div>
  )
}

export default Card
