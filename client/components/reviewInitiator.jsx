/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReviewCard from './ReviewCard.jsx'

const ReviewInitiator = (props) => {
  return (
    <div className="postReview">
      <button
        className="review-btn"
        // style={{ width: '200px', height: '30px' }}
        onClick={() => setReview(true)}
      >
        Post a Review
      </button>
      {/* {reviewForm} */}
    </div>
  )
}

export default ReviewInitiator
