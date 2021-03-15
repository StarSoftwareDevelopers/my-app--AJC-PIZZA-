import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {firestore} from './../../../firebase/firebase.utils';

class UserTable extends Component {
    constructor() {
        super();
        this.state = { users: []};
      }

    columns = ["Display Name", "Email", "Address","Phone Number"];
    options = {
        filter: true,
        selectableRows: 'none',
      };
  

    componentDidMount() {
        firestore.collection('users')
            .get()
            .then( snapshot => {
                const users = []
                 snapshot.forEach(doc => {
                    const data = doc.data()
                    users.push({"Display Name":data.displayName, 'Email': data.email, 'Address' : data.address});
                })
                this.setState({ users : users})
                // console.log(snapshot)
            })
        .catch(error => console.log(error))
    }   

    render() {
        return this.state.users ? (
            <MUIDataTable
              title={"List of Users"}
              columns={this.columns}
              data={this.state.users}
              options={this.options}
            />
          ) : (
            <div>Loading...</div>
          );
        }
      }
 
export default UserTable;