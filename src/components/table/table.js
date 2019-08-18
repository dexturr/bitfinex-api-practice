import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized'
import _ from 'lodash';

const VirtualizedTable = ({ rows, headers }) => {
  const [defaultSortKey] = Object.values(headers);
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortDirection, setSortDirection] = useState('ASC');


  const sort = useCallback(() => {
    return _.orderBy(rows, [sortKey], [sortDirection.toLowerCase()]);
  }, [rows, sortKey, sortDirection]);

  const [sortedRows, setSortedRows] = useState(sort());

  const keys = Object.keys(headers);

  const performSort = ({sortBy, sortDirection}) => {
    setSortDirection(sortDirection);
    setSortKey(sortBy);
    const sortedRows = sort();
    setSortedRows(sortedRows);
  };



  return (
    <Table
      width={800}
      height={500}
      headerHeight={50}
      rowHeight={30}
      rowCount={rows.length}
      rowGetter={({ index }) => sortedRows[index]}
      sort={performSort}
      sortBy={sortKey}
      sortDirection={sortDirection}
    >
    {keys.map(key =>
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