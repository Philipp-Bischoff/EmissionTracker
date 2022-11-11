import { useState } from 'react'
import React from 'react'
import Menu from './components/Sidebar/Menu.jsx'
import Interface from './components/Interface/Interface.jsx'
import { EmissionOptions } from './assets/EmissionOptions.jsx'

function App () {
  const [selectedCountry, setSelectedCountry] = useState('DE')
  const [selectedEmission, setSelectedEmission] = useState(EmissionOptions[0])
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div className='main'>
        <Menu
          isLoading={isLoading}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedEmission={selectedEmission}
          setSelectedEmission={setSelectedEmission}
          EmissionOptions={EmissionOptions}
        />
        <Interface
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedCountry={selectedCountry}
          selectedEmission={selectedEmission}
        />
      </div>
    </>
  )
}

export default App
