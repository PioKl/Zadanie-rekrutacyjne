import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { resetBook } from "../actions/shopBasket.actions";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import '../style/Summary.scss';

const Summary = ({ shopBasket, resetBook }) => {
    const [userName, setUserName] = useState("");
    const [userSurName, setUserSurName] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userZipCode, setUserZipCode] = useState("");
    const [checkStatus, setCheckStatus] = useState("");
    const [postStatus, setPostStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let orderedBooks = []
        shopBasket.forEach((item,i) => {
            orderedBooks[i] = {"id": item.bookId, "quantity": item.quantity}
        });
        console.log(orderedBooks)
        axios.post(`http://localhost:3001/api/order`, {
            order: 
                orderedBooks
            ,
            first_name: JSON.stringify(userName),
            last_name: JSON.stringify(userSurName),
            city: `"${userCity}"`, //inny sposób
            zip_code: JSON.stringify(userZipCode)
          }).then(response => {
          console.log(response);
          setPostStatus(response.status)
        }).catch(error => setCheckStatus(error))
        setUserName("");
        setUserSurName("");
        setUserCity("");
        setUserZipCode("")
        orderedBooks = [];
        resetBook();
/*         setTimeout(() => { //rozwiazanie 2
            resetBook();
        },10333)  */
    }
console.log(checkStatus);
console.log(shopBasket);

const [timeLeft, setTimeLeft] = useState(10);


  useEffect(() => {
    if (!timeLeft) return; //gdy === true to zakoncz

     const interval = setInterval(() => {
        postStatus === 201 && setTimeLeft(timeLeft - 1)
      }, 1000);

    //wyczyszczenie interwalu
    return () => clearInterval(interval);

    //jeśli następuje update, którejś z wartośći, wtedy wywołaj
  }, [timeLeft, shopBasket, postStatus]);

  console.log(postStatus)
  console.log(shopBasket)

  const handleInputName = (e) => {
      e.target.setCustomValidity("Wpisz swoje imię!");  
  }
  const handleInputSurName = (e) => {
    e.target.setCustomValidity("Wpisz swoje nazwisko!");
  }
  const handleInputCity = (e) => {
    e.target.setCustomValidity("Wpisz swoje miasto!");
  }
  const handleInputZipCode = (e) => {
    e.target.setCustomValidity("Wpisz swój adres pocztowy (układ 00-000)!");
  }
  console.log(postStatus)
  console.log(timeLeft)
    return ( 
        <div className="summary">
            {/* {postStatus !== 201 &&  */}  {/* rozwiazanie 2 */}
            {shopBasket.length > 0 && 
            <form className="summary__form" onSubmit={handleSubmit}>
                <label className="summary__item" htmlFor="name">Imię:
                    <input className="summary__input" type="text" id="name" name="name" value={userName} onChange={(e) => setUserName(e.target.value)} onInvalid={handleInputName} onInput={(e) => e.target.setCustomValidity("")} required/>
                </label>
                <label className="summary__item" htmlFor="surname">Nazwisko:
                    <input className="summary__input" onInvalid={handleInputSurName} type="text" id="surname" name="surname" value={userSurName} onChange={(e) => setUserSurName(e.target.value)} onInput={(e) => e.target.setCustomValidity("")} required/>
                </label>
                <label className="summary__item" htmlFor="city">Miejscowość:
                    <input className="summary__input" type="text" id="city" name="city" value={userCity} onChange={(e) => setUserCity(e.target.value)} 
                    onInvalid={handleInputCity} onInput={(e) => e.target.setCustomValidity("")} required/>
                </label>
                <label className="summary__item" htmlFor="zipCode">Kod pocztowy:
                    <input className="summary__input" id="zipCode" name="zipCode" type="text" inputMode="numeric" value={userZipCode} onChange={(e) => setUserZipCode(e.target.value)} pattern="\d{2}-\d{3}" placeholder="Układ 00-000" onInvalid={handleInputZipCode} onInput={(e) => e.target.setCustomValidity("")} required/>
                </label>
                <button className="summary__order">Zamawiam i płacę</button>
            </form>
            }
                {shopBasket.length === 0 &&  postStatus !== 201 && <p className="summary__emptySummary">Nie ma niczego w koszyku, nie można podsumować i zapłacić!</p> }
                {postStatus === 201 && <p className="summary__completed">Zakupiono! Za {timeLeft} sekund zostaniesz przekierowany na strone główną</p> }
                {/* {shopBasket.length === 0 && <Redirect to="/"/>} */}
                {/* {timeLeft === 0 && resetBook()} */}
                {/* {timeLeft === 0 && shopBasket.length === 0 && <Redirect to="/"/>} */}
                {/* {timeLeft} */}
                {timeLeft === 0 && <Redirect exact to="/"/>}
        </div>
     );
}

const mapStateToProps = state => ({
    shopBasket: state.shopBasket
})

const mapDispatchToProps = dispatch => ({
    resetBook: () => dispatch(resetBook())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Summary);