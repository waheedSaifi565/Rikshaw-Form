import React from 'react';
import {
   Col,
   Container,
   Row,
   Button, Form
} from "react-bootstrap";
import 'chart.js';
import LoggedInNavbar from "./widgets/LoggedInTopNavbar";
import LoggedInFooter from "./widgets/LoggedInFooter";
import {Link} from "react-router-dom";
import axios from "axios";
import bsCustomFileInput from "bs-custom-file-input";



class BooksCreateNew extends React.Component{

      state = {
           title: '',
           author: '',
           rating: '',
           costprice: '',
           bookcover: null,
           book: null,
           description: ''
       };
      
   onTitleChange = (event) => {
       this.setState({title: event.target.value})
   };
   onAuthorChange = (event) => {
       this.setState({author: event.target.value})
   };
   onRatingChange = (event) =>{
       this.setState({rating: event.target.value})
   };
   onCostPriceChange = (event) =>{
       this.setState({costprice: event.target.value})
   };
   onDescriptionChange = (event) => {
       this.setState({description: event.target.value})
   };

   bookCoverSelectedHandler = (event) => {
       this.setState({
           bookcover: event.target.files[0]
       });
   };

   bookSelectedHandler = (event) => {
     this.setState({
         book: event.target.files[0]
     });
   };

   handleSubmit = (event) => {
       event.preventDefault();
       const bookcover  = new FormData();
       const book  = new FormData();
       bookcover.append('bookcover', this.state.bookcover,  this.state.bookcover.name);
       book.append('book', this.state.book,  this.state.book.name);

     axios.post('http://localhost:8000/api/store-book',
         {
             title: this.state.title,
             author: this.state.author,
             rating: this.state.rating,
             costprice: this.state.costprice,
             bookcover,
             book,
             description: this.state.description
         })
           .then((res) => {
                   //   this.props.history.push('/success-created1');
                   console.log(res.data);
           }).catch((error)=>{
               console.log(error);
     });

   };


   componentDidMount() {
       bsCustomFileInput.init();
   }

   render() {
   return (

       <>
           <LoggedInNavbar/>

           <Container>
               <Row>
                   <Col sm={3}>
                   </Col>

                   <Col sm={6}>
                       <div className="mt-3">
                           <h4 className="mb18">Add New book</h4>

                           <Form>

                               <Form.Group controlId="formUsername">
                                   <Form.Label>Title</Form.Label>

                                   <Form.Control type="text" value={this.state.title} onChange={this.onTitleChange}/>

                               </Form.Group>


                               <Form.Group controlId="formPassword">
                                   <Form.Label>Author</Form.Label>

                                   <Form.Control type="text" value={this.state.author} onChange={this.onAuthorChange}/>

                               </Form.Group>

                               <Form.Group controlId="formPrice">
                                   <Form.Label>Rating</Form.Label>

                                   <Form.Control as="select" value={this.state.rating} onChange={this.onRatingChange}>
                                       <option value="0">0</option>
                                       <option value="1">1</option>
                                       <option value="2">2</option>
                                       <option value="3">3</option>
                                       <option value="4">4</option>
                                       <option value="5">5</option>
                                   </Form.Control>

                               </Form.Group>

                               <Form.Group controlId="formPrice">
                                   <Form.Label>Cost price</Form.Label>

                                   <Form.Control type="text" value={this.state.costprice} onChange={this.onCostPriceChange}/>

                               </Form.Group>
                               <Form.Group controlId="formBook">
                                   <Form.Label>Book Cover</Form.Label>

                                   <Form.File  label="Choose file (JPG)"  onChange={this.bookSelectedHandler} custom/>

                               </Form.Group>

                               <Form.Group controlId="formBook">
                                   <Form.Label>Book File</Form.Label>

                                   <Form.File  label="Choose file (PDF)"  onChange={this.bookCoverSelectedHandler} custom/>

                               </Form.Group>

                               <Form.Group controlId="formDescription">
                                   <Form.Label>Short Description</Form.Label>

                                   <textarea cols="20" rows="10" className="form-control" value={this.state.description} onChange={this.onDescriptionChange}/>

                               </Form.Group>

                               <Button variant="dark" type="submit" size="lg" className="btn-block mt35"  onClick={this.handleSubmit}>
                                   UPLOAD
                               </Button>
                               <Link  to="/books" size="lg" className="btn-block mt35 btn-default text-center a-1 pt-3">
                                   BACK
                               </Link>

                           </Form>

                       </div>
                   </Col>
                   <Col sm={3}>
                   </Col>
               </Row>

           </Container>
           <br/>
           <br/>
           <br/>
           <br/>
           <hr/>
           <LoggedInFooter/>
       </>
   );
}


}

export default BooksCreateNew;
