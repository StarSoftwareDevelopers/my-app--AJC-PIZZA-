import React from 'react';
// import TextField from '@material-ui/core/TextField';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    return ( 
        <div className="formRow">
            {label && (
                <label {...otherProps}>
                    {label}
                </label>
            )}
            {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label={"Email Address"}
            type="email"
            fullWidth
          /> */}
            <input className="formInput" onChange={handleChange} {...otherProps}/>
        </div>
     );
}
 
export default FormInput;