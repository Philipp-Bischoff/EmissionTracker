import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import styled from 'styled-components'

const ArrowDiv = styled.div`
  transform: rotate(${props => props.percentage + 'deg'});
`

function Arrow ({ angleArrow }) {
  return (
    <ArrowDiv percentage={angleArrow}>
      {angleArrow ? <BsArrowRight /> : '?'}
    </ArrowDiv>
  )
}

export default Arrow
