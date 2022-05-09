import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';

import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe('pk_test_51KxSMsINV6IQv9BYd7M1HhU6a47F2Uu41SXLHxW7HDNoyhjQr9aT6l7ufGtxsucsc2VULYIfLuSWs4U3F6gE7pjS00GHFG7mZt');

function PaymentForm({ checkoutToken, backStep, shippingData, handleCaptureCheckout, nextStep, timeout, refreshCart }) {
    console.log(checkoutToken)

    console.log(shippingData)
    //Check Stripe documentation.

    //ElementsConsumer needs to accept 2 parameters: stripe and elements
    //InsideElementsConsumer, create a form
    const handleSubmit =  async (e, stripe, elements)=>{
        e.preventDefault();

        if (!stripe || !elements) {return};
        
        //get the element
        const cardElement = await elements.getElement(CardElement);

        //use Stripe API to create payment method
        //destructure the method
        //options: type is card, card = cardElement created above^
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement});

        if(error){
            // console.log(error)
        } else {
            //create one final object containing ALL of data. Includes customer data, shipping data collected in <AddressForm/>
            //HOW TO ADD VARIANTS?
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { 
                    firstname:  shippingData.firstName, 
                    lastname: shippingData.lastName, 
                    email: shippingData.email},
                shipping: {
                    name:'Primary', 
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    country: shippingData.shippingCountry
                    },
                fulfillment: {shipping_method: shippingData.shippingOption},
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            };
            console.log(orderData)
            //one final commerce API call in App.js to fulfill an order
            handleCaptureCheckout(checkoutToken.id, orderData);
            
            //For testing without Card. Returns a fake Completion fake after
            timeout();

            nextStep();

            //for deployment purposes only. During an active payment, this function is called when card data is handled in App.js
            refreshCart();
        }
    }

  return (
    <>
        <Review checkoutToken={checkoutToken}/>
        <Divider />
        <Typography variant='h6' gutterBottom style={{ margin: '20px 0'}}>Payment method</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({ stripe, elements })=>(
                    <form onSubmit={(e)=> handleSubmit(e, stripe, elements)}>
                        <CardElement stripe={stripe} elements={elements}/>
                        <br/>
                        <br/>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <Button variant='outlined' onClick={backStep}>Back</Button>
                            <Button type='submit' variant='contained' disabled={!stripe} color="primary">Pay</Button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
    </>
  )
}

export default PaymentForm