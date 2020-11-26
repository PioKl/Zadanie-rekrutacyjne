import React, {useState, useEffect } from 'react';
import '../style/App.scss';
import axios from 'axios';
import Book from './Book';
import ShopBasket from './ShopBasket';
import Summary from './Summary';
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

function App({ shopBasket }) {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/book')
      .then(response => {
        console.log(response.data.data);
        setBooks(response.data.data);
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  console.log(shopBasket)
  return (
    <Router>
      <div className="App">
        <NavLink to="/">
          <button>Strona główna</button>
        </NavLink>
      <Switch>
        <Route exact path="/">
          <div>
            <NavLink to="/koszyk"><button>Koszyk {shopBasket.length > 0 && shopBasket.length}</button></NavLink>
          </div>
          {books.map(book => (
            <Book key={book.id} book={book}/>
          ))}
        </Route>
        <Route exact path="/koszyk" component={ShopBasket}></Route>
        <Route exact path="/podsumowanie" component={Summary}></Route>
      </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state =>  ({
  shopBasket: state.shopBasket
});


export default connect(mapStateToProps)(App);

//export default App;
