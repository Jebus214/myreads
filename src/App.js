import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {



  state={
    books:{currentlyReading:[],wantToRead:[],read:[]},
  }


  setShelf= function (books,response){

    books.currentlyReading=response.filter((e)=>(e.shelf==="currentlyReading"));
    books.wantToRead=response.filter((e)=>(e.shelf==="wantToRead"));
    books.read=response.filter((e)=>(e.shelf==="read"));

    return books
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }


  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books:this.setShelf({currentlyReading:[],wantToRead:[],read:[]},books)})
    })
  }



  changeShelf=(book,shelf)=>{
    BooksAPI.update(book, shelf).then((response)=>{
      BooksAPI.getAll().then((books)=>{
        this.setState({books:this.setShelf({currentlyReading:[],wantToRead:[],read:[]},books)})
      })
    })
  }



  render() {
    const { books } = this.state

    return (
      <div>

      <Route path="/search"
        render={()=>(
          <SearchBooks onShelfChangeHandler={this.changeShelf}  status={'Currently Reading'} shelfs={this.state.books}  />
        )
      }/>
      <Route exact path="/"
        render={()=>(

        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <BookShelf onShelfChangeHandler={this.changeShelf}  title={'Currently Reading'} shelf={books.currentlyReading}  />
            <BookShelf onShelfChangeHandler={this.changeShelf}  title={'Want to Read'} shelf={books.wantToRead} />
            <BookShelf onShelfChangeHandler={this.changeShelf} title={'Read'} shelf={books.read} />

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        </div>
      )}/>
  </div>
  )}
}

export default BooksApp
