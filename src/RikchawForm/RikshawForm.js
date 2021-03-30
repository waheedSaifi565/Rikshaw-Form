import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import Store from '../Store/store';
import 'react-toastify/dist/ReactToastify.css';
import {  Segment,Table,Button, Icon } from 'semantic-ui-react'
import { Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import './rikshawform.css';
import axios from 'axios';
import {URI_API} from "../Constants";
import useLocalStorage from "../LocalStorageHook";

toast.configure()

class RikshawForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            handleResponse: null,
            invalidImage: null,
            fields: {},
            redirectToReferrer: false,
            errors: {},
            errorMessage: {},
            name: '',
            phone_number: '',
            number_plate: '',
            amount: '',
            cnic: '',
            image: '',
        };
        this.reader = new FileReader();
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Name is required";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters, space not allowed";
            }
        }

        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "Phone number is required";
        }

        if (!fields["amount"]) {
            formIsValid = false;
            errors["amount"] = "Amount is required";
        }

        this.setState({errors: errors});
        return formIsValid;

    }

    selectedFileHandle = (event) => {
        let files = event.target.files || event.dataTransfer.files;

        if (this.ValidateImage(event.target.files[0])) {

            toast.error('InValid Image!', {autoClose: 3000})
            return false;
        }
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    ValidateImage = (file) => {
        if (!file.name.match(/\.(jpg|jpeg|png|gif|JPG)/)) {
            return true;
        }
    }
    createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let fields = this.state.fields;
            fields['image'] = e.target.result;
            this.setState({fields});
        };
        reader.readAsDataURL(file);
    }

    contactSubmit(e) {
        const token = window.localStorage.getItem('token');
        if (this.handleValidation()) {
            let formData = {
                name: this.state.fields["name"],
                phone_number: this.state.fields["phone"],
                number_plate: this.state.fields["rikshawnumber"],
                amount: this.state.fields["amount"],
                cnic: this.state.fields["cnic"],
                image: this.state.fields["image"],
            }

            const config = {
                headers: {Authorization: `Bearer ${JSON.parse(token)}`}
            }
            axios.post(URI_API +'rickshaw', formData,config)
                .then(response => {
                    console.log(response);
                })
                .catch((err) => {
                    this.setState({errorMessage: err.response.data.errors});
                })
            toast.success('Data Submitted successfully', {autoClose: 3000})

        } else {
            toast.error('Please fill up the form correctly!', {autoClose: 3000})
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {

        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer) {
            return <Redirect to="/detail"/>
        }

        const {invalidImage, errors} = this.state;

        return (
            <div>
                <div className="rikshawform">
                    <div >
                        <div className="row justify-content-center">
                            <div className="form-div">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <h4 className="dashbord-Form">Rikshaw Driver Registration Form</h4>
                                    </div>
                                    <div className="col-lg-6 col-md-6 text-lg-right p-3">
                                    <Link to="/dashboard/detail">
                            <Button animated className="bg-theme text-whites">
      <Button.Content visible>Check detail</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
                            </Link>
                                    </div>
                                </div>
                            </div>
                            <Form className="form-div p-3">
                            <Segment stacked className="p-4" color="green">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label className="label-heading" for="name">Driver Name</Label>
                                            <Input type="text" onChange={this.handleChange.bind(this, "name")}
                                                   value={this.state.fields["driver"]} name="name" id="name"
                                                   autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["name"]}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="phone" className="label-heading">Phone Number</Label>
                                            <Input type="number" maxLength="11"
                                                   onChange={this.handleChange.bind(this, "phone")}
                                                   value={this.state.fields["phone"]} name="phone" id="phone"
                                                   autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["phone"]}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="rikshawnumber" className="label-heading">Rikshaw Number</Label>
                                            <Input type="text" onChange={this.handleChange.bind(this, "rikshawnumber")}
                                                   value={this.state.fields["rikshawnumber"]} name="rikshawnumber"
                                                   id="rikshawnumber" autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["rikshawnumber"]}</span>
                                        {this.state.errorMessage.number_plate &&
                                        <span style={{color: "red"}}> {this.state.errorMessage.number_plate[0]} </span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="amount" className="label-heading">Amount</Label>
                                            <Input type="number" onChange={this.handleChange.bind(this, "amount")}
                                                   value={this.state.fields["amount"]} name="amount" id="amount"
                                                   autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["amount"]}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="cnic" className="label-heading">CNIC Number</Label>
                                            <Input type="number" onChange={this.handleChange.bind(this, "cnic")}
                                                   value={this.state.fields["cnic"]} name="cnic" id="cnic"
                                                   autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["cnic"]}</span>
                                        {this.state.errorMessage.cnic &&
                                        <span style={{color: "red"}}> {this.state.errorMessage.cnic[0]} </span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="cnic" className="label-heading">CNIC Number</Label>
                                            <Input type="number" onChange={this.handleChange.bind(this, "cnic")}
                                                   value={this.state.fields["cnic"]} name="cnic" id="cnic"
                                                   autoComplete="off"/>
                                        </FormGroup>
                                        <span style={{color: "red"}}>{errors["cnic"]}</span>
                                        {this.state.errorMessage.cnic &&
                                        <span style={{color: "red"}}> {this.state.errorMessage.cnic[0]} </span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <FormGroup className="rickshaw-formgroup">
                                            <Label for="image" className="label-heading">Picture Of Flex with Driver
                                                After Install</Label>
                                            <Input type="file" onChange={this.selectedFileHandle.bind(this)}
                                                   accept=".jpg, .jpeg, .png" name="image" id="image"/>
                                            <span style={{color: "red"}}>{errors['image']}</span>
                                            {this.state.errorMessage.image &&
                                            <span style={{color: "red"}}> {this.state.errorMessage.image[0]} </span>}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-12 col-md-12 text-center">
                                        <Button className="bg-theme text-whites w-50"
                                                onClick={this.contactSubmit.bind(this)}>Submit</Button>
                                    </div>
                                </div>
                                </Segment></Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RikshawForm;



