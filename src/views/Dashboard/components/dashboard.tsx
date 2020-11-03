
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
    return (
      <div></div>
    )
    setTimeout(function () {
      return <div className="bg-primary d-flex justify-content-center offline text-light" style={{ padding: '10px', display: 'none' }}>You're back online!</div>;
    }, 1000);
    clearInterval();
  } else {
    return <div className="bg-warning d-flex justify-content-center offline" style={{ padding: '10px', display: 'none' }}>You are offline. Connect to the internet to view the latests posts</div>
  }
  window.location.reload(false);

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
          console.log(Email)

        }
      })
  }, []);




  if (loadingAuthState) {

    return (
      <div>
        <div className="text-center">
          <div className="spinner-border" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div style={{ textAlign: 'center', width: '100vw', height: '100vh' }}>
      <Offline />
      <Navbar name={Name} />
      <div className="content">
        <SimpleForm username={userName} uid={firebase.auth().currentUser?.uid} modalopen={true} />
      </div>
    </div>
  );
}

export default Dashboard;
