import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function () {
    return (
        <div>
            <form>
                <TextField id="standard-basic" label="Standard" value="displayName"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
