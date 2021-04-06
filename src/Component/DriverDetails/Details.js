import React, { useState, useEffect } from "react";
import {  Table } from "reactstrap";
import axios from "axios";
import './style.css'
import Moment from 'react-moment';
import { useLocation, useParams } from "react-router";
import Details from './NewTabel';


const URL = 'https://rikshaw.ecodexpert.com/api/rickshaw/delete'

 const Index  = (props) => {
  const [driversData, setDriversData] = useState([]);
  const [driveData, setDriveData] = useState([]);
  let { id } = useParams();

   const removeData = (id) => {

     axios.delete(`${URL}/${id}`).then(res => {
       const del = driveData.filter(driveData => id !== driveData.id)
       setDriversData(del)
     })
   }

  useEffect(() => {
    axios
      .get(
        "https://rikshaw.ecodexpert.com/api/rickshaw-transaction?id=" +id
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
          <Details/>
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
            </tr>
          </thead>

          <tbody>
            {driversData.map((driverData) => {
              totalAmount = totalAmount + driverData.amount_paid;
              return (
                <tr>
                  <td className="text-center"> {driverData.amount_paid}
                    <button className='button' onClick={() => removeData(id)}>Delete</button>

                    {/*<button class="ui red button">delete</button>*/}
                  </td>
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
