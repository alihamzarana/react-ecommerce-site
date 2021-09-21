import React,{useState, useEffect} from 'react'
import useStyles from "./Style"
import { Paper, Typography, Stepper, Step, StepLabel } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ["Shipping Address", "Payment Details"]
const CheckOut = ({cart}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    const classes = useStyles();

    const Confirmation = () => (
        <div> confirmation</div>
    )

    const nextStep = () => setActiveStep((prevStep) => prevStep + 1)
    const backStep = () => setActiveStep((prevStep) => prevStep - 1)

    const Next = (data) => {
        setShippingData(data)
        nextStep();
        
    }
    useEffect( () => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: "cart"});
            // console.log(token)
            setCheckoutToken(token)
                
            } catch (error) {
                
            }
            
       }
       generateToken();

    }, [cart])


    const Form  = () =>  activeStep === 0 ? 
    <AddressForm checkoutToken={checkoutToken} next={Next}/> : <PaymentForm backStep={backStep} shippingData={shippingData} checkoutToken={checkoutToken}/>


    return (
        <React.Fragment>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                        ))}
                    </Stepper>
                    {
                        activeStep === steps.length? <Confirmation/> : checkoutToken && <Form/>
                    }
                </Paper>
            </main>
            
        </React.Fragment>
        
    )
}

export default CheckOut
