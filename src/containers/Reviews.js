import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stars from '../components/UI/Stars';
import * as actions from '../store/actions';

class Reviews extends Component {
  state = {
    productId: this.props.id,
    content: '',
    rating: 0,
    author: ''
  }

  componentWillMount() {
    this.props.onGetReviews(this.props.id)
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    // console.log(!!nextProps.user && nextProps.user.userId !== this.props.user.userId);
    // return !!nextProps.user && nextProps.user.userId !== this.props.user.userId;
    return (this.state.rating !== nextState.rating);
  } */

  handleInput = (event) => {
    event.preventDefault();
    this.setState({...this.state, author: event.target.value})
  }

  handleText = (event) => {
    event.preventDefault();
    this.setState({...this.state, content: event.target.value})
  }

  handleRating = (event) => {
    event.preventDefault();
    this.setState({...this.state, rating: parseInt(event.target.value, 10)})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const formData = {
      productId: this.props.id,
      content: this.state.content,
      rating: this.state.rating,
      author: this.state.author
    }
    
    this.props.onSubmitReview(formData)
    this.setState({...this.state, content: '', rating: 0, author: ''})
  }

  render() {
    let displayReview = this.props.listReviews.map((el, i) => {
      return (
        <div key={i}>
          <h5>{el.author}</h5>
          <p>{el.content}</p>
          <Stars rating={el.rating} />
          <br/>
        </div>
      )
    })
    
    let form = (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name='name' 
            value={this.state.author} 
            onChange={this.handleInput} />
        </div>
        <div>
          <label htmlFor="reviewText">Your review</label>
          <textarea value={this.state.content} onChange={this.handleText} name="reviewText" id="reveiwText" cols="30" rows="10"></textarea>
        </div>
        <div>
          <label htmlFor="">Rating</label>
          <select value={this.state.rating} onChange={this.handleRating}>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value='submit' />
        </div>
      </form>
    )
    return (
      <div>
        {displayReview}
        <div>
          <h4>Leave a review</h4>
          {form}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listReviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetReviews: (id) => dispatch(actions.getReviews(id)),
    onSubmitReview: (formData) => dispatch(actions.postReview(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);