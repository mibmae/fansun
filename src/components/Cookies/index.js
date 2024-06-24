import React, { useEffect } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// import cookieImg from '../../public/images/cookies.gif';
import cookieImg from '../../../public/img/cookies.gif';

AOS.init();

function Cookies() {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
    document.getElementById('cookieConsentContainer').style.display = 'none';
  }
  function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  useEffect(() => {
    getCookie('fansun');
    if (document.cookie.match(/^(.*;)?\s*fansun\s*=\s*[^;]+(.*)?$/) !== null) {
      const cookieok = document.getElementById('cookieConsentContainer');
      cookieok.style.display = 'none';
    } else {
      document.getElementById('cookieConsentContainer').style.display = "block"
    }
  });
  var purecookieTitle = "Coucou c'est nous, les Cookies."; // Title
var purecookieDesc = "Nous utilisons les cookies pour collecter et analyser des informations sur les performances et l'utilisation du site, pour fournir des fonctionnalités de médias sociaux et pour améliorer et personnaliser le contenu et les publicités."; // Description
// var purecookieLink = '<a href="https://www.cssscript.com/privacy-policy/" target="_blank">What for?</a>'; // Cookiepolicy link
var purecookieLink = '<a href="https://www.cssscript.com/privacy-policy/" target="_blank">Pourquoi ?</a>'; // Cookiepolicy link
var purecookieButton = "Compris !"; // Button text


  return (
    <div className="cookieConsentContainer" id="cookieConsentContainer" data-aos="fade-left" data-aos-duration="3000">
      <div className="imgCookie"><img className="imgCookie_img" src="https://us.123rf.com/450wm/karidesigner/karidesigner2104/karidesigner210400049/168154799-cookie-aux-p%C3%A9pites-de-chocolat-en-style-cartoon-illustration-vectorielle.jpg?ver=6" /></div>
      <div className="cookieTitle">{purecookieTitle}</div>
      <div className="cookieDesc"><p>{purecookieDesc} <a href="https://www.cssscript.com/privacy-policy/" target="_blank">Pourquoi ?</a></p>
      </div>
      <div className="cookieButton">
        <a onClick={() => {
          const id = Math.random().toString(36).substr(2, 9);
                  setCookie('fansun', id, 30);
        }}>{purecookieButton}</a></div></div>
    // <div className="cookies_container" id="cookies" data-aos="fade-left" data-aos-duration="3000">
    //   <div><img src={cookieImg} alt="cookie" className="cookies_img_pic" /> </div>
    //   <div className="cookies">Nous utilisons des cookies pour une meilleure expérience utilisateur</div>
    //   <div className="cookies_button">
    //     <button
    //       type="button"
    //       className="gutton accept"
    //       onClick={(e) => {
    //         const id = Math.random().toString(36).substr(2, 9);
    //         setCookie('fansun', id, 30);
    //       }}
    //     >J'accepte
    //     </button>
    //     <button type="button" className="gutton refuse" onClick={(e) => document.getElementById('cookies').style.display = 'none'}>Je refuse</button>
    //   </div>
    // </div>

  );
}

export default Cookies;
