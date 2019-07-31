import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

import Select from '../select'
import Table from '../table'

export default createReactClass({
  displayName: 'TableView',
  propTypes: {
    items: PropTypes.array,
    filterBy: PropTypes.array
  },
  getDefaultProps () {
    return {
      items: [],
      filterBy: []
    }
  },
  getInitialState(){
    return {filterSelects: {}}
  },
  setSelectedFilter(event, filterByElement){
    this.setState(state => {
        return { ...state, filterSelects: { ...state.filterSelects, [filterByElement]: event.target.value }}
    })
  },
  clearFilters(){
    this.setState(state => {
      return {...state, filterSelects: {}}
    })
  },
  render () {
    const { items, filterBy, ...rest } = this.props

    const showButton = Object.keys(this.state.filterSelects).some((filterSelectKey)=>this.state.filterSelects[filterSelectKey].length > 0)

    const selects = filterBy.map((filterByElement, index) => {
                      const allPossibleValuesForField = items.reduce((acc, item)=>{
                        acc[item[filterByElement]] = undefined;
                        return acc;
                      }, {})

                      return (<Select multiple autoWidth 
                                key={index} 
                                label={filterByElement} 
                                items={Object.keys(allPossibleValuesForField)}
                                value={this.state.filterSelects[filterByElement] ? this.state.filterSelects[filterByElement] : []} 
                                onChange={event => this.setSelectedFilter(event, filterByElement)}
                              />)
                    })

    const columns = [{label: 'Title', dataKey: 'title'}, {label: 'Genre', dataKey: 'genre'}, {label: 'Rating', dataKey: 'rating'}]

    const filteredData = items.filter(item => {
      return Object.keys(this.state.filterSelects).every((filterSelectKey)=>{
        const filterSelectedValues = this.state.filterSelects[filterSelectKey];
        console.log(filterSelectedValues)
        return filterSelectedValues.length > 0 ? filterSelectedValues.some((filterSelectedValue => item[filterSelectKey] == filterSelectedValue)) : true
      })
    })


    

    return (
      <div>
        <div style={{display: 'flex'}}>
        {
          selects
        }
        {
          showButton > 0 && (<Button variant="contained" color="secondary" onClick={this.clearFilters}>
                              CLEAR FILTERS
                            </Button>)
            
        }
        </div>
        <Table rows={filteredData} columns={columns}/>
      </div>
    )
  }
})
