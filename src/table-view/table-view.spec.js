import React from 'react'
import TableView from './table-view'
import Table from '../table'
import Select from '../select'
import { Button, TableRow, MenuItem } from '@material-ui/core';


const minProps = {
  columns: [
    {
      label: 'Name',
      dataKey: 'name'
    },
    {
      label: 'Age',
      dataKey: 'age'
    }
  ],
  rows: [
    { name: 'Mike', age: 25, id: 1245 },
    { name: 'Jennifer', age: 30, id: 46874 }
  ],
  filterBy: [
    {
      label: 'Name',
      dataKey: 'name'
    },
    {
      label: 'Age',
      dataKey: 'age'
    }
  ]
}


test('renders a TableView', () => {
  const wrapper = shallow(<TableView {...minProps} />)
  expect(wrapper).toMatchSnapshot()
})

test('renders a Table inside the TableView', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(Table)).toHaveLength(1)
})

test('renders 2 Selects inside the TableView', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(Select)).toHaveLength(2)
})

test('renders that initially no button exist inside the TableView', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(Button)).toHaveLength(0)
})

test('should have 3 rows', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(TableRow)).toHaveLength(3)
})

test('The first Select should have 2 options', () => {
  const wrapper = mount(<TableView {...minProps} />)
  const firstSelect = wrapper.find(Select).at(0)
  expect(firstSelect.props().items).toEqual(["Mike", "Jennifer"])
})

test('The second Select should have 2 options', () => {
  const wrapper = mount(<TableView {...minProps} />)
  const secondSelect = wrapper.find(Select).at(1)
  expect(secondSelect.props().items).toEqual(["25", "30"])
})

test('The Selects should filter the results', () => {
  const wrapper = mount(<TableView {...minProps} />)

  wrapper.find(Select).first().props().onChange({target: {value: ['Mike']}}, 'name')
  wrapper.update()
  expect(wrapper.find(TableRow)).toHaveLength(2)
})

test('The Button should appear if there is a filter set', () => {
  const wrapper = mount(<TableView {...minProps} />)
  
  wrapper.find(Select).first().props().onChange({target: {value: ['Mike']}}, 'name')
  wrapper.update()
  expect(wrapper.find(Button)).toHaveLength(1)
})

test('The Clear filters button resets the filtering if clicked', () => {
  const wrapper = mount(<TableView {...minProps} />)
  wrapper.setState({
    filterSelects: {
      name: ["Jennifer"]
    }
  })

  wrapper.find(Button).simulate('click')
  expect(wrapper.find(TableRow)).toHaveLength(3)
})

test('The Clear filters button disappears if clicked', () => {
  const wrapper = mount(<TableView {...minProps} />)
  wrapper.setState({
    filterSelects: {
      name: ["Jennifer"]
    }
  })

  wrapper.find(Button).simulate('click')
  expect(wrapper.find(Button)).toHaveLength(0)
})