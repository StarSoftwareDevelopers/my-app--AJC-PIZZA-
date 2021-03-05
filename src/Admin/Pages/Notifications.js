import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { deepOrange } from '@material-ui/core/colors';

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

});

export default function Notifications() {
  const classes = useStyles();

  return (
    <Card className={classes.root} 
        style= {{
           margin: "1.5rem",
           borderRadius: "12px",
           boxShadow: "0px 20px 16.83px 0.17px rgba(0, 0, 0, 0.05)",
        }}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         January 20, 2021
        </Typography>
        <Typography variant="h6" component="h2" display="inline">
            <PeopleOutlineIcon style={{color:deepOrange[500],
            marginRight: '5px'
            }}/>
             Customer ID: 12345 | Aelin Ashryver Galathynius
        </Typography>
        <Typography>
            Order ID: 12345
        </Typography>
      </CardContent>
      <CardActions>
          <Link to = "/Orders">
            <Button size="small">Read More</Button>
         </Link>
      </CardActions>
    </Card>
  );
}
