import React, { FC } from 'react'
import ReactDom from 'react-dom'

import './modal.css'

import { ModalProps } from '../types'

const Modal: FC<ModalProps> = ({ shouldDisplay }) => {
  return shouldDisplay ? ReactDom.createPortal(
    (
      <section className='modal'>
        <header className='modal-header'>
          <h1>About This Project</h1>
        </header>
        <div className='modal-body'>
          <p>
            This is a learning project meant to be both a practical application of Python/ Flask and as a learning project for <a href='https://d3js.org/' target='_blank' rel="noopener noreferrer">D3.js</a> for data visualization.
          </p>
          <p>
            The data for this project comes from <a href='https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/uvpi-gqnh' target='_blank' rel="noopener noreferrer">NYC Open Data's Tree Census</a>. Granted just showing tree census data on it's own isn't exactly very exciting, but this is a start and there's plenty of ways to play with the data.
          </p>
          <p>Here's the repository for the <a href='https://github.com/wilsonj806/nyc-arbor-logger' target='_blank' rel='noopener noreferrer'>React app</a></p>
          <p>Here's the repository for the <a href='https://github.com/wilsonj806/nyc-tree-data-fetcher' target='_blank' rel='noopener noreferrer'>Python/ Flask app</a></p>
        </div>
      </section>
    ),
    document.getElementById('portal') as Element
  ) : null
}

export default Modal