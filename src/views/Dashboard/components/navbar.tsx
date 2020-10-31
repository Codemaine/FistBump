import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import 'firebase/firestore'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Modal, Button, Toast } from 'react-bootstrap';
import Search from './Searchfield';



const Navbar = () => {
    const [userName, setUsername] = useState();
    const [Name, setUserName] = useState();
    const [ProfilePic, setUserPic] = useState();
    const [Email, setUserEmail] = useState();
    const [NewUser, setNewUsername] = useState(userName);
    const [NewName, setNewName] = useState(Name);
    const [NewPass, setNewPass] = useState();
    const [show, setShow] = useState(false);
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
                    console.log(Email)

                }
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

    return (
        <div className="container-fullwidth">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group w-100">
                            <label htmlFor="name">Name:</label>
                            <input className="form-control" id="name" onChange={handleNameChange} type="text" value={NewName} />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="username">Username</label>
                            <input className="form-control" autoComplete="off" onChange={handleUserChange} id="username" type="username" value={NewUser} />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="email">Email address</label>
                            <input className="form-control" id="email" type="email" value={Email} readOnly />
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" onChange={handlePassChange} className="form-control" value={NewPass} id="exampleInputPassword1" />
                            <small className="form-text text-muted">To change your Profile Picture, go to <a href="https://gravatar.com" className="text-decoration-none">gravatar.com</a></small>
                        </div>
                        <div className="form-group form-check w-100">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
          </Button>
                            <Button variant="primary" onClick={Edit}>
                                Save Changes
          </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={Edit}>
                                <div className="form-group w-100">
                                    <label htmlFor="name">Name:</label>
                                    <input className="form-control" id="name" type="text" value={NewName} />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="username">Username</label>
                                    <input className="form-control" id="username" type="text" value={NewUser} />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="email">Email address</label>
                                    <input className="form-control" id="email" type="email" placeholder={Email} readOnly />
                                </div>
                                <div className="form-group w-100">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                    <small className="form-text text-muted">To change your Profile Picture, go to <a href="https://gravatar.com" className="text-decoration-none">gravatar.com</a></small>
                                </div>
                                <div className="form-group form-check w-100">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
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
                                    <Search />
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
                                        <a className="dropdown-item" href="#" onClick={handleShow} style={{ display: 'inline-flex' }}><span className="material-icons">settings</span> Settings</a>
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
