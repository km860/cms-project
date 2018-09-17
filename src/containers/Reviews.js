import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stars from '../components/UI/Stars';
import * as actions from '../store/actions';

class Reviews extends Component {
  componentWillMount() {
    this.props.onGetReviews(this.props.id)
  }
  render() {

    console.log('i render', this.props.listReviews)
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
    console.log(displayReview)
    return (
      <div>
        {displayReview}
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
    onGetReviews: (id) => dispatch(actions.getReviews(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);