import React, { Suspense } from 'react';
import './styles.scss';
import { RotatingLines } from 'react-loader-spinner';
import store from 'src/store';

function Home() {

  return (
    <Suspense fallback={<RotatingLines />}>
   {Welcome()}
    </Suspense>
 );

  function Welcome() {
    return <div id="home" className="home">
      <div className="home_text">
        Bienvenue sur votre compte.
      </div>
      <div className="home_text">
      </div>
    </div>;
  }
}

export default Home;
