/* eslint-disable no-unused-vars */
//apiKey: 'AIzaSyAJdQ - ID6_clf4WGWk5F8bt3CnNMlHCXRs'\

import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import MapComponent from '../components/MapComponent.jsx'
import Marker from '../components/Marker.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Select from 'react-select'

// when we have other components built out, remember to import them here

const MapContainer = (props) => {
  const render = (status) => {
    return <h1>{status}</h1>
  }

  const [markers, setMarkers] = React.useState([])
  const [coords, setCoords] = React.useState()

  // gets markers from database
  React.useEffect(() => {
    if (!markers.length) {
      fetch('/api')
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          setMarkers(data)
        })
    }
  }, [])

  const changeCoords = (lat, lng) => {
    setCoords([lat, lng])
  }

  // TODO: function to pass down to markers which will pull up the reviews associated with that marker upon click
  const [reviews, setReviews] = React.useState([])

  const loadReviews = (reviews) => {
    setReviews(reviews)
  }
  //handles removal from Dom
  const removeReviewFromDom = (review) => {
    console.log(`Attempting to remove review ${review} from DOM`)
    setReviews(reviews)
  }
  //handles deleting a review from database
  const handleReviewDelete = (id) => {
    console.log(`Initiating request to delete review #${id}`)
    fetch(`/admin/deleteReview/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(`DELETE FROM reviews WHERE id = ${id}`),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post deletion reviews are in: ', data)
      })
      .then((data) => loadReviews(data))
      .catch((err) => err, 'Error deleting reviews')

    removeReviewFromDom(id)
  }

  // select search bar
  const [selectedOption, setSelectedOption] = useState('')

  const options = markers.map((marker) => {
    return { value: marker.clinic, label: marker.clinic }
  })

  const clearSearch = () => {
    setSelectedOption(null)
  }

  // generates marker components from marker array in state
  const markersArray = markers.map((marker) => {
    return (
      <Marker
        changeCoords={changeCoords}
        loadReviews={loadReviews}
        key={marker._id}
        id={marker._id}
        clinicName={marker.clinic}
        position={{
          lat: Number(marker.latitude),
          lng: Number(marker.longitude),
        }}
        address={marker.address}
        contact={marker.contact}
      />
    )
  })

  return (
    <>
      <Wrapper
        apiKey={'AIzaSyCpR5rGEJvMPMhDR4kUNdlXm27tbJX_7mY'}
        render={render}
      >
        <div className="mapComponent">
          <MapComponent
            changeCoords={changeCoords}
            coords={coords}
            className="mapComponent"
          >
            {markersArray}
          </MapComponent>
          <button
            className="seekingAdmin"
            onClick={() => props.turnOnSeekingAdmin()}
          >
            admin
          </button>
        </div>

        <div className="searchAndSidebar">
          <Select
            className="dropdownSearch"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            isSearchable={true}
          />

          <Sidebar
            clearSearch={clearSearch}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            reviews={reviews}
            markers={markers}
            loadReviews={loadReviews}
            handleReviewDelete={handleReviewDelete}
            isAdmin={props.isAdmin}
          />
        </div>
      </Wrapper>
    </>
  )
}

export default MapContainer
