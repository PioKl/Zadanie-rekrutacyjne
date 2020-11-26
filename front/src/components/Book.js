import React, {useState} from 'react';
import { connect } from "react-redux";

import { addBook } from "../actions/shopBasket.actions";

const Book = ({ book, addBook }) => {
   const {id, title, author, currency, price, pages, cover_url} = book;

   const [quantity, setQuantity] = useState(1)

    const handleAdd = () => {
        quantity > 0 && addBook(id, title, price, cover_url, quantity);
        setQuantity(1);
    }
    return ( 
        <div>
            <li>
                <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" name="quantity" min="1" max="10"></input>
                <span>{id} </span>
                <span>{title} </span>
                <span>{author} </span>
                <span>{currency} </span>
                <span>{price} </span>
                <span>{pages} </span>
                <img src={cover_url} alt=""/>
                {/* <button onClick={() => handleAdd(book)}>Dodaj do koszyka</button> */}
                <button onClick={handleAdd}>Dodaj do kosza</button>
            </li>
        </div>
     );
}
 

const mapDispatchToProps = dispatch => ({
    addBook: (bookId, bookTitle, bookPrice, bookCover, quantity) => dispatch(addBook(bookId, bookTitle, bookPrice, bookCover, quantity ))
})


//export default Book;
export default connect(
    null,
    mapDispatchToProps
)(Book);