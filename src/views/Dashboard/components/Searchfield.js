import React, { Component } from 'react'
import './Search.css'
import 'axios'
import 'firebase/firestore'
import Navbar from './searchnav.tsx'
import { Link, useParams, useHistory } from 'react-router-dom'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    if (this.props.match.params.search != ""){
    this.setState({ search: this.props.match.params.search })
    }else {
    this.setState({ search: "" })
    } 
    fetch('https://firestore.googleapis.com/v1/projects/fistbump-b9aaa/databases/(default)/documents/Users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users: users.documents })
      })
  }

  handleChange(event) {
    this.props.history.push({
    pathname: `/search/{event.target.value}`
    })
  }

  renderUser() {
    console.clear()
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a FistBump feature or "hack" someone's account, it is a scam and will give them access to your FistBump account.`, "font-size: large");
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="p-8">
          <div className="bg-white flex items-center rounded-full shadow-xl">
            <input onChange={this.handleChange} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" autoComplete="off" type="text" placeholder="Search" />
            <div className="p-4">
              <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
                  <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                </svg>
              </button>
            </div>
          </div>
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

                        </th>
                        <th class="px-6 py-3 bg-gray-50"></th>
                      </tr>
                    </thead>
                    {this.state.users
                      .filter(user => {
                        return user.fields.name.stringValue.indexOf(this.state.search) >= 0

                      })
                      .map((user, id) => {
                        return (
                          <div>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap">
                                  <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                      <img class="h-10 w-10 rounded-full" src={user.fields.Profile_Pic.stringValue} alt="Profile" />
                                    </div>
                                    <div class="ml-4">
                                      <Link to={{
                                        pathname: `user/${user.fields.uid.stringValue}`,
                                        state: {
                                          user
                                        }
                                      }} userInfo={user} class="text-sm leading-5 font-medium text-gray-900">
                                        {user.fields.name.stringValue}
                                      </Link>
                                      <div class="text-sm leading-5 text-gray-500">
                                        {user.fields.username.stringValue}
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
