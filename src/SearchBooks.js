import React, { Component } from 'react';
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
  static propTypes = {
    onShelfChangeHandler:PropTypes.func.isRequired,
    shelfs:ropTypes.object.isRequired,
  }


state={
    books:[],
    query:''
  }


  updateQuery = (query) => {



    BooksAPI.search( this.state.query, 20).then((books)=>
        this.setState({ books:books}),
        this.setState({ query: query.trim() })
        ,(error)=>
            this.setState({ books:[]}),


    )



  }





  render() {

    const { onShelfChangeHandler } = this.props
        const { query } = this.state
let booksList=this.state.books
if (booksList===undefined){
booksList=[]

}else{
  if(booksList.error==="empty query"){
    booksList=[]
  }else{
    booksList=this.state.books
  }
}

/*    let showingBooks
if (query) {
const match = new RegExp(escapeRegExp(query), 'i')
showingBooks = books.filter((books) => match.test(books.title))
} else {
showingBooks = books
}
showingBooks = books
    showingBooks.sort(sortBy('title'))
*/

    return (

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
            booksList.map((book,key)=>(
                <li key={book.id}>
                    <Book onShelfChange={onShelfChangeHandler}  bookData={book} />
                  </li>
            ))}




          </ol>
        </div>
      </div>
      </div>

    )
  }
}

export default SearchBooks
