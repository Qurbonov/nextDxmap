import React, { useEffect, useState } from 'react';

import axios from 'axios';
import DataTable from 'react-data-table-component';
import styles from './DataTable.module.css';

const DataTablesTest = () => {
  const [rabbitData, setRbtData] = useState([]);

  const getAllTenders = async () => {
    try {
      const response = await axios.get(
        // 'http://localhost:8585/v1/atm/getAllTenders'
      );
      setRbtData(response.data);
    } catch (error) {
      error;
    }
  };
  const getAuctions = async () => {
    try {
      const response = await axios.get(
        // 'http://localhost:8585/v1/atm/getAuctions'
      );
      setRbtData(response.data);
    } catch (error) {
      error;
    }
  };

  const columns = [
    {
      name: 'Etkazib beruvchi',
      selector: (row) => row.vendor_name,
      sortable: true,
      reorder: true,
      width: '25%',
      headerStyle: (selector, id) => {
        return { textAlign: 'left' };
      },
    },
    {
      name: 'Etkazib beruvchi STIR raqami',
      selector: (row) => row.vendor_inn,
      sortable: true,
      reorder: true,
    },

    {
      name: 'Lot raqami',
      selector: (row) => (
        <a href={row.lot_id} target='_blank' rel='noopener noreferrer'>
          {row.lot_id}
        </a>
      ),
      sortable: true,
      reorder: true,
    },
    {
      name: 'Tashkilot turi',
      selector: (row) => (row.maloy == 'Y' ? 'kichik bizness' : 'biznes'),
      sortable: true,
      reorder: true,
    },
    {
      name: 'Summasi',
      selector: (row) => row.summa,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Shartnoma sanasi',
      selector: (row) => row.contract_dat,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Savdo turi',
      selector: (row) => {
        switch (row.proc_id) {
          case 6:
            return 'Elektron katalog';
          case 3:
            return 'kelishuv amalga oshdi';
          case 17:
            return 'Tender';
          case 18:
            return 'Konkurs';
          case 19:
            return "To'g'ridan to'g'ri shartnomalar";
        }
      },
      sortable: true,
      headerStyle: (selector, id) => {
        return { textAlign: 'center' };
      },
    },
    /*

  {
    "id": 43,
    "month": 6,
    "state": null,
    "pltf": 1,
    "lot_id": 22111007083093,
    "doc_date": "2022-06-28T05:00:00.000+00:00",
    "organ_name": null,
    "sum_lot": 33900000000
  },
{
    "id": 1,
    "month": 6,
    "state": null,
    "pltf": 2,
    "lot_id": 22111008497728,
    "doc_date": "2022-06-28T05:00:00.000+00:00",
    "organ_name": null,
    "sum_lot": 33000000
  },
  {
    "id": 2084,
    "summa": 261093700000,
    "srok": 10,
    "purpose": "В электронном виде",
    "state": null,
    "lot_id": 22110006114878,
    "organ_name": null,
    "proc_id": 1
  },

*/


  ];

  useEffect(() => {
    getAllTenders();
  }, []);


  return (
    <div className='w-100 min-vh-100'>
      <div className='pb-4 border-bottom  border-light'>
        <button className='btn btn-primary m-2' onClick={getAllTenders}>
          Тендер
        </button>
        <button className='btn btn-primary m-2' onClick={getAuctions}>
          Аукцион
        </button>
        <button className='btn btn-primary m-2' onClick={getAuctions}>
          Электронный магазин
        </button>
        <button className='btn btn-primary m-2' onClick={getAuctions}>
          Конкурс
        </button>
      </div>
      <div className='shadow rounded-0'>
        <DataTable
          title='Resultat method'
          columns={columns}
          data={rabbitData}
          pagination
          highlightOnHover
          responsive
          fixedHeader
          striped
          pointerOnHover
          expandableRows
          expandOnRowClicked
        // expandableRowsComponent={<ExpandedComponent />}
        />
      </div>
    </div>
  );
};

export default DataTablesTest;
