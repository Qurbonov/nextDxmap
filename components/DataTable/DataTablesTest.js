import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styles from './DataTable.module.css';
import Link from 'next/link';

const DataTablesTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rabbitData, setRbtData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllTenders = async () => {
    console.log('getAllTenders');
    try {
      const response = await axios.get(
        'http://192.168.7.54:8585/v1/atm/getAllTenders'
      );
      setRbtData(response.data);
    } catch (error) {
      error;
    }
  };
  const getAuctions = async () => {
    console.log('getAuctions');
    try {
      const response = await axios.get(
        'http://192.168.7.54:8585/v1/atm/getAuctions'
      );
      setRbtData(response.data);
    } catch (error) {
      error;
    }
  };
  const getAllKonkurs = async () => {
    console.log('getAllKonkurs');
    try {
      const response = await axios.get(
        'http://192.168.7.54:8585/v1/atm/getAllKonkurs'
      );
      setRbtData(response.data);
    } catch (error) {
      error;
    }
  };
  const getEMagazins = async () => {
    console.log('getEMagazins');
    setLoading(true);
    try {
      const response = await axios.get(
        'http://192.168.7.54:8585/v1/atm/getEMagazins'
      );
      setRbtData(response.data);
      setLoading(false);
    } catch (error) {
      error;
    }
  };
  // const ExpanableComponent = ({ row }) => response.data;
  const columns = [
    {
      name: 'Tashkilot nomi',
      selector: (row) => row.organ_name,
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
        <div>
          <Link href='/components/DataTable/[id]' as='/components/DataTable/id'>
            <a>{row.lot_id}</a>
          </Link>
        </div>
      ),
      sortable: true,
      reorder: true,
    },
    {
      name: 'Tashkilot turi',
      selector: (row) => (row.maloy == 'Y' ? 'Kichik bizness' : 'Tashkilot'),
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
      name: 'Lot summasi',
      selector: (row) => row.sum_lot,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Oy (blok summa)',
      selector: (row) => row.month,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Sana',
      selector: (row) => row.doc_date,
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
    {
      name: 'ETP',
      selector: (row) => {
        switch (row.etp_id) {
          case 1:
            return 'UZEX';
          case 2:
            return 'XT-Xarid';
          case 3:
            return 'Coopiration';
          case 4:
            return 'Shaffof qurilish';
        }
      },
      sortable: true,
      reorder: true,
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
    Shaffof qurilish	Tender	22411006013121		201512962	Гиждувон бунёдкор ИТКТ	301706646	167093100000	2022-06-23
  },

*/
  ];

  useEffect(() => {
    getAllTenders();
  }, []);

  return (
    <div className='w-100 min-vh-100'>
      <div className='pb-4 border-bottom  border-light'>
        <button className='btn btn-link m-2' onClick={getAllTenders}>
          Тендер
        </button>
        <button className='btn btn-link m-2' onClick={getAuctions}>
          Аукцион
        </button>
        <button className='btn btn-link m-2' onClick={getEMagazins}>
          Электронный магазин
        </button>
        <button className='btn btn-link m-2' onClick={getAllKonkurs}>
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
          // pointerOnHover

          progressPending={loading}
          // expandableRows
          // expandOnRowClicked
          // expandableRowsComponent={<ExpandedComponent />}
        />
      </div>
    </div>
  );
};

export default DataTablesTest;
