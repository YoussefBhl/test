import * as types from './actionTypes';  

export function loadProducts() {  
  return function(dispatch) {
    var products = [{id:1,name:"Product1", comment:"this is my 1st product ", price: 8, tax: 19},
                    {id:2,name:"Product2", comment:"this is my 2nd product", price: 11, tax: 19},
                    {id:3,name:"Product3", comment:"this is my 3d product", price: 16.25, tax: 7},
                    {id:4,name:"Product4", comment:"this is my 4th product", price: 12, tax: 7}];
    return dispatch(loadProductsSuccess(products));
  };
}
export function loadProductsSuccess(products) {  
  return {type: types.LOAD_PRODUCTS_SUCCESS, products};
}