import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { firestore} from './../../firebase/firebase.utils';
import {Link} from 'react-router-dom'; 

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useStyles = makeStyles({
    root: {
      maxWidth: 800,
      backgroundColor: 'whitesmoke',
      boxShadow: 'black',
      display: 'center'  
    },
   Grid: {
    justify: 'center'
    
   }
  });

const MyAccount = () => {
    const { currentUser } = useSelector(mapState);
    const classes = useStyles();
    const [address, setAddress] = useState('');

    // add field for address //
    const addAddress = (e) =>{
        const userRef = firestore.collection('users').doc(currentUser.id);
        e.preventDefault();
        const res =  userRef.set({
               address
               }, { merge : true});
               console.log('added');
    }


    return (
        <div>
            <br></br>
            
           <Container>
               <div className="container">
                    <Typography variant="h4" align="center" style={{
                        marginBottom: '1.5rem'
                    }}>
                        My Account
                        <Tooltip title={<h4 style={{ color: "#fff" }}>Edit</h4>}>
                            <IconButton aria-label="delete">
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    
                    <div className="profileData">
                        <Typography variant="h5" style={{
                        
                        }}>
                            Name {currentUser.displayName}
                        </Typography>                   
                        
                        <h4>Email: {currentUser.email}</h4>
                        <h4>Joined at: {currentUser.createdDate.toDate().toString()}</h4>
                        <h4>Address: {currentUser.address}</h4>
                        
                        <form onSubmit={addAddress}>
                            <input type="text" placeholder="enter address" 
                                onChange={e => setAddress(e.target.value)}
                            />
                            <button type="submit">
                                Add
                            </button>
                            
                        </form>
                   </div>
                   </div>
            </Container>
            <br></br>
        </div>

    );
}

export default MyAccount;