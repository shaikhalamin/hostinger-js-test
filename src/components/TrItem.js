import React, { Component } from 'react'

export default class TrItem extends Component {

    state ={
        color:'',
    }
    displayRow = (e,item)=>{

        //need to change the local storage concept
        let lastid = localStorage.getItem("lastclick")
        //console.log();
        if(lastid){
            //console.log(lastid,item.id)
            
            if(parseInt(lastid) !== item.id){
                document.getElementById("row_"+lastid).style.backgroundColor=null;
            } else{
                this.setState({
                    color:'green'
                })
            }
        }
        
        this.props.onRowClicked(item);

        localStorage.setItem("lastclick", item.id);

        this.setState((prevState,props)=>({
            color:'green',
        }))

    }

    render() {
        const {item} = this.props;
        //console.log(item)
        return (
            <tr id={`row_${item.id}`} onClick={(e)=>this.displayRow(e,item)} style={{ backgroundColor: this.state.color }} >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
            </tr>
        )
    }
}
