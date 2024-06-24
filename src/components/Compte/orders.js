import React, { useEffect, useState, Suspense } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import moment from 'moment';
import { generateUniqueKey } from 'src/functions';
import './styles.scss';
import {LiaFileInvoiceDollarSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';
import store from 'src/store'

function Orders({ infos }) {
    const [listOrders, setListOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [errorMsg, setErrorMsg] = useState("")
    const [orderWithFormations, setOrderWithFormations] = useState([]);
    const [formationsWithOrder, setFormationsWithOrder] = useState([]);


    // const getOrderDetail = (id) => {
    //   // setLoading(true)

    //     fetch(`https://serveur.fansun.webmg.eu/user/getOrderDetails/${id}`, {

    //     method: 'GET',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       'x-api-key': 'couscousgarbit',
    //     },
    //   }).then((response) => {
    //     // console.log(response)
    //     response.json().then((order) => {
    //       console.log(order)
    //       // setLoading(false)

    //       // console.log('order details', order, 'idachat')
    //       console.log('order details', order.order.formations)
    //       console.log('id order', order.order.formations[0])
    //       console.log('Liste formations', order.order.formations[1])
    //       console.log('DATAS', {id: order.order.formations[0], contenu:  order.order.formations[1]})
    //       // setClassementComplet(classementComplet => [...classementComplet, {idEquipe: id, classement: res.phases[0].classements}])
    //       order.order.formations[1].map((e) => e.id_order = order.order.formations[0])
    //       // setFormationS(formationS => [...formationS, o.order.formations[1]])
    //       setTest(test => [...test, {id: order.order.formations[0]}])
    //       setContenu(contenu => ([...contenu, {content:  order.order.formations[1]}]))
    //       setOrderDetails(order.order.items)
    //       // document.getElementById(id).style.display = "flex"
    //       // console.log(document.getElementById(`orderDetails${id}`))
    //       // console.log(document.getElementById(`orderDetails`))
    //       // console.log(document.getElementsByClassName('details_container'))
    //       let ok = document.getElementsByClassName('details_container')
    //       // for (var i = 0; i < ok.length; i++) {
    //       //   ok[i].style.display = 'none';
    //       // }
    //       // if ( document.getElementById(`orderDetails${id}`).style.display === "flex") {
    //       //   document.getElementById(`orderDetails${id}`).style.display = 'none';
    //       // }
    //       // if ( document.getElementById(id).style.display === "flex") {
    //         // document.getElementById(id).style.display = 'flex';
    //       // }
    //       // setListOrders(orders)
    //     //   setProd(orders.order.articles)
    //       // setLoading(false);
    //     });
    //   });
    // }

    const getOrderDetail = (order_id) => {
      // fetch(`https://serveur.fansun.webmg.eu/user/getOrderDetails/${order_id}`, {
      fetch(`https://serveur.fansun.webmg.eu/user/getOrderDetails/${order_id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
          },
        }).then((response) => {
          response.json().then((order) => {
            // console.log(order)
            setOrderWithFormations((orderWithFormations) => [...orderWithFormations,{ id: order.order.formations[0], formations: order.order.formations[1], date: order.order.formations[2], total: order.order.formations[3], totalDiscountLess: order.order.formations[4], remise: order.order.formations[5] }])
            order.order.formations[1].map((e) => setFormationsWithOrder((formationsWithOrder) => [...formationsWithOrder, { id: order.order.formations[0], formations: e}]))
          })
        })
    }

    useEffect(() => {
    }, [orderWithFormations])
    
 useEffect(() => {
 }, [formationsWithOrder])
 
    

    const getOrders = (id) => {
      const array = []
        fetch(`https://serveur.fansun.webmg.eu/user/getOrders/${id}`, {
        // fetch(`https://serveur.fansun.webmg.eu/user/getOrders/${id}`, {

        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
        },
      }).then((response) => {
        // console.log(response.ok)
        if (response.ok) {
        response.json().then((orders) => {
          // console.log(orders)
          orders.order.orders.map((e) => getOrderDetail(e))
          setListOrders(orders)
          setLoading(false)
        });
      } else {
        response.json().then((error) => {
          // console.log(error.error)
        setLoading(false)
        setErrorMsg(error.error)
        })
      }
      })
    }
    
 
    useEffect(() => {
        setTimeout(() => {
          if (store.getState().User.user) {
            getOrders(store.getState().User.user.id)
          }
        }, 1500);
        setLoading(true)
    }, [])

    
    useEffect(() => {
    //  listOrders && listOrders.length > 0 && listOrders.map((e) => console.log(e))
    }, [listOrders])

    useEffect(() => {
    }, [orderDetails])
    useEffect(() => {
      // console.log('error', errorMsg)
    }, [errorMsg])


  return (
    <>
    <div className='HighContainer'>
    {errorMsg && <div>{errorMsg.messageDetail}</div>}
   {loading  ? (<div className="loader"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>) : (!loading &&
    <><div className="compte_title_infos">Mes achats</div><div className="achats_container">
      {orderWithFormations && orderWithFormations.length > 0 && (orderWithFormations.length > 0 && orderWithFormations.map((e) => (
        // console.log(e) ||
        <div key={generateUniqueKey(e)}><details className="detailsBought">
          <summary>
            <span className="dateCom">Achat du {moment(e.date).format("DD/MM/YYYY")} | <Link to={`/account/facture/${e.id}`} target="_blank" ><LiaFileInvoiceDollarSolid /></Link></span>
            </summary>
          <table className="order_pres">
  <tbody >
          {e.formations.map((f) => (
            <tr key={generateUniqueKey(e)}>
            <td className="mb t0"><img src={f.img} className="minipic" /></td>
            <td className="mb t1">{f.name}</td>
            <td className="mb">{f.price} €</td>
          </tr>
          ))}
          </tbody>
          </table>
          <hr />
          {/* {e.totalDiscountLess} */}
          {/* <div className="total_container"><div className="total_order"> Total sans remise : {e.totalDiscountLess} €</div></div> */}
          {/* <div className="total_container"><div className="total_order"> Total sans remise : {e.total} €</div></div> */}
          {(e.totalDiscountLess !== 0 || e.totalDiscountLess !== "0") && e.totalDiscountLess !== e.total && (<div className="total_container"><div className="total_order"> Total sans remise : {e.totalDiscountLess} €</div></div>)}

<div className="total_container"><div className="total_order"> Payé : {e.total} €</div>
</div>
{e.remise !== 0 && <div className="total_container"><div className="remise"> Remise : {e.remise} %</div></div>}
<div><Link to={`/account/facture/${e.id}`} target="_blank" className="button_prestas" >Voir la facture</Link></div>
        </details>
        </div>
      )) ) }   
          {!loading && orderWithFormations && orderWithFormations.length === 0 && 'Aucun achat effectué'}
      </div>
     </>
)}

</div>
    </>
    
 );
}

export default Orders;
