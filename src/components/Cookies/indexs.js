import React from 'react';
import './styles.scss';

function Cookies() {

    // --- Config --- //
var purecookieTitle = "Cookies."; // Title
var purecookieDesc = "Nous utilisons les cookies pour collecter et analyser des informations sur les performances et l'utilisation du site, pour fournir des fonctionnalités de médias sociaux et pour améliorer et personnaliser le contenu et les publicités."; // Description
// var purecookieLink = '<a href="https://www.cssscript.com/privacy-policy/" target="_blank">What for?</a>'; // Cookiepolicy link
var purecookieLink = '<a href="https://www.cssscript.com/privacy-policy/" target="_blank">Pourquoi ?</a>'; // Cookiepolicy link
var purecookieButton = "Compris !"; // Button text
// ---        --- //


function pureFadeIn(elem, display){
  var el = document.getElementById(elem);
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .02) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
function pureFadeOut(elem){
  var el = document.getElementById(elem);
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .02) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
    document.getElementById('cookies').style.display = 'none';
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

    return null;
  }
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

function CookieConsent() {
    function purecookieDismiss() {
        console.log('tintin')
    //     const id = Math.random().toString(36).substr(2, 9);
    //     setCookie('fansun', id, 30);
    //   pureFadeOut("cookieConsentContainer");
    }
  if (!getCookie('fansun')) {
    // document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>' + purecookieTitle + '</a></div><div class="cookieDesc"><p>' + purecookieDesc + ' ' + purecookieLink + '</p></div><div class="cookieButton"><a onClick={() => purecookieDismiss()">' + purecookieButton + '</a></div></div>';
    return <div className="cookieConsentContainer" id="cookieConsentContainer"><div className="cookieTitle">{purecookieTitle}</div><div className="cookieDesc"><p>{purecookieDesc} {purecookieLink}</p></div><div className="cookieButton"><a onClick={() => purecookieDismiss()}>{purecookieButton}</a></div></div>
    // document.body.innerHTML += `<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle">${purecookieTitle}</div><div class="cookieDesc"><p>${purecookieDesc} ${purecookieLink}</p></div><div class="cookieButton"><a onclick=javascript:${purecookieDismiss()}>${purecookieButton}</a></div></div>`;
	// pureFadeIn("cookieConsentContainer");
  }
}



// window.onload = function() { cookieConsent(); };




  return (
    <div id="css-script-menu">

    <div className="css-script-center">
  
    <CookieConsent />
  
      <div className="css-script-clear"></div>
  
    </div>
  
  </div>
 );
}

export default Cookies;
