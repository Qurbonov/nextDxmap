import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '/components/navbar/navbar';

export default function complateData() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setLotInfo] = useState({});
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://192.168.7.54:8585/v1/atm/getResultatById/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setLotInfo(data);
          console.log(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);
  if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;
  return (
    <>
      <Navbar />
      <div className='container mt-4'>
        <div className='row '>
          <div className='col-10'>
            {' '}
            <h5>LOT ID: {data?.resultat?.PAYLOAD.LOTID} ma'lumotlari. </h5>{' '}
          </div>
          <div className='col-2 text-right'>
            {' '}
            <a href='http://localhost:3085/contrats'>Ro`yhat</a>
          </div>
        </div>

        <ul className='list-group'>
          <li className='list-group-item'>
            <b>lot raqami:</b> {data?.resultat?.PAYLOAD.LOTID}
          </li>
          <li className='list-group-item'>
            <b>shartnoma raqami:</b> {data?.resultat?.PAYLOAD.CONTRACTNUM}
          </li>
          <li className='list-group-item'>
            <b>sharnoma imzolagan sanasi:</b>{' '}
            {data?.resultat?.PAYLOAD.CONTRACTDAT}
          </li>
          <li className='list-group-item'>
            <b>etkazib beruvchi:</b> {data?.resultat?.PAYLOAD.VENDORNAME}
          </li>
          <li className='list-group-item'>
            <b>summasi:</b> {data?.resultat?.PAYLOAD.SUMMA}
          </li>
          <li className='list-group-item'>
            <b>xizmat (tovar) nomi: </b>{' '}
            {data?.resultat?.PAYLOAD.SPECIFICATIONS[0].TOVARNAME}
          </li>{' '}
          <li className='list-group-item'>
            <b>izoh:</b> {data?.resultat?.PAYLOAD.PURPOSE}
          </li>
          <li className='list-group-item'>
            <b>Tashkiot:</b> {data?.resultat?.PAYLOAD.organ_name}
          </li>
        </ul>
        {/* <table className='table border'>
        <tr>
          <th>Qiymati</th>
          <th colSpan={2}>Nomi</th>
        </tr>
        <tr>
          <th>Lot: </th>
          {data?.contractInfo && data.contractInfo.length
            ? data.contractInfo.map((item) => {
                return (
                  <>
                    <td key={`contactInfo${item.id}`}>{item.PAYLOAD.LOTID}</td>
                  </>
                );
              })
            : ' '}
        </tr>
        <tr></tr>
      </table> */}
        {/* <ul className='ul'>
        {data?.contractInfo && data.contractInfo.length
          ? data.contractInfo.map((item) => {
              return (
                <>
                  <li key={`contactInfo${item.id}`}>
                    Lot: {item.PAYLOAD.LOTID}
                  </li>
                  <li>Vendor : {item.PAYLOAD.VENDORNAME}</li>
                </>
              );
            })
          : "Bo'sh"}
      </ul> */}
      </div>
    </>
  );
}
