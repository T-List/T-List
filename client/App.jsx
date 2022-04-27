import React, { Component } from 'react';
import MapContainer from './containers/MapContainer.jsx';
import logo from '../Images/app-logo-3.png'
import Login from './components/login.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSeekingAdmin: false,
      isAdmin: false,
    }
    this.turnOnSeekingAdmin = this.turnOnSeekingAdmin.bind(this)
    this.turnOffSeekingAdmin = this.turnOffSeekingAdmin.bind(this)
    this.turnAdminOn = this.turnAdminOn.bind(this)
    this.turnAdminOff = this.turnAdminOff.bind(this)
  }

  turnOnSeekingAdmin = () => {
    this.setState({ isSeekingAdmin: true })
  }

  turnOffSeekingAdmin = () => {
    this.setState({ isSeekingAdmin: false })
  }

  turnAdminOn = () => {
    this.setState({ isAdmin: true })
  }
  turnAdminOff = () => {
    this.setState({ isAdmin: false })
  }

  render() {
    const display = this.state.isSeekingAdmin ? (
      <Login
        turnOffSeekingAdmin={this.turnOffSeekingAdmin}
        turnAdminOn={this.turnAdminOn}
        turnAdminOff={this.turnAdminOff}
      />
    ) : (
      <MapContainer
        turnOnSeekingAdmin={this.turnOnSeekingAdmin}
        isAdmin={this.state.isAdmin}
      />
    )

    return (
      <div className="main-container">
        {/* <h1>admin: {this.state.isAdmin.toString()}</h1> */}
        <img src={logo} className="logo-img"></img>
        <div className="mapContainer">{display}</div>
      </div>
    )
  }
}

export default App
