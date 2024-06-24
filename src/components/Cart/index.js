import { useEffect, useState } from 'react';
import React from 'react';
import './styles.scss';
import store from 'src/store';
import { AiFillDelete } from 'react-icons/ai'
import { Modal, Button } from "react-bootstrap";
import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import chip from '../../../public/img/chip.svg';
import wifi from '../../../public/img/wifi-signal.svg';
import visa from '../../../public/img/visa.svg';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

// import { Modal } from 'react-bootstrap';


function Cart({ modifyCart }) {
    const [total, setTotal] = useState(0)
    const [statusPaiement, setStatusPaiement] = useState(false)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingPay, setLoadingPay] = useState(false)
    const [code, setCode] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const cart = useSelector((state) => state.Cart.cart)
    // const cart = JSON.parse(localStorage.getItem('Cart'));
let prixTotalCalcul = [];

useEffect(() => {
  setTimeout(() => {
    
  if (window.innerWidth > 1600) {
  
  window.scroll({
    top: 59 * window.innerHeight/100,
   })
  }
  if (window.innerWidth < 640) {

    window.scroll({
      top: 90 * window.innerHeight/100,
     })
  }
  if (window.innerWidth >= 640  && window.innerWidth < 800) {

    window.scroll({
      top: 109 * window.innerHeight/100,
     })
  }
  }, 1000);


  
}, [])



useEffect(() => {
    if (cart.length > 0) {
  for (let s = 0; s < cart.length; s++) {
    // console.log(cart[s].price)
    prixTotalCalcul.push(cart[s].price)
  }
//   if (prixTotalCalcul.length > 0) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
  const prixTotal = prixTotalCalcul.reduce(reducer);
    setTotal(prixTotal)
  }
   if (cart.length === 0) {
    setTotal(0)
  }
}, [cart])


const deleteItem = (id) => {
    // console.log(id)
    const filter = cart.filter((item) => item.id !== id);
    localStorage.setItem('Cart', JSON.stringify(filter));
    modifyCart(filter)
    // addToCart(filter)
}

const emptyCart = () => {
  swal({
    title: 'Êtes-vous sur de vouloir vider le panier ?',
    text: "Vous ne pouvez pas revenir en arrière",
    icon: 'warning',
    buttons: ["Annuler", "Oui je suis sûr"]
  }).then((result) => {
    if (result) {
      swal({
        title: 'Panier vidé!',
        icon: 'success',
      }).then((result) => {
        
        if (result) {
          window.location.href = '/'
        }
      })
      localStorage.setItem('Cart', "[]");
  modifyCart([])
    }
  })
}

const collectCach = () => {
  const idUser = store.getState().User.user.id;
  const email = store.getState().User.user.email;
  let datas = [
    { cart: cart }, 
    { total: discountPrice.toFixed(2) !== "0.00" ? discountPrice.toFixed(2) : total },
    { totalNoDiscount: total },
    { remise: code },
    { idUser: idUser},
    { email }
  ]

  // fetch(`https://serveur.fansun.webmg.eu/user/validorder`, {
  fetch(`https://serveur.fansun.webmg.eu/user/validorder`, {
    method: 'POST',
    body: JSON.stringify(datas),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin'),
      'x-api-key': 'couscousgarbit',
    }, }).then((response) => {
      response.json().then((res) => {
        if (res.order.msg === 'ordered') {
          swal({
                          title: 'Votre achat est validé',
                          text: "Vous allez recevoir un lien pour télécharger le fichier.",
                          icon: 'success',
                          buttons: ["OK"],
                          timer: 3000,
                          // showCancelButton: true,
                          // confirmButtonColor: '#3085d6',
                          // cancelButtonColor: '#d33',
                          // confirmButtonText: 'Oui, je suis sûr'
                        })
                         setTimeout(() => {
                          localStorage.setItem('Cart', '[]')
                          window.location.href = "/account/orders"; 
                          // useNavigate('/account/orders')
                        }, 4000);
        } else {
          swal({
            title: 'Il y a un problème',
            text: "Veuillez réessayer plus tard",
            icon: 'error',
            buttons: ["OK"],
            timer: 3000,
          })
          setTimeout(() => {
            window.location.href = "/"; 
            
          }, 4000);
        }
      })
    })
}

const afficheCB = () => {
  document.getElementById('cb').style.display = "block"
  document.getElementById('checkout').style.display = "none"
  // console.log(window.scrollY);
  window.scrollTo({top: window.scrollY + 350, behavior: 'smooth'})
}

const validateCardNumber = number => {
  //Check if the number contains only numeric value  
  //and is of between 13 to 19 digits
  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(number)){
      return false;
  }

  return luhnCheck(number);
}

var luhnCheck = (function (arr) {
  return function (ccNum) {
      var 
          len = ccNum.length,
          bit = 1,
          sum = 0,
          val;

      while (len) {
          val = parseInt(ccNum.charAt(--len), 10);
          sum += (bit ^= 1) ? arr[val] : val;
      }

      return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));


const checkCbAndPay = (e) => {
  // console.log(e)
  setLoadingPay(true)
  // setLoading(true)
  const cardnum = document.getElementById('num_card').value
  const card_num = cardnum.replace(/ /g,'')
  const expmonth = document.getElementById('expirationmonth').value
  const expyear = document.getElementById('expirationyear').value
  const cvv = document.getElementById('cvv').value
  if ((cardnum !== "") && (card_num !== "") && (card_num.length === 16)  && (expyear !== "") && (expmonth !== "") && (cvv !== "") && (validateCardNumber(card_num))) {
  setTimeout(() => {
    // setLoading(false)
    setStatusPaiement(true)
  document.getElementById('button_pay_div').style.display = 'none'
  // swal({
  //   title: 'Achat validé !',
  //   text: "Votre achat est validé, vous allez être redirigé",
  //   icon: 'success',
  //   buttons: ["OK"],
  //   timer: 3000,
  //   // showCancelButton: true,
  //   // confirmButtonColor: '#3085d6',
  //   // cancelButtonColor: '#d33',
  //   // confirmButtonText: 'Oui, je suis sûr'
  // }).then((re) => collectCach())
  // document.getElementById('cb').style.display = 'none'
  collectCach();
  // console.log('TOUT EST OK')
  }, 2000);
} else {
  swal({
    title: 'Il y a un problème',
    text: "Veuillez vérifier vos informations",
    icon: 'error',
    buttons: ["OK"],
    timer: 3000,
    // showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    // confirmButtonText: 'Oui, je suis sûr'
  })
  setLoadingPay(false)
}
}

const checkCard = () => {
  var cardNum = document.getElementById('num_card');
cardNum.onkeyup = function (e) {
if (cardNum.value == cardNum.lastValue) return;
var caretPosition = cardNum.selectionStart;
var sanitizedValue = cardNum.value.replace(/[^0-9]/gi, '');
var parts = [];
for (var i = 0, len = sanitizedValue.length; i < len; i +=4) { parts.push(sanitizedValue.substring(i, i + 4)); } for (var i=caretPosition - 1; i>= 0; i--) {
var c = cardNum.value[i];
if (c < '0' || c> '9') {
caretPosition--;
}
}
caretPosition += Math.floor(caretPosition / 4);
cardNum.value = cardNum.lastValue = parts.join(' ');
cardNum.selectionStart = cardNum.selectionEnd = caretPosition;
}
}


const askPromoCode = () => {
  Swal.fire({
    title: 'Tapez votre code promo',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'on',
    placeholder: "Tapez votre code promo",
  },
  showCancelButton: true,
  confirmButtonText: 'Valider',
  showLoaderOnConfirm: true,
  preConfirm: (res) => {
    if (res === "") {
          swal({
            title: 'Code non valide',
            icon: 'error',
            text: "Le code entré n'est pas valide"
          })
        } else {
        fetch(`https://serveur.fansun.webmg.eu/promos/check/${res}`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin'),
            'x-api-key': 'couscousgarbit',
          }
        })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res)
          if (res.datas === "Code invalide") {
            swal({
                    title: 'Code non valide',
                    icon: 'error',
                    text: "Le code entré n'est pas valide"
                  })
          } else {
            swal({
                    title: 'Code validé',
                    icon: 'success',
                    text: "Votre remise va s'appliquer"
                  })
                  setCode(res.datas[0].promo + "%")
                  setDiscountPrice(total.toFixed(2) * (1 - (res.datas[0].promo / 100)))
            document.getElementById('cart-total').classList.add('strike')
          }
          
        })
  }
  }
})
}

useEffect(() => {
  setTimeout(() => {
    setNom(store.getState().User.user.nom)
  setPrenom(store.getState().User.user.prenom)
  }, 1000);
  
}, [])






  return (
    <>
    {loading && (<div className="loadercb"><RotatingLines
  strokeColor="#CEAB8D"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>)}
{/* <hr className="hrTop" /> */}
   <div className="cartcontain">
   {JSON.parse(localStorage.getItem('Cart')) && JSON.parse(localStorage.getItem('Cart')).length > 0 ? (
    <>
    <div className="cart_title">Mon panier <hr/></div>
    <div className="cart_title"><button className="checkout_empty" onClick={() => emptyCart()}>Vider le panier</button> <button className="checkout_code" onClick={() => askPromoCode()}>J'ai un code promo </button></div>
     {/* <div className="code_promo_title"> <button className="button_prestas_promo" onClick={() => askPromoCode()}>J'ai un code promo </button></div> */}
    
    <div className="shopping-cart">

                  <div className="column-labels">
                      <label className="product-image">Image</label>
                      <label className="product-details">Product</label>
                      {/* <label className="product-price">Prix</label> */}
                      {/* <label class="product-quantity">Quantité</label> */}
                      <label className="product-removal">Supprimer</label>
                      <label className="product-line-price">Prix</label>
                  </div>


                  {JSON.parse(localStorage.getItem('Cart')).map((item) => (
                      <div className="product" key={item.id}>
                          <div className="product-image">
                              <img src={item.img} />
                          </div><div className="product-details">
                              <div className="product-title">{item.name}</div>
                              <p className="product-description">{ReactHtmlParser(item.description)}</p>
                          </div>
                          {/* <div className="product-price">{item.price}</div> */}
                          {/* <div class="product-quantity">
                <input type="number" value="2" min="1" />
            </div> */}
            <div className="product-line-price"><span className="priceMob">Prix : </span>{item.price}</div>
                          <div className="product-removal">
                          {/* <AiFillDelete className='trash' title="Supprimer l'article"  onClick={() => deleteItem(item.id)} /> */}
                              <button className="remove-product" onClick={() => deleteItem(item.id)}>
                                  Supprimer
                              </button>
                          </div>
                      </div>
                  ))}




                  <div className="totals">
                      <div className="totals-item">
                          <label>Sous-Total HT</label>
                          {/* {discountPrice} */}
                          <div className="totals-value" id="cart-subtotal">{discountPrice !== 0 ? (discountPrice / 1.2).toFixed(2) : ((total / 1.2).toFixed(2))}</div>
                      </div>
                      <div className="totals-item">
                          <label>TVA (20%)</label>
                          <div className="totals-value" id="cart-tax">{discountPrice !== 0 ? (discountPrice - (discountPrice / 1.2)).toFixed(2) : (total - (total / 1.2)).toFixed(2)}</div>
                      </div>
                      {/* <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div> */}
                      <div className="totals-item totals-item-total">
                          <label>Total T.T.C</label>
                          <div className="totals-value" id="cart-total">{total.toFixed(2)}</div>
                          {discountPrice !== 0 && <>
                            <label>Total remisé</label><div className="totals-value" id="cart-total-discount">{discountPrice.toFixed(2)}</div>
                            <label>Remise appliquée : </label><div className="codepromo" id="cart-total-discount">{code}</div>
                          </>}
                          {/* <strike>Coucou monde</strike> */}
                      </div>
                  </div>
                  <hr />
                  {store.getState().User.logged ? (
 <><div className="check_out">
                {/* <button className="checkout" onClick={() => collectCach()}>Payer</button> */}
                <button className="checkout" id="checkout" onClick={() => afficheCB()}>Payer</button>

              </div>

              <div id="cb">
                <div className="card_title">Vos coordonnées de paiement<img className="logo_cb" src="https://www.reussir-mon-ecommerce.fr/wp-content/uploads/2016/03/vitrophanie-CB-1.jpg" alt="" /></div>
              <div className="card-body">
              {/* <p className="mb-4"></p> */}

              <div className="form-outline mb-2">
                {/* <input type="number" length="16" id="num_card" className="form-control"
                  placeholder="1234 5678 1234 5678"  /> */}
               <input id="num_card" type="tel" name="credit-number" className="form-control" onChange={() => checkCard()} inputMode="numeric" pattern="\d*" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />

               
              </div>
              <label className="form-label mb-1" htmlFor="num_card">Numéro de carte</label>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-outline">
                    <select id="expirationmonth" className="form-control">
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">04</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    {/* <input type="text" inputMode='numeric' id="expirationmonth" pattern="^(0[1-9]|1[0-2])(\/|-)([0-9]{4})$"  className="form-control"
                      placeholder="MM" onChange={() => checkDateMonth()} /> */}
                    {/* <input type="text" id="expirationyear" maxLength={2} className="form-control"
                      placeholder="YY" onChange={() => checkDateYear()} /> */}
                       <select id="expirationyear" className="form-control">
                      <option value="2023">23</option>
                      <option value="2024">24</option>
                      <option value="2025">25</option>
                      <option value="2026">26</option>
                      <option value="2027">27</option>
                      <option value="2028">28</option>
                      <option value="2029">29</option>
                      <option value="2030">30</option>
                      
                    </select>
                    
                  </div>
                  <label className="form-label" htmlFor="expiration">Expiration</label>
                </div>
                <div className="col-6">
                  <div className="form-outline">
                    <input type="password" id="cvv" className="form-control" maxLength={3} placeholder="Cvv" inputMode="numeric" pattern="[0-9\s]{3}" />
                    
                  </div>
                  <label className="form-label" htmlFor="cvv">Cvv</label>
                </div>
              </div>
             

            </div>
            <div className="button_pay_div" id="button_pay_div"><button className="btn btn-outline-dark button_pay" onClick={(e) => checkCbAndPay(e)}>{loadingPay ? <RotatingLines className="pay" width='30' height='30' color="black" /> : "Payer"}</button>
              
              </div>
            <div className="paiement_valid">{statusPaiement && "Votre paiement est validé !"}</div>
</div>
                </>

                  ) : (
                    <div className="check_out">
                    <Link to="/login"><button className="checkout_connect">Se connecter</button></Link>
                    </div>
                  )}
                   

              </div></>
) : (
    <div className="emptyCart">Votre panier est vide !</div>
)}

 
   </div>
   </>
 );
}
Cart.propTypes = {
    addToCart: PropTypes.func,
  };
  
  Cart.defaultProps = {
    addToCart: () => {},
  };
export default Cart;
