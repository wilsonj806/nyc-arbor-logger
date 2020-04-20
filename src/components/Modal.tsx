import React, { FC } from 'react'
import ReactDom from 'react-dom'

import './modal.css'

import { ModalProps } from '../types'

const Modal: FC<ModalProps> = ({ shouldDisplay }) => {
  return shouldDisplay ? ReactDom.createPortal(
    (
      <div className='modal'>
        <h1>About This Project</h1>
      </div>
    ),
    document.getElementById('portal') as Element
  ) : null
}

export default Modal