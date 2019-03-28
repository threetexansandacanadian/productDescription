import React, {Component} from 'react';
import axios from 'axios';

class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoduct: {}
    }
  }

  getProduct(productId) {
    axios.get(`127.0.0.1:65535/api/products`)
  }


  render() {
    return (
      <h1>Hello There</h1>
    )
  }
}

export default ProdDesc