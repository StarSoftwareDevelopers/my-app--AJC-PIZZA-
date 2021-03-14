import OrderTable from './../AdminComponents/Table/OrdersTable';
import Container from '@material-ui/core/Container';
import OrdersTabScreen from './../AdminComponents/Table/OrdersTabScreen';

const Orders = () => {
    return ( 
        <Container maxWidth = "lg" style={{
            margin: "1rem"
        }}>
            {/* <OrdersTabScreen/> */}
                 <OrderTable/>
    </Container>
     );
}
 
export default Orders;