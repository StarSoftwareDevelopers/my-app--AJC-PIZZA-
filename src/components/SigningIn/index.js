import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { emailSignInStart, googleSignInStart, facebookSignInStart } from './../../Redux/User/user.actions';

import './style.scss';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';

import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import {
    FaFacebook,
    FaGoogle
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
            <div class="container">
                <div class="wrap">
                <h2>Log in</h2>
                        <div className="formWrap">
                            <form onSubmit={handleSubmit}>
                              <div className="grouped"> 
                              <label for="email" class="email"><EmailIcon/></label>
                                <FormInput  
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    handleChange = {e => setEmail(e.target.value)}
                                />

                                <label for="email" class="email"><LockIcon/></label>
                                <FormInput  
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    handleChange = {e => setPassword(e.target.value)}
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
                                            <Button onClick={handleGoogleSignIn}>
                                                <Typography variant="h6" align="center" display="block">
                                                    <FaGoogle style={{
                                                        display: 'inline-block',
                                                        marginRight: '1rem',
                                                        fontSize: 'large'
                                                        }}
                                                    />
                                                    Sign In With Google
                                                </Typography>
                                            </Button>
                        
                                            <Button onClick={handleFacebookSignIn} style={{backgroundColor: '#3b5998'}}>
                                                <Typography variant="h6" align="center" display="block">
                                                    <FaFacebook style={{
                                                        display: 'inline-block',
                                                        marginRight: '1rem',
                                                        fontSize: 'large'
                                                        }}/>
                                                    Sign In With Facebook
                                                </Typography>
                                            </Button>
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