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
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="header">
          <NavLink to="/">
              <button className="header__mainSiteButton">Księgarnia GWO</button>
          </NavLink>
          <NavLink to="/koszyk">
              <button title="Twój koszyk" className="header__shopBasketButton">
                <span className="header__shopBasketCounter">{shopBasket.length >= 0 && shopBasket.length}</span> 
              </button>
          </NavLink>
        </header>
        <main className="main">
        <Switch>
          <Route exact path="/">
            <div className="books-container">
                {books.map(book => (
                  <Book key={book.id} book={book}/>
                ))}
            </div>
          </Route>
          <Route path="/koszyk" component={ShopBasket}></Route>
          {/* {shopBasket.length > 0 && <Route path="/podsumowanie" component={Summary}></Route>} */} {/* rozwiazanie 2 */}
          <Route path="/podsumowanie" component={Summary}></Route>
          {/* <Route render={() => <main className="main main--error"><p>Wrong page</p></main>}/> */}
          <Route>
            <div className="wrong-page">
              <h1 className="wrong-page__title">Wrong page</h1>
            </div> 
          </Route>
        </Switch>
        </main>
      </div>
    </Router>
  );
}

const mapStateToProps = state =>  ({
  shopBasket: state.shopBasket
});


export default connect(mapStateToProps)(App);

//export default App;
