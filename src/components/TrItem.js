import React, { Component } from 'react'

export default class TrItem extends Component {
    render() {
        const {item} = this.props;
        //console.log(item)
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
            </tr>
        )
    }
}
