import React, { useState, useEffect } from "react";
import {  Table ,Button,Form} from "reactstrap";
import axios from "axios";
import './style.css'
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import {toast} from 'react-toastify';

import Moment from 'react-moment';
import { useLocation, useParams } from "react-router";
toast.configure()

 const Index  = (props) => {
  const [driversData, setDriversData] = useState([]);
  const [driveData, setDriveData] = useState([]);

  const [rickshaw_id, Setrickshaw_id] = useState(0)
    const [show, setShow] = useState(false);
  let { id } = useParams();

  const {register, handleSubmit, errors} = useForm();

  const handleClose = () => setShow(false);

  let handleShow = (id) => {
    console.log("id",id)
    setShow(true);
    setDriveData(id)
}
const onSubmit = data => {
  
  handleClose()
  axios.put('https://rikshaw.ecodexpert.com/api/rickshaw/rickshaw-transaction', {
      driversData: driversData,
      amount: data.amount
  })
      .then(response => {
          console.log(response);
      })
      .catch(error => {
          console.log(error);
      })
  toast.success('Data Submitted successfully', {autoClose: 3000})
}
  useEffect(() => {
    axios
      .get(
        "https://rikshaw.ecodexpert.com/api/rickshaw-transaction?id=" +id
      )
      .then((response) => {
        setDriversData(response.data.getRickshawDriversData.transaction);
        setDriveData(response.data.getRickshawDriversData);
        // console.log( response.data.getRickshawDriversData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const  edit = (edit) => { 
    axios
      .put(
        "https://rikshaw.ecodexpert.com/api/rickshaw/rickshaw-transaction"
      )
      .then((response) => {
        console.log("something", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
console.log("some",edit)
}
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
            </tr>
          </thead>
          <tbody>
            {driversData.map((driverData) => {
              totalAmount = totalAmount + driverData.amount_paid;
              return (
                <tr>
                  <td className="text-center"> {driverData.amount_paid}
                  
                  <Button  key={driverData.id}
                                            data-id={driverData.id}
                                            onClick={() => {
                                                handleShow(driverData.id)
                                            }}>Edit</Button>
                  </td>
                  <td className="text-center" >  <Moment format='MMMM Do YYYY, h:mm:ss a'>{driverData.created_at}</Moment></td> 
                </tr>
              );
            })}
            <div className="total-amount"><h4>Total:  {totalAmount}</h4></div>
          </tbody>
        </Table>
        <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Make Transaction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="form-div" onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="rickshaw_id"/>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 m-auto">
                                        <input className="form-control" type="number" ref={register({required: true})}
                                               name="amount" />
                                        <span style={{color: "red"}}>{errors.amount && "Enter amount in numbers"}</span>
                                    </div>
                                    <div className="col-lg-12 mt-4 col-md-12 text-right">
                                        {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
                                        <Button type="submit" className="ml-4 check-detail text-whites" >Save</Button>
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
        
      </div>
    </div>
  );
}

export default Index;