import React, { Component } from 'react'

export default class TrItem extends Component {

    
    displayRow = (e,item)=>{
        this.props.onRowClicked(item,this._reactInternalFiber.key);
    }

    render() {
        const {item} = this.props;
        //console.log(item)
        return (
            <tr id={`row_${item.id}`} onClick={(e)=>this.displayRow(e,item)} >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
            </tr>
        )
    }
}
