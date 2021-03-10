import React,{Component} from 'react';
import { firestore} from './../../firebase/firebase.utils';


class Users extends Component {
    state = { user : null}

    //sample on how to get collection of users
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
        return(
            <div>
                <h1>List of Users:</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    {
                    this.state.users &&
                    this.state.users.map( users => {
                        return (
                                <tr>
                                    <td>{users.displayName} </td>
                                    <td>-{users.email} </td>
                                </tr>
                        );
                    })
                }
                </table>
                
            </div>
        );
    }
}
 
export default Users;