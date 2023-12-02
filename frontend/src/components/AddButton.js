import React from 'react'
import { Link } from 'react-router-dom'

import {ReactComponent as AddIcon} from "../assets/add.svg"


const AddButton = () => {
  return (
    <Link className='floating-button' to="/my_note/create" >
      <AddIcon/>
    </Link>
  )
}

export default AddButton
