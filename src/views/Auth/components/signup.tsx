import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
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
        first_name: "",
        last_name: "",
    });
    // eslint-disable-next-line
    const [image, setImage] = useState();
    const [data, setData] = useState(false);

    const history = useHistory();

    // eslint-disable-next-line
    const Logout = () => {
        history.push("/login")
    }

    // eslint-disable-next-line
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

    // const fileupload = (event: any) => {
    //     console.log(event.target.files[0])
    //     const ref = firebase.storage().ref(`/users/${firebase.auth().currentUser?.uid}`)
    //     ref.put(event.target.files[0]).then(function (snapshot) {
    //         console.log('Uploaded a blob or file!');
    //     })
    // }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        console.log(values, 'values');
        const db = firebase.firestore();
        db.collection('Users').where('username', '==', values.username)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    setData(!!doc.data())
                    if (!!doc.data()) {
                        var con = document.getElementById('error');
                        con!.innerHTML = `The username ${values.username} is taken.`;
                    }
                    else {
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
                                        name: values.first_name + " " + values.last_name,
                                        Posts: 0,
                                        Following: 0,
                                        Followers: 0,
                                        Profile_Pic: 'https://i.ibb.co/8ggnVz0/avatarinsideacircle-122011.png',
                                        uid: userCredential.user!.uid,
                                        Followers_Array: ['Followers']
                                    })
                                    .then(() => {




                                        history.push("/");


                                    })
                                    .catch(error => {
                                        var erro = error.message;
                                        console.error(erro);
                                        var con = document.getElementById('error');
                                        con!.innerHTML = erro;
                                    });
                            }).catch(error => {

                                console.error(error)
                                console.error(error.message);
                                var con = document.getElementById('error');
                                con!.innerHTML = error.message;
                            })
                    }
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

    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="w-full flex flex-wrap">
                {/* Register Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                        <img src="https://i.ibb.co/tX3qChr/n8pk9u-X-removebg-preview-1.png" alt="" />
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">SignUp.</p>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                            <div className="grid lg:grid-cols-2 align-middle">
                                <div className="flex flex-col w-full pt-4 pr-5">
                                    <label htmlFor="name" className="text-lg">First Name</label>
                                    <input type="text" id="name" name="first_name" value={values.first_name} onChange={handleChange} placeholder="John" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="flex flex-col w-full pt-4">
                                    <label htmlFor="name" className="text-lg">Last Name</label>
                                    <input type="text" id="name" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Smith" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="username" className="text-lg">Username</label>
                                <input type="username" id="username" value={values.username} onChange={handleChange} name="username" placeholder="john@123" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
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
                            <input type="submit" value="Register" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>Already have an account? <Link to="/login" className="underline font-semibold">Log in here</Link></p>
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

export default SignUp;