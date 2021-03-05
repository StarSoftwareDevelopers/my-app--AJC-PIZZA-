import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import './../Admin.scss';
import Card from '@material-ui/core/Card';

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
                  <Link to ="#">
                    <Typography variant="h5" style={{display: 'inline-block'}}>| PromoCode</Typography>  
                </Link>
                <Card>
                  JUST TRYING IF IT COULD MERGE
                </Card>
    </Container>
     );
}
 
export default Menu;