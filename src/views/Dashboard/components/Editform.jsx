import React, { Component } from 'react'
import firebase from '../../../firebase'
import "firebase/firestore"

class Editform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.postname,
            content: this.props.posts_content
        }
        this.handleChange = this.handleChange.bind(this)
        this.editPost = this.editPost.bind(this)
    }

    editPost = (e) => {
        e.preventDefault();
        if (this.state.name === "") {

        }
        else if (this.state.content === "") {

        }
        else {
            const db = firebase.firestore();
            var washingtonRef = db.collection("Posts").doc(this.props.postId);

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                Post_Title: this.state.name,
                Post_Content: this.state.content
            })
                .then(function () {
                    console.log("Document successfully updated!");
                    window.location.reload();
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: [e.target.value] })
    }

    render() {
        return (
            <form>
                <div>
                    <label for="price" class="block text-sm leading-5 font-medium text-gray-700">Post Title</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <input id="price" onChange={this.handleChange} name="name" class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5" placeholder={`Enter the Post Title`} value={this.state.name} />
                    </div>
                </div>
                <div>
                    <label for="price" class="block text-sm leading-5 font-medium text-gray-700">Post Content</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <textarea onChange={this.handleChange} name="content" style={{ resize: 'none' }} id="price" class="form-input w-64 block w-full pl-7 pr-12 sm:text-sm sm:leading-5" value={this.state.content} placeholder={`Enter the Post Content`} />
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button" onClick={this.editPost} class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Save Changes
          </button>
                    </span>

                </div>

            </form>
        )
    }
}

export default Editform
