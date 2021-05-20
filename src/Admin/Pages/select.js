import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
} from "@material-ui/core";
import { firestore } from "../../firebase/firebase.utils";

const Orders = ({ status }) => {
  const [value, setValue] = useState(0);
  const [stat, setStat] = useState("");
  const location = useLocation();
  const rowData = location.state;

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value == 10) {
      setStat("Confirmed");
    }
    if (value == 20) {
      setStat("On the way");
    }
    if (value == 30) {
      setStat("On the way(Delayed)");
    }
    if (value == 40) {
      setStat("Delivered");
    }

    console.log(stat);

    if (stat !== "") {
      try {
        const userRef = await firestore.collection("orders").doc(rowData);
        const res = userRef.set(
          {
            orderStatus: stat,
          },
          { merge: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel id="demo-mutiple-name-label">Order Status</InputLabel>
          <Select onChange={handleChange} value={value}>
            <MenuItem value={10} disabled={value > 10}>
              Confirmed
            </MenuItem>
            <MenuItem value={20} disabled={value > 20}>
              On the way
            </MenuItem>
            <MenuItem value={30} disabled={value > 30}>
              On the way (Delayed)
            </MenuItem>
            <MenuItem value={40} disabled={value > 40}>
              Delivered
            </MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" color="secondary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Orders;
