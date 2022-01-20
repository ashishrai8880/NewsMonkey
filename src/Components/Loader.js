import React, { Component } from 'react';
import loading from './loader.gif'

export default class Loader extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading" style={{filter:"invert(100%)" , width:"10vw" , height:"10vw"}}/>
            </div>
        )
    }
}
