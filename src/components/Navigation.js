import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase'

export default class Navigation extends Component {

  logout() {
    firebase.auth().signOut()
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">The Best Schedule</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="navbar-brand" to="/Horario">Subir Horario</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={this.logout.bind(this)}>Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

