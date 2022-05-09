import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details']


function Checkout({ cart, order, handleCaptureCheckout, error, refreshCart }) {

  
  //state for current step
  const [activeStep, setActiveStep] = useState(0);
  //state for checkoutToken, start NULL
  const [checkoutToken, setCheckoutToken] = useState(null)
  //shippingData, start empty
  const [shippingData, setShippingData] = useState({});

  /////////for deploying WITHOUT card
  const [isFinished, setIsFinished] = useState(false);

  //useNavigate
  const navigate = useNavigate();

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
        //error mostly occurs when refreshing pages while ordering
        console.log(err)
        //If there is an error, go back to home page
        // navigate('/');
      }
    }
    //calling the method
    generateToken()
  }, [cart])

  //Control chekcout progress
  const nextStep = ()=>{
    setActiveStep((prevStep)=>prevStep+1)
  }

  const backStep = ()=>{
    setActiveStep(prevStep=>prevStep-1)
  }

  //function to retrieve form data, then call next step
  const next = (data)=>{
    setShippingData(data);
    nextStep();
  }

  ////////////////////////////////////////////For deploying WITHOUT a card
  const timeout = ()=>{
    setTimeout(()=>{
      setIsFinished(true)
    }, 2500)
  }

  //functional component that renders JSX
  const Form = ()=> activeStep===0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} nextStep={nextStep} timeout={timeout} refreshCart={refreshCart}/>

    if (order.customer){
      console.log(order.customer)
    }
    //confirmation page
  let Confirmation= ()=> order.customer? (
          <>
              <Typography variant='h5'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
              <Divider />
              <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
              <br/>
              <Button variant='outlined' type='button' component={Link} to='/'>Return to Home</Button>
            </>
      ) : isFinished? (
            //THIS IS AN ALTERNATIVE FOR DEPLOYING. Credit Card is disabled on Commerce.js. To actually complete transaction (and receive sale email, simnply turn card back on in Stripe/Commerce.js)
            <>
              <Typography variant='h5'>Thank you for your purchase</Typography>
              <Divider />
              <br/>
              <Button variant='outlined' type='button' component={Link} to='/'>Return to Home</Button>
            </>
            
      ) : (
          <div className='spinner'>
              <CircularProgress />
          </div>
      )
  
      if (error){
        <>
          <Typography variant='h5'>Error: {error}</Typography>
          <br/>
          <Button variant='outline' type='button' component={Link} to='/'>Return to Home</Button>
        </>}


  return (
    <>
      <CssBaseline />
      <div className="toolbarMargin" />
      <main >
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