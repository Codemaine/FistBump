import React, { Component, useState } from "react";
import firebase from "../../../firebase";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import Gravatar from 'react-gravatar'
import './Posts.css'
import TimeAgo from 'timeago-react';
import PostsList from './Postlists'


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
      ]

    };
    this.onInputchange = this.onInputchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }





  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: URL.createObjectURL(event.target.files[0]) });
    console.log(URL.createObjectURL(event.target.files[0]))
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
        timeM: new Date().toLocaleString(),
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




  render() {
    const { items } = this.state;

    return (
      <div>
        <div className="container">
          <div className="createPost">
            <div class="d-flex justify-content-center"><h2>Create Post</h2></div>
            <form onSubmit={this.onSubmitForm} className="needs-validation">
              <div class="form-group w-100">
                <label for="Post_Title">Post Title</label>
                <input type="text" class="form-control" name="Post_Title" id="Post_Title" aria-describedby="Post_Title" value={this.state.posts_name} onChange={this.onInputchange} placeholder="Enter Post Title" required />
                <small id="Post_Title"></small>
              </div>
              <div class="form-group w-100">
                <label for="exampleInputPassword1">Post Content</label>
                <textarea type="text" class="form-control" name="Post_Content" id="exampleInputPasswrd1" value={this.state.posts_content}
                  onChange={this.onInputchange} style={{ resize: 'none', height: '158px' }} placeholder="Enter Post Content" required />
              </div>
              <div class="input-group mb-3 w-100">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div class="custom-file">
                  <input type="file" name="Post_Image_Url" accept="image/*" onChange={this.handleChange} class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div>
              </div>
              <button type="submit" onClick={this.onSubmitForm} class="btn btn-primary">Submit</button>
            </form>
          </div>
          <ul className='posts'>
            {this.state.posts.map((posts, id) => {
              if (posts.Creator_Email === firebase.auth().currentUser.email) {
                return (

                  <li key={id} id={id} >
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="form-group w-100">
                                <label for="Post_Title">Post Title</label>
                                <input type="text" class="form-control" name="Post_Title" id="Post_Title" aria-describedby="Post_Title" value={this.state.posts_name} onChange={this.onInputchange} placeholder="Enter Post Title" />
                              </div>
                              <div class="form-group w-100">
                                <label for="exampleInputPassword1">Post Content</label>
                                <textarea type="text" class="form-control" name="Post_Content" id="exampleInputPasswrd1" value={this.state.posts_content}
                                  onChange={this.onInputchange} style={{ resize: 'none', height: '158px' }} placeholder="Enter Post Content" />
                              </div>
                              <div class="input-group mb-3 w-100">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div class="custom-file">
                                  <input type="file" name="Post_Image_Url" onChange={this.handleChange} class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" onClick={this.onSubmitForm} class="btn btn-primary">Save changes</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <span align="right">Created <TimeAgo
                            datetime={posts.timeM}
                            live="true"
                          /></span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><Gravatar username={posts.Creator_Username} email={posts.Creator_Email} style={{ borderRadius: '50px' }} />  {posts.Creator_Username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-truncate">
                          <div className="container-fluid title">
                            <h3 className="text-sm-justify text-wrap">{posts.Post_Title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div>
                            <h6 className="text-sm-justify text-break text-capitalize">{posts.Post_Content}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <img id="image" src={posts.Post_Image_Url} className="img-fluid" draggable="false" />
                      </div>
                      <hr />
                      <div style={{ display: 'flex' }}>
                        <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">Edit</button>
                        <hr />
                        <button className="btn btn-danger" name={this.state.posts} onClick={(e) => this.deleteRow(e, id)} >Delete</button>
                      </div>
                    </div>
                  </li>
                )
              }
              else {
                return (
                  <li key={id} id={id} >
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="form-group w-100">
                                <label for="Post_Title">Post Title</label>
                                <input type="text" class="form-control" name="Post_Title" id="Post_Title" aria-describedby="Post_Title" value={this.state.posts_name} onChange={this.onInputchange} placeholder="Enter Post Title" />
                              </div>
                              <div class="form-group w-100">
                                <label for="exampleInputPassword1">Post Content</label>
                                <textarea type="text" class="form-control" name="Post_Content" id="exampleInputPasswrd1" value={this.state.posts_content}
                                  onChange={this.onInputchange} style={{ resize: 'none', height: '158px' }} placeholder="Enter Post Content" />
                              </div>
                              <div class="input-group mb-3 w-100">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div class="custom-file">
                                  <input type="file" name="Post_Image_Url" onChange={this.handleChange} class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" onClick={this.onSubmitForm} class="btn btn-primary">Save changes</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <span align="right">Created <TimeAgo
                            datetime={posts.timeM}
                            live="true"
                          /></span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <p><Gravatar username={posts.Creator_Username} email={posts.Creator_Email} style={{ borderRadius: '50px' }} />  {posts.Creator_Username}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-truncate">
                          <div className="container-fluid title">
                            <h3 className="text-sm-justify text-wrap text-capitalize">{posts.Post_Title}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div>
                            <h6 className="text-sm-justify text-break">{posts.Post_Content}</h6>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <img id="image" src={posts.Post_Image_Url} className="img-fluid" draggable="false" />
                      </div>
                    </div>
                  </li>
                )
              }
              if (posts > 0) {
                return (
                  <h1>No Posts. Create a post to get started</h1>
                )
              }
            })}
          </ul>
        </div>
      </div>
    );
  }

}

export default SimpleForm
