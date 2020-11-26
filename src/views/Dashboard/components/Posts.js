import React, { Component } from "react";
import firebase from "../../../firebase";
import "firebase/firestore";
import 'firebase/storage'
import Swal from 'sweetalert2'
import './Posts.css'
import Post from "./Post";


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
      Creator_Pic: '',
      timeM: '',
      Like_Array: [],
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
  like = (e, id) => {
    e.preventDefault();

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
        // eslint-disable-next-line
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
        this.setState({ Creator_Pic: user.fields.Profile_Pic.stringValue })
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
        <img className="w-full" src={imgUrl} alt={`${posts.fields.Post_Id.stringValue}`} />
      )
    })
  }

  like = (id) => {
    var db = firebase.firestore();
    db.collection('Posts').doc(id)
      .collection('Likes').set({
        uid: firebase.auth().currentUser.uid
      }).then(function () {
        console.log(`Liked Post with id: ${id}`)
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
        // eslint-disable-next-line
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const date = new Date().toString();
        const NewPost = {
          Post_Title: this.state.Post_Title,
          Post_Content: this.state.Post_Content,
          Creator_Email: this.state.Creator_Email,
          Creator_Username: this.state.Creator_Username,
          Creator_Pic: this.state.Creator_Pic,
          timeM: date,
          uid: this.state.Post_Id,
          Likes: 0,
          Comments: 0,
          // eslint-disable-next-line
          Likes_Array: ["Likes"]
        }
        // eslint-disable-next-line
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
    {/* // eslint-disable-next-line */}
                          </label>
                          <div className="mt-1 flex w-100 rounded-md shadow-sm">
                            {/*  // eslint-disable-next-line */}
                            <input name="Post_Title" id="Post_Title" value={this.state.Posts_name} onChange={this.onInputchange} className="form-input  focus:outline-none focus:shadow-outline mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="How to cook..." />
                            {/*  // eslint-disable-next-line */}
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
                    console.log()
                    return (
                      <Post posts={posts} dropdown />
                    )
                  }

                  else {
                    console.log('no')
                    return (
                      <Post posts={posts} />
                    )
                  }
                }).reverse()
              }

            </ul>
          </center>
        </div>
      </div >
    );
  }

}

export default SimpleForm
