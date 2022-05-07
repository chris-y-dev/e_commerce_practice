import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import {Link, useLocation} from 'react-router-dom'

import logo from '../../assets/e_commerce.png';
import './styles.css';

function Navbar({numOfItems}) {

    const location = useLocation();

    

  return (
    <>
        <AppBar position="fixed" color="inherit" className="navbar">
            <Toolbar>
                <Typography variant="h6" color="inherit" className="navbarBrand" component={Link} to="/">
                    <img src={logo} alt='E_commerce_practice' height="25px" className="navbarLogo" />
                    E-Commerce_Practice
                </Typography>
                <div className="navbarFill" />
                {location.pathname === '/'? 
                    <div>
                        {/* <Link to="/cart">go to cart</Link> */}
                        <IconButton aria-label="show cart items" component={Link} to="/cart">
                            <Badge badgeContent={numOfItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    : null}
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar;