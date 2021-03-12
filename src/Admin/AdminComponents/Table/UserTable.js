import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {firestore} from './../../../firebase/firebase.utils';


class UserTable extends Component {
    columns = ["Display Name", "Email", "Address"];
    constructor() {
      super();
      this.state = { users: []};
    }

    componentDidMount() {
        firestore.collection('users')
            .get()
            .then( snapshot => {
                const users = snapshot.forEach(doc => {
                    const data = doc.data()
                    // console.log(data.displayName)
                    // console.log(data.displayName)
                    console.log(data.email)
                    return{
                       displayName : data.displayName,
                       emai : data.email,
                       address : data.address
                    };
                })
                this.setState({ users : users})
                // console.log(snapshot)
            })
        .catch(error => console.log(error))
    }   

    render() {
        return  (
       
          <MUIDataTable
            title={"Users"}
            columns={this.columns}
            data={this.state.data}
            // options={options}
          />
        );
      }
    }
 
export default UserTable;