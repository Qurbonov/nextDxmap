import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styles from './DataTable.module.css';
import Link from 'next/link';

const ContractsInfo = () => {
  const [rabbitData, setRbtData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getResultats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        // 'http://192.168.254.145:8585/v1/atm/getResultats',
        'http://192.168.7.54:8585/v1/atm/getResultats',
        {
          params: {
            limit: 100,
            offset: 1,
          },
        }
      );
      setRbtData(response.data);
      setLoading(false);
    } catch (error) {
      error;
    }
  };

  const columns = React.useMemo(() => [
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
      width: '6%',
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
      width: '7%',
    },
    {
      name: 'Lot raqami1',
      selector: (row) => (
        <div>
          {/* <Link href='/[id]' as={`/${row.id}`}>
            <a>{row.lot_id}</a>
          </Link> */}
          <Link
            href={{
              pathname: '/t/' + `${row.id}`,
              params: { id: `${row.id}` },
            }}
            as={`/t/${row.id}`}
          >
            <a>{row.lot_id}</a>
          </Link>
          {/* <Link href={{ pathname: '/t', query: { id: [row.id] } }}>
            <a>{row.lot_id}</a>
          </Link> */}
          {/* <Link
            href='/components/DataTable/detailsInfo/[complateData].js'
            as={`${row.id}`}
            // as={{
            //   pathname: '/',
            //   // pathname: '/'+[row.id],
            //   query: { id:row.id },
            // }}
          >
            <a>{row.lot_id}</a>
          </Link> */}
          {/* <Link as={row.id} href='/components/DataTable/[complateData].js'>
            <a>{row.lot_id}</a>
          </Link> */}
        </div>
      ),
      sortable: true,
      reorder: true,
      width: '7%',
    },
    {
      name: 'Tashkilot nomi (xaridor)',
      selector: (row) => row.organ_name,
      sortable: true,
      reorder: true,
      wrap: true,
      width: '8%',
    },
    {
      name: 'Tashkilot STIRi (xaridor)',
      selector: (row) => row.inn,
      sortable: true,
      reorder: true,
    },

    {
      name: 'Etkazib beruvchi tashkilot',
      selector: (row) => row.vendor_name,
      sortable: true,
      reorder: true,
      wrap: true,
      width: '8%',
    },
    {
      name: 'Etkazib beruvchi STIR raqami',
      selector: (row) => row.vendor_inn,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Ma`lumot',
      selector: (row) => row.purpose,
      sortable: true,
      reorder: true,
      wrap: true,
      width: '30%',
    },
    {
      name: 'Beneficiar',
      selector: (row) => row.beneficiar,
      sortable: true,
      reorder: true,
    },

    {
      name: 'Shartnoma raqami',
      selector: (row) => row.contract_num,
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
      name: 'Shartnoma boshlanish sanasi',
      selector: (row) => row.contract_beg,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Shartnoma tugatish sanasi',
      selector: (row) => row.contract_end,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Umumiy summa',
      selector: (row) => row.summa,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Avans',
      selector: (row) => row.p_avans,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Avans kuni',
      selector: (row) => row.avans_day,
      sortable: true,
      reorder: true,
    },
    {
      name: 'Tashkilot turi',
      selector: (row) => (row.maloy == 'Y' ? 'Kichik bizness' : 'Tashkilot'),
      sortable: true,
      reorder: true,
    },
  ]);

  useEffect(() => {
    getResultats();
  }, []);

  return (
    <div className='w-100 min-vh-100'>
      <div className='shadow rounded-0'>
        <DataTable
          title='Sharnoma ma`lumotlari'
          columns={columns}
          data={rabbitData}
          pagination
          dense
          responsive
          highlightOnHover
          striped
          progressPending={loading}
        />
      </div>
    </div>
  );
};

export default ContractsInfo;
