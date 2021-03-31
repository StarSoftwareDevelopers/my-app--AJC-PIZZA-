import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { firestore } from "./../../../firebase/firebase.utils";

class Feedback extends Component {
  constructor() {
    super();
    this.state = { feedback: [] };
  }

  columns = ["Display Name", "Email", "Message"];
  options = {
    filter: true,
    selectableRows: "none",
  };

  componentDidMount() {
    firestore
      .collection("feedback")
      .get()
      .then((snapshot) => {
        const feedback = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          feedback.push({
            "Display Name": data.displayName,
            Email: data.email,
            Message: data.message,
          });
        });
        this.setState({ feedback: feedback });
        // console.log(snapshot)
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.feedback ? (
      <MUIDataTable
        title={"List of Feedback"}
        columns={this.columns}
        data={this.state.feedback}
        options={this.options}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Feedback;
