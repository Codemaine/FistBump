import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'
import './Search.css'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 'Jermaine',
                    value: 'Jermaine',
                },
                {
                    key: 'mary',
                    value: 'Mary Phillips',
                },
                {
                    key: 'robert',
                    value: 'Robert',
                },
                {
                    key: 'karius',
                    value: 'Karius',
                },
            ]
        }
    }



    render() {
        return (
            <ReactSearchBox
                placeholder="Search FistBump"
                data={this.state.data}
                onSelect={record => console.log(record)}
                onFocus={() => {
                    console.log('This function is called when is focussed')
                }}
                fuseConfigs={{
                    threshold: 0.05,
                }}
                autocomplete="off"
                value="Jermaine"
            />

        )
    }
}