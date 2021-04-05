import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import axios from "axios";
import Moment from 'react-moment';

function Index(props) {
  console.log("whats",props)
  const [driversData, setDriversData] = useState([]);
  const [driveData, setDriveData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://rikshaw.ecodexpert.com/api/rickshaw-transaction?id=" + props.id
      )
      .then((response) => {
        setDriversData(response.data.getRickshawDriversData.transaction);
        setDriveData(response.data.getRickshawDriversData);
        console.log("something", response.data.getRickshawDriversData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
let totalAmount = 0;
  return (
    <div className="table-driver">
      <div className="container">
        <div className="driver_detail">
          <h2 className="driver_heading">Driver Full details</h2>
          <div className="box_drivers">
            <div className="drivers">
              <h1>Driver Name</h1>
              <p>{driveData.name}</p>
            </div>
            <div className="drivers">
              <h1>Phone Number</h1>
              <p>{driveData.phone_number}</p>
            </div>
            <div className="drivers">
              <h1>Rikshaw Numbe</h1>
              <p>{driveData.number_plate}</p>
            </div>
            <div className="drivers">
              <h1>CNIC Number</h1>
              <p>{driveData.cnic}</p>
            </div>
          </div>
        </div>

        <h4 className="total">Total Transaction</h4>
        <Table bordered>
          <thead>
            <tr className="padding-left">
              <th className="text-center">Transaction</th>
              <th className="text-center">Date</th>
              <th className="text-center">Area</th>
            </tr>
          </thead>

          <tbody>
            {driversData.map((driverData) => {
              totalAmount = totalAmount + driverData.amount_paid;
              return (
                <tr>
                  <td className="text-center"> {driverData.amount_paid} </td>
                 
                  <td className="text-center" >  <Moment format='MMMM Do YYYY, h:mm:ss a'>{driverData.created_at}</Moment></td>
                 
                </tr>
             
              );
            })}
            <div className="total-amount"><h4>Total:  {totalAmount}</h4></div>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Index;
