import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdLogIn } from 'react-icons/io';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
// import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import { RiAdminLine, RiUser5Line } from 'react-icons/ri';
import { PiShoppingCart } from 'react-icons/pi';
import {
    Link,
  } from 'react-router-dom';
import { StyledOffCanvas, Menu, Overlay } from 'styled-off-canvas';
import './styles.scss';
import store from 'src/store';
import RendezVous from '../RendezVous';
import { useSelector } from 'react-redux';
import admin from '../../assets/images/admin.png'
import logo from '../../../public/img/logo.jpg'



function NavBar() {
    const [menuList, setMenuList] = useState([]);
    const [total, setTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
useEffect(() => {
}, [window.location.pathname])

const user = useSelector((state) => state.User.user)



const cart = useSelector((state) => state.Cart.cart)
let prixTotalCalcul = [];
useEffect(() => {
  if (cart.length > 0) {
for (let s = 0; s < cart.length; s++) {
  prixTotalCalcul.push(cart[s].price)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const prixTotal = prixTotalCalcul.reduce(reducer);
  setTotal(prixTotal)
}
 if (cart.length === 0) {
  setTotal(0)
}
}, [cart])

    const openModal = () => {
        setIsOpen(true);
        
    }
    const closeModal = () => {
        setIsOpen(false);
        if (document.getElementById('planity')) {
        document.getElementById('planity').remove()
        }

    }

    useEffect(() => {  
        const menuBtn = document.querySelector('.menu-btn');
    
        menuBtn.addEventListener('click', () => {
          if (!isOpenMenu) {
            menuBtn.classList.add('open');
          }
          else {
            menuBtn.classList.remove('open');
          }
        });
      }, [isOpenMenu]);    

    useEffect(() => {
 
    }, [menuList])
    const goDown = (nb) => {
        window.scrollTo({
            left: 0,
            top: nb,
            behavior: "smooth"
        })
    }
    
  return (
   <><div className="navbarMine" id="navbarMine">
    <img className="logogogo" src={logo} alt="" />
          <div className="pan">
              
              
              {cart.length > 0 && (
              <div className="panier-mob" id="panier"><Link to="/cart" onClick={() => { setTimeout(() => goDown(570), 200) }}><span className="panier_txt_mob"><PiShoppingCart className="cart" />{cart.length > 0 && (<span className="cart_length">{cart.length}</span>)} <span className="cart_total">{total} €</span>  </span></Link></div>
              )}
          </div>
          {window.location.pathname === "/" && (
          <div className="menu_container">
              <div className="menu_item" id="accueil" onClick={(e) => goDown(0)}>Accueil</div>
              <div className="menu_item" id="etablissement" onClick={(e) => goDown(600)}>Nos établissements</div>
              <div className="menu_item" id="equipe" onClick={(e) => goDown(1500)}>Nos équipes
                 </div>
                 
                  <div className="menu_item" id="formations" >
                  <Link to="/formations" onClick={() => { setTimeout(() => goDown(570), 200) }}>Nos formations</Link>
                  </div>
              <div className="menu_item" id="offrir" onClick={(e) => openModal()}>Réserver / Offrir </div>
              <div className="menu_item" id="contacts"><Link to="/contact" >Contacts</Link> </div>
              
              <li className="menu_itemcompte" id="compte" onClick={(e) => {
                    setIsOpenMenu(false);
                  } }>
                {store.getState().User.logged === false && (
                <Link to="/login">
                <span className='menu_itemd'>Mon compte</span>
                </Link>)}

                {store.getState().User.logged === true && (
                  <Link to="/account">
                    <span className="userName"><RiUser5Line className="userAvatar" /> {store.getState().User.user.user}</span>
                  </Link>
                )}
                {store.getState().User.user.admin === 'true' && (
                  <><Link to="/account">
                          </Link><span className="menu_admin">{store.getState().User.user.admin === 'true' && (<Link to="/admin"><img className="avatar" src={admin} /></Link>)}</span></>
                )}
                </li>
              <div className="menu_item panier" id="panier"><Link to="/cart"
               ><span className="panier_txt"><PiShoppingCart className="cart" />{cart.length} {(cart.length < 2) ? 'article' : 'articles'} {total} € </span></Link></div>

              
          </div>
          )}
          {window.location.pathname !== "/" && (
          <div className="menu_container">
              <div className="menu_item" id="accueil"><Link to="/">Accueil</Link></div>
              <div className="menu_item" id="etablissement">
                <Link to="/" onClick={(e) => {
              setTimeout(() => goDown(600), 200);
              setIsOpenMenu(false);
            } }>Nos établissements</Link></div>
              <div className="menu_item" id="equipe">
              <Link to="/" onClick={(e) => {
              setTimeout(() => goDown(1500), 200);
              setIsOpenMenu(false);
            } }>Nos équipes</Link>
                 </div>
              <Link to="/formations" onClick={() => {
                 setTimeout(() => goDown(570), 200);}}>
              <div className="menu_item" id="formations" >
                Nos formations</div></Link>
              <div className="menu_item" id="offrif" onClick={(e) => openModal()}>Réserver / Offrir </div>
              <div className="menu_item" id="contacts"><Link to="/contact" >Contacts</Link> </div>

              <li className="menu_itemcompte" id="compte" onClick={(e) => {
                    setIsOpenMenu(false);
                  } }>
                {store.getState().User.logged === false && (
                <Link to="/login">
                <span className='menu_itemd'>Mon compte</span>
                </Link>)}

                {store.getState().User.logged === true && (
                  <Link to="/account">
                    <span className="userName"><RiUser5Line className="userAvatar" /> {store.getState().User.user.user}</span>
                  </Link>
                )}
                {store.getState().User.user.admin === 'true' && (
                  <><Link to="/account">
                          </Link><span className="menu_admin">{store.getState().User.user.admin === 'true' && (<Link to="/admin"><img className="avatar" src={admin} /></Link>)}</span></>
                )}
                </li>
              <div className="menu_item panier" id="panier">
                <Link to="/cart" 
                ><span className="panier_txt"><PiShoppingCart className="cart" />{cart.length} {(cart.length < 2) ? 'article' : 'articles'} {total} € </span></Link></div>
              
          </div>
          )}
      </div>
     
      <StyledOffCanvas
      isOpen={isOpenMenu}
      onClose={() => setIsOpenMenu(false)}
      // width="100%"
      position="right"
      closeOnEsc="true"
      height="80%"
      className="zindex"
    >
        <AiOutlineMenu className="menu-btn" onClick={() => setIsOpenMenu(!isOpenMenu)}/>
 

      
{/* MOBILE MENU */}
      <Menu>
        <ul className="link_title">
          <div className="titles">
        <span className="button_close_menu" onClick={() => setIsOpenMenu(false)}><AiFillCloseCircle /></span> </div>
        {window.location.pathname === "/" && (
          <><li>
                          <div className="menu_item panier_mob" id="panier"><Link to="/cart" onClick={() => setIsOpenMenu(false)}><span className="panier_txt"><PiShoppingCart className="cart" />{cart.length} {(cart.length < 2) ? 'article' : 'articles'} {total} € </span></Link></div>

          </li>
          <li>
                <Link
                  to="/"
                  className="link_mobile"
                  onClick={(e) => {
                    goDown(0);
                    setIsOpenMenu(false);
                  } }
                ><p className="menu_subtitle ">Accueil</p>
                </Link>
              </li>
              <li
                onClick={(e) => {
                  goDown(695);
                  setIsOpenMenu(false);
                } }
              ><p className="menu_subtitle">Nos établissements</p>

                </li>
                <li
                  onClick={(e) => {
                    setIsOpenMenu(false);
                    goDown(2170);
                  } }
                ><p className="menu_subtitle">Nos équipes</p>
                </li>
                <Link to="/formations"><li
                  onClick={(e) => {
                    setIsOpenMenu(false);
                    goDown(610);
                  } }
                ><p className="menu_subtitle">Nos formations</p>
                </li>
                </Link>
                <li
                  onClick={(e) => {
                    setIsOpenMenu(false);
                    openModal();
                  } }
                ><p className="menu_subtitle">Réserver / Offrir</p>
                </li>
                <li onClick={(e) => {
                    setIsOpenMenu(false);
                  } }>
<p className="menu_subtitle"><Link to="/contact" >Contacts</Link></p>
                </li>

<li className="menu_subtitle" id="compte" onClick={(e) => { setIsOpenMenu(false) }}>
                    {store.getState().User.logged === false && (
                    <Link to="/login">
                    <span> Mon compte </span>
                    </Link>)}
                    {store.getState().User.logged === true && (
                      <Link to="/account">
                      <span className="menu_subtitle"><RiUser5Line className="userAvatar" /> {store.getState().User.user.user}</span>
                      </Link>
                    )}
                </li>
                {store.getState().User.user.admin === 'true' && (
<li className="menu_subtitle" id="compte" onClick={(e) => { setIsOpenMenu(false) }}>

                      <span className="menu_subtitle"><Link to="/admin"><img className="avatar_mob" src={admin} /><span className="ml1">Menu Admin</span></Link></span>
                    
                </li>
                )}
                </>
        )}
          {window.location.pathname !== "/" && (
          <>
          <li>
          <div className="menu_item panier_mob" id="panier"><Link to="/cart" onClick={() => { setIsOpenMenu(false); goDown(530); }}><span className="panier_txt"><PiShoppingCart className="cart" />{cart.length} {(cart.length < 2) ? 'article' : 'articles'} {total} € </span></Link></div>

          </li>
          <li>
                <Link
                  to="/"
                  className="link_mobile"
                  onClick={(e) => {
                    goDown(0);
                    setIsOpenMenu(false);
                  } }
                ><p className="menu_subtitle ">Accueil</p>
                </Link>
              </li><li>
                  <Link
                    to='/'
                    onClick={(e) => {
                      setTimeout(() => goDown(600), 500);
                      setIsOpenMenu(false);
                    } }>
                    <p className="menu_subtitle">Nos établissements</p>
                  </Link>
                </li><li>
                  <Link
                    to='/'
                    onClick={(e) => {
                      setTimeout(() => goDown(1950), 500);
                      setIsOpenMenu(false);
                    } }>
                    <p className="menu_subtitle">Nos équipes</p>
                  </Link>
                </li>
                <Link to="/formations">
                  <li
                  onClick={(e) => {
                    setIsOpenMenu(false);
                    goDown(610);
                  } }
                ><p className="menu_subtitle">Nos formations</p>
                </li>
                </Link><li
                  onClick={(e) => {
                    setIsOpenMenu(false);
                    openModal();
                  } }
                ><p className="menu_subtitle">Réserver / Offrir</p>
                </li>
                <li onClick={(e) => {
                    setIsOpenMenu(false);
                  } }>
<p className="menu_subtitle"><Link to="/contact" >Contacts</Link></p>
                </li>

                <li className="menu_subtitle" id="compte" onClick={(e) => { setIsOpenMenu(false) }}>
                    {store.getState().User.logged === false && (
                    <Link to="/login">
                    <span> Mon compte </span>
                    </Link>)}
                    {store.getState().User.logged === true && (
                      <Link to="/account">
                      <span className="menu_subtitle"><RiUser5Line className="userAvatar" /> {store.getState().User.user.user}</span>
                      </Link>
                    )}
                </li>
                {store.getState().User.user.admin === 'true' && (
<li className="menu_subtitle" id="compte" onClick={(e) => { setIsOpenMenu(false) }}>

                      <span className="menu_subtitle"><Link to="/admin"><img className="avatar_mob" src={admin} /><span className="ml1">Menu Admin</span></Link></span>
                    
                </li>
                )}
</>
          )}
        </ul>
      </Menu>
    </StyledOffCanvas>

    {isOpen && (
        <Modal className="modale" show={isOpen} >
              <Modal.Body>
                <RendezVous items="rdv" />
              </Modal.Body>
              <Modal.Footer>
                  <Button className="buttonCloseAdd" onClick={() => closeModal()}>X</Button>
              </Modal.Footer>
          </Modal>
      )}
      </>
 );
}

export default NavBar;
