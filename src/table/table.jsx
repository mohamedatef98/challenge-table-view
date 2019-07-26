import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core'

const Table = createReactClass({
  displayName: 'Table',
  propTypes: {
    rows: PropTypes.array,
    columns: PropTypes.array,
    classes: PropTypes.object.isRequired
  },

  getDefaultProps () {
    return {
      rows: [],
      columns: []
    }
  },
  render () {
    const { rows, columns, classes } = this.props
    return (
      <Paper className={classes.root}>
        <MuiTable className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.dataKey} align='right'>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {columns.map(column => (
                  <TableCell key={column.dataKey} align='right'>
                    {row[column.dataKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </Paper>
    )
  }
})

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 15,
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
})

export default withStyles(styles)(Table)
