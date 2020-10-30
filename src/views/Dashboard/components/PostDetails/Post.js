import React, { Component } from 'react'

class Post extends Component {
    render() {
        return (
            <div>
                <h1>Post Name: {this.props.match.params.name}</h1>
                <p>Post Content: {this.props.match.params.des}</p>
                <img src={this.props.match.params.pic} />
            </div>
        )
    }
}

export default Post
