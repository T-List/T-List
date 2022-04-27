/* eslint-disable no-unused-vars */
//apiKey: 'AIzaSyAJdQ - ID6_clf4WGWk5F8bt3CnNMlHCXRs'\

import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import MapComponent from '../components/MapComponent.jsx'
import Marker from '../components/Marker.jsx'
import Sidebar from '../components/Sidebar.jsx'

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
		setReviews(reviews);
	}


  // // DELETE A REVIEW
  const handleReviewDelete = (e) => {
    console.log('you made it to the top, ', e)


    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/JSON',
    //   },
    //   body: JSON.stringify(dataForAdminApproval),
    // })

    //fetch POST req w/ID,
    // fetch('/api/' + marker.id)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('reviews are in: ', data)
    //     // loadReviews(data)
    //   })
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
        <Sidebar
          reviews={reviews}
          handleReviewDelete={handleReviewDelete}
          isAdmin={props.isAdmin}
        />
      </Wrapper>
    </>
  )
}

export default MapContainer
