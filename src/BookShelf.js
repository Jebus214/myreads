import React, { Component } from 'react';
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {
  static propTypes = {

    shelf:PropTypes.string.isRequired,
    onShelfChangeHandler:PropTypes.func.isRequired,
  }


state={
    books:[]
}

    componentDidMount() {
      BooksAPI.getAll().then((books)=>{
        this.setState({books})
      })
    }



componentWillReceiveProps(){
  BooksAPI.getAll().then((books)=>{
    this.setState({books})
  })
}



  render() {
    const {shelf,onShelfChangeHandler } = this.props

    let booksList=this.state.books.filter((book)=>(shelf===book.shelf))
    booksList.sort(sortBy('title'))

    return (

      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.status}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">

                  {
                    booksList.map((book,key)=>(
                        <li key={book.id}>
                            <Book onShelfChange={onShelfChangeHandler} shelfValue={shelf} bookData={book} />
                          </li>
                    ))}


              </ol>
            </div>
          </div>
            </div>
      </div>

    )
  }
}

export default BookShelf
