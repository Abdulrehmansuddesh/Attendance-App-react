import { WidthFull } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React from 'react'

const InputFields = ({label = "outlined" ,type = "text" ,onChange ,value ,...props}) => {
  return (
    <TextField id="outlined-basic"
     label={label} sx={{width:"100%"}}
      variant="outlined" type={type} 
       onChange={onChange} 
       value={value} 
       {...props}/>
  ) 
}

export default InputFields