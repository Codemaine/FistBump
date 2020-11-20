
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/firestore";
import "firebase/messaging";
import Gravatar from 'react-gravatar'

import './dropdown.css'
import { AuthContext } from "../../../AuthProvider";
import SimpleForm from "./Posts";
import Navbar from './navbar'



function Offline() {

  if (navigator.onLine) {
    return <div className="bg-primary d-flex justify-content-center offline text-light" style={{ padding: '10px', display: 'none' }}>You're back online!</div>;
  } else {
    return <div className="bg-warning d-flex justify-content-center offline" style={{ padding: '10px', display: 'none' }}>You are offline. Connect to the internet to view the latests posts</div>
  }

  return (
    <div></div>
  )
}

const Dashboard = () => {
  const [userName, setUsername] = useState();
  const [Name, setUserName] = useState();
  const [ProfilePic, setUserPic] = useState();
  const [Email, setUserEmail] = useState();
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = (event: any) => {
    event.preventDefault();

    firebase
      .auth()
      .signOut()
      .then(res => {
        history.push("/auth/login");
      })
  }

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


        }
      })
  }, []);




  if (loadingAuthState) {

    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
        <circle cx="50" cy="50" fill="none" stroke="#222222" stroke-width="2" r="24" stroke-dasharray="113.09733552923255 39.69911184307752">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
      </div>
    );
  }



  return (
    <div style={{ textAlign: 'center', width: '100vw', height: '100vh' }}>
      <Offline />
      <Navbar name={Name} />
      <div className="content">
        <SimpleForm username={userName} email={Email} uid={firebase.auth().currentUser?.uid} modalopen={true} />
      </div>

    </div>
  );
}

export default Dashboard;
