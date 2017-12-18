import React, {PropTypes} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { addProduct, deleteProduct, updateProduct} from '../../actions/productActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
class ProductList extends React.Component {  
  constructor(props) {
    super(props,);
    this.state = {
      products: this.props.products.products
    };
  }
  render(){
    //const { prod } = this.props;
    //const products = this.props.products.products;
    //calculate the Total price for each product
    this.state.products.map((row) => row.total = row.price * (1 + row.tax/100));
    const componentContext = this;
    // withoutNoDataText: true, // this will make the noDataText hidden, means only showing the table header
    const options = {
      noDataText: 'This is custom text for empty data',
      afterInsertRow: handleInsertedRow.bind(componentContext), // a hook after add row
      afterDeleteRow: handleDeletedRow.bind(componentContext),  // a hook after delete row
    };
    const cellEditProp = {
      mode: 'dbclick',
      blurToSave: true,
      afterSaveCell: handleAfterSaveCell.bind(componentContext), // a hook for before saving cell
    };
    function handleAfterSaveCell(row) {
      //parse the price and the tax to float
      row.price = parseFloat(row.price);
      row.tax = parseFloat(row.tax);
      row.id = parseFloat(row.id);
      this.props.updateProduct(row)
    }
    function handleInsertedRow(row) {
      //parse the price and the tax to float
      row.price = parseFloat(row.price);
      row.tax = parseFloat(row.tax); 
      row.id = parseFloat(row.id);
      this.props.addProduct(row);
      //calculate the new row total
      row.total = (row.price + row.price * row.tax) / 100;
    }
    function handleDeletedRow(rowKeys) {
      this.props.deleteProduct(rowKeys);
    }
    //show the price total with 2 degits after comma and add euro char
    const priceFormatter = cell => {
      cell = cell.toString();
      return cell.slice(0, (cell.indexOf("."))+3) + ' €';
    }
    //add '%' to Tax
    const priceTax = cell => cell + ' %';
    //validate the new row id 
    const idValidator = value => isNaN(parseInt(value, 10)) ? 'id must be a integer!' : true;
    const floatValidator = value => isNaN(parseFloat(value, 10)) ? 'Price/Tax must be a float!' : true;
    return (
        
      <BootstrapTable className="table" deleteRow={ true } selectRow={ { mode: 'checkbox' } }cellEdit={cellEditProp} 
      data={this.state.products}  hover={true} options={options} insertRow>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addProduct: addProduct, deleteProduct: deleteProduct, updateProduct: updateProduct}, dispatch)
}
function mapStateToProps (state) {
  return {
    products: state.products
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ProductList);