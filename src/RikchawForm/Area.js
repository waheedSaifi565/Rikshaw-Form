import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import useLocalStorage from "../LocalStorageHook";
import axios from "axios";

function Area() {
  const [errors, setErrors] = useState("");
  const [Area, setArea] = useState("");
  const [token, setToken] = useLocalStorage("token", false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get("https://rikshaw.ecodexpert.com/api/area", config)
      .then((response) => {
        setArea(response.data.areas);
        console.log("some thing wo", response.data.areas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const {invalidImage, errors} = this.state;
  return (
    <div>
      <div className="col-lg-6 col-md-6">
        <FormGroup className="rickshaw-formgroup">
          <Label for="area" className="label-heading">
            Add Area
          </Label>

          <select
            placeholder="Select your Area"
            type="text"
            name="area"
            id="area"
            autoComplete="off"
          >
            {Area.map((e) => (
              <option>{e.name}</option>
            ))}
          </select>
        </FormGroup>
      </div>
    </div>
  );
}

export default Area;
