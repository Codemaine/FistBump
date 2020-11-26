import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// eslint-disable-next-line
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/firestore";
import './u.css'
import './assets/form.css'
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
        // eslint-disable-next-line
    }, []);
    // eslint-disable-next-line
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

    // eslint-disable-next-line
    const forgot_pass = () => {
        history.push('/forgot-password')
    }

    // eslint-disable-next-line
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


    // eslint-disable-next-line 
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
        <div>
            <div className="w-full flex flex-wrap">
                {/* Register Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <img src="https://i.ibb.co/tX3qChr/n8pk9u-X-removebg-preview-1.png" alt="" />
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">LogIn.</p>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="password" className="text-lg">Email</label>
                                <input type="email" id="email" name="email" value={values.email} onChange={handleChange} placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="password" className="text-lg">Password</label>
                                <input type="password" id="password" value={values.password} onChange={handleChange} name="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex flex-col pt-4">
                                <p className="text-red-500" id="error"></p>
                            </div>
                            <div className="flex flex-col pt-4">
                                <Link to="/forgot-password" className="font-semibold">Forgot your password?</Link>
                            </div>
                            <input type="submit" value="Login" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>New to FistBump? <Link to="/signup" className="underline font-semibold">Sign Up here</Link></p>
                        </div>
                    </div>
                </div>
                {/* Image Section */}
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-full hidden md:block p-0" src={require('./assets/cover.jpeg')} alt="" />
                </div>
            </div>

        </div>

    );
}

export default Login;
