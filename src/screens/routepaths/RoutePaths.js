import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../home/Home";
import  Details from "../details/Details";
class RoutePaths extends Component {
    constructor() {
        super();
        this.rootUrl = "http://localhost:8085/api/";
      }
    render() {

        return (
            
                <Router>
                    <Routes>
                        <Route exact  path='/' element={<Home rootUrl={this.rootUrl} />} />
                        <Route  path='/Details/:movie'  element={<Details rootUrl={this.rootUrl} />}/>
                    </Routes>

                </Router>
            
        )
    }
}

export  {RoutePaths};