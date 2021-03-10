import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpStart } from './../../Redux/User/user.actions';

import './styles.scss';
import Typography from '@material-ui/core/Typography';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

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
           <div class="container">
             <div class="wrap">
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
                      <div class="grouped">
                       <FormInput
                          label={<PersonIcon/>}
                          type="text"
                          name="displayName"
                          value={displayName}
                          placeholder="Full Name"
                          handleChange = {e => setdisplayName(e.target.value)}
                          required
                       />
                
                        <FormInput
                          label={<EmailIcon/>}
                          type="email"
                          name="email"
                          value={email}
                          placeholder="Email"
                          handleChange = {e => setEmail(e.target.value)}
                          required
                       />
         
                       <FormInput
                          label={<LockIcon/>}
                          type="password"
                          name="password"
                          value={password}
                          placeholder="Password"
                          handleChange = {e => setPassword(e.target.value)}
                          title="Password should be at least 6 characters long"
                          required
                       /> 
                        
                        <FormInput
                          label={<LockIcon/>}
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          placeholder="Confirm Password"
                          handleChange = {e => setConfirmPassword(e.target.value)}
                       />

                       <Button type="submit">
                          <Typography variant="h6" align="center" display="block">
                                Register
                          </Typography>
                       </Button>
                       </div>
                    </form>
                    </div>
             </div>
           </div>
        );
    }


export default Signup;
