import React, {Component} from 'react';
import axios from 'axios';

export default class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      currentProductID: 1,
      reviews: 0
    }
    this.handleUpdateProdId.bind(this);
    this.getProductById.bind(this);
    this.getProductByName.bind(this);
  }

  componentDidMount() {
    this.getProductById(this.state.currentProductID);
    this.getReviewById(this.state.currentProductID);
    window.addEventListener('updateProdId', this.handleUpdateProdId.bind(this))
  }
  
  handleUpdateProdId(e) {
    this.setState({currentProductID: e.detail}, () => {
      this.getProductById(this.state.currentProductID);
      this.getReviewById(this.state.currentProductID);
    })
  }

  getReviewById(productId) {
    axios.get('http://ec2-54-224-251-247.compute-1.amazonaws.com/api/reviews', {headers: {productid: productId}})
    .then(result => {
      let starSum = 0;
      result.data.rows.forEach(review => {
        starSum += review.stars
      })
      let starAvg = starSum / result.data.rowCount;
      console.log(starAvg);
    })
    .catch(err => console.log(err))
  }

  getProductById(productId) {
    axios.get(`http://ec2-18-222-205-81.us-east-2.compute.amazonaws.com/api/products/id?id=${productId}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  getProductByName(productName) {
    axios.get(`http://ec2-18-222-205-81.us-east-2.compute.amazonaws.com/api/products/name?name=${productName}`)
    .then(result => this.setState({currentProduct: result.data}))
    .catch(err => console.log(err))
  }

  render() {
    if (this.state.currentProduct) {
      return (
        <div className='prodIdSubscriber' ref={el => (this.div = el)}>  
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