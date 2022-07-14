import React from 'react';

export default function FiltrData() {
  const onChange = async (e) => {
    var searchData = rabbitData.filter((item) => {
      if (
        item.vendor_name
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    setRbtData(searchData);
  };
  return (
    <>
      ETP: <input type='text' className='form form-control' />
      <div>
        Etkazib beruvchi tashkilot
        <input type='text' onChange={onChange} style={{ width: '80%' }} />
      </div>
    </>
  );
}
