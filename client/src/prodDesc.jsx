import React, {Component} from 'react';
import axios from 'axios';

class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {
        "_id": "5c9d29a61596fd8ae892cfb8",
        "name": "Maple Syrup",
        "price": 10.25,
        "bulletOne": "Delicious Canadian Nectar",
        "bulletTwo": "Great with cereal",
        "bulletThree": "Getnly milked from the sturdiest of trees",
        "sellerName": "Quebec",
        "description": "This isn't aunt gemimas crap. The greatest thing since forever ago.",
        "productID": 1,
        "__v": 0
    }
    }
  }

  componentDidMount() {
    this.getProduct(99);
  }

  getProduct(productId) {
    axios.get(`/api/products/id?id=${productId}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }


  render() {
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
  }
}

export default ProdDesc