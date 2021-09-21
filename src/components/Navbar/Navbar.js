import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import React from 'react'
import useStyles from "./Style"
import {Link, useLocation} from "react-router-dom"

 const Navbar = ({totalItems}) => {
     const classes= useStyles();

     const location =useLocation();
    return (
        <>
        <AppBar position="fixed"  className={classes.appBar}>
            <Toolbar>
                <Typography component={Link} to="/"  variant="h6" color="inherit" className={classes.title}>
                    <img src='' alt="" height="25px" className={classes.image}/>
                    E-commerce
                </Typography>
                <div className={classes.grow}/>

                {
                       location.pathname==="/" &&  ( 

                       <div className={classes.menubutton}>
                        <IconButton component={Link} to="/cart"  aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
    
                    </div>
                    )
                }
               
            </Toolbar>

        </AppBar>
            
        </>

    )
}
export default Navbar
