import React from 'react';

export default ({ rows, headers }) => {
    return (
        <table className="table">
        <thead>
          <tr>
            {
                Object.keys(headers).map(
                (key) => <th key={key} scope="col">{key}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.symbol}>
                {
                    Object
                        .values(headers)
                        .map(
                            (property) => <td key={property}>{row[property]}</td>
                        )
                }
            </tr>
          ))} 
        </tbody>
      </table>
    )
}