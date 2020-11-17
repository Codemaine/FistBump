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
        history.push("/");
    }

    const forgot_pass = () => {
        history.push('/forgot-password')
    }

    const handleClick = () => {
        history.push("/signup")
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
                history.push("/");
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

    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");

    return (
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
                            Log In
            </h2>
                    </div>
                    <form className="mt-8" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div>
                                <input aria-label="Email address" value={values.email} name="email" type="email" className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="Email address" />
                            </div>
                            <div className="-mt-px">
                                <input aria-label="Password" value={values.password} name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" onChange={handleChange} placeholder="Password" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm leading-5 text-center">
                                <p className="text-red-600 text-center" id="error"></p>
                                <a onClick={forgot_pass} className="font-medium text-center text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    Forgot your password?
                </a>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                Log in
              </button>
                            <p className="font-xs text-center" style={{ fontSize: '12px', textAlign: 'center', width: '150px' }}>New to FistBump? <a className="text-indigo-600" onClick={handleClick} style={{ cursor: 'pointer' }}>Create an account</a></p>
                            <p className="invisible">The password is invalid or the user</p>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}

export default Login;
