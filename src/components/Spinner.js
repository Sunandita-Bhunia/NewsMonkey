import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center align-items-center my-3'>
        <h3>Loading...</h3>
        <img src={loading} alt="Loading..." />
      </div>
    )
  }
}

export default Spinner
