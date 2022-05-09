import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label }) {
    //destructure control functions from useFormContext
    const { control } = useFormContext();

    //controller allows us to use ANY input fields. In this case, we will use field from Material UI
    //Provide all properties for Controller
  return (
    <Grid item xs={12} sm={6}>
        <Controller 
            defaultValue=''
            control={control}
            name={name}
            render = {({ field})=> (
                <TextField
                    name={name}
                    fullWidth
                    {...field}
                    label={label}
                    required
                />
            )}
        />
    </Grid>
  )
}

export default FormInput;