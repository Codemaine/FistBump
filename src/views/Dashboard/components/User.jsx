import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../../firebase'
import { Offline, Online } from 'react-detect-offline';
import './user.css'
import 'firebase/firestore'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            profile: '',
            uid: '',
            Posts: '',
            Followers: '',
            Following: '',
            Followers_Array: [],
            offline: '',
            User_Followed: '',
            User_NotFollowed: ''
        }
        this.following = this.following.bind(this);
        this.unfollowing = this.unfollowing.bind(this);
    }
    componentDidMount() {
        document.title = `${this.state.username} | FistBump`
        fetch(`https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Users/${this.props.match.params.name}`)
            .then(res => res.json())
            .then(user => {
                this.setState({ name: user.fields.name.stringValue })
                this.setState({ username: user.fields.username.stringValue })
                this.setState({ email: user.fields.email.stringValue })
                this.setState({ uid: user.fields.uid.stringValue })
                this.setState({ Posts: user.fields.Posts.integerValue })
                this.setState({ profile: user.fields.Profile_Pic.stringValue })
                this.setState({ Followers: user.fields.Followers.integerValue })
                this.setState({ Following: user.fields.Following.integerValue })
                this.setState({ Followers_Array: user.fields.Followers_Array.arrayValue.values })
                console.log(this.state.Followers_Array)
                this.state.Followers_Array.filter(user => {
                    return user.stringValue.indexOf(firebase.auth().currentUser.uid) <= 0
                })
                    // eslint-disable-next-line
                    .map((user) => {
                        console.log(user)
                        // eslint-disable-next-line
                        if (user.stringValue === firebase.auth().currentUser.uid) {
                            console.log(user)
                            this.setState({ User_Followed: true })
                            this.setState({ User_NotFollowed: false })
                        }
                        // eslint-disable-next-line
                        if (user.stringValue != firebase.auth().currentUser.uid) {
                            console.log(user)
                            this.setState({ User_Followed: false })
                            this.setState({ User_NotFollowed: true })
                        }
                    })
            })
            .catch((err) => {
                console.error(err)
            })
        const db = firebase.firestore();
        db.collection('Users').where("Followers_Array", "array-contains", { id: firebase.auth().currentUser.uid }).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }).catch(function (error) {
            console.log("Error getting documents: ", error);
        });

    }
    componentDidUpdate() {
        document.title = `${this.state.username} | FistBump`
        if (this.state.offline === true) {
            document.title = `FistBump`
        }
    }

    following(e) {
        console.log('yes')
        const db = firebase.firestore();
        var washingtonRef = db.collection("Users").doc(this.props.match.params.name);
        washingtonRef.update({
            Followers_Array: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        })
            .then(function () {
                washingtonRef.update({
                    Followers: firebase.firestore.FieldValue.increment(1)
                });
                var washingtonRe = db.collection('Users').doc(firebase.auth().currentUser.uid)
                washingtonRe.update({
                    Following: firebase.firestore.FieldValue.increment(1)
                });
          window.location.reload();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.log("Error updating document: ", error);
            });
    }



    unfollowing = (e) => {
        console.log('yes')
        const db = firebase.firestore();
        var washingtonRef = db.collection("Users").doc(this.props.match.params.name);
        washingtonRef.update({
            Followers_Array: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
        })
            .then(function () {
                washingtonRef.update({
                    Followers: firebase.firestore.FieldValue.increment(-1)
                });
                var washingtonRe = db.collection('Users').doc(firebase.auth().currentUser.uid)
                washingtonRe.update({
                    Following: firebase.firestore.FieldValue.increment(-1)
                });
                window.location.reload()
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }


    render() {
        return (
            <>
                <Offline>
                    <div class="alert alert-warning" role="alert">
                        You're Offline! Connect to the internet use FistBump
</div>
                </Offline>
                < div className="center" >
                    <div class="bg-white shadow p-4 rounded lg:w-64">

                        <Offline> <div className="flex justify-center mt-4">
                            <h1>You're offline! Connect to the internet to view info.</h1>
                        </div> </Offline>
                        <Online>
                            <div class="text-center mt-4">
                                <p class="text-gray-600 font-bold">{this.state.name}
                                </p>
                                <p class="text-sm font-hairline text-gray-600 mt-1">{this.state.username}
                                </p>
                            </div>
                            <div class="flex justify-center mt-4">
                                <img class="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full" src={this.state.profile} alt={`Avatar for ${this.state.username}`} />
                            </div>
                            <div class="mt-6 flex sm:flex-row justify-between text-center">
                                <div>
                                    <p class="text-gray-700 font-bold">{this.state.Posts}
                                    </p>
                                    <p class="text-xs mt-2 text-gray-600 font-hairline">Posts{'\u00A0'}{'\u00A0'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-gray-700 font-bold">{this.state.Followers}
                                    </p>
                                    <p class="text-xs mt-2 text-gray-600 font-hairline">Followers{'\u00A0'}{'\u00A0'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-gray-700 font-bold">{this.state.Following}
                                    </p>
                                    <p class="text-xs mt-2 text-gray-700 font-hairline">Following{'\u00A0'}{'\u00A0'}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-6">
                                {this.state.User_NotFollowed &&
                                    <button onClick={this.following} class="rounded w-full items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
                                        Follow
    </button>}
                                {this.state.User_Followed &&
                                    <button onClick={this.unfollowing} style={{ display: `${this.state.User_Followed}` }} class="rounded w-full items-center focus:border-none shadow bg-grey-500 px-4 py-2 text-black hover:bg-grey-400">
                                        Followed
    </button>}
                            </div>
                        </Online>
                    </div>
                </div >
            </>
        )
    }
}

export default User;
