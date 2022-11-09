import { useEffect, useState } from 'react'
import React from 'react'
import Menu from './Sidebar/Menu.jsx'
import Interface from './Interface/Interface.jsx'
import { EmissionOptions } from './EmissionOptions.jsx'

function App () {
  /*This should keep the state of country and emission type*/
  const [selectedCountry, setSelectedCountry] = useState('DE')
  const [selectedEmission, setSelectedEmission] = useState(EmissionOptions[0])

  return (
    <>
      <div className='main'>
        <Menu
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          selectedEmission={selectedEmission}
          setSelectedEmission={setSelectedEmission}
          EmissionOptions={EmissionOptions}
        />
        <Interface
          selectedCountry={selectedCountry}
          selectedEmission={selectedEmission}
        />
      </div>
    </>
  )
}

export default App
