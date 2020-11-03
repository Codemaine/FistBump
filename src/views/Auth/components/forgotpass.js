import React, { Component, useState } from 'react'
import './assets/form.css'
import firebase from '../../../firebase'
import Swal from 'sweetalert2/dist/sweetalert2'

const Forgotpass = () => {
    const [email, setEmail] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        var auth = firebase.auth();
        var emailAddress = email;



        auth.sendPasswordResetEmail(emailAddress).then(function () {
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
                title: 'Email sent successfully'
            })
        }).catch(function (error) {
            console.error(error.message)
            if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                error.message = 'There is no user with the provided email'
            }
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
                icon: 'error',
                title: error
            })
        });
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, -50%)' }}>
                    {/*
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
*/}
                    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full">
                            <div>
                                <img className="mx-auto h-12 w-auto" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="logo" />
                                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                                    Reset Password
            </h2>
                            </div>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <input type="hidden" name="remember" defaultValue="true" />
                                <div className="rounded-md shadow-sm">
                                    <div>
                                        <input aria-label="Email address" onChange={event => setEmail(event.target.value)} value={email} name="email" type="email" className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                Send Reset Email
              </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Forgotpass;