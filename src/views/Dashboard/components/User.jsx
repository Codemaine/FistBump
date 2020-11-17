import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2'
import Gravatar from 'react-gravatar'
import firebase from '../../../firebase'
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
            Following: ''
        }
        this.following = this.following.bind(this);
        this.unfollowing = this.unfollowing.bind(this);
    }
    componentDidMount() {
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
                console.log(this.state.name)
            })
    }
    following = (e) => {
        console.log('yes')
        const db = firebase.firestore();
        var washingtonRef = db.collection("Users").doc(this.props.location.state.user.fields.uid.stringValue);
        const increment = firebase.firestore.FieldValue.increment(1);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            Followers: increment
        })
            .then(function () {
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
                    title: `You are now following ${this.state.name}`
                })
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    unfollowing = (e) => {
        console.log('yes')
        const db = firebase.firestore();
        var washingtonRef = db.collection("Users").doc(this.props.location.state.user.fields.uid.stringValue);
        const decrement = firebase.firestore.FieldValue.increment(-1);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            Followers: decrement
        })
            .then(function () {
                console.log("Document successfully updated!")
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
    render() {
        return (
            <div className="center">
                <div class="bg-white shadow p-4 rounded lg:w-64">
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
                    {/* <div class="mt-6">
                        <button onClick={this.following} class="rounded w-full items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
                            Follow
    </button>
                        <button onClick={this.unfollowing} class="rounded w-full items-center focus:border-none shadow bg-grey-500 px-4 py-2 text-black hover:bg-grey-400">
                            Followed
    </button>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default User;