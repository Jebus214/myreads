import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'


import BookShelf from './BookShelf'


  // import * as BooksAPI from './BooksAPI'
  import './App.css'

  class BooksApp extends React.Component {



    state={
        books:[],
        query:''
    }

    updateQuery = (query) => {
  this.setState({ query: query.trim() })
}

clearQuery = () => {
  this.setState({ query: '' })
}


    componentDidMount() {
      BooksAPI.getAll().then((books)=>{
        this.setState({books})
      })
    }



    changeShelf=(book,shelf)=>{

        BooksAPI.update(book, shelf).then(()=>{
          BooksAPI.getAll().then((books)=>{
            this.setState({books})
          })
        })

      console.log(this.state.books)

    }



    render() {
          const { books,query } = this.state

          let showingBooks
if (query) {
  const match = new RegExp(escapeRegExp(query), 'i')
  showingBooks = books.filter((contact) => match.test(contact.title))
} else {
  showingBooks = books
}

          let booksList=showingBooks
          showingBooks.sort(sortBy('title'))


      return (
  <div>


          <Route
            path="/search"

            render={()=>(
              <div className="app">
              <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to="/">Close</Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input    value={query}  onChange={(event) => this.updateQuery(event.target.value)} type="text" placeholder="Search by title or author"/>

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                  {

                showingBooks.map((book,key)=>(
                    <li key={book.id} >
                      <Book onShelfChange={this.changeShelf} shelfValue={book.shelf} bookData={book} />
                    </li>
                  ))}
                  </ol>
                </div>
              </div>
              </div>
              )

            }/>


            <Route exact path="/"

              render={()=>(

                <div className="app">
                  <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>

                    <BookShelf onShelfChangeHandler={this.changeShelf}  status={'Currently Reading'} shelf={'currentlyReading'}  />
                    <BookShelf onShelfChangeHandler={this.changeShelf}  status={'Want to Read'} shelf={'wantToRead'} />
                    <BookShelf onShelfChangeHandler={this.changeShelf} status={'Read'} shelf={'read'} />

                    <div className="open-search">
                      <Link to="/search">Add a book</Link>
                    </div>
                  </div>
                </div>
                )
              }/>



  </div>







      )
    }
  }

  export default BooksApp
