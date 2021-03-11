import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpStart } from './../../Redux/User/user.actions';

import './styles.scss';
import Typography from '@material-ui/core/Typography';


import Button from './../Forms/Button';
import TextField from '@material-ui/core/TextField';


const mapState = ({ user }) => ({
  currentUser : user.currentUser,
  errorUser: user.errorUser
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, errorUser } = useSelector(mapState);
  const [displayName, setdisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect (() => {
    if (currentUser) {
      reset();
      history.push('/');
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentUser]);

  useEffect (() => {
    if (Array.isArray(errorUser) && errorUser.length > 0) {
      setErrors(errorUser);
    }
    
  }, [errorUser]);

  const reset = () => {
    setdisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUpStart ({ displayName,email, password, confirmPassword })); 
   
  }

        return(
           <div className="container">
             <div className="wrap">
               <h2>Register</h2>
                  <div className="formWrap">
                    
                  {/* Render any errors */}
                  {errors.length > 0 && (
                     <Typography color="error" align="center">
                      {errors.map((err,index) => {
                        return(
                          <li key={index} style={{listStyleType: "none"}}>
                            {err}
                          </li>
                        )
                      })}
                    </Typography>
                  )}

                    <form onSubmit={handleSubmit}>

                        <TextField autoFocus margin="dense"
                            type="text" label= "Full Name" 
                             fullWidth variant="outlined"     
                             onChange={ e => setdisplayName(e.target.value)}
                            />

                        <TextField autoFocus margin="dense"
                            type="email" label= "Email" 
                             fullWidth variant="outlined"     
                             onChange={ e => setEmail(e.target.value)}
                            />

                         <TextField autoFocus margin="dense"
                            type="password" label= "Password" 
                             fullWidth variant="outlined"     
                             onChange={ e => setPassword(e.target.value)}
                            />

                          <TextField autoFocus margin="dense"
                            type="password" label= "Confirm Password" 
                             fullWidth variant="outlined"     
                             onChange={ e => setConfirmPassword(e.target.value)}
                            />
                      
                       <Button type="submit">
                          <Typography variant="h6" align="center" display="block">
                                Register
                          </Typography>
                       </Button>
                       
                    </form>
                    </div>
             </div>
           </div>
        );
    }


export default Signup;
