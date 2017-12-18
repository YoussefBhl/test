import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux'; 
class TotalTable extends React.Component { 
  
  render(){
      const products = this.props.products.products
      let titles = ['Net Total','Tax'];
      const splitTax= products => {
          let sameTaxSum = 0;
          if(!products.length) return [];
          const samTaxproducts = products.filter(x => x.tax == products[0].tax);
          //if there is a product has a tax diffrent to other products we have to calculate sum alone(reduce will make bugs)
          if(samTaxproducts.length == 1) {
            sameTaxSum =  samTaxproducts[0].price*samTaxproducts[0].tax/100
          }  
          else  sameTaxSum = samTaxproducts.reduce((a,b) => (a.price*a.tax+b.price*b.tax)/100);
          return [{tax:products[0].tax,sum:sameTaxSum}].concat(splitTax(products.filter(x => x.tax != products[0].tax)))
      }
      let netTotal = () => {
        if(!products.length) return 0
        return products.map(x => x.price).reduce((a,b) => a+b)//calculate Net total
      }
      let tax = splitTax(products);
      const taxTotal = () =>{
          if(!products.length) return 0
          return tax.map(x => x.sum).reduce((a,b)=> a+b);
      } 
       //show the price total with 2 degits after comma and add euro char
       const priceFormatter = cell => {
        cell = cell.toString();
        return cell.slice(0, (cell.indexOf("."))+3) + ' €';
    }
      //const total = [{titles,values}]
    return (
        <table className="table borderless" >
            <thead>
      <tr>
        <th>Net Total</th>
        <th>{priceFormatter(netTotal())}</th>
      </tr>
    </thead>
    <tbody>
        <tr>
        <td>Tax</td>
        <td>{priceFormatter(taxTotal())}</td>
        </tr>
        {tax.map(x => 
      <tr>
        <td>{x.tax + '%'}</td>
        <td>{priceFormatter(x.sum)}</td>
      </tr>)}
      <tr>
          <td><h4> Grand Total</h4></td>
          <td><h4> {priceFormatter(taxTotal()+netTotal())}</h4></td>
      </tr>
    </tbody>
  </table>
    );
  }
};
function mapStateToProps (state) {
  return {
    products: state.products
  };
}
export default connect(mapStateToProps) (TotalTable);
