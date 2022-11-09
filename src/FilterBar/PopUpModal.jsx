import React from 'react'
import Popup from 'reactjs-popup'
import { AnimatePresence, motion } from 'framer-motion'
import './PopUpModal.css'
import { AiFillGithub } from 'react-icons/ai'
import { GrCircleInformation } from 'react-icons/gr'

const contentStyle = {
  maxWidth: '600px',
  width: '90%'
}

function PopUpModal () {
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <motion.div
        className='question-div'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Popup
          trigger={
            <button className='button'>
              {' '}
              <GrCircleInformation></GrCircleInformation>
            </button>
          }
          modal
          contentStyle={contentStyle}
        >
          {close => (
            <div className='modal'>
              <a className='close' onClick={close}>
                &times;
              </a>
              <div className='header'> About this Project </div>
              <div className='content'>
                {' '}
                This project aims to visualise emission data retrieved by an API
                maintained in collaboration with the European Space Agency
                (ESA). The underlying data stems from the Sentinel-5 Earth
                observation satellite. It uses spectrophotometry to estimate the
                concentration of four different emissions: carbonmonoxide,
                methane, ozone and nitrogendioxide. Due to the way the data is
                measured, the visualised data might be incomplete for certain
                areas and for certain time intervals.
                <br />
                <br />
                More information about data collection and usages can be found
                on the{' '}
                <a href='https://emissions-api.org/'>Website of the API</a>
                <br />
                <br />I started this project to get a better understanding of
                the entire FrontEnd Stack and to have a learning process
                combined with a thematic area I personally am interested in. The
                Dashboard is made with React.js, the map itself is supplied by
                MapBox, the overlay of the map runs on DeckGL, the Graph is
                visualized through Graph.js and some of the functional buttons
                are styled with styled-components.
                <br />
                <br />I personally would have liked to make the app responsive
                on multiple sizes and devices, but I had to avoid falling into
                the "it's not done yet"-pitfall and eventually decided, that
                besiedes all it's possible improvements, I will finish it, once
                I get to all the functionality that I originally set out to
                implement.
              </div>
              <div className='actions'>
                <button
                  className='button'
                  onClick={() => {
                    console.log('modal closed ')
                    openInNewTab('https://github.com/Philipp-Bischoff')
                  }}
                >
                  <AiFillGithub /> To this project's Github
                </button>
              </div>
            </div>
          )}
        </Popup>
      </motion.div>
    </AnimatePresence>
  )
}

export default PopUpModal
