import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import './../Admin.scss';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MenuTable from './../AdminComponents/Table/MenuTable';

const Menu = () => {
    return ( 
        <Container maxWidth = "lg" style={{
            margin: "1rem"
        }}>
    
              <Typography variant="h5" style={{
                  textAlign: "left",
                  marginTop: "-20px",
                  display: 'inline-block',
                  marginRight: '1rem'
                  }}>Menu</Typography>
                  
                <Card style={{padding: '1rem'}}>
                <Link to="#">
                    <Button variant="outlined" color="primary">
                        Add New Menu
                    </Button>
                </Link>
                <br></br><br></br>
                <MenuTable/>
                </Card>
    </Container>
     );
}
 
export default Menu;