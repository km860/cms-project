import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import Stars from '../components/UI/Stars';
import * as actions from '../store/actions';

const wrapper = css`
  margin-top: 100px;
  h4 {
    font-size: 20px;
    font-weight: 300;
  }
`
const reviewDiv = css`
  margin: 20px auto;
  width: 90%;
  padding: 10px;
  blockquote {
    margin: 10px 0;
    line-height: 1.6em;
    width: auto;
    font-weight: 300;
    border-right: 2px solid #e7e7e7;
    border-bottom: 2px solid #e7e7e7;
    padding: 0 10px 10px 10px;
  }
`
const formDiv = css`
  width: 90%;
  margin: 20px auto;
  padding: 10px;
`
const formElement = css`
  label {
    display: block;
    padding: 10px 2px;
  }
  textarea {
    margin: 10px 0;
    padding: 5px;
    width: 80%;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
  }
  input {
    width: 50%;
    height: 30px;
    border: 2px solid #e7e7e7;
    border-radius: 4px;
  }
`
const ratingDiv = css`
  label {
    padding-right: 10px;
  }
  input {
    display: block;
    margin-top: 15px;
    padding: 8px 12px;
    background-color: #222222;
    color: white;
    letter-spacing: 0.2em;
    font-size: 15px;
    font-weight: lighter;
    border: none;
    outline: none;
    border-radius: 4px;
    &:hover {
      background-color: #222c;
    }
    &:active {
      background-color: black;
      box-shadow: none;
    }
  }
`
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
        <div key={i} className={reviewDiv}>
          <Stars rating={el.rating} />
          <blockquote>
            &lsquo;{el.content}&rsquo; - <em><strong>{el.author}</strong></em>
          </blockquote>
        </div>
      )
    })
    
    let form = (
      <form onSubmit={this.handleSubmit}>
        <div className={formElement}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name='name' 
            value={this.state.author} 
            onChange={this.handleInput}
            required />
        </div>
        <div className={formElement}>
          <label htmlFor="reviewText">Your review</label>
          <textarea value={this.state.content} onChange={this.handleText} name="reviewText" id="reveiwText" cols="30" rows="10"></textarea>
        </div>
        <div className={ratingDiv}>
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
      <div className={wrapper}>
        {displayReview}
        <div className={formDiv}>
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