import React, { Component } from 'react';

import './LoginForm.css';
import * as firebase from 'firebase'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
        }

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    login(e) {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            try {
                firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                    alert("Ha ingresado correctamente")
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('La contraseña que ha ingresado es incorrecta')
                    } else if (errorCode === 'auth/user-not-found') {
                        alert('El usuario no esta registrado');
                    } else if (errorCode === 'auth/network-request-failed') {
                        alert('Favor conectarse a internet');
                    } else if (errorCode === 'auth/invalid-email') {
                        alert('Favor ingresar un correo válido');
                    }
                    else {
                        console.log(errorCode)
                        console.log(errorMessage)
                        alert("Ha ocurrido un error :(\nFAVOR VUELVA A INTENTARLO")
                    }
                });

            } catch (error) {

            }
        } else {
            alert("Favor llenar todos los campos");
        }
    }

    register(e) {
        e.preventDefault();
        if (this.state.email && this.state.password) {

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                alert("Usuario creado correctamente");
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('La contraseña debe ser al menos de 6 caracteres')
                } else if (errorCode === 'auth/email-already-in-use') {
                    alert('El correo que ha ingresado ya está siendo utilizado por otra cuenta')
                } else if (errorCode === 'auth/network-request-failed') {
                    alert('Favor conectarse a internet');
                } else if (errorCode === 'auth/invalid-email') {
                    alert('Favor ingresar un correo válido');
                } else {
                    console.log(errorCode)
                    console.log(errorMessage)
                    alert("Ha ocurrido un error :(\nFAVOR VUELVA A INTENTARLO")
                }
            });
        } else {
            alert("Favor llenar todos los campos");
        }
    }

    render() {
        return (
            <div className="App">
                <hr></hr>
                <div className="card-header">
                    <h3>THE BEST SCHEDULE</h3>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"></span>
                                        </div>
                                        <input type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="Correo"
                                            onChange={this.handleChange}></input>
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Contraseña"
                                            onChange={this.handleChange}></input>
                                    </div>
                                    {/*<div className="row align-items-center remember">
                                        <input type="checkbox"></input>
                                    </div>
                                    */}
                                    <div className="input-group form-group ml-auto">
                                        <input type="submit" value="Registro" className="btn float-right login_btn" onClick={this.register.bind(this)}></input>
                                        <hr></hr>
                                        <input type="submit" value="Ingreso" className="btn float-right login_btn" onClick={this.login.bind(this)}></input>
                                    </div>
                                </form>
                            </div>
                            {/*
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<a href="#">Sign Up</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </div>
                            */}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
