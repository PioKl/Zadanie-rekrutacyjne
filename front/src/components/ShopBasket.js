import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBook } from "../actions/shopBasket.actions";
import '../style/ShopBasket.scss';

const ShopBasket = ({ shopBasket, deleteBook }) => {
    const handleDelete = (i) => {
        deleteBook(shopBasket[i].id)
      }
    console.log(shopBasket)
    return ( 
        <div className="shopBasket">
{/*           <p>Jestem koszem</p>
          {shopBasket.map((item, i) => (
            <li key={i}>
              <span>{item.title} </span>
              <span>{item.quantity} </span>
              <span>{item.price}zł </span>
              <img src={item.cover} alt=""/>
              <button onClick={() => handleDelete(i)}>Usuń</button>
            </li>
          ))} */}
          {shopBasket.length > 0 ?
            <>
              {shopBasket.map((item, i) => (
                <div className="shopBasket__book" key={i}>
                  <div className="shopBasket__cover-container">
                    <h1 className="shopBasket__section-name">Okładka</h1>
                    <img className="shopBasket__cover-img" src={item.cover} alt=""/>
                  </div>
                  <div className="shopBasket__container">
                    <h1 className="shopBasket__section-name">Tytuł</h1>
                    <span className="shopBasket__section-information">{item.title}</span>
                  </div>
                  <div className="shopBasket__container">
                    <h1 className="shopBasket__section-name">Ilość</h1>
                    <span className="shopBasket__section-information shopBasket__section-information--quantity">{item.quantity}</span>
                  </div>
                  <div className="shopBasket__container">
                    <h1 className="shopBasket__section-name">Cena</h1>
                    <span className="shopBasket__section-information shopBasket__section-information--price">{item.price} zł </span>
                  </div>
                  <div className="shopBasket__delete-container">
                    <button title="Usuń z koszyka"className="button shopBasket__deleteButton" onClick={() => handleDelete(i)}></button>          
                  </div>      
{/*                   <div className="shopBasket__orderInformation">
                    <h1>Tytuł: {item.title} </h1>
                    <h1>Ilość: {item.quantity} </h1>
                    <h1>Cena: {item.price} zł </h1>
                    <button onClick={() => handleDelete(i)}>Usuń</button>
                  </div> */}
                  
                </div>
              ))}
              <NavLink to="/podsumowanie"><button>Dalej</button></NavLink>
            </>
            :
            <h1 className="shopBasket__emptyBasket">Koszyk jest pusty</h1>
          }
        </div>
     );
}

const mapStateToProps = state =>  ({
    shopBasket: state.shopBasket
  });

const mapDispatchToProps = dispatch => ({
    deleteBook: (id) => dispatch(deleteBook(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopBasket);