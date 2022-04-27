/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import MapContainer from './containers/MapContainer.jsx';
import CreateReview from './components/CreateReview.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from '../Images/app-logo-3.png'



class App extends Component {
	render() {
		return (
			<div className='main-container'>
				<img src={logo} className='logo-img'></img>

				<div className='mapContainer'>
					<MapContainer/>
				</div>
			</div>
		);
	}
}

export default App;
