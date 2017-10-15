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
    shelfs:PropTypes.object,
  }


  state={
    books:[],
    query:''
  }


  extractIds=function(books){

    let res={}

    res.wantToRead=books.wantToRead.map((book)=>book.id)
    res.currentlyReading=books.currentlyReading.map((book)=>book.id)
    res.read=books.read.map((book)=>book.id)

    return res;

  }


  setNewValue=function(book,newShelf){
    const  newObj=Object.assign({},book);
    newObj.shelf=newShelf;
    return newObj;
  }


  findAndReplace = function (books,Ids,shelfType){
    if(books!==undefined)
    return books.map((book)=> Ids.find((id)=>id===book.id)===undefined?book:this.setNewValue(book,shelfType))
    else {
      return
    }
  }


  updateShelfs=function(shelfArray,books){
    books=this.findAndReplace(books,shelfArray.wantToRead,"wantToRead");
    books=this.findAndReplace(books,shelfArray.read,"read");
    books=this.findAndReplace(books,shelfArray.currentlyReading,"currentlyReading");
    return books;
  }


  updateQuery = (query) => {

    this.setState({ query: query.trim() })
    if(query===''){
      this.setState({ books:[]})
      return
    }

    BooksAPI.search( this.state.query, 20).then((books)=>{
      books==!undefined||!(books.hasOwnProperty('error'))?this.setState({ books:this.updateShelfs(this.extractIds(this.props.shelfs),books)})
      :this.setState({ books:[]})
    }

  ).catch(
    error => {
      console.log("error")
    }
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
    }
    else{
      booksList=this.state.books
    }
  }

  return (

    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
                ))
              }
              </ol>
          </div>
      </div>
    </div>

  )
}
}

export default SearchBooks
