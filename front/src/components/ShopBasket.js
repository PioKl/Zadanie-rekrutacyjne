import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBook } from "../actions/shopBasket.actions";

const ShopBasket = ({ shopBasket, deleteBook }) => {
    const handleDelete = (i) => {
        deleteBook(shopBasket[i].id)
      }
    console.log(shopBasket)
    return ( 
        <div>
           <p>Jestem koszem</p>  
           {shopBasket.map((item, i) => (
              <li key={i}>
                <span>{item.title} </span>
                <span>{item.quantity} </span>
                <span>{item.price}zł </span>
                <img src={item.cover} alt=""/>
                <button onClick={() => handleDelete(i)}>Usuń</button>
              </li>
            ))}
            {shopBasket.length > 0 && 
                <NavLink to="/podsumowanie"><button>Dalej</button></NavLink>
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