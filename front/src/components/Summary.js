import React, {useState} from 'react';
import { connect } from "react-redux";
import { resetBook } from "../actions/shopBasket.actions";
import axios from 'axios';

const Summary = ({ shopBasket, resetBook }) => {
    const [userName, setUserName] = useState("");
    const [userSurName, setUserSurName] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userZipCode, setUserZipCode] = useState("");
    const [checkStatus, setCheckStatus] = useState("");

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
        }).catch(error => setCheckStatus(error))
        setUserName("");
        setUserSurName("");
        setUserCity("");
        setUserZipCode("")
        orderedBooks = [];
        resetBook();
    }
console.log(checkStatus)
console.log(shopBasket)
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Imię:
                    <input type="text" id="name" name="name" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                </label>
                <label htmlFor="surname">Nazwisko:
                    <input type="text" id="surname" name="surname" value={userSurName} onChange={(e) => setUserSurName(e.target.value)}required/>
                </label>
                <label htmlFor="city">Miejscowość:
                    <input type="text" id="city" name="city" value={userCity} onChange={(e) => setUserCity(e.target.value)} required/>
                </label>
                <label htmlFor="zipCode">Kod pocztowy:
                    <input id="zipCode" name="zipCode" type="text" inputMode="numeric" value={userZipCode} onChange={(e) => setUserZipCode(e.target.value)} pattern="\d{2}-\d{3}" required/>
                </label>
                <button>Zamawiam i płacę</button>
                {/* <button onClick={handleSubmit}>Zamawiam i płacę</button> */}
            </form>
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