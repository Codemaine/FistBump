import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Missing extends Component {
    render() {
        return (
            <div>


                <div class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
                    <p class="font-sans text-white error-text">404</p>
                </div>

                <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
                    <span class="opacity-50">Take me back to the </span>
                    <Link class="no-underline" to="/">HomePage</Link>
                </div>
            </div>
        )
    }
}

export default Missing
