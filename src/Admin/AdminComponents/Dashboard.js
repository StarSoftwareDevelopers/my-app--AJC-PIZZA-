import * as React from "react";
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';


import { green, red, orange } from '@material-ui/core/colors';

import {Link} from 'react-router-dom'; 


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    GridContainer: {
      padding: '10px'
    },
    
  });


export default function Dashboard() {
    const classes = useStyles();  
    return (
      <Card style={{
          padding: '.5rem',
          marginRight: '1.5rem'
      }}>
        <Grid container spacing={4} className={classes.GridContainer}>
        <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                <PeopleIcon style={{ color: green[500]}}/>  Total Users
                </Typography>
                <Typography variant="h4" component="h2">
                    150
                </Typography>
                </CardContent>
                <CardActions>
                <Link to="/Orders">
                    <Button size="medium">
                        <Typography variant="h6" component="h2" >
                            View All
                        </Typography>
                    </Button>
                </Link>
                </CardActions>      
            </Card>
      </Grid>
        
      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                <ShoppingCartIcon style={{ color: red[500]}}/> Pending Orders
                </Typography>
                <Typography variant="h4" component="h2">
                    4
                </Typography>
                </CardContent>
                <CardActions>
                <Link to="/Orders">
                    <Button size="medium"> 
                        <Typography variant="h6" component="h2" >
                            View All
                        </Typography></Button>
                </Link>
                </CardActions>      
            </Card>
      </Grid>
      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                <LocalShippingIcon style={{ color: orange[500]}}/>  Deliveries
                </Typography>
                <Typography variant="h4" component="h2" >
                    2
                </Typography>
                </CardContent>
                <CardActions>
                <Link to="/Orders">
                    <Button size="medium"> 
                        <Typography variant="h6" component="h2" >
                            View All
                        </Typography></Button>
                </Link>
                </CardActions>      
            </Card>
      </Grid>
      </Grid>
        
      </Card>
    );
 
  }
