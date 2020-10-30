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
        history.push("/auth/login")
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
                        history.push("/dashboard");
                    })
                    .catch(error => {
                        console.error(error.message);
                        var con = document.getElementById('error');
                        con!.innerHTML = error.message;
                    });
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

    return (
        <div style={{ textAlign: 'center' }}>
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="" width={72} height={72} />
                <h1 className="h3 mb-3 font-weight-normal">SignUp</h1>
                <label htmlFor="inputName" className="sr-only">Full Name</label>
                <input type="name" id="inputName" className="form-control" name="name" placeholder="Full Name" onChange={handleChange} />
                <label htmlFor="inputUsername" className="sr-only">UserName</label>
                <input type="text" id="inputUsername" className="form-control" name="username" placeholder="Username" onChange={handleChange} />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" name="email" placeholder="Email address" onChange={handleChange} />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                <p style={{ color: 'red' }} id="error"></p>
                <button className="btn btn-lg btn-primary btn-block" type="submit" >Signup</button>
                <p className="mt-5 mb-3">Already have an account? <a style={{ color: '#660099', cursor: 'pointer' }} onClick={Logout}>Login.</a></p>
            </form>
        </div>
    );
}

export default SignUp;