import React, { Component } from "react";


import axios from "axios";
import './rikshawtable.css';
import DatePicker from "react-datepicker";
import { Form, FormGroup, Label, Input} from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";
import { LabelDetail } from "semantic-ui-react";

export class Searchdata extends Component {
  constructor(props) {
    super(props);

    this.state = {
      driversData: [],
      to: "",
      from: "",
    };
  }

  Changedate = (e) => {
    this.setState({
      to: e,
     
    });
  };

  from = (e) => {
    this.setState({
      from: e,
    });
  };

  componentDidMount() {
    // axios
      // .get("'https://rikshaw.ecodexpert.com/api/Searchdata/showdata")
      // .post("https://rikshaw.ecodexpert.com/api/searchByDate")
      // .then((response) => {
       
      // });
  }

  onsubmit = (e) => {
    const data = {
      to: this.state.to,
      from: this.state.from,
    };
    e.preventDefault();

    axios
      .post("https://rikshaw.ecodexpert.com/api/searchByDate", data)
      .then((response) => {
        console.log("sdflkadslkfdsalf;j",response.data);

        this.props.setDriversData( response.data.searchByDateRange)
      });
  };

  render() {
    return (
      <div>
      

        <form onSubmit={this.onsubmit}>
          <div className="row">
            <div className="col-sm-4 form-group">
            <Label className="label-heading lable-margin" for="name">To</Label>
              <DatePicker
                className="form-control width"
                selected={this.state.from}
                placeholderText="Select Date"
                showPopperArrow={false}
                onChange={this.from}
              />
            </div>
            <div className="col-sm-4 form-group">
            <Label className="label-heading lable-margin" for="name">From</Label>

              <DatePicker
                className="form-control width"
                selected={this.state.to}
                placeholderText="Select Date"
                showPopperArrow={false}
                // onChange={this.Changedate}
                onChange={e => this.Changedate(e)}
              />
            </div>
            <div className="col-sm-2 form-group">
              <button type="submit" className="btn bg-theme text-whites  margin-btn">
                Search
              </button>
            </div>
          </div>
        </form>

        </div>
    );
  }
}


export default Searchdata;
