import React from 'react'
import Select from './select'
import { MenuItem } from '@material-ui/core'

const minProps = {
  items: ['United States', 'Canada', 'Mexico'],
  value: ''
}

test('renders a Select', () => {
  const wrapper = shallow(<Select {...minProps} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render 3 menu items', () => {
  const wrapper = shallow(<Select {...minProps} />)
  wrapper.simulate('click')
  expect(wrapper.find(MenuItem)).toHaveLength(3)
})
