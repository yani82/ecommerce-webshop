import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png' 
import useStyles from './navbarStyles'; 
import { Link, useLocation } from 'react-router-dom'

const PrimarySearchAppBar = ({ totalItems }) => {
    
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const classes = useStyles();
    const location = useLocation(); 
  
    return (
    <>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography>
                    <img src={logo} alt='Commerce.js' height='25px' className={classes.image} />
                    Commerce.js
                </Typography>
                <div className={classes.grow}/>
                {location.pathname === '/' && (
                <div className={classes.button}>
                    <Link to="/cart">go to cart</Link>
                    <IconButton component={Link} aria-label="Show cart items" color='inherit'> 
                        <Badge badgeContent={totalItems} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
                )}
            </Toolbar>
        </AppBar>

    </>
  )
}

export default Navbar