import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TextField } from 'formik-material-ui';
import { object, string, date, number, array } from 'yup';
import { useStateValue } from '../context/stateProvider';
import { actionTypes } from '../context/reducer';

const useStyles = makeStyles({
  card: {
    padding: '2rem',
    margin: '2rem',
  },
  button: {
    // padding: '2rem',
    // margin: '2rem',
    // // width: '100%'
  },
});

const PurchaseForm = () => {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  return (
    <Formik
      initialValues={{
        products: [
          {
            id: '',
            productName: '',
            purchaseDate: new Date(),
            purchasePrice: 0,
            quantity: 1,
          },
        ],
      }}
      validationSchema={object({
        products: array(
          object({
            id: string().required('Id is required'),
            productName: string().required('Please Enter a Product Name'),
            purchaseDate: date().required(),
            purchasePrice: number()
              .typeError('Purchase Price Should be a Number')
              .required('Please Enter the Purchase Price'),
            quantity: number()
              .typeError('Quantity Should be a Number')
              .required('Please Specify the Quantity'),
          })
        )
          .min(1)
          .required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(state);
        dispatch({ type: actionTypes.ADD_PRODUCT, products: values.products });
        setSubmitting(false);
        console.log(state);
        // setTimeout(() => {
        //   setSubmitting(false);
        //   alert(JSON.stringify(values, null, 2));
        // }, 500);
      }}
    >
      {({ values, submitForm, isSubmitting, errors }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form autoComplete='off'>
            {isSubmitting && <LinearProgress />}
            <FieldArray name='products'>
              {({ push, remove }) => (
                <Grid container direction='column' spacing={3}>
                  <Grid container direction='column' item spacing={3}>
                    {values.products?.map((_, index) => (
                      <Card
                        variant='outlined'
                        className={classes.card}
                        key={index}
                      >
                        <Grid container item spacing={3} direction='column'>
                          <Grid container item spacing={3} direction='column'>
                            <Grid item>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`products[${index}].id`}
                                label='Id'
                                variant='outlined'
                              />
                            </Grid>
                            <Grid item>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`products[${index}].productName`}
                                label='Product Name'
                                variant='outlined'
                              />
                            </Grid>
                            <Grid item>
                              <Field
                                fullWidth
                                component={DatePicker}
                                name={`products[${index}].purchaseDate`}
                                label='Purchase Date'
                                inputVariant='outlined'
                              />
                            </Grid>
                            <Grid item>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`products[${index}].purchasePrice`}
                                label='Purchase Price'
                                variant='outlined'
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>
                                      ₺
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <Field
                                fullWidth
                                component={TextField}
                                name={`products[${index}].quantity`}
                                label='Quantity'
                                variant='outlined'
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            alignItems='center'
                            justify='center'
                          >
                            <Grid item>
                              <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => remove(index)}
                              >
                                DELETE
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                  </Grid>
                  <Grid
                    className={classes.button}
                    container
                    item
                    direction='column'
                    spacing={3}
                  >
                    <Grid item>
                      <Button
                        fullWidth
                        variant='outlined'
                        onClick={() =>
                          push({
                            id: '',
                            productName: '',
                            purchaseDate: new Date(),
                            purchasePrice: 0,
                            quantity: 1,
                          })
                        }
                      >
                        ADD PRODUCT
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        disabled={isSubmitting}
                        onClick={submitForm}
                        startIcon={
                          isSubmitting && <CircularProgress size='1rem' />
                        }
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </FieldArray>
            <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  );
};

export default PurchaseForm;
