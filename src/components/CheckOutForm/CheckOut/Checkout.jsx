import React, { useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import { ScatterPlotSharp, SettingsPowerSharp } from '@material-ui/icons';
import useStyles from './checkoutStyles'; 
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm'; 

const steps = ['Shipping address', 'Payment details']; 

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles(); 

    const Confirmation = () => (order.customer ? (
        <>
        <div> 
            Confirmation
        </div>
        </>
    );

    const Form = () => (activeStep === 0 
        ? <AddressForm /> 
        : <PaymentForm />); 

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={0} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout

