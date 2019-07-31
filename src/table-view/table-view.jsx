import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
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
    this.setState({
        filterSelects: { ...this.state.filterSelects, [filterByElement]: event.target.value }
    })
  },
  render () {
    const { items, filterBy, ...rest } = this.props

    const CockPit = <div style={{display: 'flex', justifyContent: 'space-between'}}>
      {
        this.props.filterBy.map((filterByElement, index) => {
          const allPossibleValuesForField = this.props.items.reduce((acc, item)=>{
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
    }
    {
      this.props.filterBy.length > 0 && 0
        
    }
    </div>

    return (
      <div>
        {
            CockPit
        }
      </div>
    )
  }
})
