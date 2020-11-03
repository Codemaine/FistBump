import React, { Component, useState } from "react";
import firebase from "../../../firebase";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import Gravatar from 'react-gravatar'
import './Posts.css'
import TimeAgo from 'timeago-react';
import PostsList from './Postlists'
import { post } from "jquery";
import md5 from 'md5'


class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          Post_Title: 'Welcome to FistBump',
          Post_Content: 'hi',
          Post_Image_Url: 'https://image.shutterstock.com/image-vector/smiling-group-stick-figures-holding-260nw-1115953925.jpg',
          Creator_Email: 'jermaine.antwi@icloud.com',
          Creator_Username: 'Codemaine@234',
          timeM: '18:14 17-10-2020',
          id: '34454335',
          comments: [
            {
              Commenter_Email: '',
              Commenter_Username: '',
              Comment_Message: ''
            }
          ]
        }
      ],
      Post_Title: '',
      Post_Content: '',
      Post_Image_Url: '',
      Creator_Email: '',
      Creator_Username: '',
      timeM: '',
      comments: [
        {
          Commenter_Email: '',
          Commenter_Username: '',
          Comment_Message: ''
        }
      ],
      uploaded: false

    };
    this.onInputchange = this.onInputchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }



  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }




  handleChange(event) {
    if (event.target.files[0] != null) {
      this.setState({ [event.target.name]: URL.createObjectURL(event.target.files[0]) });
      this.setState({ uploaded: true })
      console.log(URL.createObjectURL(event.target.files[0]))
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





  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state)
    if (this.state.Post_Title === '' && this.state.Post_Content === '') {
      var small = document.getElementById('Post_Title');
      small.innerHTML = 'Your Post has to have a title!'
    } else {
      const db = firebase.firestore();
      const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const NewPost = {
        Post_Title: this.state.Post_Title,
        Post_Content: this.state.Post_Content,
        Post_Image_Url: this.state.Post_Image_Url,
        Creator_Email: firebase.auth().currentUser.email,
        Creator_Username: this.props.username,
        timeM: new Date(),
      }
      this.setState({
        posts: [NewPost, ...this.state.posts],
        Post_Title: '',
        Post_Content: '',
        Post_Image_Url: '',
        Creator_Username: '',
        timeM: ''
      })
    }
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      textarea => (textarea.value = "")
    );
  }

  dropRef = React.createRef()
  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }

  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }


  render() {
    const { items } = this.state;

    return (
      <div>
        <div>
          <center>
            <div class="sm:w-auto" >


              <div class="mt-10 md:mt-0 md:col-span-2 m-12">
                <form onSubmit={this.onSubmitForm}>
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white sm:p-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-10">
                          <label for="company_website" class="block text-sm font-medium leading-5 text-gray-700">
                            Post Title
                </label>
                          <div class="mt-1 flex w-100 rounded-md shadow-sm">

                            <input id="company_website" name="Post_Title" id="Post_Title" value={this.state.Posts_name} onChange={this.onInputchange} class="form-input  focus:outline-none focus:shadow-outline mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="How to cook..." />
                          </div>
                        </div>
                      </div>

                      <div class="mt-6">
                        <label for="about" class="block text-sm leading-5 font-medium text-gray-700">
                          Post Content
              </label>
                        <div class="rounded-md shadow-sm">
                          <textarea id="about" rows="3" name="Post_Content" value={this.state.posts_content} onChange={this.onInputchange} class="form-textarea focus:outline-none focus:shadow-outline mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Well cooking isn't for babies ..."></textarea>
                        </div>

                      </div>


                      <label>
                        <input type="file" onChange={this.handleChange} name="Post_Image_Url" hidden />
                        <div class="mt-6" ref={this.dropRef}>
                          <label class="block text-sm leading-5 font-medium text-gray-700">
                            Cover photo
              </label>
                          <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="text-center">
                              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <p class="mt-1 text-sm text-gray-600">
                                {this.state.uploaded ? (
                                  <a class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                    Uploaded
                                  </a>
                                ) : (
                                    <a class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                      Upload a file
                                    </a>
                                  )}
                                <br />

                              </p>
                              <p class="mt-1 text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                  </p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <span class="inline-flex rounded-md shadow-sm">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                          Create Post
              </button>
                      </span>
                    </div>
                  </div></form>
              </div>

            </div>
          </center>

          <center>
            <ul className="mt-24">
              {this.state.posts.map((posts, id) => {
                if (posts.Post_Image_Url === '') {
                  return (

                    <li key={id} id={id} >
                      <div class="sm:max-w-sm mb-10 lg:max-w-lg rounded overflow-hidden shadow-lg">
                        <div class="px-6 py-4">
                          <div class="px-6 pt-4 pb-2 justify-center">
                            <div className="flex items-center">
                              <Gravatar className="w-10 h-10 rounded-full mr-4" email={posts.Creator_Email} username={posts.Creator_Username} />
                              <div className="text-sm">
                                <p className="text-gray-900 leading-none">{posts.Creator_Username}</p>
                                <p className="text-gray-600 text-xs w-25">Created <TimeAgo date={posts.timeM} live="true" /></p>
                              </div>
                            </div>
                          </div>
                          <div class="font-bold text-xl mb-2 break-all">{posts.Post_Title}</div>
                          <p class="text-gray-700 text-base break-all">
                            {posts.Post_Content}
                          </p>
                        </div>
                      </div>

                    </li>
                  )
                }
                else {

                  return (
                    <li key={id} id={id} >
                      <div class="sm:max-w-sm mb-10 lg:max-w-lg rounded overflow-hidden shadow-lg">
                        <img class="w-full" src={posts.Post_Image_Url} alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                          <div class="px-6 pt-4 pb-2 justify-center">
                            <div className="flex items-center">
                              <Gravatar className="w-10 h-10 rounded-full mr-4" email={posts.Creator_Email} username={posts.Creator_Username} />
                              <div className="text-sm">
                                <p className="text-gray-900 leading-none">{posts.Creator_Username}</p>
                                <p className="text-gray-600 text-xs w-25">Created <TimeAgo date={posts.timeM} live="true" /></p>
                              </div>
                            </div>
                          </div>
                          <div class="font-bold text-xl mb-2 break-all">{posts.Post_Title}</div>
                          <p class="text-gray-700 text-base break-all">
                            {posts.Post_Content}
                          </p>
                        </div>
                      </div>


                    </li>
                  )
                }
              })}
            </ul>
          </center>
        </div>
      </div >
    );
  }

}

export default SimpleForm
