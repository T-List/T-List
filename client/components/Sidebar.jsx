/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import ReviewCard from "./ReviewCard.jsx";
import LocationCard from "./LocationCard.jsx";

const Sidebar = (props) => {
  const { reviews, loadReviews, clearSearch, setSelectedOption } = props;
  let { markers, selectedOption } = props;
  const [cardMode, setCardMode] = useState('location');
  console.log(reviews);
//   console.log(`Selected Option Default Value ${selectedOption.length}`);

    const changeMode = (modeType) => {
        setCardMode(modeType);
        // setSelectedOption('');
    }

  const reviewsArray = reviews.map((review) => {
    return (
      <ReviewCard
        isAdmin={props.isAdmin}
        handleReviewDelete={props.handleReviewDelete}
        key={review._id}
        myId={review._id}
        rating={review.rating}
        service_type={review.service_type}
        review={review.review}
        cost={review.cost}
      />
    )
  })

    const reviewsArray = reviews.map((review) => {
        return (
            <ReviewCard
                isAdmin={props.isAdmin}
                handleReviewDelete={props.handleReviewDelete}
                key={review._id}
                rating={review.rating}
                service_type={review.service_type}
                review={review.review}
                cost={review.cost}
            />
        );
    });

    if (selectedOption) {markers = markers.filter((marker) => marker.clinic === selectedOption.value)}

    const markersCardArray = markers.map((marker) => {
        return (
            <LocationCard
                isAdmin={props.isAdmin}
                handleReviewDelete={props.handleReviewDelete}
                changeMode={changeMode}
                key={marker._id}
                id={marker._id}
                loadReviews={loadReviews}
                clinicName={marker.clinic}
                address={marker.address}
                contact={marker.contact}
            />
        );
    });

    if (cardMode === 'location' && selectedOption) {
        return (
            <div className="sidebar">
                <button onClick={clearSearch}>Clear search</button>
                {markersCardArray}
            </div>
        )
    } else if (cardMode === 'location') {
        return (
            <div className="sidebar">
                {markersCardArray}
            </div>
        )
    } else if (cardMode === 'reviews') { //add button on top to change mode back to lcation
        return(
            <div className="sidebar">
                <button className="sideButton" onClick={() => changeMode('location')}>Back to Locations</button>
                {reviewsArray}
            </div>
        )
    }
    
}
  

  return <div className="sidebar">{reviewsArray}</div>
}

export default Sidebar
