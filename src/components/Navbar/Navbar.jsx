import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';

import logo from '../../assets/e_commerce.png';
import './styles.css';

function Navbar({numOfItems}) {
  return (
    <>
        <AppBar position="fixed" color="inherit" className="navbar">
            <Toolbar>
                <Typography variant="h6" color="inherit" className="navbarBrand">
                    <img src={logo} alt='E_commerce_practice' height="25px" className="navbarLogo" />
                    E-Commerce_Practice
                </Typography>
                <div className="navbarFill" />
                <div>
                    <IconButton aria-label="show cart items">
                        <Badge badgeContent={numOfItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar;