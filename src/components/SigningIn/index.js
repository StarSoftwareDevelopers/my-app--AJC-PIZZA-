import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { emailSignInStart, googleSignInStart, facebookSignInStart } from './../../Redux/User/user.actions';

import './style.scss';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from './../Forms/Button';

import TextField from '@material-ui/core/TextField';

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
                             fullWidth variant="outlined"     
                             onChange={ e => setEmail(e.target.value)}
                            />
                                <br></br>
                            
                                <TextField margin="dense"
                            type="password" label= "Password" 
                             fullWidth variant="outlined"     
                             onChange={ e => setPassword(e.target.value)}
                            />
                            
                                <Link to="/recovery">
                                        <Typography align="center" variant="subtitle1" display="block">
                                            Forgot Password?
                                        </Typography>
                                    </Link>
                             
                           
                                <br></br>
                                <Button type="submit">
                                    <Typography variant="h6" align="center" display="block">
                                        {/* This styling could be enhanced in Button - styles.scss */}
                                        Log In
                                    </Typography>
                                </Button>
                           
                                    <div className="socialSignin">
                                        <div className="row">
                                        <Divider/> 
                                        <Typography variant="subtitle2" align="center" display="block">
                                                   or
                                        </Typography>

                                            {/* Put a google Icon after the <Button> */}
                                            <Button onClick={handleGoogleSignIn} style={{backgroundColor: '#EA4335'}}>
                                                <Typography variant="h6" align="center" display="block">
                                                    <FaGoogle style={{
                                                        display: 'inline-block',
                                                        marginRight: '1rem',
                                                        fontSize: 'large'
                                                        }}
                                                    />
                                                    Continue With Google
                                                </Typography>
                                            </Button>
                        
                                            <Button onClick={handleFacebookSignIn} style={{backgroundColor: '#3b5998'}}>
                                                <Typography variant="h6" align="center" display="block">
                                                    <FaFacebook style={{
                                                        display: 'inline-block',
                                                        marginRight: '1rem',
                                                        fontSize: 'large'
                                                        }}/>
                                                    Continue With Facebook
                                                </Typography>
                                            </Button>

                                                           
                                            <Link to="/registration">
                                                <Button>
                                                    <Typography variant="h6" align="center" display="block" >
                                                        <FaMailBulk style={{
                                                        display: 'inline-block',
                                                        marginRight: '1rem',
                                                        fontSize: 'large'
                                                        }}/>
                                                        Register with Email
                                                    </Typography>
                                                </Button>
                                            </Link>
                                    
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