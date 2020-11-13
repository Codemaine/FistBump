import React, { Component } from 'react';
import firebase from '../../../firebase'
import "firebase/firestore"
import Navbar from './settingsnav';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            confirm_password: '',
            user: []
        }
        this.settings = this.settings.bind(this);
        this.resetPass = this.resetPass.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
      fetch(`https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Users/${firebase.auth().currentUser.uid}`)
      .then(res => res.json())
      .then(user => {
        this.setState({ name: user.fields.name.stringValue })
        var splitPhrase = user.fields.name.stringValue.split(" ");
         this.setState({ first_name: splitPhrase[0] })
         this.setState({ last_name: splitPhrase[1] })
         this.setState({ email: user.fields.email.stringValue })
         this.setState({ username: user.fields.username.stringValue })
         this.setState({ user: user })
         console.log(this.state)
      })
    }

handleChange(event){
  event.preventDefault();
  this.setState({ [event.target.name]: [event.target.value] })
}

    resetPass(e) {
      e.preventDefault();
      var auth = firebase.auth();
       var emailAddress = this.state.email;

auth.sendPasswordResetEmail(emailAddress).then(function() {
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
title: 'Email sent!'
})
}).catch(function(error) {
  console.error(error)
});
    }

    settings(e){
      e.preventDefault();
      const db = firebase.firestore()
      var washingtonRef = db.collection("Users").doc(firebase.auth().currentUser.uid);

// Set the "capital" field of the city 'DC'
return washingtonRef.update({
    name: this.state.name,
    username: this.state.username[0]
})
.then(function() {
    console.log("Document successfully updated!");
    window.location.reload();
  })
}

    render() {
        return (
            <div>
                {/*
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
*/}
                <div>
                    <Navbar />
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight text-gray-900">
                                Settings
            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                        <form>
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">First name</label>
                                                            <input name="first_name" value={this.state.first_name} onChange={this.handleChange} className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">Last name</label>
                                                            <input name="last_name" value={this.state.last_name} onChange={this.handleChange} className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                                        </div>
                                                        <div className="col-span-6">
                                                            <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">UserName</label>
                                                            <input name="username" onChange={this.handleChange} value={this.state.username} className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-4">
                                                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
                                                            <input name="email" onChange={this.handleChange} value={this.state.email} disabled className="mt-1 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-4">
                                                            <label className="block text-sm font-medium leading-5 text-gray-700">To change your profile picture, go to <a class="text-indigo-500" href="https://gravatar.com" target="_blank">gravatar.com</a></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                    <button onClick={this.settings} className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                                                        Save
                  </button>
                  <button onClick={this.resetPass} className="py-2 ml-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-600 transition duration-150 ease-in-out">
                      Send Password Reset
               </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* /End replace */}
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}
