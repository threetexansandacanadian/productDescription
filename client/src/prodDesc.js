import React, {Component} from 'react';
import ReactStars from 'react-stars';
import axios from 'axios';

export default class ProdDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      currentProductID: 1,
      reviewStars: 0
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
      this.setState({reviewStars: starAvg});
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

  handleBuy(e) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('buyItem', {detail: this.state.currentProduct}))
  }

  render() {
    if (this.state.currentProduct) {
      return (
        <div>  
          <h1>{this.state.currentProduct.name}</h1>
          <h3>{this.state.currentProduct.sellerName}</h3>
          <h3>${this.state.currentProduct.price}</h3>
          <ReactStars count={5} value={this.state.reviewStars} size={15} color={'#FFDF00'} half={true} edit={false}/>
          <ul>
            <li>{this.state.currentProduct.bulletOne}</li>
            <li>{this.state.currentProduct.bulletTwo}</li>
            <li>{this.state.currentProduct.bulletThree}</li>
          </ul>
          <p>{this.state.currentProduct.description}</p>
          <button onClick={this.handleBuy.bind(this)}>Buy Me!</button> 
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