import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./home/Home";
import  Details from "./details/Details";
import BookShow from "./bookshow/BookShow";
import Confirmation from "./confirmation/Confirmation";
class Controller extends Component {
    constructor() {
        super();
        this.rootUrl = "http://localhost:8085/api/";
      }
    render() {

        return (
            
                <Router>
                    <Routes>
                        <Route exact  path='/' element={<Home rootUrl={this.rootUrl} />} />
                        <Route  path='/movie/:id'  element={<Details rootUrl={this.rootUrl} />}/>
                        <Route  path='/bookshow/:id'  element={<BookShow rootUrl={this.rootUrl} />}/>
                        <Route  path='/confirm/:id'  element={<Confirmation rootUrl={this.rootUrl} />}/>
                    </Routes>

                </Router>
            
        )
    }
}

export  {Controller};