import Navbar from '../navbar/navbar';
import React from 'react';

export default function SimpleLayout(props) {
  return (
    <>
      <Navbar />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />

      <main role='main'>
        {props.preContainer && props.preContainer}
        <div className='album py-5 bg-light'>
          <div className='container'>{props.children}</div>
        </div>
      </main>
    </>
  );
}
