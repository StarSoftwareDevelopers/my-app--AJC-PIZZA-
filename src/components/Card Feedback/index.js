import React from "react";
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chicken from './../../assets/chickenpizza.jpg';
import Typography from '@material-ui/core/Typography';
import './style.scss';

const useStyles = makeStyles({
    root: {
        textSizeAdjust: 9,
      minWidth: 250,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.9)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    GridContainer: {
      padding: '5px'
    },    
  });


export default function CardFeedback() {
    const classes = useStyles();

    return (
      <Card style={{
          padding: '2rem',
          marginTop: '.2rem',
          marginBottom: '10rem',
          marginRight: '.1rem'
      }}>
          Feedback
        <Grid container spacing={4} className={classes.GridContainer}>
        <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Aelin Galanythius
                </Typography>
                <Typography variant="h6" component="h6">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                </CardContent>
            </Card>
      </Grid>

      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Jerry Quint
                </Typography>
                <Typography variant="h6" component="h6">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                
                
                </CardContent>
            </Card>
      </Grid>

      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Josh Karens
                </Typography>
                <Typography variant="h6" component="h6">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                </CardContent>
            </Card>
      </Grid>
        
      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Crystal Corine
                </Typography>
                <Typography variant="h6" component="h2">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                </CardContent>      
            </Card>
      </Grid>

      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Justine Smith
                </Typography>
                <Typography variant="h6" component="h2">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                </CardContent>      
            </Card>
      </Grid>

      <Grid item xs ={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Jennifer Quart
                </Typography>
                <Typography variant="h6" component="h2">
                    The best pizza I ever tasted
                    in my whole life. 
                    I would recommend you to 
                    purchase AJC's very own 
                    pizzas. 
                </Typography>
                </CardContent>      
            </Card>
      </Grid>

      
      
      </Grid>
        
      </Card>
    );
 
  }

  /*<div className="imege">
  <img src={Chicken} alt="Chicken Pizza" width="200" height="150" />
  </div>*/