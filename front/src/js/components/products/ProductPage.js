import React, {PropTypes} from 'react';  
import {connect} from 'react-redux';  
import * as productActions from '../../actions/productActions';
import ProductList from './ProductList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TotalTable from './TotalTable'

export default class ProductPage extends React.Component {  
  render() {
    const style={
      float:"right"
    }
    return(
      <MuiThemeProvider>
        <div className="container">
          <h1>My Cart</h1>
        <div className="col-lg-10">
          <ProductList  />
        </div>
        <div className="col-lg-3" style={style}>
          <TotalTable />
        </div>
      </div>
      
      </MuiThemeProvider>
    );
  }
}

//We want to ensure that the products property of our component is in fact in array. 
ProductPage.propTypes = {
   products: PropTypes.array.isRequired
};