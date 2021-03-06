import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import navstyle from './Navbar.module.css';
export default function Navbar() {
  return (
    <>
      <Nav className='navbar navbar-expand-lg bg-dark'>
        <div className='container-xl'>
          <Link href='/'>
            <a className='navbar-brand'>DXMAP</a>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarsExample07XL'
            aria-controls='navbarsExample07XL'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarsExample07XL'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <Link href='/'>
                  <a className='nav-link'>
                    Bosh sahifa <span className='sr-only'>(current)</span>
                  </a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/contrats'>
                  <a className='nav-link'>Shartnoma ma'lumotlari</a>
                </Link>
              </li>{' '}
              {/* <li className='nav-item'>
              <Link href='/contrat_mTable'>
                <a className='nav-link'>Ma'lumotlari</a>
              </Link>
            </li>{' '} */}
              <li className='nav-item'>
                <Link href='/trades'>
                  <a className='nav-link'>Amaldagi savdolar</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/about'>
                  <a className='nav-link'>Tizim haqida</a>
                </Link>
              </li>
            </ul>
            {/* <ul className='navbar-nav'>
              <li className='nav-item text-nowrap'>
                <Button className='nav-link btn btn-info'>
                  Tizimga kirish
                </Button>
              </li>
            </ul> */}
          </div>
        </div>
      </Nav>
    </>
  );
}
