import React, { useState, useEffect, Suspense } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import './styles.scss';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { generateUniqueKey } from 'src/functions';
import { Link } from 'react-router-dom'
import moment from 'moment';
import store from 'src/store';
import LogoPub from '../../../public/img/logopub.png';
import LogoImg from '../../../public/img/images.jpg';
import LogoFormations from '../../../public/img/formations.png';
import LogoSolds from '../../../public/img/solds.jpg';
import LogoSoldsMonth from '../../../public/img/soldsMonths.jpg';
import LogoUsers from '../../../public/img/uses.png';

function Panel() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState(false);
    const [ventes, setVentes] = useState([]);
    const [total, setTotal] = useState(0);
    const [formations, setFormations] = useState(0);
    const [CAtotal, setCATotal] = useState(0);
    const [CAcurrentMonth, setCAcurrentMonth] = useState(0);
    const [currentMonth, setCurrentMonth] = useState('');
    const [CALastMonth, setCAlastMonth] = useState(0);
    const [lastMonth, setlastMonth] = useState('');
    const [lastUser, setLastUser] = useState('');
    const [months, setMonths] = useState([]);
    const [lastFormation, setLastFormation] = useState();
    const [pics, setPics] = useState([]);
    const [userAdmin, setUserAdmin] = useState([]);
    const [promos, setPromos] = useState([]);
    const [promoActive, setPromoActive] = useState([]);


    const getOffers = async () => {
      const tokenAdmin = localStorage.getItem('token_fansun_admin');
      if (tokenAdmin) {

      // fetch('https://serveur.fansun.webmg.eu/promos/all', {

      fetch(`https://serveur.fansun.webmg.eu/admin/getoffer`, {
      // fetch(`https://serveur.fansun.webmg.eu/user/getOrders/${id}`, {
  
      method: 'GET',
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
      },
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.datas) {
      setPromos(response.datas)
      setPromoActive(response.datas.filter((e) => e.active === "true"))
      }
      // promoencours.push(response.datas[0])
    })
      }
    }


    const fileList = () => {
      fetch('https://serveur.fansun.webmg.eu/admin/pics/list')
        .then((response) => response.json())
        .then((res) => {
          setPics(res.array);
          // setIsOpenImg(true)
          //  setLoading(false);
        });
    };



    moment.locale('fr')
    function Loading() {
        return <h2>🌀 Loading...</h2>;
      }
      const getUsers = () => {
        setLoading(true)
        const token = localStorage.getItem('token_fansun_admin')
        fetch('https://serveur.fansun.webmg.eu/admin/users', { method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': token,
          }, })
        .then((response) => response.json())
        .then((res) => {
            if (res.message !== 'Access denied') {
                let maxId = 0;
                let lastUser;
                res.users.forEach(el => {
                    if (el.id > maxId) {
                        maxId = el.id
                        lastUser = el
                    }
                })
                setLastUser(lastUser)
            setUsers(res.users.length)
            setLoading(false)
            } else {
                swal({
                    title: `Vous n'avez pas le droit !`,
                    // text: "Vous ne pouvez pas revenir en arrière",
                    icon: 'warning',
                    buttons: ["Ok", "Annuler"]
                  }).then((result) => {
                    if (result === null) {
                        window.location.replace('/')
                    }
                })
            }
        })
    }
      const getUsersAdmin = () => {
        setLoading(true)
        const token = localStorage.getItem('token_fansun_admin')
        fetch('https://serveur.fansun.webmg.eu/admin/usersadmin', { method: 'POST', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': token,
          }, })
        .then((response) => response.json())
        .then((res) => {
            if (res.message !== 'Access denied') {
            //     let maxId = 0;
            //     let lastUser;
            //     res.users.forEach(el => {
            //         if (el.id > maxId) {
            //             maxId = el.id
            //             lastUser = el
            //         }
            //     })
            //     // setLastUser(lastUser)
            setUserAdmin(res.users)
            setLoading(false)
            } else {
                swal({
                    title: `Vous n'avez pas le droit !`,
                    // text: "Vous ne pouvez pas revenir en arrière",
                    icon: 'warning',
                    buttons: ["Ok", "Cancel"]
                  }).then((result) => {
                    if (result === null) {
                        window.location.replace('/')
                    }
                })
            }
        })
    }
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
        // .then((response) => console.log(response.orders))
        .then((response) => { 
          // console.log(response.message === "Access denied")
          if (response.message === "Access denied") {
            swal({
                title: `Vous n'avez pas le droit !`,
                // text: "Vous ne pouvez pas revenir en arrière",
                icon: 'warning',
                buttons: ["Ok", "Annuler"]
              }).then((result) => {
                if (result === null) {
                    window.location.replace('/')
                }
            })
        } else {
          // console.log(response)
          // console.log(response.orders)
          
          // console.log('MOIS PASSE', response.orders.mois.filter((e) => e.mois === moment().subtract(1, 'months').format('YYYY-MM')))
          if (response.orders.mois.filter((e) => e.mois === moment().subtract(1, 'months').format('YYYY-MM')).length > 0) {
            setlastMonth(moment(response.orders.mois.filter((e) => e.mois === moment().subtract(1, 'months').format('YYYY-MM'))[0].mois).format('MMMM YYYY'))
            setCAlastMonth(response.orders.mois.filter((e) => e.mois === moment().subtract(1, 'months').format('YYYY-MM'))[0].total) 
          } else {
            setlastMonth(moment().subtract(1, 'months').format('YYYY-MM'))
          }
          // console.log('CURRENT', response.orders.mois.filter((e) => e.mois === moment().format('YYYY-MM')))
          if (response.orders.mois.filter((e) => e.mois === moment().format('YYYY-MM')).length > 0) {
            setlastMonth(moment().subtract(1, 'months').format('MMMM YYYY'))
            setCurrentMonth(moment().format('MMMM YYYY'))
            setCAcurrentMonth(response.orders.mois.filter((e) => e.mois === moment().format('YYYY-MM'))[0].total) 
          } else {
            setCurrentMonth(moment().format('MMMM YYYY'))
          }

          // console.log('TOTAL', response.orders.tri.map(item => item.total).reduce((prev, curr) => Number(prev) + Number(curr)))
        
        //   setCurrentMonth()
          // console.log(add(response.orders.mois.total))
          setCATotal(response.orders.tri.map(item => item.total).reduce((prev, curr) => Number(prev) + Number(curr)))
          setTotal(response.orders.mois.map(item => item.total).reduce((prev, curr) => Number(prev) + Number(curr)));
          setMonths(response.orders.mois)
            // setVentes(response.orders.array)
            setVentes(response.orders.tri.length)
            // setTotal(response.orders.total[0].total)
            // setTotal(response.total)[0]   
        }
      })
    }

    const getFormations = (starte, numbere) => {
        // fetch(`https://serveur.fansun.webmg.eu/admin/formations/all`, {
          const tokenAdmin = localStorage.getItem('token_fansun_admin');
          if (tokenAdmin) {
        fetch(`https://serveur.fansun.webmg.eu/admin/formations/total`, {
  
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': tokenAdmin,
          },
        }).then((response) => {
          response.json().then((formations) => {
            setFormations(formations.data.length)
            let maxId = 0;
                let lastFormation;
                formations.data.forEach(el => {
                    if (el.id > maxId) {
                        maxId = el.id
                        lastFormation = el
                    }
                })
                setLastFormation(lastFormation)
        //    setTotal(formations.data.length)
            setLoading(false);
          });
        });
      
  
  
      }
      }

    useEffect(() => {
      if (store.getState().User.user.admin === 'true') {
      getUsers();
      getAllOrders();
      getFormations();
      fileList();
      getUsersAdmin();
      getOffers();
      }
      if (store.getState().User.user.admin === 'false') { window.location.href="/" }
    }, [])

    function UsersList() {
        return (
            <Card style={{ width: '16rem' }}>
                          <div className="buttonCard"><div className="buttonCard_Button link_admin">Les Utilisateurs</div></div>

            <Card.Img variant="top" className="imgFormA" src={LogoUsers} />
            <Card.Body>
              {/* <Card.Title><span className="admin_text_title">Utilisateurs</span></Card.Title> */}
              {users} utilisateurs inscrits
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Utilisateurs Admin</span></Card.Title>
              {userAdmin.length}
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Dernier utilisateur inscrit</span></Card.Title>
              {lastUser.user} inscrit le {moment(lastUser.date).format('DD/MM/YYYY')}
            </Card.Body>

          </Card>
        );
    }
    function Solds() {
        return (
            <Card style={{ width: '16rem' }}>
                          <div className="buttonCard"><div className="buttonCard_Button link_admin">Les Ventes</div></div>

            <Card.Img variant="top" src={LogoSolds} />
            <Card.Body>
              <Card.Title><span className="admin_text_title">Ventes</span></Card.Title>
              {ventes} ventes depuis le lancement du site
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">CA TOTAL</span></Card.Title>
              {CAtotal} € de C.A depuis le lancement du site
            </Card.Body>
          </Card>
        );
    }
    

    function SoldsByMonth() {
      const evolution = (CALastMonth !== 0) ? (((CAcurrentMonth - CALastMonth) / CALastMonth) * 100).toFixed(2) : CAcurrentMonth;
        return (
            <Card style={{ width: '16rem' }}>
                            <div className="buttonCard"><div className="buttonCard_Button link_admin">Evolutions des ventes</div></div>

            <Card.Img variant="top" className="imgForm" src={LogoSoldsMonth} />
            <Card.Body>
              <Card.Title><span className="admin_text_title">{currentMonth.charAt(0).toUpperCase() + currentMonth.substring(1)} </span> </Card.Title>
              {CAcurrentMonth} €
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">{lastMonth.charAt(0).toUpperCase() + lastMonth.substring(1)}</span></Card.Title>
              {CALastMonth} €
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Evolution</span></Card.Title>
              <span className={Math.sign(evolution) === -1 ? "negative" : "positive"}>{evolution === 0 ? '' : Math.sign(evolution) === -1 ? <BsArrowDownRight className="arrowCA" size='10px' /> : <BsArrowUpRight className="arrowCA" />} {evolution} % </span>
              </Card.Body>
          </Card>
        );
    }
    function Formations() {
        return (
            <Card style={{ width: '16rem' }}>
                          <div className="buttonCard"><div className="buttonCard_Button link_admin">Les Formations</div></div>

            <Card.Img variant="top" className="imgForm" src={LogoFormations} />
            <Card.Body>
              {/* <Card.Title>                <span className="admin_text_title">Les Formations</span></Card.Title> */}
              {formations > 1 ? (
                <span>{formations} formations disponibles sur le site</span>
              ) : (
                <span>{formations} formation disponible sur le site</span>
              )} 
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Dernière formation ajoutée</span></Card.Title>
              {lastFormation && (<span>{lastFormation.name} ajoutée le {moment(lastFormation.date).format('DD/MM/YYYY')}</span>)}
              {/* {lastFormation.name} ajoutée le {moment(lastFormation.date).format('DD/MM/YYYY')} */}
              
            </Card.Body>
          </Card>
        );
    }
    function Pictures() {
        return (
            <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" className="imgForm_pics" src={LogoImg} />
            <Card.Body>
              <Card.Title><span className="admin_text_title">Les Images</span></Card.Title>
              {pics.length > 1 ? (
                <span>{pics.length} images uploadées sur le site</span>
              ) : (
                <span>{pics.length} image uploadée sur le site</span>
              )} 
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Les images</span></Card.Title>
              <div className="pics_container">
              {pics && (pics.map((e) => <div className="image_Slider" key={generateUniqueKey(e)}><img key={generateUniqueKey(e)} className="minipic_admin" src={e.link} /></div>))}
              </div>
              {/* {lastFormation.name} ajoutée le {moment(lastFormation.date).format('DD/MM/YYYY')} */}
            </Card.Body>
          </Card>
        );
    }
    function Offers() {
        return (
            <Card style={{ width: '16rem' }}>
                          <div className="buttonCard"><div className="buttonCard_Button link_admin">Les Pubs</div></div>

            {/* <Card.Img variant="top" className="imgForm_pics" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_Publicit%C3%A9.svg/2048px-Logo_Publicit%C3%A9.svg.png" /> */}
            <Card.Img variant="top" className="imgForm_pics" src={LogoPub} />
            <Card.Body>
              <Card.Title><span className="admin_text_title">Les Pubs Promos</span></Card.Title>
              {promos.length > 1 ? (
                <span>{promos.length} pubs sur le site</span>
              ) : (
                <span>{promos.length} pub sur le site</span>
              )} 
            </Card.Body>
            <Card.Body>
              <Card.Title><span className="admin_text_title">Pub active</span></Card.Title>
              <div className="pics_container">
              {promoActive && (promoActive.map((e) => <div  key={generateUniqueKey(e)}><div  key={generateUniqueKey(e)}>{e.nom}</div> <p  key={generateUniqueKey(e)}> jusqu'au : {moment(e.dateend).format("DD/MM/YYYY")}</p></div>))}
              </div>
              {/* {lastFormation.name} ajoutée le {moment(lastFormation.date).format('DD/MM/YYYY')} */}
            </Card.Body>
          </Card>
        );
    }

    
  return (
    <>
    {(store.getState().User.user.admin === 'false') ? <Navigate to='/' /> : (
      // loading ? <Loading /> : (
//  <Suspense fallback={<Loading />}>
 <div className="containerr">
 <div className="panel">
 {/* {loading && <Loading />} */}
 <div className="panel_title">Tableau de bord de Fansun.fr</div>
 <div className="panel_container">
   
 <Solds />
 <SoldsByMonth />
 <UsersList />
 <Formations />
 <Pictures />
 <Offers />
 </div>
     
 </div>
</div>

// </Suspense>
      // )
    )}

   
</>
 );
}

export default Panel;
