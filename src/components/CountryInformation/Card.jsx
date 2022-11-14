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
      {!props.isLoading ? (
        <div className='info-card-text'>
          <h2>{props.percentage}</h2>
          <p>{props.text}</p>
        </div>
      ) : (
        <div className='placeholder-div'></div>
      )}
    </div>
  )
}

export default Card
