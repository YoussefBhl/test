import React, {PropTypes} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class ProductList extends React.Component {  
  
  render(){
    const { products } = this.props; 
    //calculate the Total price for each product
    products.map(product => product["total"]= (product.price+product.price*product.tax/100));
    // withoutNoDataText: true, // this will make the noDataText hidden, means only showing the table header
    const options = {
      noDataText: 'This is custom text for empty data',
      afterInsertRow: handleInsertedRow, // a hook after add row
      afterDeleteRow: handleDeletedRow,  // a hook after delete row
    };
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
       beforeSaveCell: handleBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: handleAfterSaveCell // a hook after saving cell
    };

    function handleAfterSaveCell(row, cellName, cellValue, done) {
      this.props.actions.updateProduct(row);
      console.log(row)
      console.log(cellName)
      console.log(cellValue)
    }
    function handleBeforeSaveCell(row, cellName, cellValue, done) {
      console.log(row)
    }
    function handleInsertedRow(row) {
      //calculate the new row total
      row["total"]= (parseFloat(row.price)+parseFloat(row.price)*parseFloat(row.tax)/100);
      console.log(row)
    }
    function handleDeletedRow(rowKeys) {
      console.log(rowKeys)
    }
    //show the price total with 2 degits after comma and add euro char
    function priceFormatter(cell, row){
      return parseFloat(cell).toFixed(2).replace('.',',')+' €';
    }
    //add '%' to Tax
    function priceTax(cell, row){
      return cell+' %';
    }
    //validate the new row id 
    function idValidator(value){
      const nan = isNaN(parseInt(value, 10));
      if (nan) {
        return 'id must be a integer!';
      }
      return true;
    } 
    function floatValidator(value){
      const nan = isNaN(parseFloat(value, 10));
      if (nan) {
        return 'Price/Tax must be a float!';
      }
      return true;
    } 
    return (
        
      <BootstrapTable className="table" deleteRow={ true } selectRow={ { mode: 'checkbox' } }cellEdit={cellEditProp} 
      data={products}  hover={true} options={options} insertRow>
        <TableHeaderColumn dataField="id" editable={{validator: idValidator}} isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="comment" dataSort={true}>Comments</TableHeaderColumn>
        <TableHeaderColumn dataField="price" editable={{validator: floatValidator}} dataSort={true} dataFormat={priceFormatter}>Price</TableHeaderColumn>
        <TableHeaderColumn dataField="tax" editable={{validator: floatValidator}} dataSort={true} dataFormat={priceTax}>Tax</TableHeaderColumn>
        <TableHeaderColumn dataField="total" dataSort={true} dataFormat={priceFormatter} editable={false}>Total Item</TableHeaderColumn>
      
      </BootstrapTable>
    );
  }
};

ProductList.propTypes = {  
  products: PropTypes.array.isRequired
};

export default ProductList;  