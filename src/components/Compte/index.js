import React, { useRef, useEffect, useState, Suspense } from 'react';

import { RotatingLines } from 'react-loader-spinner';

import './styles.scss';
import store from 'src/store';
import {
  Link,
} from 'react-router-dom';

function Compte() {
 
  const [me, setMe] = useState([]);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(false);


useEffect(() => {
 setLoading(true)
 
  setTimeout(() => {
    setId(store.getState().User.user.id)
    setLoading(false)
 
  }, 1500)
 window.scroll({
  top: 0,
 })
}, [])

useEffect(() => {
}, [id])
useEffect(() => {
}, [me])

const logOut = () => {
  localStorage.removeItem('token_fansun')
  localStorage.removeItem('token_fansun_admin')
  window.location.href = '/';
}

function setToDisplayF(comp) {
  setTimeout(() => {
    if (document.getElementsByClassName("selected_compte")[0]) {
      document.getElementsByClassName("selected_compte")[0].classList.remove('selected_compte')
      }
      if (document.getElementById(comp)) {
      document.getElementById(comp).classList.add('selected_compte');
      }
      if (document.getElementById("details")) {
      document.getElementById("details").open = false;
      }
  }, 500);
  

}
useEffect(() => {
  setTimeout(() => {
      const part = window.location.pathname.substring(9, window.location.pathname.length).charAt(0).toUpperCase() + window.location.pathname.substring(9, window.location.pathname.length).substring(1)
      if (part === "") {
          setToDisplayF('Accueil')
      }
      setToDisplayF(part)
      
  }, 1000);
  if (window.innerWidth < 650) {
    setMobile(true)
  } else {
    setMobile(false)
  }
}, [])

useEffect(() => {

}, [mobile])

window.addEventListener('resize', () => {
  if (window.innerWidth < 650) {
    setMobile(true)
  } else {
    setMobile(false)
  }
})




  return (
    <div className="wrappercompte">
      {loading && (<div className="loader"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>)}
      {(id && !loading) ? (
        <>
        <div className="compte">
        <div className="compte_container">
            <h1 className="text-3xl compte_title font-bold underline text-center">Mon compte</h1>
            <div className="compte_bandeau">
                {mobile ? (
                <details id="details"> 
                <summary id="summ" className="compte_bandeau_item">Menu</summary>
                <Link to="/account" onClick={() => setToDisplayF('Accueil')}><div className="compte_bandeau_item" id="Accueil">Accueil</div></Link>
                <Link to="/account/infos" onClick={() => setToDisplayF('Infos')}><div className="compte_bandeau_item" id="Infos">Mes Infos</div></Link>
                <Link to="/account/resetpassword" onClick={() => setToDisplayF('Resetpassword')}><div className="compte_bandeau_item" id="Resetpassword">Modifier mot de passe</div></Link>
                <Link to="/account/orders" onClick={() => setToDisplayF('Orders')}><div className="compte_bandeau_item" id="Orders">Mes achats</div></Link>
                <div className="compte_bandeau_item" onClick={() => logOut()}>Déconnexion</div>
                </details>
                ) : (
                  <><Link to="/account" onClick={() => setToDisplayF('Accueil')}><div className="compte_bandeau_item" id="Accueil">Accueil</div></Link><Link to="/account/infos" onClick={() => setToDisplayF('Infos')}><div className="compte_bandeau_item" id="Infos">Mes Infos</div></Link><Link to="/account/resetpassword" onClick={() => setToDisplayF('Resetpassword')}><div className="compte_bandeau_item" id="Resetpassword">Modifier mot de passe</div></Link><Link to="/account/orders" onClick={() => setToDisplayF('Orders')}><div className="compte_bandeau_item" id="Orders">Mes achats</div></Link><div className="compte_bandeau_item" onClick={() => logOut()}>Déconnexion</div></>
                )}
                
            </div>
        </div>
    </div>
        </>
    )
   : ('')}
  </div>

 );
}

export default Compte;
