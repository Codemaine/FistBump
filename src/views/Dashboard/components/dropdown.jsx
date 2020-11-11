import React, { useState } from 'react'
import firebase from "../../../firebase"
import "firebase/firestore"
import Editform from './Editform';

function Dropdown(props) {
    const [open, setDrop] = useState(false);
    const [name, setName] = useState()
    const [content, setInfo] = useState();
    const [modal, setModal] = useState(false);
    const [edit, ediModal] = useState(false)

    const DeletePost = (e) => {
        const db = firebase.firestore();
        db.collection("Posts").doc(props.postId).delete().then(function () {
            console.log("Document successfully deleted!");
        })
        var washingtonRef = db.collection("Users").doc(firebase.auth().currentUser.uid);
        const increment = firebase.firestore.FieldValue.increment(-1);
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            Posts: increment
        })
            .then(function () {
                window.location.reload();
            });
    }

    const Drop = (e) => {
        if (open === true) {
            return (
                <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                    <div class="rounded-md bg-white shadow-xs">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem" onClick={e => ediModal(!edit)}>Edit Post</a>
                            <a href="#" class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem" onClick={e => setModal(!modal)}>Delete Post</a>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                </div>
            )
        }
        return (
            <div></div>
        )
    }
    const editPost = (e) => {
        e.preventDefault();
        if (name === "") {

        }
        else if (content === "") {

        }
        else {
            const db = firebase.firestore();
            var washingtonRef = db.collection("Posts").doc(props.postId);

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                Post_Title: name,
                Post_Content: content
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
    return (
        <div>
            { modal &&
                <div class="fixed z-10 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 transition-opacity">
                            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>


                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

                                        <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Delete Post
            </h3>
                                        <div class="mt-2">
                                            <p class="text-sm leading-5 text-gray-500">
                                                Are you sure you want to delete this Post? This action cannot be undone.
              </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                    <button type="button" onClick={DeletePost} class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                        Delete
          </button>
                                </span>
                                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                    <button type="button" onClick={() => setModal(!modal)} class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                        Cancel
          </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            { edit &&
                <div class="fixed z-10 inset-0 overflow-y-auto">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 transition-opacity">
                            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>


                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">


                                        <svg width="1em" class="h-6 w-6 text-green-600" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                            Edit Post
            </h3>
                                        <div class="mt-2">
                                            <form>
                                                <div>
                                                    <label for="price" class="block text-sm leading-5 font-medium text-gray-700">Post Title</label>
                                                    <div class="mt-1 relative rounded-md shadow-sm">
                                                        <input id="price" onChange={(e) => setName(e.target.value)} name="name" class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5" placeholder={`Enter the Post Title`} value={name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label for="price" class="block text-sm leading-5 font-medium text-gray-700">Post Content</label>
                                                    <div class="mt-1 relative rounded-md shadow-sm">
                                                        <textarea onChange={(e) => setInfo(e.target.value)} name="content" style={{ resize: 'none' }} id="price" class="form-input w-64 block w-full pl-7 pr-12 sm:text-sm sm:leading-5" value={content} placeholder={`Enter the Post Content`} />
                                                    </div>
                                                </div>
                                                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                                        <button type="button" onClick={editPost} class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                            Save Changes
              </button>
                                                    </span>
                                                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                                        <button type="button" onClick={() => ediModal(!edit)} class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                                            Cancel
              </button>
                                                    </span>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            }
            <div class="relative inline-block text-left">
                <div>
                    <span class="rounded-md shadow-sm">
                        <button type="button" onClick={e => setDrop(!open)} class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </button>
                    </span>
                </div>
                <Drop />
            </div>
        </div>
    )
}

export default Dropdown
