import React, { Component } from 'react'
import MapContainer from './containers/MapContainer.jsx'
import CreateReview from './components/CreateReview.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import logo from '../Images/app-logo-3.png'
import Login from './components/login.jsx'

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Login />
      </div>
    )
  }
}

export default App
