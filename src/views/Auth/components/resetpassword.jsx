import React, { Component } from 'react'
import firebase from '../../../firebase'
import Swal from 'sweetalert2'

class Reset_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            code: '',
            password: '',
            confirm_password: '',
            error: ''
        }
    }
    componentDidMount() {
        this.setState({ code: this.props.match.params.id })
        // firebase.auth().verifyPasswordResetCode(this.state.code)
        //     .then(function (email) {

        //     })
        //     .catch(() => {
        //         this.props.history.push({
        //             pathname: '/404'
        //         })
        //     })
        var CryptoJS = require('crypto-js');
        var decryptedBytes = CryptoJS.AES.decrypt(this.props.match.params.id, "My Secret Passphrase");
        var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.setState({ email: plaintext })

    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.confirm_password) {
            firebase.auth().confirmPasswordReset(this.state.code, this.state.password)
                .then(() => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                })
                .catch(() => {
                    this.props.history.push({
                        pathname: '/404'
                    })
                })
        }
    }
    render() {
        return (
            <div>
                <div className="w-full flex md:justify-center flex-wrap">
                    {/* Register Section */}
                    <div className="w-full md:w-1/2 flex justify-center flex-col">
                        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                            <img src="https://i.ibb.co/tX3qChr/n8pk9u-X-removebg-preview-1.png" alt="logo" />
                        </div>
                        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                            <p className="text-center text-3xl">Reset password for {this.state.email}</p>
                            <form className="flex flex-col pt-3 md:pt-8" onSubmit={this.handleSubmit}>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                                    <input type="password" id="password" value={this.state.password} autoComplete="new-password" onChange={event => this.setState({ password: event.target.value })} name="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="confirm-password" className="text-lg">Confirm Password</label>
                                    <input type="password" id="confirm-password" value={this.state.confirm_password} autoComplete="new-password" onChange={event => this.setState({ confirm_password: event.target.value })} name="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col pt-4">
                                    <p className="text-red-500" id="error">{this.state.error}</p>
                                </div>
                                <input type="submit" value="Reset Password" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                            </form>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className="w-1/2 shadow-2xl hidden lg:block">
                        <img className="object-cover w-full h-full hidden lg:block p-0" src={require('./assets/cover.jpeg')} alt="logo" />
                    </div>
                </div>

            </div>
        )
    }
}

export default Reset_Password
