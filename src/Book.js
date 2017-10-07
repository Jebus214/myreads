import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'






class Book extends Component {
  static propTypes = {
      shelf:PropTypes.string,
      onShelfChange:PropTypes.func.isRequired,
  }




  state = {

  value:this.props.bookData.shelf

  }






  handleChange=(book,event)=>(

    event.target.value!=='none'?
    this.props.onShelfChange(book,event.target.value)
    :null,

    event.target.value!=='none'?this.setState({value:  event.target.value}):null


  )




  render() {
    return (
      <div className="book">

        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+this.props.bookData.imageLinks.thumbnail+'")' }}></div>
          <div className="book-shelf-changer">
          <select onChange={(e)=>this.handleChange(this.props.bookData,e)} value={this.state.value} >


                          <option  value="none" disabled>Move to...</option>
                          <option value="currentlyReading">{this.state.value=='currentlyReading'?'✓':''}Currently Reading</option>
                          <option value="wantToRead">{this.state.value=='wantToRead'?'✓':''}Want to Read</option>
                          <option value="read">{this.state.value=='read'?'✓':''} Read</option>
                          <option value="none">None</option>



            </select>
          </div>
        </div>
        <div className="book-title">{this.props.bookData.title}</div>
        <div className="book-authors">{this.props.bookData.authors[0]}</div>
      </div>

      )
  }
}

export default Book
