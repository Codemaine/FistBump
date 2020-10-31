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
                <link rel="stylesheet" href='https://googledrive.com/host/1CCwkBmsaAppGwnuvwGKAP90-UdjqECZ4' />
                <form className="form-signin needs-validation" noValidate onSubmit={handleSubmit}>
                    <img className="mb-4" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="" width={72} height={72} />
                    <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
                    <label htmlFor="validationCustom01" className="sr-only">Email address</label>
                    <input type="email" id="validationCustom01" onChange={event => setEmail(event.target.value)} className="form-control was-validated" name="email" value={email} placeholder="Email address" required />
                    <hr />
                    <button className="btn btn-lg btn-primary btn-block" type="submit" >Send Reset Email</button>
                </form>
            </div>
        </div>
    )
}

export default Forgotpass;