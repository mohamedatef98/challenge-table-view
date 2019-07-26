import React from 'react'
import Table from './table'
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

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
  ]
}

test('renders a Table', () => {
  const wrapper = shallow(<Table {...minProps} />)
  expect(wrapper).toMatchSnapshot()
})

test('should have 3 rows', () => {
  const wrapper = mount(<Table {...minProps} />)
  expect(wrapper.find(TableRow)).toHaveLength(3)
})

test('should have 1 table head', () => {
  const wrapper = mount(<Table {...minProps} />)
  expect(wrapper.find(TableHead)).toHaveLength(1)
})

test('should have 1 table body', () => {
  const wrapper = mount(<Table {...minProps} />)
  expect(wrapper.find(TableBody)).toHaveLength(1)
})

test('should have 6 cells', () => {
  const wrapper = mount(<Table {...minProps} />)
  expect(wrapper.find(TableCell)).toHaveLength(6)
})
