import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// eslint-disable-next-line
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/firestore";
import './u.css'
import './assets/form.css'
import loading from './assets/loading.gif'
import { AuthContext } from "../../../AuthProvider";

interface UserData {
    email: string;
    password: string;
}



const Login = () => {
    const authContext = useContext(AuthContext);
    const { loadingAuthState } = useContext(AuthContext);
    const history = useHistory();
    const [values, setValues] = useState({
        email: "",
        password: ""
    } as UserData);

    const db = firebase.firestore();


    useEffect(() => {
        firebase
            .auth()
            .getRedirectResult()
            .then(result => {
                if (!result || !result.user || !firebase.auth().currentUser) {
                    return;
                }

                return setUserProfile().then(() => {
                    redirectToTargetPage();
                });
            })
            .catch(error => {
                console.log(error, 'error');
            });

    }, []);

    const setUserProfile = async () => {
        if (await isUserExists()) {
            return;
        }

        const currentUser = firebase.auth().currentUser!;
        db
            .collection("Users")
            .doc(currentUser.uid)
            .set({
                username: currentUser.displayName
            })
            .then(() => {
                console.log('Saved');
                return;
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }

    const isUserExists = async () => {
        const doc = await db
            .collection("users")
            .doc(firebase.auth().currentUser!.uid)
            .get()
        return doc.exists;
    }


    const redirectToTargetPage = () => {
        history.push("/dashboard");
    }

    const forgot_pass = () => {
        history.push('/auth/forgot-password')
    }

    const handleClick = () => {
        history.push("/auth/signup")
    }

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                authContext.setUser(res);
                console.log(res, 'res')
                history.push("/dashboard");
            })
            .catch(error => {
                console.log(error.message);
                let con = document.getElementById('error')!
                con.style.display = "block";
                if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                    error.message = 'There has been no user found with this email.'
                }
                if (error.message === "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
                    error.message = 'A network error has occured. Please check your connection.'
                }
                con.innerHTML = error.message


            });
    }

    const handleSocialClick = (sns: any) => {
        console.log(sns, 'sns');

        let provider: firebase.auth.AuthProvider;
        switch (sns) {
            case "Facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                console.log(provider, 'fbprovider');
                break;

            case "Google":
                provider = new firebase.auth.GoogleAuthProvider();
                console.log(provider, 'gprovider');
                break;

            case "Twitter":
                provider = new firebase.auth.GithubAuthProvider();
                break;

            default:
                throw new Error("Unsupported SNS " + sns)
        }

        firebase
            .auth()
            .signInWithRedirect(provider)
            .catch(handleAuthError);
    }



    const handleAuthError = (error: firebase.auth.Error) => {
        console.log(error)
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

    db.collection("cities").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });


    return (
        <div style={{ textAlign: 'center' }}>
            <link rel="stylesheet" href='https://googledrive.com/host/1CCwkBmsaAppGwnuvwGKAP90-UdjqECZ4' />
            <form className="form-signin needs-validation" noValidate onSubmit={handleSubmit}>
                <img className="mb-4" src="https://i.ibb.co/8Nyq7r8/n8pk9u-X-removebg-preview.png" alt="" width={72} height={72} />
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                <label htmlFor="validationCustom01" className="sr-only">Email address</label>
                <input type="email" id="validationCustom01" className="form-control was-validated" name="email" value={values.email} placeholder="Email address" onChange={handleChange} required />
                <label htmlFor="validationCustom02" className="sr-only">Password</label>
                <input type="password" id="validationCustom02" className="form-control was-validated" placeholder="Password" value={values.password} name="password" onChange={handleChange} required />
                <p style={{ color: 'red' }} id="error"></p>
                <button className="btn btn-lg btn-primary btn-block" type="submit" >Sign in</button>
                <p className="mt-5 mb-3"><a style={{ color: '#660099', cursor: 'pointer' }} onClick={forgot_pass}>Forgot password.</a></p>
                <p className="mt-5 mb-3">New to Fistbump? <a style={{ color: '#660099', cursor: 'pointer' }} onClick={handleClick}>Create an account.</a></p>
            </form>
        </div>
    );
}

export default Login;
