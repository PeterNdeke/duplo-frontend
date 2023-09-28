import React from 'react';

export const TableShimmer = ({ stack = 10 }) => {
  return (
    <div>
      {[...Array(stack)].map((e, i) => (
        <div key={i} class='animate-pulse flex space-x-4'>
          <div class='flex-1 space-y-6 py-1'>
            <div class='h-[3.6rem] bg-slate-200 rounded'>{e}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
