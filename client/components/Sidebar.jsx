/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import ReviewCard from './ReviewCard.jsx';

const Sidebar = (props) => {
    const { reviews } = props;
    console.log(reviews)

    const reviewsArray = reviews.map((review) => {
        return (
            <ReviewCard
                key={review._id}
                rating={review.rating}
                service_type={review.service_type}
                review={review.review}
                cost={review.cost}
            />
        )
    })

    if (!reviews.length) {
        return(
            <div className="sidebar">
                <p className="defaultSidebarText"><strong>Click on a location marker to see its reviews!</strong></p>
            </div>
        )
    }

    return(
        <div className="sidebar">
            {reviewsArray}
        </div>
    )
}

export default  Sidebar;