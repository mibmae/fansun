// == Import npm
import React, { useState, useEffect } from 'react';
// == Import
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';

import Header from 'src/components/Header';
import Cookies from 'src/components/Cookies';
import UnderHeader from 'src/components/UnderHeader';
import NavBar from 'src/components/NavBar';
import Etablissement from 'src/components/Etablissement';
import Downloads from 'src/components/Downloads';
import Equipe from 'src/components/Equipe';
import Orders from 'src/components/Compte/orders';
import Infos from 'src/components/Compte/infos';
import RendezVous from 'src/components/RendezVous';
import Admin from 'src/components/Admin';
import Footer from 'src/components/Footer';
import Mentions from 'src/components/Mentions';
import Contacts from 'src/components/Contacts';
import LostPassword from 'src/components/Lostpassword';
import Register from 'src/containers/Register';
import Account from 'src/containers/Compte';
import Login from 'src/containers/Login';
import Formations from 'src/containers/Formations';
import Cart from 'src/containers/Cart';
import Razpassword from 'src/components/Compte/ModifyPassword';
// import { signinByToken, signinByTokenAdmin } from 'src/actions/';
import reactLogo from './react-logo.svg';
import './styles.css';
import store from 'src/store';
import { signinByToken, signinByTokenAdmin, addAllToCart } from 'src/actions/';
import Home from '../Compte/home';
import ResetPassword from '../ResetPassword';
import Formationadmin from '../Admin/formations';
import Solds from '../Admin/solds';
import Users from '../Admin/users';
import Panel from '../Admin/panel';
import Promos from '../Admin/promos';
import NotFound from '../NotFound';
import Facture from '../Compte/facture';
import Offer from '../Offer';
import Horaires from '../Horaires';
import OffersAdmin from '../Admin/offers';




const token = localStorage.getItem('token_fansun');
if (token !== 'undefined' && token !== null && token !== '') {
  store.dispatch(signinByToken(token));
}
const tokenAdmin = localStorage.getItem('token_fansun_admin');

if (tokenAdmin !== 'undefined' && tokenAdmin !== null && tokenAdmin !== '') {
  store.dispatch(signinByTokenAdmin(tokenAdmin));
}
if (JSON.parse(localStorage.getItem('Cart'))) {
if (JSON.parse(localStorage.getItem('Cart')).length > 0) {
  store.dispatch(addAllToCart(JSON.parse(localStorage.getItem('Cart'))))
}
}
   

// == Composant
const App = () => {
  const [promoencours, setPromoencours] = useState([])

  const detect = () => /Android|webOS|Iphone|Ipod|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ? "Mobile" : "desktop";
  useEffect(() => {
    fetch(`https://serveur.fansun.webmg.eu/promos/getoffer`, {
      // fetch(`https://serveur.fansun.webmg.eu/user/getOrders/${id}`, {
  
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'couscousgarbit',
      },
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.datas[0]) {
      setPromoencours(response.datas[0])
      }
      // promoencours.push(response.datas[0])
    })
    // if (document.getElementById('super_container')) {
    // document.getElementById('super_container').classList.add('bounce');
    // }
    // console.log(detect())
  }, [])

  function getCurrentScroll() {
    return window.scrollY || document.documentElement.scrollTop;
    }
  
  window.addEventListener('scroll', (e) => {
    // let modif = false;
    
    // var shrinkHeader = 80;
    // var scroll = getCurrentScroll();
    // console.log(scroll)
    // if (window.innerWidth > 1025) {
    // if ( scroll < shrinkHeader && modif === false ) {
    

    //   console.log('tintin')
    //     modif = true
    //     document.getElementById("navbarMine").style.height = "6rem";
    //     document.getElementsByClassName("menu_container")[0].style.marginTop = "2rem"
    //     document.getElementById("panier").style.marginTop = "-0.5rem";
    //     document.getElementsByClassName("logogogo")[0].style.width = "8%"
    //     window.scrollTo({top: 0})
    //   }
    //   else {
    //     modif = false
    //     document.getElementById("navbarMine").style.height = "3.8rem";
    //     document.getElementsByClassName("menu_container")[0].style.marginTop = "0.7rem"
    //     document.getElementsByClassName("logogogo")[0].style.width = "6%";
    //     document.getElementById("panier").style.marginTop = "-0.3rem";
    //     // document.getElementById("panier").style.transition.transform = '3s ease';
    //   }
    // }
    if (window.innerWidth > 1025) {
    if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
      
        document.getElementById("navbarMine").style.height = "3.8rem";
            document.getElementsByClassName("menu_container")[0].style.marginTop = "0.7rem"
            document.getElementsByClassName("logogogo")[0].style.width = "6%";
            document.getElementById("panier").style.marginTop = "-0.3rem";
            // window.scrollTo({top: 0})
      } else {
        document.getElementById("navbarMine").style.height = "6rem";
        document.getElementsByClassName("menu_container")[0].style.marginTop = "2rem"
        document.getElementById("panier").style.marginTop = "-0.5rem";
        document.getElementsByClassName("logogogo")[0].style.width = "8%";
        window.scrollTo({top: 0})
      }
    }

  })
  
  


  


return (
  <div className="app">
   <Cookies />
   <Routes>
   <Route path="/" exact element={<>
   {promoencours.id !== undefined && <Offer offer={promoencours} />}
    <Header />
    
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />
    
    <Etablissement />
    <Equipe />
    <Footer />
    </>} />
    
       <Route path="/mentions" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />
   
    <Mentions />
    <Footer />
    </>} />


    {/* <Route path="/insta" exact element={<>
      <Header />
    <NavBar />
    <UnderHeader />
    <Insta />
    <Footer />
    </>} /> */}


    <Route path="/contact" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />

    <Contacts />
    <Footer />
    </>} />


    <Route path="/admin" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
  <Admin />
    {/* <Footer /> */}
    </>} />


    <Route path="/account" exact element={<>
      <Header />
    <NavBar />
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    {/* <Horaires /> */}
    <Account />
    <Home user={store.getState().User.user} />
    <Footer />
    </>} />

    <Route path="/account/orders" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    <Account />
    <Orders user={store.getState().User.user} />
    <Footer />
    </>} />


    <Route path="/account/facture/:id" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    {/* <Account /> */}
    <Facture user={store.getState().User.user} />
    <Footer />
    </>} />
    

    <Route path="/lost" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* <UnderHeader /> */}
    <LostPassword />
    <Footer />
    </>} />


    <Route path="/resetpwd/:nukecode/:nukesize" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <ResetPassword />
    <Footer />
    </>} />


    <Route path="/account/resetpassword" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Account />
    <Razpassword />
    <Footer />
    </>} />


    <Route path="/admin/formations/" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Admin />
    <Formationadmin />
    {/* <Footer /> */}
    </>} />
    
    <Route path="/admin/promos/" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Admin />
    <Promos />
    {/* <Footer /> */}
    </>} />
    <Route path="/admin/offers/" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Admin />
    <OffersAdmin />
    {/* <Footer /> */}
    </>} />


    <Route path="/admin/users/" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Admin />
    <Users />
    {/* <Footer /> */}
    </>} />


    <Route path="/admin/solds/" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <Admin />
    <Solds />
    {/* <Footer /> */}
    </>} />


    <Route path="/account/home" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    <Account />
    <Home user={store.getState().User.user} />
    <Footer />
    </>} />


    <Route path="/account/downloads/:nukecode"  element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    <Account />
    <Downloads />
    <Footer />
    </>} />


    <Route path="/account/infos" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* {window.screenX >= '650px' && (<UnderHeader />)} */}
    <Account />
    <Infos user={store.getState().User.user} />
    <Footer />
    </>} />


    <Route path="/formations" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />
    <Formations />
    <Footer />
    </>} />


    <Route path="/login" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    {/* <UnderHeader /> */}
    <Login />
    <Footer />
    </>} />


    <Route path="/register" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />
    <Register />
    <Footer />
    </>} />


    <Route path="/cart" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <UnderHeader />
    <Cart />
    <Footer />
    </>} />


    <Route path="*" exact element={<>
      <Header />
    <NavBar />
    {/* <Horaires /> */}
    <NotFound />
    <Footer />
    </>} />

   </Routes>

  </div>
);
   }

// == Export
export default App;
