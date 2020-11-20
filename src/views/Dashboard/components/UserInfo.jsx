import React from 'react'

function UserInfo() {
    const User = () => {
        if (navigator.onLine) {
            return (
                <>
                    <div class="text-center mt-4">
                        <p class="text-gray-600 font-bold">{this.state.name}
                        </p>
                        <p class="text-sm font-hairline text-gray-600 mt-1">{this.state.username}
                        </p>
                    </div>
                    <div class="flex justify-center mt-4">
                        <img class="shadow sm:w-12 sm:h-12 w-10 h-10 rounded-full" src={this.state.profile} alt={`Avatar for ${this.state.username}`} />
                    </div>
                    <div class="mt-6 flex sm:flex-row justify-between text-center">
                        <div>
                            <p class="text-gray-700 font-bold">{this.state.Posts}
                            </p>
                            <p class="text-xs mt-2 text-gray-600 font-hairline">Posts{'\u00A0'}{'\u00A0'}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-700 font-bold">{this.state.Followers}
                            </p>
                            <p class="text-xs mt-2 text-gray-600 font-hairline">Followers{'\u00A0'}{'\u00A0'}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-700 font-bold">{this.state.Following}
                            </p>
                            <p class="text-xs mt-2 text-gray-700 font-hairline">Following{'\u00A0'}{'\u00A0'}
                            </p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button onClick={this.following} class="rounded w-full items-center shadow bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
                            Follow
    </button>
                        <button onClick={this.unfollowing} class="rounded w-full items-center focus:border-none shadow bg-grey-500 px-4 py-2 text-black hover:bg-grey-400">
                            Followed
    </button>
                    </div>

                </>
            )
        }
        else {
            return (
                <div className="flex justify-center mt-4">
                    <h1>You're offline! Connect to the internet to view info.</h1>
                </div>
            )
        }
    }
    return (
        <div>
            <User />
        </div>
    )
}

export default UserInfo
