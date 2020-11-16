import React, { Component, useState } from "react";
import firebase from "../../../firebase";
import "firebase/firestore";
import 'firebase/storage'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import Gravatar from 'react-gravatar'
import './Posts.css'
import TimeAgo from 'react-timeago';
import PostsList from './Postlists'
import { post } from "jquery";
import md5 from 'md5'
import addNotification from 'react-push-notification';
import imgbbUploader from 'imgbb-uploader'
import Dropdown from "./dropdown";


class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      Post_Title: '',
      Post_Content: '',
      Post_Id: '',
      Creator_Email: '',
      Creator_Username: '',
      timeM: '',
      uploaded: false,
      drag: false

    };
    this.onInputchange = this.onInputchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.console = this.console.bind(this);
  }






  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  handleError(event) {
    const img = document.getElementById('cover');
    img.style.display = "none";
  }

  handleChange(event) {
    if (event.target.files[0] != null) {
      var reader = new FileReader();
      console.log(reader.readAsDataURL(event.target.files[0]))




    }
  }

  deleteRow = (e, id) => {
    Swal.fire({
      icon: 'error',
      title: 'Are you sure...',
      text: 'This action cannot be undone',
      showCloseButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.setState({
          items: this.state.posts.splice(id, 1),
        })
      }
    })
    console.log(id)
  }


  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true })
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({ drag: false })
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ drag: false })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files[0].size > 10000000) {
        Swal.fire({
          icon: 'error',
          title: 'The uploaded is to big!',
          text: 'The maximum size is 10Mb!'
        })
      }
      else {
        this.setState({ uploaded: true })
        const file = e.dataTransfer.files
        firebase.storage().ref('posts/' + this.state.Post_Id).put(e.dataTransfer.files[0]).then(function () {
          console.log('succesfully uploaded')
        }).catch(error => {
          console.error(error.message)
        })


        console.log(this.state.Post_Image_Url)
        console.log(e.dataTransfer.files[0])
        // console.log(URL.createObjectURL(e.dataTransfer.files))
        e.dataTransfer.clearData()
      }
    }
  }
  componentDidMount() {
    // let div = this.dropRef.current
    // div.addEventListener('dragenter', this.handleDragIn)
    // div.addEventListener('dragleave', this.handleDragOut)
    // div.addEventListener('dragover', this.handleDrag)
    // div.addEventListener('drop', this.handleDrop)
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.setState({ Post_Id: id })
    fetch('https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Posts')
      .then(res => res.json())
      .then(users => {
        console.log(users.documents)
        this.setState({ posts: users.documents })
      })
    fetch(`https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Users/${firebase.auth().currentUser.uid}`)
      .then(res => res.json())
      .then(user => {
        this.setState({ Creator_Username: user.fields.username.stringValue })
        this.setState({ Creator_Email: firebase.auth().currentUser.email })
      })
    this.state.posts.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
  }
  componentWillUnmount() {
    // let div = this.dropRef.current
    // div.removeEventListener('dragenter', this.handleDragIn)
    // div.removeEventListener('dragleave', this.handleDragOut)
    // div.removeEventListener('dragover', this.handleDrag)
    // div.removeEventListener('drop', this.handleDrop)
  }

  handleImage = (posts) => {
    firebase.storage().ref('posts/' + posts.fields.Post_Id.stringValue).getDownloadURL().then(imgUrl => {
      return (
        <img className="w-full" src={imgUrl} />
      )
    })
  }


  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state)
    if (this.state.Post_Title === '' && this.state.Post_Content === '') {
      var small = document.getElementById('Post_Title');
      small.innerHTML = 'Your Post has to have a title!'
    } else {
      if (this.state.Post_Title.length > 25 && this.state.Post_Content.length > 25) {

      }
      else {
        const db = firebase.firestore();
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const date = new Date().toString();
        const NewPost = {
          Post_Title: this.state.Post_Title,
          Post_Content: this.state.Post_Content,
          Creator_Email: this.state.Creator_Email,
          Creator_Username: this.state.Creator_Username,
          timeM: date,
          uid: this.state.Post_Id
        }
        var id = Math.random().toString(36).substr(2, 9);
        db.collection("Posts").doc(this.state.Post_Id).set(NewPost)
          .then(function (docRef) {
            window.location.reload()
          })
          .catch(function (error) {

          });

        this.setState({
          posts: [NewPost, ...this.state.posts],
          Post_Title: '',
          Post_Content: '',
          Post_Image_Url: '',
          Creator_Username: '',
          timeM: ''
        })
        var washingtonRef = db.collection("Users").doc(firebase.auth().currentUser.uid);
        const increment = firebase.firestore.FieldValue.increment(1);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
          Posts: increment
        })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
    }

    this.setState({ uploaded: false })
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      textarea => (textarea.value = "")
    );
  }




  console = (e) => {
    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <div>
          <center>
            <div className="sm:w-auto" >


              <div className="mt-10 md:mt-0 md:col-span-2 m-12">
                <form onSubmit={this.onSubmitForm}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-10">
                          <label for="company_website" className="block text-sm font-medium leading-5 text-gray-700">
                            Post Title
                </label>
                          <div className="mt-1 flex w-100 rounded-md shadow-sm">

                            <input id="company_website" name="Post_Title" id="Post_Title" value={this.state.Posts_name} onChange={this.onInputchange} className="form-input  focus:outline-none focus:shadow-outline mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="How to cook..." />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label for="about" className="block text-sm leading-5 font-medium text-gray-700">
                          Post Content
              </label>
                        <div className="rounded-md shadow-sm">
                          <textarea id="about" rows="3" name="Post_Content" value={this.state.posts_content} onChange={this.onInputchange} className="form-textarea focus:outline-none focus:shadow-outline mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Well cooking isn't for babies ..."></textarea>
                        </div>

                      </div>



                      {/* <label>
                        <input type="file" onChange={this.handleChange} name="Post_Image_Url" hidden />
                        <div className="mt-6" ref={this.dropRef}>
                          <label className="block text-sm leading-5 font-medium text-gray-700">
                            Cover photo
              </label>
                          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <p className="mt-1 text-sm text-gray-600">
                                {this.state.uploaded ? (
                                  <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                    Uploaded{'\u00A0'}
                                  </a>
                                ) : (
                                    <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                      Upload a file{'\u00A0'}
                                    </a>
                                  )}

                                or drag and drop

                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                  </p>
                            </div>
                          </div>
                        </div>
                      </label> */}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <span className="inline-flex rounded-md shadow-sm">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                          Create Post
              </button>
                      </span>
                    </div>
                  </div></form>
              </div>

            </div>
          </center>
          {this.console}
          <center>
            <ul classNameName="mt-24">
              {this.state.posts
                .map((posts, id) => {


                  if (posts.fields.Creator_Email.stringValue === firebase.auth().currentUser.email) {
                    console.log(firebase.auth().currentUser.email)
                    return (
                      <li key={id} id={id}>
                        <div className="lg:pl-64 pb-10 clearfix lg:pr-64">
                          <div className="bg-white p-6 justify-fit-content rounded-lg shadow-lg" style={{ width: '50vw' }}>
                            <div className="sm:flex sm:flex-shrink-0 justify-between">
                              <div className="sm:flex sm:info sm:flex-shrink-0">
                                <div>
                                  <div className="w-10 h-10 bg-cover bg-center rounded-full mr-3 shadow-inner" style={{ backgroundImage: `url(https://gravatar.com/avatar/${md5(firebase.auth().currentUser?.email)}})` }}>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-600 font-medium" title={posts.fields.Creator_Username.stringValue}>{posts.fields.Creator_Username.stringValue}</p>
                                  <div className="flex items-center text-center text-xs text-gray-600">
                                    <center>
                                      <p className="max-w-10 sm:text-center"><TimeAgo date={posts.fields.timeM.stringValue} className="text-center" /></p>
                                    </center>
                                  </div>
                                </div>
                              </div>
                              <div className="drop">
                                <Dropdown postId={posts.fields.uid.stringValue} postname={posts.fields.Post_Title.stringValue} posts_content={posts.fields.Post_Content.stringValue} />
                              </div>
                            </div>
                            <div className="mt-4">
                              <h1>{posts.fields.Post_Title.stringValue}</h1>
                              <p className="text-gray-600 text-sm">
                                {posts.fields.Post_Content.stringValue}
                              </p>
                            </div>
                            {/* <div className="mt-6 flex">
                           <button className="flex items-center hover:opacity-75 mr-4">
                             <i className="mr-2">
                               <svg className="fill-current text-blue-500 w-6 h-6" height={512} viewBox="0 0 16 16" width={512}>
                                 <path d="M0 6v8a1 1 0 001 1h3V5H1a1 1 0 00-1 1zM14.153 6H11.2a.491.491 0 01-.43-.247.492.492 0 01-.007-.496l1.041-1.875c.229-.411.252-.894.065-1.325a1.488 1.488 0 00-1.013-.858l-.734-.184a.499.499 0 00-.493.15l-3.987 4.43A2.499 2.499 0 005 7.267V12.5C5 13.878 6.122 15 7.5 15h4.974a2.506 2.506 0 002.411-1.84l1.068-4.898A1.849 1.849 0 0014.153 6z" />
                               </svg>
                             </i>
                             <p className="mt-1 text-blue-500">Like</p>
                           </button>
                           <button className="flex items-center hover:opacity-75">
                             <i className="mr-2">
                               <svg className="fill-current text-blue-500 w-6 h-6" height={512} viewBox="0 0 511.072 511.072" width={512}>
                                 <path d="M74.39 480.536H38.177l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425C-2.04 277.611-3.811 238.37 6.932 199.776c12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z" />
                               </svg>
                             </i>
                             <p className="mt-1 text-blue-500">64 Comments</p>
                           </button>
                         </div>
                         <div className="mt-6 border-gray-100 border-t pt-4 flex justify-between">
                           <input placeholder="Add comment" className="placeholder-gray-300 text-gray-700 focus:outline-none" type="text" />
                           <div className="flex">
                             <button className="mr-2 hover:opacity-75">
                               <i>
                                 <svg className="fill-current text-gray-300 w-6 h-6" height="512pt" viewBox="-96 0 512 512" width="512pt">
                                   <path d="M160 512C71.766 512 0 440.234 0 352V128c0-11.797 9.559-21.332 21.332-21.332 11.777 0 21.336 9.535 21.336 21.332v224c0 64.684 52.629 117.332 117.332 117.332S277.332 416.684 277.332 352V117.332c0-41.172-33.492-74.664-74.664-74.664-41.176 0-74.668 33.492-74.668 74.664v213.336c0 17.64 14.355 32 32 32s32-14.36 32-32V128c0-11.797 9.559-21.332 21.332-21.332 11.777 0 21.336 9.535 21.336 21.332v202.668c0 41.172-33.496 74.664-74.668 74.664s-74.668-33.492-74.668-74.664V117.332C85.332 52.652 137.961 0 202.668 0 267.371 0 320 52.652 320 117.332V352c0 88.234-71.766 160-160 160zm0 0" />
                                 </svg>
                               </i>
                             </button>
                             <button className="hover:opacity-75">
                               <i>
                                 <svg className="fill-current text-gray-300 w-6 h-6" viewBox="0 0 477.867 477.867">
                                   <path d="M238.933 0C106.974 0 0 106.974 0 238.933s106.974 238.933 238.933 238.933 238.933-106.974 238.933-238.933C477.726 107.033 370.834.141 238.933 0zm0 443.733c-113.108 0-204.8-91.692-204.8-204.8s91.692-204.8 204.8-204.8 204.8 91.692 204.8 204.8c-.122 113.058-91.742 204.678-204.8 204.8z" />
                                   <circle cx="153.6" cy="204.8" r="34.133" />
                                   <circle cx="324.267" cy="204.8" r="34.133" />
                                   <path d="M304.287 296.61c-5.637-7.554-16.331-9.108-23.885-3.47a17.07 17.07 0 00-.953.766c-24.135 17.628-56.898 17.628-81.033 0-7.131-6.164-17.909-5.379-24.072 1.752-6.164 7.131-5.379 17.909 1.752 24.072.308.267.626.522.953.766 36.531 27.922 87.236 27.922 123.767 0 7.555-5.638 9.109-16.332 3.471-23.886z" />
                                 </svg>
                               </i>
                             </button>
                           </div>
                         </div> */}
                          </div>
                        </div>
                      </li>
                    )
                  }
                  else {
                    console.log('no')
                    return (
                      <li key={id} id={id} >
                        <div className="sm:max-w-sm mb-10 lg:max-w-lg rounded shadow-lg">
                          <div className="px-6 py-4">
                            <div className="px-6 pt-4 pb-2 justify-center">
                              <div className="flex justify-between items-center">
                                <div class="flex items-center">
                                  <Gravatar className="w-10 h-10 rounded-full mr-4" email={posts.fields.Creator_Email.stringValue} username={posts.fields.Creator_Username.stringValue} />
                                  <div className="text-sm">
                                    <p className="text-gray-900 leading-none">{posts.fields.Creator_Username.stringValue}</p>
                                    <p className="text-gray-600 text-xs w-25">Created <TimeAgo date={posts.fields.timeM.stringValue} live="true" /></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="font-bold text-xl mb-2 break-all">{posts.fields.Post_Title.stringValue}</div>
                            <p className="text-gray-700 text-base break-all">
                              {posts.fields.Post_Content.stringValue}
                            </p>
                          </div>
                        </div>


                      </li>
                    )
                  }

                }).reverse()}
            </ul>
          </center>
        </div>
      </div >
    );
  }

}

export default SimpleForm
