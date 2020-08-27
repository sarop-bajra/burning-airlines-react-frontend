import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import FlightSearchResults from './FlightSearchResults';

const FLIGHTS_URL = 'http://localhost:3000/flights';

class Search extends React.Component {

  state = {
    origin:'',
    destination:'',
    searchedFlights: [],
    flights: []
  };

  componentDidMount(){
    console.log('Loaded');
    axios.get(FLIGHTS_URL)
    .then(res => {
      console.log(res.data);
      this.setState({flights: res.data});
    })
    .catch( err => console.warn(err));
  }

  handleChangeOrigin = (ev) => {
    console.log(ev.target.value);
    this.setState({origin:ev.target.value})
  }

  handleChangeDestination = (ev) => {
    console.log(ev.target.value);
    this.setState({destination:ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.state.flights.map( flight => {
      if (this.state.origin === flight.origin && this.state.origin === flight.destination) {
        console.log(flight);
        this.setState({
          searchedFlights: [ ...this.state.searchedFlights, flight ]
        });
        console.log(this.state.searchedFlights);
      } // if
    }) // map
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>

          <label>
            Origin:
            <select value={this.state.value} onChange={this.handleChangeOrigin}>
            <option value="">Select...</option>
            {
              this.state.flights.reverse().map( flight => {
                return <option value={flight.origin}> {flight.origin} </option>
              }) // map
            }
            </select>
          </label>
          <br/>

          <label>
            Destination:
            <select value={this.state.value} onChange={this.handleChangeDestination}>
            <option value="">Select...</option>
            {
              this.state.flights.reverse().map( flight => {
                return <option value={flight.destination}> {flight.destination} </option>
              }) // map
            }
            </select>
          </label>
          <br/>
          <input type="submit" value="Search" />
        </form>

        {
          (this.state.flights.length > 0)
          &&
          <FlightSearchResults flights={this.state.flights}/>
        }

        <p>{this.state.origin}</p>
        <p>{this.state.destination}</p>

        <div>
        {
          this.state.searchedFlights.map( flight => (<Link to={`/flight/${flight.id}`}><li>{flight.id}</li></Link>))
        }
        </div>

      </div>
    );

  }

}

export default Search;