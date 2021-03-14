import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { firestore} from './../../firebase/firebase.utils';
import {Link} from 'react-router-dom'; 

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
            <Grid item xs={9}>
                <Card  className={classes.root} variant="outlined">

                            <Link to="/cart">
                                <Button variant="outlined" color="primary">
                                    Edit Profile 
                                </Button>
                            </Link>
                
                    <Typography variant="h4" align="center" style={{
                        margin: '1rem',
                        padding: '1rem' 
                    }}>
                        My Account
                    </Typography>
                    <Typography variant="h5" style={{
                    
                    }}>
                        Name: {currentUser.displayName}
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
                </Card>
            </Grid>
            <br></br>
        </div>

    );
}

export default MyAccount;