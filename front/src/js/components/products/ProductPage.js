import React, {PropTypes} from 'react';  
import {connect} from 'react-redux';  
import * as productActions from '../../actions/productActions';
import ProductList from './ProductList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class ProductPage extends React.Component {  
  render() {
    return(
      <MuiThemeProvider>
      <div className="col-lg-12">
        <h1>My Cart</h1>
        <div className="col-lg-10">
          <ProductList products={this.props.products} />
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

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
} 

export default connect(mapStateToProps)(ProductPage);