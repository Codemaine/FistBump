import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import './Search.css'
import firebase from '../../../firebase'
import 'axios'
import 'firebase/firestore'
import Navbar from './searchnav.tsx'
import Gravatar from 'react-gravatar'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }


  componentDidMount() {
    fetch('https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users.documents })
      })
  }


  renderUser() {
    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");
  }

  render() {
    const { users } = this.state
    return (
      <div>
        <Navbar />
        {/* component */}
        {/* This is an example component */}
        <div className="pt-2 relative mx-auto m-auto text-gray-600">
          <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" style={{ width: '100vw' }} name="search" placeholder="Search" />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: 'new 0 0 56.966 56.966' }} xmlSpace="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        {this.renderUser()}
        <div className="mx-auto">
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Name
              </th>
                        <th class="px-6 py-3 bg-gray-50"></th>
                      </tr>
                    </thead>
                    {this.state.users.map((user, id) => {
                      return (
                        <div>
                          <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                              <td class="px-6 py-4 whitespace-no-wrap">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 h-10 w-10">
                                    <Gravatar class="h-10 w-10 rounded-full" email={user.fields.email.stringValue} />
                                  </div>
                                  <div class="ml-4">
                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                      {user.fields.name.stringValue}
                                    </div>
                                    <div class="text-sm leading-5 text-gray-500">
                                      {user.fields.email.stringValue}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>


                        </div>
                      )
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}