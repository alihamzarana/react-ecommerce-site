import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from './FormInput';
import {commerce} from "../../lib/commerce"
import { Link } from 'react-router-dom';


const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
  
    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
  
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };
  
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
  
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
  
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
  
      setShippingOptions(options);
      setShippingOption(options[0].id);
    };
  
    useEffect(() => {
      fetchShippingCountries(checkoutToken.id);
    }, []);
  
    useEffect(() => {
      if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
  
    useEffect(() => {
      if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);
  
    return (
      <>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
            <Grid container spacing={3}>
              <FormInput name="firstName" label="First name" />
              <FormInput name="lastName" label="Last name" />
              <FormInput name="address1" label="Address line 1" />
              <FormInput name="email" label="Email" />
              <FormInput name="city" label="City" />
              <FormInput name="zip" label="Zip / Postal code" />
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                  {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                  {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Options</InputLabel>
                <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                  {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
              <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
        </FormProvider>
      </>
    );
  };
  
  export default AddressForm;


// const AddressForm = ({checkoutToken}) => {
//     const methods = useForm();

//     const [shippingCountries, setShippingCountries] = useState([]);
//     const [shippingCountry, setShippingCountry] = useState('');
//     const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
//     const [shippingSubdivision, setShippingSubdivision] = useState('');
//     const [shippingOptions, setShippingOptions] = useState([]);
//     const [shippingOption, setShippingOption] = useState('');

//     const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
//     // console.log(countries)
//     const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
//     console.log(subdivisions)

//     const fetchShippingcountries =  async (checkoutTokenId) => {
//         const {countries} = await commerce.services.localeListCountries(checkoutTokenId);
//         // console.log(countries)
//         setShippingCountries(countries);
//         setShippingCountry(Object.keys(countries)[0]);
//     }

//     const fetchSubdivisions =  async ( countryCode) => {
//         const {subdivisions} = await commerce.services.localeListShippingSubdivisions(countryCode);
//         // console.log(subDivisions)
//         setShippingSubdivisions(subdivisions);
//         setShippingSubdivision(Object.keys(subdivisions)[0]);


//     };

//     useEffect(() => {
        
//         fetchShippingcountries(checkoutToken.id);
//     }, []);

//     useEffect(() => {

//        if(shippingCountry) fetchSubdivisions(shippingCountry);
//     },[shippingCountry]);

//     return (
//         <React.Fragment>
//             <Typography variant="h5" gutterBottom>Shipping Address</Typography>
//             <FormProvider {...methods}>
//                 <form onSubmit=''>
//                     <Grid conatiner spacing={3}>
//                         <FormInput required name="firstName" label="First Name"/>
//                         <FormInput required name="lastName" label="Last Name"/>
//                         <FormInput required name="email" label="Email"/>
//                         <FormInput required name="address1" label="Address"/>
//                         <FormInput required name="city" label="City"/>
//                         <FormInput required name="zip" label="Zip / Postal Code"/>
//                         <Grid item xs={12} sm={6}>
//                             <InputLabel>Shipping Country</InputLabel>
                        
//                             <Select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} fullWidth>
//                                 {countries.map((country)=> (
//                                     <MenuItem key={country.id} value={country.id}>
//                                      {country.label}
//                                     </MenuItem>
//                                 ))}
                             
//                             </Select>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <InputLabel>Shipping Subdivisions</InputLabel>
//                             <Select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} fullWidth>
//                             {subdivisions.map((subdivision)=> (
//                                     <MenuItem key={subdivision.id} value={country.id}>
//                                      {country.label}
//                                     </MenuItem>
//                                 ))}
                             
//                              </Select>
                           
//                         </Grid>
//                         {/* <Grid item xs={12} sm={6}>
//                             <InputLabel>Shipping Country</InputLabel>
//                             <Select value={} onChane={} fullWidth>
//                                 <MenuItem key={} value={}>
//                                     Select me
//                                 </MenuItem>
//                             </Select>
//                         </Grid> */}
//                     </Grid>
//                 </form>
//             </FormProvider>

           

            
//         </React.Fragment>
//     )
// }

// export default AddressForm
