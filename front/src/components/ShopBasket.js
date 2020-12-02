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
          {shopBasket.length > 0 ?
            <>
              <table className="table basket-table">
                <thead>
                  <tr className="basket-table__row basket-table__row--header">
                    <th className="basket-table__item-header basket-table__item-header--cover">Okładka</th>
                    <th className="basket-table__item-header basket-table__item-header--title">Tytuł</th>
                    <th className="basket-table__item-header basket-table__item-header--price">Cena</th>
                    <th className="basket-table__item-header basket-table__item-header--quantity">Ilość</th>
                    <th className="basket-table__item-header basket-table__item-header--delete">Usuń</th>
                  </tr>
                </thead>
                <tbody className="basket-table__body">
                  {shopBasket.map((item, i) => (
                    <tr className="basket-table__row basket-table__row--body" key={i}>
                      <td className="basket-table__data basket-table__data--cover">
                        <img className="basket-table__img" src={item.cover} alt=""/>
                      </td>
                      <td className="basket-table__data basket-table__data--title">{item.title}</td>
                      <td className="basket-table__data basket-table__data--price">{item.price * item.quantity} zł</td>
                      <td className="basket-table__data basket-table__data--quantity">{item.quantity}</td>
                      <td className="basket-table__data basket-table__data--delete">
                        <button title="Usuń z koszyka"className="basket-table__deleteButton" onClick={() => handleDelete(i)}>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <NavLink className="shopBasket__nextButton-container" to="/podsumowanie">
                <button className="shopBasket__nextButton">Dalej</button>
              </NavLink>
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