import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import './Checkout.css';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Confirmation from './Confirmation';

const steps = ['Shipping address', 'Payment details']


function Checkout() {

  //state for current step
  const [activeStep, setActiveStep] = useState(0);

  const Form = ()=> activeStep===0
    ? <AddressForm />
    : <PaymentForm />

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
          {activeStep===steps.length? <Confirmation /> : <Form />}
        </Paper>
      </main>

    </>
  )
}

export default Checkout