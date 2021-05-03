import React from "react";
import { Button } from "@material-ui/core";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationErrors
      );
    } else {
      alert("Geolocation not supported ");
    }
  }

  getCoordinates(position) {
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  //errors
  handleLocationErrors(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }

  render() {
    return (
      <div>
        Hello 2
        <Button
          variant="contained"
          color="secondary"
          onClick={this.getLocation}
        >
          Get Coordinates
        </Button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longtitude: {this.state.longitude}</p>
        <p>Address: {this.state.userAddress}</p>
      </div>
    );
  }
}

export default Map;
