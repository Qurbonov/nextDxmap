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

        <div class='container px-4'>
          <div class='row gx-5'>
            <div class='col'>
              <div class='p-3 border bg-light'>
                {' '}
                <Donut />
              </div>
            </div>
            <div class='col'>
              <div class='p-3 border bg-light'>
                {' '}
                <Bar />
              </div>
            </div>
          </div>
          <div class='row gx-5'>
            <div class='col'>
              <div class='p-3 border bg-light'>
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
