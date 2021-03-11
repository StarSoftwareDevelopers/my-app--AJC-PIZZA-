import React from 'react';
import { useSelector } from 'react-redux';
// import { firestore} from './../../firebase/firebase.utils';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

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

    // const userRef = firestore.collection('users').doc(currentUser.uid);

    // async function addAddress() {
    //    const res = await userRef.set({
    //        'Address' : 'Ayala'
    //    }, { merge : true});
    // }

   
    return (
        <div>
            <br></br>
            <Grid item xs={9}>
                <Card  className={classes.root} variant="outlined">
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
                    
                    
                </Card>
            </Grid>
            <br></br>
        </div>

    );
}

export default MyAccount;