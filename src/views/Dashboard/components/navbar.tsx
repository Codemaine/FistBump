import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import 'firebase/firestore'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Navbar = () => {
    const [userName, setUsername] = useState();
    const [Name, setUserName] = useState();
    const [ProfilePic, setUserPic] = useState();
    const [Email, setUserEmail] = useState();
    const history = useHistory();

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
                    setUserEmail(user['Email'])
                    console.log(Email)

                }
            })
    });

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

    return (
        <div className="container-fullwidth">
            <nav className="navbar d-flex justify-content-between navbar-expand-lg navbar-light scrolling-navbar fixed" style={{ backgroundColor: '#cccccc' }}>
                <div className="navabr-brand" style={{ display: 'flex' }}>
                    <img src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" />
                    <a className="navbar-brand" href="#" style={{ paddingTop: '29px', paddingLeft: '5px' }}>FistBump</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <div className="container">
                                <div className="mx-auto" style={{ paddingTop: '20px', display: 'flex' }} >
                                    <div className="form-group has-search">
                                        <span className="fa fa-search form-control-feedback"></span>
                                        <input type="text" list="list" autoComplete="off" className="form-control search-input w-100 " placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <div className="container">
                                <a style={{ display: 'flex' }} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <p style={{ paddingTop: '10px', paddingLeft: '4px' }}>{Name}</p> <span style={{ paddingTop: '10px' }} className="material-icons">
                                        keyboard_arrow_down
</span>
                                </a>
                                <div className="container">
                                    <div className="dropdown-menu" style={{ position: 'absolute' }} aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#" style={{ display: 'inline-flex' }}><span className="material-icons">account_circle</span> My Profile</a>
                                        <a className="dropdown-item" href="#" style={{ display: 'inline-flex' }}><span className="material-icons">settings</span> Settings</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#" style={{ display: 'inline-flex' }} onClick={handleClick}><span className="material-icons">exit_to_app</span> Logout</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
