import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainForm from "../forms/MainForm";
import Navigation from '../components/Navigation';

export default class HomeForm extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Navigation}></Route>
                <Route path="/Horario" exact component={MainForm}></Route>
                <Route path="/Ver" exact component={MainForm}></Route>
            </Router>
        );
    }
}

