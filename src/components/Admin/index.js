import React, { useState, useEffect, lazy, Suspense } from 'react';
import './styles.scss';
import store from 'src/store'
import { RotatingLines } from 'react-loader-spinner';
import { Navigate, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import {
    Link,
  } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Panel from './panel';

function Admin() {
    const [toDisplay, setToDisplay] = useState();
    const [adminOk, setAdminOK] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setLoading(true)
   setTimeout(() => {
    if (store.getState().User.user.admin === 'true') {
        setAdminOK(true)
        setLoading(false)
    } else {
        swal({
            title: `Vous n'avez pas le droit !`,
            icon: 'warning',
            buttons: ["Ok", "Annuler"]
          }).then((result) => {
            if (result === null) {
                window.location.replace('/')
            }
        })
    }
   }, 2000)
   if (window.innerWidth < 650) {
    setMobile(true)
  } else {
    setMobile(false)
  }
    }, [])
    window.addEventListener('resize', () => {
        if (window.innerWidth < 650) {
          setMobile(true)
        } else {
          setMobile(false)
        }
      })
    useEffect(() => {
    }, [toDisplay])
    function Loading() {
        return <h2>🌀 Loading...</h2>;
      }

    function setToDisplayF(comp) {
        if (comp !== "Accueil") {
            setShowPanel(false)
        } else {
            setShowPanel(true)
        }
        setTimeout(() => {
            if (document.getElementById(comp)) {
                document.getElementById(comp).classList.add('selected');
            }
        }, 100);
        if (document.getElementsByClassName("selected")[0]) {
        document.getElementsByClassName("selected")[0].classList.remove('selected')
        }
        if (document.getElementById("detail")) {
        document.getElementById("detail").open = false;
        }
        setToDisplay(comp)
    }

    useEffect(() => {
        setTimeout(() => {
            const part = window.location.pathname.substring(7, window.location.pathname.length).charAt(0).toUpperCase() + window.location.pathname.substring(7, window.location.pathname.length).substring(1)
            if (part === "" || part === "Accueil") {
                setShowPanel(true)
                setToDisplayF('Accueil')         
            }
             else {
                setShowPanel(false)
                setToDisplayF(part)
            }
            
        }, 1500);
        
    }, [])
    
    useEffect(() => {
    }, [showPanel])
    

   
    

  return (
    
   <div className="admin">
   {loading && <div className="loader"><RotatingLines
  // strokeColor="#CEAB8D""grey"
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>}
    {adminOk === true ? (
        // <Suspense fallback={<Loading />}>
        <div className="admin_container">
            <div className="admin_title">Administration du site</div>
            <div className="admin_bandeau">
            {mobile ? (
                <details id="detail"> 
                     <summary id="summ" className="compte_bandeau_item">Menu</summary>
                <NavLink to="/admin" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Accueil" onClick={() => setToDisplayF('Accueil')}>Accueil</div></NavLink>
                <NavLink to="/admin/formations" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Formations" onClick={() => setToDisplayF('Formations')}>Les formations</div></NavLink>
                <NavLink to="/admin/users" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Users" onClick={() => setToDisplayF('Users')}>Les Utilisateurs</div></NavLink>
                <NavLink to="/admin/solds" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Solds" onClick={() => setToDisplayF('Solds')}>Les Ventes</div></NavLink>
                <NavLink to="/admin/promos" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Promos" onClick={() => setToDisplayF('Promos')}>Codes promos</div></NavLink>
                <NavLink to="/admin/offers" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="PubPromos" onClick={() => setToDisplayF('PubPromos')}>Pub promo</div></NavLink>
                </details>
                )
                 : (
                <>
                <NavLink to="/admin" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Accueil" onClick={() => setToDisplayF('Accueil')}>Accueil</div></NavLink>
                <NavLink to="/admin/formations" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Formations" onClick={() => setToDisplayF('Formations')}>Les formations</div></NavLink>
                <NavLink to="/admin/users" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Users" onClick={() => setToDisplayF('Users')}>Les Utilisateurs</div></NavLink>
                <NavLink to="/admin/solds" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Solds" onClick={() => setToDisplayF('Solds')}>Les Ventes</div></NavLink>
                <NavLink to="/admin/promos" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="Promos" onClick={() => setToDisplayF('Promos')}>Codes promos</div></NavLink>
                <NavLink to="/admin/offers" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><div className="admin_bandeau_item" id="PubPromos" onClick={() => setToDisplayF('PubPromos')}>Pub promo</div></NavLink>
                </>
                )}
            </div>
            {showPanel && (<Panel />)}
        </div>
        // </Suspense>
     ) : ('')}
                 {(store.getState().User.user.admin === 'false') && <Navigate to='/' />}

    </div>
 );
}

export default Admin;
