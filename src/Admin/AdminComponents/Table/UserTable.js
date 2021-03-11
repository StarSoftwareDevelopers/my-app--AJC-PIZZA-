import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {firestore} from './../../../firebase/firebase.utils';

const columns = ["Display Name","Email"];


class UserTable extends Component {
    
    state = { user : null}
    
    componentDidMount() {
        firestore.collection('users')
            .get()
            .then( snapshot => {
                const users = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    users.push(data)
                })
                this.setState({ users : users})
                // console.log(snapshot)
            })
        .catch(error => console.log(error))
    }   

    render() {
        return ( 
        
            // <MUIDataTable
            //         title={"Users"}
            //         columns={columns}
            //         data={data}
            //         // options={options}
            // />
            <div>
                Hello   
            </div>
         );
    }
  
}
 
export default UserTable;