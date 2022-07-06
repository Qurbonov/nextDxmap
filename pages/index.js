import Head from 'next/head';

import SimpleLayout from '../components/layout/simple';
import Donut from '../components/charts/Donut';
import Bar from '../components/charts/Bar';
import Line from '../components/charts/Line';

export default function Home(initialData) {
  return (
    <SimpleLayout>
      <section className='text-center'>
        <h1>Savdolar</h1>

        <div className='container px-4'>
          <div className='row gx-5'>
            <div className='col'>
              <div className='p-3 border bg-light'>
                {' '}
                <Donut />
              </div>
            </div>
            <div className='col'>
              <div className='p-3 border bg-light'>
                {' '}
                <Bar />
              </div>
            </div>
          </div>
          <div className='row gx-5'>
            <div className='col'>
              <div className='p-3 border bg-light'>
                {' '}
                <Line />
              </div>
            </div>
          </div>
        </div>

        <div className='container'></div>
      </section>
    </SimpleLayout>
  );
}
