import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function complateData() {
  const router = useRouter();
  // const { id } = router.query;

  console.log('t');
  console.log(router.query.id);
  const [data, setLotInfo] = useState();
  const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch('http://192.168.254.145:80/v1/atm/getResultatById/269')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLotInfo(data);
  //       console.log('lotInfo');
  //       console.log(data);
  //       console.log(data.contractInfo[0].METHOD_NAME);
  //       setLoading(false);
  //     });
  // }, []);
  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;
  return (
    <>
      {/* method: {lotInfo.contractInfo[0].METHOD_NAME} */}
      <h2>ID: {router.query.id} </h2>
      {/* {data.} */}
      <ul>
        {/* {data.map((toDo) => (
          <li key={toDo.id}>
            {toDo.title} -{' '}
            <span>( {toDo.completed ? 'Completed' : 'Not Completed'} )</span>
          </li>
        ))} */}
      </ul>
    </>
  );
}
