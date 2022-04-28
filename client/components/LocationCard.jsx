import React, { Component } from 'react';


const LocationCard = props => {
    const { clinicName, address, contact, id, loadReviews, changeMode } = props;

    function getReviewsFromCard(id) {
        fetch('/api/' + id)
        .then(data => data.json())
        .then(data => {
            loadReviews(data)
            changeMode('reviews')
        })
    }

    return (
        <div className="card">
          <div className='textDiv'>
            <p className="cardText">
                <strong>Name: </strong> {clinicName}
            </p>
            <p className="cardText">
                <strong>Address: </strong>
                {address}
            </p>
            <p className="cardText">
                <strong>Contact info: </strong>
                {contact}
            </p>
          </div>
          <button className='sideButton' onClick={() => getReviewsFromCard(id)}>Show reviews</button>
        </div>
      )
}

export default LocationCard;