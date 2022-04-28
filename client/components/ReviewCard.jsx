import React, { Component } from 'react'

const ReviewCard = (props) => {
  const { id, rating, service_type, cost, review } = props
  // display rating, service type, cost, review
  const starObj = {
    1: '★',
    2: '★★',
    3: '★★★',
    4: '★★★★',
    5: '★★★★★',
  }
  const showButton = props.isAdmin ? 'reviewCardDelete' : 'hideReviewCardDelete'

  return (
    <div className="card">
      <p className="reviewText">
        <strong>Rating: </strong>
        <strong className="stars">{starObj[String(rating)]}</strong>
      </p>
      <p className="reviewText">
        <strong>Service Type: </strong>
        {service_type}
      </p>
      <p className="reviewText">
        <strong>Cost: </strong>
        {cost}
      </p>
      <p className="reviewText">
        <strong>Review: </strong>
        {review}
      </p>
      <button
        //IF YOU HAVE ADMIN, THE DELETE BUTTONS WILL SHOW
        className={showButton}
        reviewId={id}
        // myId={props.myId}
        onClick={(e) => {
          // console.log('e.target.reviewId: ', props.myId)
          props.handleReviewDelete(props.myId)
        }}
      >
        x
      </button>
    </div>
  )
}

export default ReviewCard
