import React, { useState } from 'react';
import { connect } from "react-redux";
import '../style/Book.scss';
import { addBook } from "../actions/shopBasket.actions";
import { ReactComponent as Cart } from '../svg/cart.svg';

const Book = ({ book, addBook }) => {
    const { id, title, author, currency, price, pages, cover_url } = book;

    const [quantity, setQuantity] = useState(1)

    const handleAdd = () => {
        quantity > 0 && addBook(id, title, price, cover_url, quantity);
        setQuantity(1);
    }
    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    const handlePlus = () => {
        if (quantity >= 0 && quantity < 10) {
            setQuantity(quantity + 1)
        }
    }
    console.log(quantity)
    return (
        <div className="book-card">
            <img title={`Okładka: ${title}`} className="book-card__img" src={cover_url} alt="" />
            <h2 title={`Tytuł: ${title}`} className="book-card__title">{title} </h2>
            <h3 title={`Autor: ${author}`} className="book-card__author">{author.charAt(0).toUpperCase() + author.slice(1)} </h3>
            {/* <p className="book-card__price">Cena: {price} {currency}</p> */}
            <p title={`Liczba stron: ${pages}`} className="book-card__pages">Liczba stron: {pages}</p>
            <div className="book-card__order">
                {/*                 <div>
                    <button onClick={handleMinus}>-</button>
                    <input type="text" onChange={(e) => setQuantity(parseInt(e.target.value, 10))} value={quantity} />
                    <button onClick={handlePlus}>+</button>
                </div> */}
                <div className="quantity book-card__quantity-container">
                    <button title="Zmniejsz ilość" onClick={handleMinus} className="btn minus1 book-card__quantityButton book-card__quantityButton--reduce">-</button>
                    <input title="Ilość książek do koszyka" className="quantityy book-card__quantityInput" value={quantity} onChange={(e) => setQuantity(e.target.value <= 10 && parseInt(e.target.value, 10))} type="number" name="quantity" min="1" max="10"></input>
                    <button title="Zwiększ ilość" onClick={handlePlus} className="btn add1 book-card__quantityButton book-card__quantityButton--add">+</button>
                </div>
                {/*                 <input title="Ilość książek do koszyka" className="book-card__quantityInput" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} type="number" name="quantity" min="1" max="10"></input> */}
                {/* <span>{id} </span> */}
                {/* <span>{currency} </span> */}
                {/* <span>{pages} </span> */}
                {/* <button onClick={() => handleAdd(book)}>Dodaj do koszyka</button> */}
                <button title="Dodaj do koszyka" className="book-card__addToBasketButton" onClick={handleAdd}>
                    <span className="book-card__addToBasketButtonTitle">Dodaj do koszyka</span>
                </button>
            </div>

        </div>
    );
}


const mapDispatchToProps = dispatch => ({
    addBook: (bookId, bookTitle, bookPrice, bookCover, quantity) => dispatch(addBook(bookId, bookTitle, bookPrice, bookCover, quantity))
})


//export default Book;
export default connect(
    null,
    mapDispatchToProps
)(Book);