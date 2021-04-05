import React, {useState, useEffect} from "react";
import Store from "../Store/store";
import './rikshawtable.css';
import { Table,Button, Icon } from 'semantic-ui-react'

import {Link} from 'react-router-dom';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form";
import {toast} from 'react-toastify';
import useLocalStorage from "../LocalStorageHook";
import {URI_API} from "../Constants";

toast.configure()

const RikshawTable = (props) => {

    const [driversData, setDriversData] = useState([])
    const [rickshaw_id, Setrickshaw_id] = useState(0)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    let handleShow = (id) => {
        setShow(true);
        Setrickshaw_id(id)
    }

    const {register, handleSubmit, errors} = useForm();
    const [token, setToken] = useLocalStorage('token', false);
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
    useEffect(() => {
        axios.get(URI_API+"rickshaw",config)
            .then(response => {
                setDriversData(response.data.rickshaw);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const getData = (v) => {
        axios.get(URI_API+"searchRickshawData?searchTerm=" + v,config).then(function (response) {
            setDriversData(response.data.searchedData)
        });
    };

    const onSubmit = data => {
        handleClose()
        axios.post('https://rikshaw.ecodexpert.com/api/rickshaw-transaction', {
            rickshaw_id: rickshaw_id,
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
console.log("dreiversssssssssss", )
    return (
        <div className="container-fluid">
            <div className="justify-content-center">
                <div className="rikshawtable">
                 
                        <h4 className="heading-Form">Rikshaw Driver Registration Details</h4>
            
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mb-4">
                            <FormGroup className="rickshaw-formgroup">
                                <Label className="label-heading" for="name">Search</Label>
                                <Input type="text" onChange={e => getData(e.target.value)}/>
                            </FormGroup>
                        </div>
                        <div className="col-sm-2">
                            <Link to="/dashboard">
                            <Button animated className="bg-theme text-whites">
      <Button.Content visible>Back to Form</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
                            </Link>
                        </div>
                    </div>
                    <Table  color="green">
                        <thead>
                        <tr>
                            <th>Driver Name</th>
                            <th>Phone Number</th>
                            <th>Rikshaw Number</th>
                            <th>Amount</th>
                            <th>CNIC Number</th>
                            <th>Flex Pic</th>
                            <th>Add Transaction</th>
                            <th>Driver Detail</th>
                        </tr>
                        </thead>
                        <tbody>
                        {driversData.map((driverData) => {
                            return <tr>
                                <td>{driverData.name}</td>
                                <td>{driverData.phone_number}</td>
                                <td>{driverData.number_plate}</td>
                                <td>
                                    {driverData.amount_paid}
                                </td>
                                <td>{driverData.cnic}</td>
                                <td>
                                    {driverData.images.map((image) => {
                                        return <img className="rikhshaw-img"
                                                    src={'https://rikshaw.ecodexpert.com/' + image.image}/>
                                    })}
                                </td>
                                <td>
                                    <Button  key={driverData.id}
                                            data-id={driverData.id}
                                            onClick={() => {
                                                handleShow(driverData.id)
                                            }}>Add</Button>
                                </td>
                                <td>
                                <Link to="/dashboard/details">
                                    <Button key={driverData.id}
                                            data-id={driverData.id}>Detail</Button>
                                            </Link>
                                </td>
                            </tr>
                        })
                        }
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
                                               name="amount"/>
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
        </div>
    );
}

export default RikshawTable;