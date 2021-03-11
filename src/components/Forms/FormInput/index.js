import React from 'react';
import TextField from '@material-ui/core/TextField';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return ( 
        <div className="formRow">

            <TextField
            autoFocus
            margin="dense"
            label={label}
            fullWidth 
            variant="outlined"
            onChange={handleChange}
            {...otherProps}
          />
            {/* <input className="formInput" onChange={handleChange} {...otherProps}/> */}
        </div>
     );
}
 
export default FormInput;