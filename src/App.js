import React, { Component } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";

import TrItem from './components/TrItem'

export default class App extends Component {

  state = {
    data: [],
    loading: true,
    activePage: 0,
    itemsCountPerPage: 0,
    totalItemsCount: 0,
    pageRangeDisplayed: 5,
    sortby: 'id',
    order: 'asc',
    childCLick: {},
    lastRowIndex: ''
  }

  async componentDidMount() {

    try {
      const response = await axios.get('https://json-api-facker.herokuapp.com/products');
      this.setState({
        data: response.data.data,
        loading: false,
        activePage: response.data.current_page,
        itemsCountPerPage: response.data.per_page,
        totalItemsCount: response.data.total,
        pageRangeDisplayed: 3
      })
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  handlePageChange = async (pageNumber) => {
    this.setState({ activePage: pageNumber });
    let url = 'https://json-api-facker.herokuapp.com/products?';
    const { sortby, order } = this.state;
    if (sortby && order) {
      url = `${url}sortby=${sortby}&order=${order}&page=${pageNumber}`;
    } else {
      url = `${url}page=${pageNumber}`;
    }
    // sortby=name&order=desc&page=3
    try {
      const response = await axios.get(url);
      this.setState({
        data: response.data.data,
        loading: false,
        activePage: response.data.current_page,
        itemsCountPerPage: response.data.per_page,
        totalItemsCount: response.data.total,
        pageRangeDisplayed: 3
      })
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  handleClick = async (e) => {
    let { order, activePage } = this.state;

    if (order === '') {
      order = 'asc';
    } else if (order === 'asc') {
      order = 'desc';
    } else if (order === 'desc') {
      order = 'asc';
    }
    //console.log(e.target.id,order);
    let sortby = e.target.id;

    let url;

    if (sortby && order) {
      url = `https://json-api-facker.herokuapp.com/products?sortby=${sortby}&order=${order}&page=${activePage}`;
    }

    try {
      const response = await axios.get(url);
      this.setState({
        data: response.data.data,
        loading: false,
        activePage: response.data.current_page,
        itemsCountPerPage: response.data.per_page,
        totalItemsCount: response.data.total,
        pageRangeDisplayed: 3,
        sortby: sortby,
        order: order
      })
    } catch (error) {
      console.error(error);
    }
  }

  onRowClicked = (item, lastRow) => {
    let { childCLick, lastRowIndex } = this.state;

    if (Object.keys(childCLick).length > 0) {
      let trDoc = document.getElementById("row_" + childCLick.id);
      if (trDoc !== null) {
        trDoc.style.backgroundColor = ''
      } else {
        //console.log(lastRowIndex);
        lastRowIndex++
        let mainTable = document.getElementById("hostinger")
        mainTable.rows.item(lastRowIndex).style.backgroundColor = '';
      }
    }
    this.setState({
      childCLick: item,
      lastRowIndex: lastRow
    });

    document.getElementById("row_" + item.id).style.backgroundColor = 'green'

  }

  render() {
    const { data, loading, childCLick } = this.state;

    if (loading) {
      return <p>fetching....</p>
    }
    let rowClickText;
    if (Object.keys(childCLick).length > 0) {
      rowClickText = <ul>
        <li>{childCLick.id}</li>
        <li>{childCLick.name}</li>
        <li>{childCLick.category}</li>
        <li>{childCLick.description}</li>
      </ul>
    }

    return (
      <div className="container">
        <h6 className="text-center mb-2 mt-3">React Custom Datatable with pagination</h6>
        {
          rowClickText &&
          rowClickText
        }
        <table id="hostinger" className="table table-bordered table-sm">
          <thead>
            <tr>
              <th id="id" onClick={this.handleClick}>id</th>
              <th id="name" onClick={this.handleClick}>name</th>
              <th id="category" onClick={this.handleClick}>designation</th>
              <th id="description" onClick={this.handleClick}>description</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item, i) => {
                return <TrItem key={i} item={item} onRowClicked={this.onRowClicked} />
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

