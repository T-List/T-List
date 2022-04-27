import React, { Component } from 'react'

const ReviewCard = (props) => {
  const { rating, service_type, cost, review } = props
  // display rating, service type, cost, review
  const starObj = {
    1: '✩',
    2: '✩✩',
    3: '✩✩✩',
    4: '✩✩✩✩',
    5: '✩✩✩✩✩',
  }

  return (
    <div className="reviewCard">
      <p className="reviewText">
        <strong>Rating: </strong>
        {starObj[String(rating)]}
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
      <button className="reviewCardDelete">x</button>
      <hr />
    </div>
  )
}

export default ReviewCard
