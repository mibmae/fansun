import React from 'react';
import './styles.scss';

function NotFound() {
  return (
    <>
    <div class="container">
  <h1 class="first-four">4</h1>
  <div class="cog-wheel1">
      <div class="cog1">
        <div class="top"></div>
        <div class="down"></div>
        <div class="left-top"></div>
        <div class="left-down"></div>
        <div class="right-top"></div>
        <div class="right-down"></div>
        <div class="left"></div>
        <div class="right"></div>
    </div>
  </div>
 <h1 class="second-four">4</h1>
  <p class="wrong-para">La page demandée n'est pas disponible</p>
 
</div>
<div> <p class="wrong-div"><a href="/">Retour</a></p></div>
    </>
 );
}

export default NotFound;
