import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/firestore";
import './u.css'
import { AuthContext } from "../../../AuthProvider";

interface FormItems {
    username: string;
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const authContext = useContext(AuthContext);
    const { loadingAuthState } = useContext(AuthContext);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    } as FormItems);

    const history = useHistory();

    const Logout = () => {
        history.push("/login")
    }

    const forgot_pass = () => {
        history.push('/forgot-password')
    }

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));

    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        console.log(values, 'values');
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredential: firebase.auth.UserCredential) => {
                authContext.setUser(userCredential);
                const db = firebase.firestore();
                db.collection("Users")
                    .doc(userCredential.user!.uid)
                    .set({
                        email: values.email,
                        username: values.username,
                        name: values.name
                    })
                    .then(() => {
                        console.log('ok');
                        history.push("/");
                    })
                    .catch(error => {
                        console.error(error.message);
                        var con = document.getElementById('error');
                        con!.innerHTML = error.message;
                    });
            }).catch(error => {
                console.error(error)
                console.error(error.message);
                var con = document.getElementById('error');
                con!.innerHTML = error.message;
            })

    }

    if (loadingAuthState) {

        return (
            <div>
                <div className="text-center">
                    <div className="spinner-border" style={{ marginLeft: '50vw', width: '5rem', height: '5rem' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");

    return (
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
                                Sign Up
            </h2>
                        </div>
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm">
                                <div>
                                    <input aria-label="Full Name" value={values.name} name="name" type="name" className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="Full Name" />
                                </div>
                                <div>
                                    <input aria-label="Email address" value={values.email} name="email" type="email" className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="Email address" />
                                </div>
                                <div>
                                    <input aria-label="Username" value={values.username} name='username' type="username" className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="UserName" />
                                </div>
                                <div className="-mt-px">
                                    <input aria-label="Password" value={values.password} name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="Password" />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm leading-5">
                                    <p className="text-red-600" id="error"></p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                Sign up
              </button>
                                <p className="font-xs text-center" style={{ fontSize: '12px', textAlign: 'center', width: '150px' }}>Already have an account? <a className="text-indigo-600" onClick={Logout} style={{ cursor: 'pointer' }}>LogIn</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SignUp;