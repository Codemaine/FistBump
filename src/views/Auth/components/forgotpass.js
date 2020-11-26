import React, { useState } from 'react'
import './assets/form.css'
// eslint-disable-next-line
import firebase from '../../../firebase'
import Swal from 'sweetalert2/dist/sweetalert2'
import emailjs, { init } from 'emailjs-com'


init("user_6zQL40OEqWVoV3Lx06Lxc");
const Forgotpass = () => {
    const [email, setEmail] = useState();
    // eslint-disable-next-line
    const [linke, setLinke] = useState();
    // eslint-disable-next-line
    const [error, setError] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        var CryptoJS = require('crypto-js');
        var encryptedAES = CryptoJS.AES.encrypt(email, "My Secret Passphrase");
        // eslint-disable-next-line
        var id = encryptedAES.toString();
        setLinke(id)
        if (id.includes('/')) {
            // eslint-disable-next-line 
            var encryptedAES = CryptoJS.AES.encrypt(email, "My Secret Passphrase");
            id = encryptedAES.toString();
            // eslint-disable-next-line
            setLinke(id)
        }
        console.log(email)
        var uri = `http://localhost:3000/reset-password/${id}`
        console.log(uri)
        emailjs.send("service_otundr6", "template_q1y5b9u", {
            email: email,
            passwordlink: uri,
        }).then(() => {
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
                title: 'Email sent!'
            })
        })
    }

    return (
        <div>
            <div className="w-full flex flex-wrap">
                {/* Register Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <img src="https://i.ibb.co/tX3qChr/n8pk9u-X-removebg-preview-1.png" alt="logo" />
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Forgot Password.</p>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="password" className="text-lg">Email</label>
                                <input type="email" id="email" name="email" onChange={event => setEmail(event.target.value)} value={email} placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex flex-col pt-4">
                                <p className="text-red-500" id="error">{error}</p>
                            </div>
                            <input type="submit" value="Reset Password" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                        </form>
                    </div>
                </div>
                {/* Image Section */}
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-full hidden md:block p-0" src={require('./assets/cover.jpeg')} alt="cover" />
                </div>
            </div>

        </div>
    )
}

export default Forgotpass;