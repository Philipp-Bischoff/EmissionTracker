import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import PopUpModal from './PopUpModal'
import './FilterGroup.css'

const TimeButton = styled.button`
  height: 40px;
  color: black;
  font-size: 15px;
  border: none;
  background: none;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`

const TimeButtonToggle = styled(TimeButton)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
    border-bottom: 2px solid black;
    transition:all ease-in 140ms;
  `}
`

const TimeButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2%;
`

function FilterGroup (props) {
  const types = [
    { text: 'Last Year', value: 12, maxTick: 12 },
    { text: 'Last 6 Months', value: 6, maxTick: 6 },
    { text: 'Last Month', value: 1, maxTick: 32 }
  ]

  const handleClick = chosenButton => {
    setActive(chosenButton.text)
    props.calculatedateFrame(chosenButton.value)
    props.setTimeFrame(chosenButton.value)
    props.setMaxTick(chosenButton.maxTick)
  }

  const [active, setActive] = useState(types[2].text)

  return (
    <div className='filter-div'>
      <TimeButtonGroup>
        {types.map(type => (
          <TimeButtonToggle
            key={type.text}
            active={active === type.text}
            onClick={() => handleClick(type)}
          >
            {type.text}
          </TimeButtonToggle>
        ))}
      </TimeButtonGroup>
      <PopUpModal></PopUpModal>
    </div>
  )
}

export default FilterGroup
