import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import Select from '../select'
import Table from '../table'

const styles = () => ({
  filtersBox: {
    display: 'flex',
    alignItems: 'center'
  },
  filterItem: {
    width: '250px',
    margin: '0rem 1rem'
  }
})

const TableView = createReactClass({
  displayName: 'TableView',
  propTypes: {
    //The data array to view in the table
    rows: PropTypes.array,

    //The filters options (a selectbox is created for each one)
    filterBy: PropTypes.array,

    //The table headers
    columns: PropTypes.array
  },
  getDefaultProps () {
    return {
      rows: [],
      filterBy: [],
      columns: []
    }
  },

  getInitialState () {
    //Will hold the state of each select box (how many filter value is selected for each)
    return { filterSelects: {} }
  },

  setSelectedFilter (event, filterByElement) {
    this.setState(state => {
      return { ...state, filterSelects: { ...state.filterSelects, [filterByElement]: event.target.value } }
    })
  },

  clearFilters () {
    this.setState(state => {
      return { ...state, filterSelects: {} }
    })
  },

  render () {
    const { rows, filterBy, columns } = this.props

    //Display the "Clear Filters" button if only there is any selected values
    const showButton = Object.keys(this.state.filterSelects).some((filterSelectKey) => this.state.filterSelects[filterSelectKey].length > 0)

    //transform each filter option to a select box
    const selects = filterBy.map((filterByElement, index) => {
      
      //get all the possible values that the user can select from
      const allPossibleValuesForField = rows.reduce((acc, item) => {
        acc[item[filterByElement.dataKey]] = undefined
        return acc
      }, {})

      return (<Select multiple autoWidth
        style={styles().filterItem}
        key={index}
        label={filterByElement.label}
        items={Object.keys(allPossibleValuesForField)}
        value={this.state.filterSelects[filterByElement.dataKey] ? this.state.filterSelects[filterByElement.dataKey] : []}
        onChange={event => this.setSelectedFilter(event, filterByElement.dataKey)}
      />)
    })

    //Filter the data
    const filteredData = rows.filter(row => {
      return Object.keys(this.state.filterSelects).every((filterSelectKey) => {
        const filterSelectedValues = this.state.filterSelects[filterSelectKey]
        
        //if there is a select options, use it, otherwise pass all the values
        return filterSelectedValues.length > 0 ? filterSelectedValues.some(filterSelectedValue => `${row[filterSelectKey]}` === `${filterSelectedValue}`) : true
      })
    })

    return (
      <div>
        <div style={styles().filtersBox}>
          {
            selects
          }
          <div>
            {
              showButton > 0 && (<Button variant='contained' color='secondary' onClick={this.clearFilters} style={styles().filterItem}>
                            CLEAR FILTERS
              </Button>)
            }
          </div>
        </div>
        <Table rows={filteredData} columns={columns} />
      </div>
    )
  }
})

export default TableView
