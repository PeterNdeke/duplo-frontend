import React from 'react';

export default function BasicTable({ header, children }) {
  return (
    <div className={'basic-table'}>
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
