import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import './Checkout/Checkout.css'

import { commerce } from '../../lib/commerce';

function AddressForm({ checkoutToken, next }) {
    const methods = useForm();
    
    //////////////////////////////////States

    //state for shipping country
    const [shippingCountries, setShippingCountries] = useState([]);
    //for ONE country selected
    const [shippingCountry, setShippingCountry] = useState('');

    //all subdivisions
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    //for ONE country selected
    const [shippingSubdivision, setShippingSubdivision] = useState('');

    //all options
    const [shippingOptions, setShippingOptions] = useState([]);
    //for ONE country selected
    const [shippingOption, setShippingOption] = useState('');


    /////////////////////////////////////////////////////Destructing

    //from countries [shippingCountries] state object, map over each country, Destructure the array into Objects with name/label. 
    const countries = Object.entries(shippingCountries)
    .map(([code, name])=>({id:code, label:name}))

    console.log(countries)

    //Destructure subdivisions
    const subdivisions = Object.entries(shippingSubdivisions)
    .map(([code, name])=>({id:code, label:name}))
    console.log(subdivisions)

    //Destructure shipping option to retrieve id, and create label
    const options = shippingOptions.map((option)=>({id: option.id, label: `${option.description} - ${option.price.formatted_with_symbol}`}))

    console.log(options)

    ////////////////////////////////////////////////////Fetch functions
    //fetch shipping data from API
    const fetchShippingCountries = async (checkoutTokenId)=>{
        const response = await commerce.services.localeListShippingCountries(checkoutTokenId);

        console.log(response.countries)
        //set Array of all 
        setShippingCountries(response.countries);
        //set country to ONE specific country ([0] retrieves the code)
        setShippingCountry(Object.keys(response.countries)[0])
        console.log(shippingCountry)
    }

    //AFTER getting Country
    const fetchSubdivisions = async (countryCode)=>{
        const response = await commerce.services.localeListSubdivisions(countryCode);

        console.log(response.subdivisions)
        setShippingSubdivisions(response.subdivisions);
        setShippingSubdivision(Object.keys(response.subdivisions)[0]);
    }

    const fetchShippingOptions = async(checkoutTokenId, country, region=null)=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

        console.log(options)
        setShippingOptions(options);
        //set option to the first one
        setShippingOption(options[0].id)
    }

    //when form renders, immediately get countries
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    }, [])

    //create ANOTHER useEffect that is dependent on shippingCountry
    useEffect(()=>{
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);

    //another useEffect dependent on shippingSubdivision
    useEffect(()=>{
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

    //Destructure different form methods inside FormProvider
    //We want to use Material UI form inputs (aeshtetics and formatting). To combine Mat-UI and ReactHookForm -> Need to create ANOTHER component (CustomTextField)
    return !shippingCountry? (
        <div className='spinner'>
            <CircularProgress />
        </div>
    ) : (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First name' />
                        <FormInput name='lastName' label='Last name' />
                        <FormInput name='address1' label='address' />
                        <FormInput name='email' label='email' />
                        <FormInput name='city' label='city' />
                        <FormInput name='postalCode' label='ZIP/Postal code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>{setShippingCountry(e.target.value)}}>
                            {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                            ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision/State</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                            {subdivisions.map((subdivision)=>(
                                <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                            ))
                            }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant='outlined' type='button' component={Link} to='/cart'>Back to Cart</Button>
                        <Button variant='contained' type='submit' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm