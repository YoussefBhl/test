import * as types from './actionTypes';  

// Get inital State
export function loadProducts() {  
  return function(dispatch) {
    return dispatch(loadProductsSuccess());
  };
}
export function loadProductsSuccess() {  
  return {type: types.LOAD_PRODUCTS_SUCCESS};
}

// Add new product
export function addProduct (product) {
  return function(dispatch) {
    return dispatch(addProductToStore(product));
  }
}
export function addProductToStore (product) {  
  return {type: types.ADD_PRODUCT, product};
}

// Delete an existant product
export function deleteProduct (indexes) {
  return function(dispatch) {
    return dispatch(deleteProductFromStore(indexes));
  };
}
export function deleteProductFromStore (indexes) {  
  return {type: types.DELETE_PRODUCT, indexes};
}

// Update a product
export function updateProduct (product) {
  return function(dispatch) {
    return dispatch(updateProductInStore(product));
  }
}
export function updateProductInStore (product) {  
  return {type: types.UPDATE_PRODUCT, product};
}