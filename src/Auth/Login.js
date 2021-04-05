import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { Form, FormGroup, Label, Input, Table} from 'reactstrap';
import axios from 'axios';
import {useForm} from "react-hook-form";
// import { useHistory} from "react-router-dom";
import {URI_API} from "../Constants";
import useLocalStorage from "../LocalStorageHook";
import './style.css';
import img from '../Logo/unclefixer-logo.png';
import {
    Grid,
    Segment,
    Button,
    Header,
    Message,
    Icon
  } from "semantic-ui-react";
toast.configure()
const Register = (props) => {
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, errors} = useForm();
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [token, setToken] = useLocalStorage('token', null);

    // let history = useHistory();
    
    useEffect(() => {

    }, [])

    const onSubmit = data => {
        setTimeout(() => {
            // API or Your Functions to get data
            setLoading(false)
         }, 2000);
         setLoading(true)
        axios.post(URI_API+"login",data).then(({data})  =>  {
            console.log(data);
            if(data.token){
                setIsLoggedIn(true);
                setToken(data.token);
                window.location.href = "/dashboard";
            }
        }).catch((err) =>{
            console.log("errors",err)
            setError('Invalid Credentials')
        });
    }
    return (
        <div className="Login-form">
                    <div className="Login">
                        <Grid textAlign="left" verticalAlign="middle" className="app">
        <Grid.Column className="Grid-column">
        <Header as="h1" icon className="theme-color" textAlign="center">
        
            <img src={img} alt="no"/>
            <br></br>
            Login to Rikshaw Form
            {/*  */}
          </Header>
                        <div className="justify-content-center p-2">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                            <Segment stacked>
                                <div className="row p-2">
                                    <div className="col-12">

                                        <Label className="label-heading" for="email">Enter Email</Label>
                                        <input className="form-control" type="email" ref={register({required: true})}
                                      
                                               name="email"/>
                                        <span style={{color: "red"}}>{errors.email && "Email is required"}</span>
                                    </div>
                                    <div className="col-12">
                                        <Label className="label-heading" for="password">Enter Password</Label>
                                        <input className="form-control" type="password"   ref={register({required: true})}
                                               name="password"/>
                                        <span style={{color: "red"}}>{errors.password && "Password is required"}</span>
                                    </div>
                                </div>
                                {error && <span className="invlid">
                      {error}</span>}
                                <div className="col-12 text-center">
                                    <Button 
            disabled={loading}
                color="green"
                fluid
                size="large"  
                type="submit" className="mt-5 bg-theme">Login</Button>
                                </div>
                                </Segment>
                            </Form>
                        </div>
                        </Grid.Column>
                        </Grid>
                    </div>
                </div>
    )
}
export default Register;
