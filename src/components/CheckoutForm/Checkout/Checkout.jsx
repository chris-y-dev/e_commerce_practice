import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import './Checkout.css';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Confirmation from '../Confirmation';
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details']


function Checkout({ cart }) {

  
  //state for current step
  const [activeStep, setActiveStep] = useState(0);
  //state for checkoutToken, start NULL
  const [checkoutToken, setCheckoutToken] = useState(null)
  //shippingData, start empty
  const [shippingData, setShippingData] = useState({});

  useEffect(()=>{
    //Create a function to generate checkoutID token
    const generateToken = async()=>{
      try{
        //pass 2 parameters to create token (from cart obj, and options)
        const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
        console.log(token)
        //setting state to the token
        setCheckoutToken(token)
      } catch(err){
        console.error(err)
      }
    }
    //calling the method
    generateToken()
  }, [cart])

  //function to retrieve form data, then call next step
  const next = (data)=>{
    setShippingData(data);
    nextStep();
  }

  //Control chekcout progress
  const nextStep = ()=>{
    setActiveStep(prevStep=>prevStep+1)
  }

  const backStep = ()=>{
    setActiveStep(prevStep=>prevStep-1)
  }

  //functional component that renders JSX
  const Form = ()=> activeStep===0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData}/>

  return (
    <>
      <div className="toolbarMargin" />
      <main>
        <Paper className='formContainer'>
          <Typography variant='h4' alight='center'>Checkout</Typography>
          <Stepper activeStep={activeStep}>
              {steps.map((step)=>{
                return <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>
              })}
          </Stepper>
          {activeStep===steps.length? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>

    </>
  )
}

export default Checkout