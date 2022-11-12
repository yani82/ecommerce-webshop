import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form'; 

function FormInput({ name, label }) {
    const { control } = useFormContext();
    const isError = false; 
  
    return (
    <Grid item xs = {12} sm = {6}>
        <Controller 
            as = {TextField}
            control = {control}
            fullWidth
            name = {name}
            label = {label}
            required
            error = {isError}
            />
    </Grid>
  );
}

export default FormInput; 