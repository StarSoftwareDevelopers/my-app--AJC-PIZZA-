import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Dashboard from './../AdminComponents/Dashboard';
import OrderTable from './../AdminComponents/Table/OrdersTable';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Home = () => {
    return ( 
      <div>
          <Container maxWidth = "lg" style={{
              margin: "5px"
          }}>
            <ThemeProvider theme={theme}>
                <Typography variant="h5" style={{
                    textAlign: "left",
                    marginTop: "-20px",
                    marginBottom: "1rem"
                    }}>Overview</Typography>
                    <Dashboard/>
                <Typography variant="h5" style={{
                    textAlign: "left",
                    marginTop: "2rem",
                    marginBottom: "1rem"
                    }}>Today's Orders</Typography>
                <OrderTable/>
            </ThemeProvider>
      </Container>
      </div>
      
     );
}
 
export default Home;
