import React, {Component} from 'react';
import axios from 'axios';

class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPoduct: {}
    }
  }

  componentDidMount() {
    this.getProduct(1);
  }

  getProduct(productId) {
    axios.get(`localhost:65535/api/products/id?id={productId}`)
    .then(result => {
      this.setState({currentPoduct: result}, console.log(this.state.currentPoduct));
    })
    .catch(err => {
      console.log(err);
    })
  }


  render() {
    return (
      <h1>Hello There</h1>
    )
  }
}

export default ProdDesc