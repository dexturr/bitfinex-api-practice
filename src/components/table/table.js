import React from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized'

const VirtualizedTable = ({ rows, headers }) => {
  return (
    <Table
      width={800}
      height={500}
      headerHeight={50}
      rowHeight={30}
      rowCount={rows.length}
      rowGetter={({ index }) => rows[index]}
    >
    {Object.keys(headers).map(key =>
      (<Column
        key={key}
        label={key}
        dataKey={headers[key]}
        width={300}
      />)
    )}
    </Table>
  )

}

VirtualizedTable.propTypes = {
  rows: PropTypes.array,
  headers: PropTypes.object,
}

export default VirtualizedTable;