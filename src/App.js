import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";

import TrItem from './components/TrItem'

export default class App extends Component {

  state = {
    data:[],
    loading:true,
    activePage:0,
    itemsCountPerPage:0,
    totalItemsCount:0,
    pageRangeDisplayed:5
  }

  async componentDidMount(){

    try {
      const response = await axios.get('https://json-api-facker.herokuapp.com/products');
      this.setState({
        data:response.data.data,
        loading:false,
        activePage:response.data.current_page,
        itemsCountPerPage:response.data.per_page,
        totalItemsCount:response.data.total,
        pageRangeDisplayed:3
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  handlePageChange = async (pageNumber)=>{
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    try {
      const response = await axios.get('https://json-api-facker.herokuapp.com/products?page='+parseInt(pageNumber));
      this.setState({
        data:response.data.data,
        loading:false,
        activePage:response.data.current_page,
        itemsCountPerPage:response.data.per_page,
        totalItemsCount:response.data.total,
        pageRangeDisplayed:3
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {data,loading} = this.state;

    if(loading){
      return <h3>fetching....</h3>
    }
    return (
      <div className="container">
        <h2 className="text-center mb-3 mt-3">Hostinger Test App !</h2>
        <h6>
          <p>By Shaikh Al Amin</p>
          <p>Email: alamin.cse15@gmail.com</p>
          <p>Phone: +8801712341937</p>
        </h6>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th >id</th>
              <th >name</th>
              <th >designation</th>
              <th >description</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item,i)=>{
                return <TrItem key={i} item={item}/>
              })
            }
            
          </tbody>
        </table>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    )
  }
}

