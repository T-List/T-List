/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import ReviewCard from "./ReviewCard.jsx";
import LocationCard from "./LocationCard.jsx";
import { arrayOf } from "prop-types";

const Sidebar = (props) => {
  const { reviews, loadReviews, clearSearch, setSelectedOption, setMarkers } = props;
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

    if (selectedOption) {markers = markers.filter((marker) => marker.clinic === selectedOption.value)}
    markers.forEach((marker) => {if (!marker.averages) {
        marker.averages = {rating: 0, cost: 0}


    }})

    const locationSort = (mode) => {
        if (mode === "cost") {
            markers.sort((a, b) => {return b.averages.cost - a.averages.cost});
            setMarkers([...markers])            
        }
        else if (mode === "rating") {
            markers.sort((a, b) => {return b.averages.rating && a.averages.rating})
            setMarkers([...markers]);  
        }
    }

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
                <button className="sideButton" onClick={clearSearch}>Clear search</button>
                {markersCardArray}
            </div>
        )
    } else if (cardMode === 'location') {
        return (
            <div className="sidebar">
                <form className="sortByForm">
                    <span>Sort by:</span>
                    <input type="radio" value="cost" id="cost" onClick={() => locationSort("cost")} name="sortBy" />
                    <label htmlFor="cost">Average Cost</label>
                    <input type="radio" value="rating" id="rating" onClick={() => locationSort("rating")} name="sortBy" />
                    <label htmlFor="rating">Average Rating</label>

                </form>
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


export default Sidebar
