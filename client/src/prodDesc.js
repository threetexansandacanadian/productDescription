import React, {Component} from 'react';
import axios from 'axios';

export default class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      currentProductID: 1
    }
    this.handleUpdateProdId.bind(this);
    this.getProductById.bind(this);
    this.getProductByName.bind(this);
  }

  componentDidMount() {
    this.getProductById(this.state.currentProductID);
    window.addEventListener('updateProdId', this.handleUpdateProdId.bind(this))
  }
  
  handleUpdateProdId(e) {
    this.setState({currentProductID: e.detail}, () => this.getProductById(this.state.currentProductID))
  }

  getProductById(productId) {
    axios.get(`http://localhost:3000/api/products/id?id=${productId}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  getProductByName(productName) {
    axios.get(`http://localhost:3000/api/products/name?name=${productName}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.currentProduct) {
      return (
      <div className={'prodIdSubscriber'} ref={el => (this.div = el)}>
        <h1>{this.state.currentProduct.name}</h1>
        <h3>{this.state.currentProduct.sellerName}</h3>
        <h3>${this.state.currentProduct.price}</h3>
        <ul>
          <li>{this.state.currentProduct.bulletOne}</li>
          <li>{this.state.currentProduct.bulletTwo}</li>
          <li>{this.state.currentProduct.bulletThree}</li>
        </ul>
        <p>{this.state.currentProduct.description}</p>
      </div>
    )
  } else {
    return (
      <div> 
      </div>
    )
  }
  }
}