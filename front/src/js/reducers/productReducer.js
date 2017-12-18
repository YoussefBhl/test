import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function productReducer(state = initialState, action) {
  const stateCopy = Object.assign({},state); 
  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return initialState;
    case types.ADD_PRODUCT:
      stateCopy.products.push(action.product)
      return stateCopy
    case types.DELETE_PRODUCT:
      for (let el of action.indexes) {
        const index = stateCopy.products.indexOf(stateCopy.products.find(({id}) => id === el))
        stateCopy.products.splice(index, 1)
      }
      return stateCopy
    case types.UPDATE_PRODUCT:
      const index = stateCopy.products.indexOf(stateCopy.products.find(({id}) => id === action.product.id))
      stateCopy.products[index] = action.product
      return stateCopy
    default:
      return state
  }
}
