import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from "./Style"
import CardItems from "./CartItems/CartItems"
import {Link} from "react-router-dom"

const Cart = ({cart , handleEmptyCart, handleUpdateCartQty, handleRemoveFromCart}) => {

    const Classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1" >Your Cart is Empty.
        <Link to="/" className={Classes.link}> Add Some Item to Cart!</Link>
        </Typography>

    )

    const FilledCart = () => (
        <React.Fragment>
            <Grid container spacing={3}>
                {
                  cart.line_items.map((item) => (

                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <CardItems item={item}  handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/> 
                    </Grid>

                  ))
                }
            </Grid>
            <div className={Classes.cardDetails}>
                <Typography variant="h4">Subtotal:  {cart.subtotal.formatted_with_symbol}</Typography>
                <div className>
                    <Button className={Classes.emptyButton} onClick= {handleEmptyCart} type="button" size="large" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={Classes.checkOutButton} component={Link} to="/checkout" type="button" size="large" variant="contained" color="primary">Checkout</Button>

                </div>

            </div>
        </React.Fragment>
    )
    
    if(!cart.line_items) return "Loading..."

    return (
        <Container>
            <div className={Classes.toolbar}/>
            <Typography className={Classes.title} gutterBottom variant="h3" >Your Shoping Cart</Typography>
            {
                !cart.line_items.length? <EmptyCart/> : <FilledCart/>
            }
        </Container>
    )
}

export default Cart
