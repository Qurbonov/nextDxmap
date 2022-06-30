import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
// import dynamic from 'next/dynamic';

// const MaterialTable = dynamic(() => import('material-table'), { ssr: false });

const Mtable = () => {
    
  //   const [loading, setLoading] = useState(false);
  //   const getResultats = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:8585/v1/atm/getResultats'
  //       );
  //       setRbtData(response.data);
  //       setLoading(false);
  //       console.log(response.data);
  //     } catch (error) {
  //       error;
  //     }
  //   };

  //   const [columns, setColumns] = useState([
  //     { title: 'Name', field: 'name' },
  //     {
  //       title: 'Surname',
  //       field: 'surname',
  //       initialEditValue: 'initial edit value',
  //     },
  //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  //     {
  //       title: 'Birth Place',
  //       field: 'birthCity',
  //       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  //     },
  //   ]);
  //   const [rabbitData, setRbtData] = useState([]);
  //   console.log(rabbitData);
  //   const [data, setData] = useState([
  //     { name: 'Mehmetssss', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  //     { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  //   ]);
  //   useEffect(() => {
  //     getResultats();
  //   }, []);
  const tableRef = React.createRef();
  return (
    <div>
      <MaterialTable
        tableRef={tableRef}
        title='Shartnoma ma`lumotlari'
        columns={[
          {
            title: 'Elektron savdo maydonchasi',
            field: 'etp_id',
            lookup: {
              1: 'UZEX',
              2: 'XT-Xarid',
              3: 'Coopiration',
              4: 'Shaffof qurilish',
            },
          },
          {
            title: 'Savdo turi',
            field: 'proc_id',
            lookup: {
              6: 'Elektron katalog',
              3: 'kelishuv amalga oshdi',
              17: 'Tender',
              18: 'Konkurs',
              19: 'To`g`ridan to`g`ri shartnoma',
            },
          },
          {
            title: 'Lot raqami',
            field: 'lot_id',
          },
          {
            title: 'Tashkilot nomi (xaridor)',
            field: 'organ_name',
          },
          {
            title: 'Tashkilot STIRi (xaridor)',
            field: 'inn',
          },
          {
            title: 'Etkazib beruvchi tashkilot',
            field: 'vendor_name',
          },
          {
            title: 'Etkazib beruvchi STIR raqami',
            field: 'vendor_inn',
          },
          //   {
          //     title: 'Lot summasi',
          //     field: 'sum_lot',
          //   },
          {
            title: 'Umumiy summa',
            field: 'summa',
          },
          {
            title: 'Shartnoma sanasi',
            field: 'contract_dat',
          },
        ]}
        // data={rabbitData}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = 'http://localhost:8585/v1/atm/getResultats';
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                var res = result.slice(
                  query.page * query.pageSize,
                  query.page * query.pageSize + query.pageSize
                );

                resolve({
                  data: result,
                  page: query.page,
                  totalCount: result.length,
                });
              });
          })
        }
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
        options={{
          exportButton: true,
          sorting: true,
        }}
      />
    </div>
  );
};

export default Mtable;
