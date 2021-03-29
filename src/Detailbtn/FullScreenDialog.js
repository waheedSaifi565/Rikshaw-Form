/**
 * Full Screen Dialog
 */
import React,{useState} from 'react';
import './style.css';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Button from '@material-ui/core/Button';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Dialog from '@material-ui/core/Dialog';
import { Form, FormGroup, Label, Input, Table } from 'reactstrap';
import List from '@material-ui/core/List';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Some from './Table';
import CloseIcon from '@material-ui/icons/Close';
// import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="right" ref={ref} {...props} />;
});

export default class FullScreenDialog extends React.Component {
	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	render() {
		return (
			<div>
				<Button variant="contained" className="back-color-btn text-white btn-block" onClick={this.handleClickOpen}>Details</Button>
				<Dialog fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}>
					<AppBar className="back-color-btn " >
						<Toolbar className="Appbar">
							
							{/* <h5 className="w-100 mb-0">Sound</h5> */}
							<Button color="inherit" onClick={this.handleClose}><KeyboardBackspaceIcon/></Button>
							{/* <Button color="inherit" onClick={this.handleClose}><CloseIcon/></Button> */}
							<h1 onClick={this.handleClose}>UncleFixer Rikshaw Payment Form</h1>
							
						</Toolbar>
					</AppBar>
				<div className="detail-section-body">
<Some  id={this.props.id} / >
				</div>
				</Dialog>
			</div>
		);
	}
}