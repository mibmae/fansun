import React, { useEffect, useState } from 'react';
import './styles.scss';
import { BiCartAdd } from 'react-icons/bi';
import { ImCheckboxChecked } from 'react-icons/im';
import ReactHtmlParser from 'react-html-parser';

import PropTypes from 'prop-types';
import { generateUniqueKey } from 'src/functions';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import store from 'src/store'

function Formations({ addToCart }) {
    const [formationsAll, setFormationsAll] = useState([]);
    const [allFormations, setAllFormations] = useState([]);
    const [start, setStart] = useState(0);
    const [number, setNumber] = useState(3);
    const [total, setTotal] = useState(0);
    const [bought, setBought] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingFormation, setLoadingFormation] = useState(false);
    const [checked, setChecked] = useState(false);

    const options = { method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': 'couscousgarbit',
    }
  }

    const getOrders = (id) => {
      const array = []
        fetch(`https://serveur.fansun.webmg.eu/user/getbought/${id}`, {
        ...options
      }).then((response) => {
        response.json().then((orders) => {
          setBought(orders.isBought)
        });
      });
    }
    const getFormations = (starte, numbere) => {
      fetch(`https://serveur.fansun.webmg.eu/formations/findFormationsByStep/${starte}/${numbere}`, {
        method: 'GET',
        ...options
      }).then((response) => {
        response.json().then(async (formations) => {
          let NoLinks = []
          //Attend que le map soit fini avant de passer a autre chose cool :-)
          await Promise.all(formations.data.map((e) => {
            // console.log(e)
            if (e.link === "") {
              NoLinks.push(e.name)
            }
          }))

         setTotal(formations.dataALL.length)
         setAllFormations(formations.dataALL)
         
         setFormationsAll(formations.data.filter((e) => e.link !== "" && e.deleted === 'false'))
         const checked = document.getElementById('bought').checked;
      if (checked) {
        setChecked(true)
       const formationsSansachat =  formations.dataALL.filter((e) => !bought.includes(e.id.toString()) && e.deleted === 'false')
       setFormationsAll(formationsSansachat)
      } else {
        setChecked(false)

      }
          if (store.getState().Cart.cart.length > 0) {
            store.getState().Cart.cart.map((d) => isInCart(d.id))
        }
        });
      });    
    }
    
    useEffect(() => {
      getFormations(start, number)
      setTimeout(() => {
        const userId = store.getState().User.user.id;
        if (userId !== null || userId !== undefined) {
          getOrders(userId)
        }
      }, 400);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, [])

    function loadMore(start, number) {
      setFormationsAll([])
      setStart(start);
      setNumber(number)
      getFormations(start, number)
    }  

    useEffect(() => {
      
    }, [bought])
    
    useEffect(() => {
    }, [start])

    useEffect(() => {
    }, [formationsAll])
    
     
    const isInCart = (id) => {
        setTimeout(() => {
        if (store.getState().Cart.cart.filter((item) => item.id === id)) {
          if ( document.getElementById(id)) {
            document.getElementById(id).innerHTML = '<svg stroke="currentColor" class="incart" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>'
            document.getElementById(id).setAttribute("disabled","disabled");
          }
        }
        }, 800);
        
    }
    useEffect(() => {
        if (store.getState().Cart.cart.length > 0) {
            store.getState().Cart.cart.map((d) => isInCart(d.id))
        }
    }, [])
    const addToCartComp = (id, name, img, link, description, price) => {
        addToCart([
            {
                id,
                name,
                img,
                link,
                description,
                price,
            }
        ])
        isInCart(id);
    }

    const hidebought = async (e) => {
      getFormations(start, number)
  }
    
  return (
    <>
    {loadingFormation && <div className="loaderformation"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>}
    {loading ? (<div className="loader"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>) : (
   <div className="formations">
        <div className="formations_title">Nos Formations</div>
        <div className="bought">
         {store.getState().User.logged && (
        <><input id="bought" type="checkbox" onClick={(e) => hidebought(e)} /><label htmlFor="bought">Cacher les formations achetées </label></>
        )}
        </div>
        <div className="formations_container">
            {formationsAll && formationsAll.length > 0 ? (formationsAll.map((e) => (
                <div className="child" key={generateUniqueKey(e)}>
                <div className="formation_title"><div className="form_unit_title">{e.name}</div></div>
                <div className="formations_img"><img className="formation_title_image_admin" src={e.img} /></div>
                <div className="formation_content">{ReactHtmlParser(e.description)}</div>
                
                <div className="formation_download">
                <span className="price">{e.price}</span>
                {
            bought.length > 0 && bought.includes(e.id.toString()) ? (
  <span className="dHT" id={e.id}><ImCheckboxChecked /></span> 
) : (
  <button className="button_prestas_dwl" id={e.id} onClick={() => addToCartComp(e.id, e.name, e.img, e.link, e.description, e.price)}><BiCartAdd className="mr"  />Ajouter au panier</button>
) 
                }
                </div>               
            </div>
            ))) : (<div className="empty_formations">Aucune formation n'est disponible actuellement.</div>)}
        </div>
        {!checked && ((start + number) < total && (
           <div className="loadMore_container"><button className="loadMore_button" onClick={() => loadMore(0, (start + number + 3))}>Voir plus</button></div>
           ))}
    </div>
    )}
    </>
  );
}

Formations.propTypes = {
    addToCart: PropTypes.func,
  };
  
  Formations.defaultProps = {
    addToCart: () => {},
  };

export default Formations;
