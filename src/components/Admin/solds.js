import React, { useEffect, useState } from 'react';
import './styles.scss';
import moment from 'moment';
import { Navigate, Redirect } from 'react-router-dom';
import store from 'src/store';
import swal from 'sweetalert';
import { generateUniqueKey } from 'src/functions';


function Solds() {
    const [ventes, setVentes] = useState([]);
    const [total, setTotal] = useState(0);
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);

    const add = arr => arr.reduce((a, b) => a + b, 0);

    const getAllOrders = () => {
        const token_admin = localStorage.getItem('token_fansun_admin')
        fetch(`https://serveur.fansun.webmg.eu/admin/orders`, {
        // fetch(`https://serveur.fansun.webmg.eu/formations/all`, {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': token_admin,
        },
      }).then((res) => res.json())
        .then((response) => { 
          if (response.message === "Access denied") {
            swal({
                title: `Vous n'avez pas le droit !`,
                icon: 'warning',
                buttons: ["Ok", "Annuler"]
              }).then((result) => {
                if (result === null) {
                    window.location.replace('/')
                }
            })
        } else {
        //  console.log(response)
         setYears(response.orders.annee)
          setTotal(response.orders.mois.map(item => item.total).reduce((prev, curr) => Number(prev) + Number(curr)));
          setMonths(response.orders.mois)
            setVentes(response.orders.tri)
        }
      })
    }

    useEffect(() => {
      getAllOrders()
      moment.locale('fr');
    }, [])
    useEffect(() => {
      
    }, [ventes])   


    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
           const key = keyGetter(item);
           const collection = map.get(key);
           if (!collection) {
               map.set(key, [item]);
           } else {
               collection.push(item);
           }
      });
      console.log(map)
      return map;
  }

  return (
   <><div className="sold_container">
      <div className="etablissement_title">Les ventes par an et par mois </div>
      {/* <div className="list_orders">{months.length > 0 && (months.map((e) => <div key={generateUniqueKey(e)} className="bymonth">
     
          <span className="months">{moment(e.year).format('YYYY').charAt(0).toUpperCase() + moment(e.year).format('YYYY').slice(1)} - <span className="totalByMonths">{e.total} €</span></span>

          </div>))}
      
      </div> */}
      {/* <div>{months.groupBy(months, ({ year }) => (year))}</div>
      <div>{months.map((e) => e.year)}</div>
      <div>{months.filter((e) => e.year === "2022").map((t) => <><div>{t.year}</div><div>{moment(t.mois).format('MMMM YYYY')}</div></>)}</div> */}
      {/* <div>{groupBy(months, month => month.map((r) => r.value.map((t) => t.year)))}</div> */}
      <div className="container_an">
      {years.map((e) => (
        <details className="detail_title" key={generateUniqueKey(e)}>
        <summary>
        <span className="months">{e.year} - <span className="totalByMonths">{e.total} €</span></span>
        </summary>
        {months.length > 0 && (months.filter((z) => e.year === z.year).map((e) => <div key={generateUniqueKey(e)} className="bymonth">
        <details className='detailan' key={generateUniqueKey(e)}>
        <summary>
          <span className="months">{moment(e.mois).format('MMMM YYYY').charAt(0).toUpperCase() + moment(e.mois).format('MMMM YYYY').slice(1)} - <span className="totalByMonths">{e.total} €</span></span>
          </summary>
          <div className="achatsadmin_container">
          {ventes.filter((f) => e.mois === moment(f.date_order).format('YYYY-MM')).map((order) => (
              <div className="achat_user" key={generateUniqueKey(e)}>{moment(order.date_order).locale("fr").format('DD-MM-YYYY')} - {order.nom} {order.prenom} - {order.total} €</div>))
          }
          </div>
          </details>
          </div>))}
        </details>
      ))}
      </div>
      {/* <div className="list_orders">{months.length > 0 && (months.map((e) => <div key={generateUniqueKey(e)} className="bymonth">
        <details>
        <summary>
          <span className="months">{moment(e.mois).format('MMMM YYYY').charAt(0).toUpperCase() + moment(e.mois).format('MMMM YYYY').slice(1)} - <span className="totalByMonths">{e.total} €</span></span>
          </summary>
          <div className="achatsadmin_container">
          {ventes.filter((f) => e.mois === moment(f.date_order).format('YYYY-MM')).map((order) => (
              <div className="achat_user" key={generateUniqueKey(e)}>{moment(order.date_order).locale("fr").format('DD-MM-YYYY')} - {order.user} - {order.nom} {order.prenom} - {order.total} €</div>))
          }
          </div>
          </details>
          </div>))}
      
      </div> */}
      
      <div className="total_ca">Total CA : {total !== '' ? total : 0} €</div>
    {(store.getState().User.user.admin === 'false') && <Navigate to='/' />}

    </div>
    </>
    
 );
}

export default Solds;
