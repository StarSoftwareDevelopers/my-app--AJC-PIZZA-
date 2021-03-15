import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { emailSignInStart, googleSignInStart, facebookSignInStart } from './../../Redux/User/user.actions';

import './style.scss';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from './../Forms/Button';

import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import {
    FaFacebook,
    FaGoogle,
    FaMailBulk
} from 'react-icons/fa';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
}); //to get from the redux store 

const SigninIn = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ errors,setErrors] = useState([]);

    useEffect(() => {
        //whenever signinsuccess is true
        if (currentUser) {
            resetForm();
            history.push('/');
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser]); 

    const resetForm = () =>{
        setEmail('');
        setPassword('');
        setErrors([]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));   
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }

    const handleFacebookSignIn = () => {
        dispatch(facebookSignInStart());
    }

        return (
            <div className="container">
                <div className="wrap">
                <h2>Log in</h2>
                        <div className="formWrap">
                            <form onSubmit={handleSubmit}>
                              <div className="grouped"> 
                                 
                            <TextField autoFocus margin="dense"
                            type="email" label= "Email" 
                             fullWidth variant="outlined" required
                             onChange={ e => setEmail(e.target.value)}
                            />
                                <br></br>
                            
                                <TextField margin="dense"
                            type="password" label= "Password" 
                             fullWidth variant="outlined" helperText="Password must be more than 6 characters long"    
                             onChange={ e => setPassword(e.target.value)}
                            />
                            
                                <Link to="/recovery">
                                        <Typography align="center" variant="subtitle1" display="block">
                                            Forgot Password?
                                        </Typography>
                                    </Link>
                             
                           
                                <br></br>
                                <Button type="submit" className="btn">
                                    <Typography variant="h6" align="center" display="block">
                                        Log In
                                    </Typography>
                                </Button>
                               
                                  <br></br>                  
                                <Divider/> 
                                        <Typography variant="subtitle2" align="center" display="block">
                                                   Or Continue with 
                                        </Typography>

                                   
                                    <div className="socialSignin">
                                        <div className="row">
                                        <Tooltip title="Continue with Google">
                                            <IconButton onClick={handleGoogleSignIn} aria-label="googleSignIn" >
                                                <FaGoogle style={{
                                                    color: '#EA4335',
                                                    fontSize: '30px'
                                                    
                                                }}/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Continue with Facebook">      
                                            <IconButton onClick={handleFacebookSignIn} aria-label="fbSignIn">
                                                <FaFacebook style={{
                                                    color: '#3b5998',
                                                    fontSize: '30px'
                                                }}/>
                                            </IconButton>
                                        </Tooltip>  

                                        <Tooltip title="Register with email">
                                          <Link to="/registration">
                                              <IconButton aria-label="mailRegister">
                                                  <FaMailBulk style={{
                                                      color: '#e31837',
                                                      fontSize: '30px'
                                                  }}/>
                                              </IconButton>
                                          </Link>
                                        </Tooltip>        
                                        </div>
                                    </div>
                                </div>     
                            </form>
                        </div>
                </div>
           </div>
        );
    }

export default SigninIn;