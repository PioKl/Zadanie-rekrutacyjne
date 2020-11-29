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
{/*               <table>
                <tbody>
                  <tr className="basket-table__row basket-table__row--header">
                    <th className="basket-table__item-header basket-table__item-header--cover spr1">Okładka</th>
                    <th className="basket-table__item-header basket-table__item-header--title spr2">Tytuł</th>
                    <th className="basket-table__item-header basket-table__item-header--price">Cena</th>
                    <th className="basket-table__item-header basket-table__item-header--delete">Usuń</th>
                  </tr>
                </tbody>
              </table> */}
              <table className="table basket-table">
                <thead>
                  <tr className="basket-table__row basket-table__row--header">
                    <th className="basket-table__item-header basket-table__item-header--cover spr1">Okładka</th>
                    <th className="basket-table__item-header basket-table__item-header--title spr2">Tytuł</th>
                    <th className="basket-table__item-header basket-table__item-header--price">Cena</th>
                    <th className="basket-table__item-header basket-table__item-header--quantity">Ilość</th>
                    <th className="basket-table__item-header basket-table__item-header--delete">Usuń</th>
                  </tr>
                </thead>
                <tbody className="cialo">
                  {shopBasket.map((item, i) => (
                    <tr className="basket-table__row basket-table__row--body" key={i}>
                      <td className="basket-table__data basket-table__data--cover sprImg">
                        <img className="basket-table__img sprImg2" src={item.cover} alt=""/>
                      </td>
                      <td className="basket-table__data basket-table__data--title titlee">{item.title}</td>
                      <td className="basket-table__data basket-table__data--price titlee">{item.price * item.quantity} zł</td>
                      <td className="basket-table__data basket-table__data--quantity titlee">{item.quantity}</td>
                      <td className="basket-table__data basket-table__data--delete titlee">
                        <button title="Usuń z koszyka"className="button basket-table__deleteButton" onClick={() => handleDelete(i)}>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
{/*               {shopBasket.map((item, i) => (
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

                  //Od tego momentu      
                 <div className="shopBasket__orderInformation">
                    <h1>Tytuł: {item.title} </h1>
                    <h1>Ilość: {item.quantity} </h1>
                    <h1>Cena: {item.price} zł </h1>
                    <button onClick={() => handleDelete(i)}>Usuń</button>
                  </div>
                  //Do tego zakomentowane bylo
                </div>
              ))} */}
              <NavLink className="shopBasket__nextButton-container" to="/podsumowanie"><button className="button shopBasket__nextButton">Dalej</button></NavLink>
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