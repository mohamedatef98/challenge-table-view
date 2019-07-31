import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import Select from '../select'
import Table from '../table'
import { withStyles } from '@material-ui/core'

const TableView = createReactClass({
  displayName: 'TableView',
  propTypes: {
    rows: PropTypes.array,
    filterBy: PropTypes.array,
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
    const { rows, filterBy, columns, classes } = this.props

    const showButton = Object.keys(this.state.filterSelects).some((filterSelectKey) => this.state.filterSelects[filterSelectKey].length > 0)

    const selects = filterBy.map((filterByElement, index) => {
      const allPossibleValuesForField = rows.reduce((acc, item) => {
        acc[item[filterByElement.dataKey]] = undefined
        return acc
      }, {})

      return (<Select multiple autoWidth className={classes.filterItem}
        key={index}
        label={filterByElement.label}
        items={Object.keys(allPossibleValuesForField)}
        value={this.state.filterSelects[filterByElement.dataKey] ? this.state.filterSelects[filterByElement.dataKey] : []}
        onChange={event => this.setSelectedFilter(event, filterByElement.dataKey)}
      />)
    })

    const filteredData = rows.filter(row => {
      return Object.keys(this.state.filterSelects).every((filterSelectKey) => {
        const filterSelectedValues = this.state.filterSelects[filterSelectKey]
        return filterSelectedValues.length > 0 ? filterSelectedValues.some(filterSelectedValue => row[filterSelectKey] === '' + filterSelectedValue) : true
      })
    })

    return (
      <div>
        <div className={classes.filtersBox}>
          {
            selects
          }
          <div>
            {
              showButton > 0 && (<Button variant='contained' color='secondary' onClick={this.clearFilters} className={classes.filterItem}>
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

export default withStyles(styles)(TableView)
