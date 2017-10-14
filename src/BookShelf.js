import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {
  static propTypes = {
    title:PropTypes.string,
    shelf:PropTypes.array.isRequired,
    onShelfChangeHandler:PropTypes.func.isRequired,
  }

  state={
    shelf:[]
  }

  componentDidMount() {
        this.setState({shelf:this.props.shelf})
  }

  componentWillReceiveProps(){
        this.setState({shelf:this.props.shelf})
  }



  render() {
    const {title,shelf,onShelfChangeHandler } = this.props
    let booksList=shelf.sort(sortBy('title'))

    return (

      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
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
      </div>

    )
  }
}

export default BookShelf
