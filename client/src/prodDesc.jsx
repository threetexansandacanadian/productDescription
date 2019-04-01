import React, {Component} from 'react';
import axios from 'axios';


class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this.getProductById(1)
    }
  }

  getProductById(productId) {
    axios.get(`api/products/id?id=${productId}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  getProductByName(productName) {
    axios.get(`api/products/name?name=${productName}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.currentProduct) {
      return (
        <>
        <h1>{this.state.currentProduct.name}</h1>
        <h3>{this.state.currentProduct.sellerName}</h3>
        <h3>${this.state.currentProduct.price}</h3>
        <ul>
          <li>{this.state.currentProduct.bulletOne}</li>
          <li>{this.state.currentProduct.bulletTwo}</li>
          <li>{this.state.currentProduct.bulletThree}</li>
        </ul>
        <p>{this.state.currentProduct.description}</p>
      </>
    )
  } else {
    return (
      <> 
      </>
    )
  }
  }
}

export default ProdDesc