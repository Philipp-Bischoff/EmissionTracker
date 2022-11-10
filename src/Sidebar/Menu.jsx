import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Satelite from './satelite.png'
import styled from 'styled-components'
import './Menu.css'
import Logo from './logo.png'

const MenuButton = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  gap: 20px;
  font-size: 15px;
  box-shadow: 10px 10px 19px 1px rgba(0, 0, 0, 0.25);
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  cursor: pointer;
  background-color: white;
  &:disabled {
    color: grey;
    opacity: 0;
    cursor: default;
  }
`

const MenuButtonGroup = styled.div`
  width: 100%;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
`

const MenuButtonToggle = styled(MenuButton)`
  opacity: 0.6;
  ${({ selectedEmission }) =>
    selectedEmission &&
    `opacity: 1;
    background-color: #F3F1EF;
    box-shadow: none;
    color: black;
    `}
`

function Menu (props) {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetchCountryList()
  }, [])

  const fetchCountryList = () => {
    fetch('https://api.v2.emissions-api.org/api/v2/countries.json')
      .then(response => response.json())
      .then(data => {
        setCountries(data)
      })
  }

  /*This function changes the chosen country, updates the state in it's parent and 
  fetches the updated data when the country is changed*/
  const handleCountryChange = e => {
    props.setSelectedCountry(e.target.value)
  }

  return (
    <section className='main-container'>
      <AnimatePresence>
        <motion.div
          className='sidebar'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='top-section'>
            <img className='logo' src={Logo}></img>
          </div>
          <div className='search'>
            <div className='search_icon'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </div>
            {countries && props.selectedCountry ? (
              <select
                value={props.selectedCountry}
                onChange={handleCountryChange}
              >
                {Object.entries(countries).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <h1>Not rendered</h1>
            )}
          </div>
          <div className='routes'>
            {props.EmissionOptions.map(button => {
              return (
                <div className='item'>
                  {!props.isLoading ? (
                    <MenuButtonGroup>
                      <MenuButtonToggle
                        key={button.name}
                        selectedEmission={
                          props.selectedEmission.name === button.name
                        }
                        onClick={() => {
                          props.setSelectedEmission(
                            props.EmissionOptions.find(
                              item => item.name === button.name
                            )
                          )
                        }}
                      >
                        {button.name}
                      </MenuButtonToggle>
                    </MenuButtonGroup>
                  ) : (
                    <div className='placeholder-div'></div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default Menu
