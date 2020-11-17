import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { useHistory, Link, NavLink } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Modal, Button, Toast } from 'react-bootstrap';
import Search from './Searchfield';
import Gravatar from 'react-gravatar'



const Navbar = (props: any) => {
    const [userName, setUsername] = useState();
    const [Name, setUserName] = useState();
    const [ProfilePic, setUserPic] = useState();
    const [Email, setUserEmail] = useState();
    const [NewUser, setNewUsername] = useState(userName);
    const [NewName, setNewName] = useState(Name);
    const [NewPass, setNewPass] = useState();
    const [show, setShow] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const db = firebase.firestore();
        db
            .collection("Users")
            .doc(firebase.auth().currentUser!.uid)
            .get()
            .then(res => {
                const user = res.data();
                if (user) {
                    setUsername(user['username'])
                    setUserName(user['name'])
                    setUserEmail(user['email'])

                }
            })
        firebase.storage().ref(`users/${firebase.auth().currentUser?.uid}`).getDownloadURL().then(function (url) {
            setUserPic(url)
            console.log(ProfilePic)
            var washingtonRef = db.collection("Users").doc(firebase.auth().currentUser?.uid);


            washingtonRef.set({
                Profile_Pic: url
            }, { merge: true });
        })
    });

    const Edit = (event: any) => {
        const db = firebase.firestore();
        const cityRef = db.collection('Users').doc(firebase.auth().currentUser?.uid);

        // Set the 'capital' field of the city
        const res = cityRef.update({
            name: NewName,
            username: NewUser
        })
            .then(function () {
                const user = firebase.auth().currentUser;
                user!.updateProfile({
                    displayName: NewName,
                })
                    .then(function () {
                        user!.updatePassword(NewPass!).then(function () {
                            // Update successful.
                            setShow(false)
                            console.log('Success')
                            Swal.fire('Saved!', '', 'success')
                            window.location.reload()
                            // Update successful.
                        }).catch(function (error) {
                            Swal.fire(
                                'An error occurred',
                                error.message,
                                'error'
                            )
                        })
                    }).catch(function (error) {
                        Swal.fire(
                            'An error occurred',
                            error.message,
                            'error'
                        )
                    })
            })
            .catch(function (error) {
                Swal.fire(
                    'An error occurred',
                    error.message,
                    'error'
                )
                console.error("Error updating document: ", error);
            });


    }

    const Dropdown2 = () => {
        if (navbar === true) {
            return (<div className=" sm:hidden transform opacity-100 scale-100">
                <div className="px-2 pt-2 pb-3">
                    <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</a>
                    <Link to="/settings" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Settings</Link>
                    <Link to="/search" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Users</Link>
                </div>
            </div>)
        }
        else if (navbar === false) {
            return (
                <div className="hidden sm:hidden transform opacity-100 scale-100">
                    <div className="px-2 pt-2 pb-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</Link>
                        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Users</a>
                    </div>
                </div>
            )
        }
        return (
            <div></div>
        )
    }

    const Icon = () => {
        if (navbar === true) {
            return (
                <svg className="h-6 w-6 transform opacity-100 scale-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            )
        } else if (navbar === false) {
            return (<svg className="h-6 w-6 transform opacity-100 scale-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>)
        }
        return (
            <div></div>
        )
    }

    const Dropdown = () => {
        if (isOpen === true) {
            return (
                <div className="origin-top-right transform opacity-100 scale-100 absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => window.open(`user/${firebase.auth().currentUser?.uid}`, '_self')} role="menuitem">Your Profile</a>
                        <Link to="/settings" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Settings</Link>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem" onClick={handleClick}>Sign out</a>
                    </div>
                </div>
            )
        }
        else if (isOpen === false) {
            return (
                <div className="origin-top-right transform opacity-100 scale-100 absolute right-0 mt-2 w-48 invisible rounded-md shadow-lg">
                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Settings</a>
                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem" onClick={handleClick}>Sign out</a>
                    </div>
                </div>
            )
        }
        return (
            <div></div>
        )
    }

    const handleNameChange = (e: any) => {
        setNewName(e.target.value)
    }

    const handleUserChange = (e: any) => {
        setNewUsername(e.target.value)
    }

    const handlePassChange = (e: any) => {
        setNewPass(e.target.value)
    }

    const handleClick = (event: any) => {
        event.preventDefault();

        firebase
            .auth()
            .signOut()
            .then(res => {
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
                    title: 'Logged out successfully'
                })
                history.push("/auth/login");
            })
    }


    var email = firebase.auth().currentUser?.email;
    var md5 = require('md5');
    var profile_pic = 'https://gravatar.com/avatar/' + md5(email);


    return (
        <div className="container-fullwidth">
            {/*
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
*/}
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" onClick={() => setNavbar(!navbar)} aria-expanded="false">
                                {/* Icon when menu is closed. */}
                                {/*
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          */}
                                <Icon />
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                                <img className="block lg:hidden mt-0 h-8 w-auto" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="FistBump logo" />
                                <img className="hidden lg:block mt-0 h-8 w-auto" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="FistBump logo" />
                            </div>
                            <div className="hidden sm:block sm:ml-6 mx-auto">
                                <div className="flex">
                                    <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Home</a>
                                    <Link to="/settings" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Settings</Link>
                                    <Link to="/search" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Users</Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button className="flex text-sm border-2 border-transparent focus:outline-none transition duration-150 ease-in-out visible" id="user-menu" onClick={() => setOpen(!isOpen)} aria-label="User menu" aria-haspopup="true">
                                        <img className="h-8 rounded-full" src={ProfilePic} alt="" />
                                    </button>
                                </div>
                                {/*
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
                                <Dropdown />
                            </div>
                        </div>
                    </div>
                </div>
                {/*
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  */}
                <Dropdown2 />
            </nav>

        </div>
    )
}

export default Navbar
