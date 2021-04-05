import React, { Component } from 'react';
import "./style.css"
import {
    Grid,
    Segment,
    Button,
    Form,
    Header,
    Table,
    Message,
    Icon
  } from "semantic-ui-react";
export default class Area extends Component {
    render() {
        return (
            <div className="Area-add">
{/* <h1>Add Area of Rikshaw Deriver</h1> */}
            <div >
        <Grid celled textAlign="center" verticalAlign="middle" >
        <Grid.Row>
        <Grid.Column width={5} >
        <Header as="h1" icon className="theme-color" textAlign="center">
        Add Area
        </Header>
        <Form onSubmit={this.handleSubmit} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="map signs"
                  iconPosition="left"
                  placeholder="Add Location"
                  type="text"
                />
                <Button
                  
                  className="bg-theme text-whites"
                  fluid
                  size="large"
                >
                 Add Area
                </Button>
              </Segment>
            </Form>
      
        </Grid.Column>
  
      <Grid.Column width={11}>
      <Table  color="green" center>
                        <thead>
                        <tr>
                        <th>Area</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                          </tr>
                        </tbody>
                        </Table>
      </Grid.Column>
    </Grid.Row>

         </Grid>
</div>
<div className="lower-section">

</div>
            </div>
        )
    }
}
