import React, { Component } from 'react'

class Missing extends Component {
    render() {
        return (
            <div>


                <div class="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
                    <p class="font-sans text-white error-text">404</p>
                </div>

                <div class="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
                    <span class="opacity-50">Take me back to the</span>
                    <a class="border-b" href="/">HomePage</a>
                </div>
            </div>
        )
    }
}

export default Missing
