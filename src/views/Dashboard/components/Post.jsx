import React, { Component } from 'react'
import Dropdown from './dropdown'
import firebase from '../../../firebase'
import TimeAgo from 'react-timeago'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Likes: [],
            isLiked: false,
            yetTolike: false
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({ Likes: this.props.posts.fields.Likes_Array.arrayValue.values })
        console.log(this.state.Likes)
        const db = firebase.firestore();
        db.collection("Posts").doc(this.props.posts.fields.uid.stringValue).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.id, " => ", doc.data());
                });
            });
    }
    render() {
        return (
            <div>
                <li>
                    <div className="lg:pl-64 pb-10 clearfix lg:pr-64">
                        <div className="bg-white p-6 justify-fit-content rounded-lg shadow-lg" style={{ width: '50vw' }}>
                            <div className="sm:flex sm:flex-shrink-0 justify-between">
                                <div className="sm:flex sm:info lg:pl-3 sm:flex-shrink-0">
                                    <div>
                                        <div className="w-10 h-10 bg-cover bg-center rounded-full mr-3 shadow-inner" style={{ backgroundImage: `url(${this.props.posts.fields.Creator_Pic.stringValue})` }}>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-medium" title={this.props.posts.fields.Creator_Username.stringValue}>{this.props.posts.fields.Creator_Username.stringValue}</p>
                                        <div className="flex items-center text-center text-xs text-gray-600">
                                            <center>
                                                <p className="max-w-10 sm:text-center"><TimeAgo date={this.props.posts.fields.timeM.stringValue} className="text-center" /></p>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                                {this.props.dropdown &&
                                    <div className="drop">
                                        <Dropdown postId={this.props.posts.fields.uid.stringValue} postname={this.props.posts.fields.Post_Title.stringValue} posts={this.props.posts.fields.Post_Content.stringValue} />
                                    </div>
                                }
                            </div>

                            <div className="mt-4">
                                <h1>{this.props.posts.fields.Post_Title.stringValue}</h1>
                                <p className="text-gray-600 text-sm">
                                    {this.props.posts.fields.Post_Content.stringValue}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="mt-4 align-center vertical-align flex justify-items-center items-center">
                                    <div className="flex mr-2 text-gray-700 text-sm mr-3">
                                        <svg fill="none" viewBox="0 0 24 24" className="w-4 cursor-pointer h-4 mr-1" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span>{this.props.posts.fields.Likes.integerValue}</span>
                                    </div>
                                    <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                        <svg fill="none" viewBox="0 0 24 24" className="w-4 cursor-pointer h-4 mr-1" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        <span>{this.props.posts.fields.Comments.integerValue}</span>
                                    </div>
                                    {/* <div className="flex mr-2 text-gray-700 text-sm mr-4">
                                  <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                  </svg>
                                  <span>share</span>
                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>


                </li>
            </div>
        )
    }
}

export default Post
