import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Book extends Component {
  static propTypes = {
    bookData:PropTypes.object.isRequired,
    onShelfChange:PropTypes.func.isRequired,
  }



  handleChange=(book,event)=>(
    event.target.value!=='none'?this.props.onShelfChange(book,event.target.value):null,
    event.target.value!=='none'?this.setState({value:  event.target.value}):null
  )

  render() {
    const {bookData,onShelfChange } = this.props


    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+bookData.imageLinks.smallThumbnail+'")' }}></div>
            <div className="book-shelf-changer">
            <select onChange={(e)=>this.handleChange(bookData,e)} value={bookData.shelf} >
              <option  value="none" disabled>Move to...</option>
              <option value="currentlyReading">{bookData.shelf==='currentlyReading'?'✓':''}Currently Reading</option>
              <option value="wantToRead">{bookData.shelf==='wantToRead'?'✓':''}Want to Read</option>
              <option value="read">{bookData.shelf==='read'?'✓':''} Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookData.title}</div>
        <div className="book-authors">
            {bookData.authors?bookData.authors.map((autor,key)=>
              <p key={autor}>
              {autor}
              </p>
            ):<p></p>}
        </div>
      </div>

  )
}
}

export default Book
