import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from '../Utilities/DatePicker';
import { Button, InputAdornment } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import * as yup from 'yup';
import { useFormik } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  purchasePrice: yup.number('Enter a number').required('Price is required'),
  quantity: yup.number('Enter a number').required('Quantity is required'),
  id: yup.string().required('Id is required'),
  productName: yup.string().required('Product Name is required'),
});

export default function BasicTextFields() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      id: '',
      productName: '',
      purchasePrice: 0,
      quantity: 1,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      className={classes.root}
      autoComplete='off'
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id='id'
        label='Id'
        variant='standard'
        name='id'
        value={formik.values.id}
        onChange={formik.handleChange}
        error={formik.touched.id && Boolean(formik.errors.id)}
        helperText={formik.touched.id && formik.errors.id}
      />
      <TextField
        id='productName'
        label='Product Name'
        variant='standard'
        name='productName'
        value={formik.values.productName}
        onChange={formik.handleChange}
        error={formik.touched.productName && Boolean(formik.errors.productName)}
        helperText={formik.touched.productName && formik.errors.productName}
      />
      <DatePicker />
      <TextField
        id='purchasePrice'
        label='Purchase Price'
        variant='standard'
        InputProps={{
          startAdornment: <InputAdornment position='start'>₺</InputAdornment>,
        }}
        name='purchasePrice'
        value={formik.values.purchasePrice}
        onChange={formik.handleChange}
        error={
          formik.touched.purchasePrice && Boolean(formik.errors.purchasePrice)
        }
        helperText={formik.touched.purchasePrice && formik.errors.purchasePrice}
      />
      <TextField
        id='quantity'
        label='Quantity'
        variant='standard'
        name='quantity'
        value={formik.values.quantity}
        onChange={formik.handleChange}
        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
        helperText={formik.touched.quantity && formik.errors.quantity}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        size='large'
        className={classes.button}
        endIcon={<Send />}
      >
        Add
      </Button>
    </form>
  );
}
