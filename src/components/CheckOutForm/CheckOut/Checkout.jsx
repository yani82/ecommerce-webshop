import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
// import { ScatterPlotSharp, SettingsPowerSharp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './checkoutStyles'; 
import AddressForm from '../AddressForm';
import PaymentForm from './PaymentForm'; 
// ^ check . or .. for source of PaymentForm file 
import { commerce } from '../../../lib/commerce'; 


const steps = ['Shipping address', 'Payment details']; 

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null); 
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState({ false });
    const classes = useStyles(); 
    const history = useHistory();
     
    useEffect(() => {
        if (cart.id) {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                // console.log(token); 

                setCheckoutToken(token); 

            } catch {
                if (activeStep !== steps.length) history.push('/'); 
                // history.pushState?   
            }
        }; 

        generateToken(); 
    }
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        // next not test?
        setShippingData(data); 

        nextStep(); 
    }

    const timeout = () => {
        setTimeout(() => {
            console.log('Hello, World!')
        }, 3000);
    }

    let Confirmation = () => (order.customer ? (
        <>
        <div> 
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
    ) : isFinished ? (
        <>
        <div> 
            <Typography variant="h5">Thank you for your purchase!</Typography>
            <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    ));

    if (error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br /> 
                <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>
        );
    };
    
    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} next={next} /> 
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />; 
        // (before activeStep and after />)
  return (
    <>
        <CssBaseline /> 
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                            {/* replaced label with step */}
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  );
};

export default Checkout;

// maybe change all style files back to just styles 
//  run npm run build
//  reveal finder 
