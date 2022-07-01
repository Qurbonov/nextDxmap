import React, { useState, useEffect } from 'react';
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import styled from 'styled-components';
// import './styles.css';
import BTable from 'react-bootstrap/Table';
import matchSorter from 'match-sorter';
import axios from 'axios';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`${count} ta yozuv...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=''>All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function SensorTable({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );
  const firstPageRows = rows.slice(0, 10);
  return (
    <>
      <BTable striped bordered hover size='sm' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='thead-dark'>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          {' '}
          <strong>
            {pageIndex + 1} sahifa {pageOptions.length} dan
          </strong>{' '}
        </span>
        <span>
          {/* 22110012104673 */}
          | Kegingi:{' '}
          <input
            type='number'
            defaultValue={pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Sahifada {pageSize} ta
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

//#####################################################################################################################
function RcDatatable() {
  const [sensors, setSensors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    console.log('componentDidMount');
    console.log(sensors);
    async function getData() {
      await axios
        .get('http://localhost:8585/v1/atm/getResultats')
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          //   setData(response.data);
          setSensors(response.data);
          // you tell it that you had the result
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []); // This is self is componentDidMount

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Elektron savdo maydonchasi',
        accessor: (etp_id) =>
          (etp_id = '4' ? 'uzex11' : (etp_id = '3' ? 'boshqa' : 'top')),
        // Cell: (etp_id) =>
        //   (etp_id = 1 ? 'uzex' : (etp_id = 3 ? 'boshqa' : 'top')),
        // {
        //   switch (v) {
        //       case 1:
        //         return 'UZEX';
        //       case 2:
        //         return 'XT-Xarid';
        //       case 3:
        //         return 'Coopiration';
        //       case 4:
        //         return 'Shaffof qurilish';
        //     }},
        // Cell: (v) => console.log(v.value),
        // ({ cell }) => {
        //   switch (row) {
        //     case 1:
        //       return 'UZEX';
        //     case 2:
        //       return 'XT-Xarid';
        //     case 3:
        //       return 'Coopiration';
        //     case 4:
        //       return 'Shaffof qurilish';
        //   }
        // },
        // (etp_id = 1 ? 'uzex' : etp_id = 4 ? 'isB':""),
        // accessor: (a) => 'etp_id',
        // Cell: ({ cell: { value } }) => <PaymentTypes values={value} />
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Savdo turi',
        accessor: 'proc_id',
        lookup: {
          6: 'Elektron katalog',
          3: 'kelishuv amalga oshdi',
          17: 'Tender',
          18: 'Konkurs',
          19: 'To`g`ridan to`g`ri shartnoma',
        },
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      // {
      //   Header: 'Summa',
      //   accessor: 'sum_lot',
      //   Filter: SliderColumnFilter,
      //   filter: 'equals',
      // },
      {
        Header: 'LOT',
        accessor: 'lot_id',
      },
      {
        Header: 'Tashkilot nomi (xaridor)',
        accessor: 'organ_name',
      },
      {
        Header: 'Tashkilot STIRi (xaridor)',
        accessor: 'inn',
      },
      {
        Header: 'Etkazib beruvchi tashkilot',
        accessor: 'vendor_name',
      },
      {
        Header: 'Etkazib beruvchi STIR raqami',
        accessor: 'vendor_inn',
      },
      {
        Header: 'Umumiy summa',
        accessor: 'summa',
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
      {
        Header: 'Shartnoma sanasi',
        accessor: 'contract_date',
      },

      {
        Header: 'Shartnoma raqami',
        accessor: 'contract_num',
      },
      {
        Header: 'Ma`lumot',
        accessor: 'purpose',
      },
    ],
    []
  );
  // 22111007083108
  if (sensors.length === 0 && !loadingData) {
    return <div>No Senors data available</div>;
  }

  return (
    <div>
      {loadingData && (
        <span className='text-light bg-primary p-1 px-3'>
          Ma`lumot yuklanmoqda ...
        </span>
      )}
      <div className='mt-2'>
        {' '}
        <SensorTable columns={columns} data={sensors} />
      </div>
    </div>
  );
}
// export default function App() {
//   return <SensorContainer />;
// }

export default RcDatatable;
