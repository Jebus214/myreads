import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'


class MainPage extends Component {

static propTypes = {
   books:PropTypes.array.isRequired,
   onShelfChangeHandler:PropTypes.func.isRequired,
  }

  state={
    shelf:[]
  }


  render() {

    const {books,onShelfChangeHandler } = this.props
  
 return(

   <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookShelf onShelfChangeHandler={onShelfChangeHandler}  title={'Currently Reading'} shelf={books.currentlyReading}  />
            <BookShelf onShelfChangeHandler={onShelfChangeHandler}  title={'Want to Read'} shelf={books.wantToRead} />
            <BookShelf onShelfChangeHandler={onShelfChangeHandler} title={'Read'} shelf={books.read} />

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
    </div>
   )  
  }
  
}

export default MainPage
