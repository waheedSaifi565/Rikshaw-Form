import React, { Component } from 'react'
import { Button, Icon, Label,Input, Menu, Segment } from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'Logout' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(props) {
      console.log("links", props)
    const { activeItem } = this.state

    return (
      <div>
    <Menu pointing color="green">
          <Link to="/dashboard/area">
          <Menu.Item
            name='Area'
            active={activeItem === 'Area'}
            onClick={this.handleItemClick}
          /></Link>

           <Link to="/dashboard/detail">
          <Menu.Item
            name='Details'
            active={activeItem === 'Details'}
            onClick={this.handleItemClick}
          /></Link> 
         
          <Menu.Menu position='right'>
          <Link to="/">
          <Menu.Item
            name='Logout'
            active={activeItem === 'Logout'}
            onClick={this.handleItemClick}
          /></Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
