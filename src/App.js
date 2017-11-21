import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import MainPage from './MainPage'
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


 updateBook=function (bookList,id,shelf){
       let res=bookList.reduce((acum,book)=>{
          if(book.id==id)
            {book.shelf=shelf}
        
          acum.push(book);
          return acum
          },[]);
        return res
      }


 updateBooks=function(bookList,updatedShelfs,updateBook){

          let res;
          updatedShelfs.currentlyReading.forEach(item=>{
            res=updateBook(bookList,item,'currentlyReading');
          });

          updatedShelfs.wantToRead.forEach(item=>{
            res=updateBook(bookList,item,'wantToRead');
          });

          updatedShelfs.read.forEach(item=>{
            res=updateBook(bookList,item,'read');
          });

          return res
        }




  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      return this.setState({books:this.setShelf({currentlyReading:[],wantToRead:[],read:[]},books)});
    })
  }



  changeShelf=(book,shelf)=>{
    let updatedBook=book;
    BooksAPI.update(book, shelf).then((response)=>{

      console.log(book);
         let updatedBooks=response;
    return this.setState((prevState) =>{
           console.log(prevState);
           console.log(updatedBooks);
           let callBackFunction=this.updateBook;
           let list=[... prevState.books.currentlyReading,...prevState.books.wantToRead,... prevState.books.read];
           list.filter((item)=>item.id===updatedBook.id).length>0?list:list.push(updatedBook);
           return {books:this.setShelf({currentlyReading:[],wantToRead:[],read:[]},this.updateBooks(list,updatedBooks,callBackFunction))}
      }
      )
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
          <MainPage onShelfChangeHandler={this.changeShelf}   books={this.state.books}  />
       )
     }/>
  </div>

  )}
}

export default BooksApp