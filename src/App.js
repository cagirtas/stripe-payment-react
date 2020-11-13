import React, {useState} from 'react';
import './App.css';
import StripeCheckOut from 'react-stripe-checkout'


function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: "10",
    productBy: "Facebook"
  })

  const makePayment = token => {
    const body = {
      token, 
      product
    }
    const headers = {
      "Content-Type": 'application/json'
    }
    return fetch(`http://localhost:8282/payment`,{
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log('RESPONSE', response)
      const {status} = response
      console.log("STATUS", status)
    })
    .catch(error => console.log(error))
  }

  return (
    <div style={{margin: 'auto', width: '50%', paddingLeft: '15%', paddingTop: '20%'}}>
      <StripeCheckOut stripeKey={process.env.REACT_APP_PUBLIC_KEY} token={makePayment} name='Buy React' amount={product.price * 100} /* shippingAddress billingAddress */>
        <button className='btn-large pink'>Buy react now {product.price} $</button>
        </StripeCheckOut>

    </div>
  );
}

export default App;
