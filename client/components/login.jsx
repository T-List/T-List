import React, { useState } from 'react'
import logo from '../../Images/app-logo-3.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  const handleSubmit = (e) => {
    //So that form submission doesn't trigger a page refresh
    e.preventDefault()

    const dataForAdminApproval = {
      username: username,
      password: password,
    }

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(dataForAdminApproval),
    })
      .then((data) => data.json())
      .then((response) => {
        if (response === 'Login Success') {
          setAdmin(true)
        }
      })
      .then(console.log('Success in granting admin? ', admin))
      .catch((error) => {
        console.log('Fetch error while trying to establish admin: ', error)
      })
  }

  return (
    <div className="log-in-container">
      <img src={logo} className="logo-img"></img>
      <h1 className="loginHeader">Admin Login</h1>
      <h1>{admin.toString()}</h1>
      <form onSubmit={handleSubmit} className="log-in-container">
        <input
          autoComplete="off"
          autoFocus
          id="password"
          type="text"
          className="datentry"
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <input
          autoComplete="off"
          id="password"
          type="text"
          className="datentry"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <input className="submitButton" type="submit" value="Login"></input>
      </form>
    </div>
  )
}

export default Login
