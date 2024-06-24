import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { generateUniqueKey } from 'src/functions';
import { BsEnvelopeAtFill } from 'react-icons/bs';
import { FaBirthdayCake } from 'react-icons/fa';
import { AiFillPhone } from 'react-icons/ai';
import { TiUserDelete } from 'react-icons/ti';
import { GrUserAdmin } from 'react-icons/gr';
import { MdAppRegistration } from 'react-icons/md';
import moment from 'moment';
import store from 'src/store';
import './styles.scss';
import swal from 'sweetalert';

function Users() {
    const [users, setUsers] = useState([]);
    const [soldByUsers, setSoldByUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token_fansun_admin');
    const getUsers = () => {
        setLoading(true)
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
            setUsers(res.users)
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

    const soldsByUser = (user) => {
        const token_admin = localStorage.getItem('token_fansun_admin')
        fetch(`https://serveur.fansun.webmg.eu/admin/orders/${user}`, {
        // fetch(`https://serveur.fansun.webmg.eu/formations/all`, {
  
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': token_admin,
        },
      })
    //   .then((res) => console.log(res))
      .then((response) => response.json())
        // .then((response) => console.log(response.orders))
        .then((response) => { 
          setSoldByUsers((soldByUsers) => [...soldByUsers, response.orders])
      });
    }

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
    }, [soldByUsers])
    useEffect(() => {
        // users.map((o) => soldsByUser(o))
        users.map((o) => soldsByUser(o.id))

    }, [users])
    
    

const deleterUser = (id, nom, prenom) => {
      swal({
        title: `Êtes-vous sur de vouloir supprimer l'utilisateur ${nom} ${prenom} ?`,
        text: "Vous ne pouvez pas revenir en arrière",
        icon: 'warning',
        buttons: ["Annuler", "Oui je suis sûr"]
      }).then((result) => {
        if (result) {
            fetch(`https://serveur.fansun.webmg.eu/admin/users/delete/${id}`, { 
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': 'couscousgarbit',
                'x-access-token': localStorage.getItem('token_fansun_admin'),
              },
             })
            .then((response) => response.json())
            .then((res) => {
              setSoldByUsers([]);
                if (res.msg === 'Delete OK') {
                    swal({
                        title: 'Utilisateur supprimé',
                        icon: 'success',
                      })
                      getUsers();
                } else {
                    swal({
                        title: 'Utilisateur non supprimé',
                        icon: 'error',
                      })
                }
            })
          
        }
      })
}

const giveAdminAccess = (id, adminStat) => {
  console.log(id)
  const token_admin = localStorage.getItem('token_fansun_admin')

  fetch(`https://serveur.fansun.webmg.eu/admin/users/setadmin/${id}/${adminStat}`, { method: 'POST', headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'couscousgarbit',
    'x-access-token': token_admin,
  }, })
            .then((response) => response.json())
            .then((res) => {
              console.log(res)
              if (res.admin === "true") {
                setSoldByUsers([]);
                getUsers()
              }
            })
            
}

const sendMail = async (mail) => {
  const token_admin = localStorage.getItem('token_fansun_admin')
  fetch(`https://serveur.fansun.webmg.eu/admin/sendmail/${mail}`, {
  // fetch(`https://serveur.fansun.webmg.eu/admin/sendmail/${mail}`, {
    method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': token_admin,
        },
  }).then((res) => res.json())
  .then((response) => console.log(response))
}



  return (
    <>
    {loading ? (<div className="loader"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>) : (
//    <div className="container">{formationsAll.length > 0 && formationsAll.map((e) => e.name)}</div>

          <>
            <div className="etablissement_title">Les Utilisateurs </div><div className="users_container">
              {/* {users.length > 0 && users.map((e) => ( */}
              {users.length > 0 && users.map((e) => (
                <div className="card" key={generateUniqueKey(e)}>
                  <img className="img-avatar" key={generateUniqueKey(e)} src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png" />
                  <div className="card-text">
                    <div className="portada">

                    </div>
                    <div className="title-total">
                      <div className="title">{e.admin === 'true' ? 'Admin' : 'Client'}</div>
                      {e.id !== store.getState().User.user.id && (
                      <div className="title_del" onClick={() => deleterUser(e.id, e.nom, e.prenom)}>Supprimer</div>
                      )}
                      <h5>{e.prenom} {e.nom}</h5>
                      <div className="desc">{e.addresse}</div>
                      <div className="desc">{e.cp} {e.ville}</div>
                      {/* <div className="desc" onClick={() => sendMail(e.email)}> <BsEnvelopeAtFill className="icons" />{e.email}</div> */}
                      <div className="desc" onClick={() => sendMail(e.email)}> <BsEnvelopeAtFill className="icons" /><span className="emailadmin">{e.email}</span></div>
                      <div className="desc"><FaBirthdayCake className="icons" />{moment(e.birthday).format('DD/MM/YYYY')}</div>
                      <div className="desc"><AiFillPhone className="icons" />{e.phone}</div>
                      <div className="desc"><MdAppRegistration className="icons" />{moment(e.date).format('DD/MM/YYYY')}</div>
                      <div className="desc">Nombre d'achats : {soldByUsers.filter((f) => f.iduser === e.id).map((g) => <span key={generateUniqueKey(g)}>{g.nbAchats}</span>)}</div>
                      <div className="desc_eur">Montant dépensé : {soldByUsers.filter((f) => f.iduser === e.id).map((g) => <span key={generateUniqueKey(g)}>{g.total > 0 ? (g.total) : (0)} €</span>)}</div>
                      {/* <div className="desc"><GrUserAdmin className="icons" />{e.admin === 'true' ? 'Oui' : 'Non'}</div> */}
                      <div className="actions">
                      <div className="desc">
                        {e.id !== store.getState().User.user.id ? (
                          
                            e.admin === 'false' ? (
                              <GrUserAdmin title="Donner l'accès Admin" onClick={() => giveAdminAccess(e.id, 'true')} />
                            ) : (
                            <TiUserDelete title="Enlever l'accès Admin" onClick={() => giveAdminAccess(e.id, 'false')} />
                              
                            )
                           
                        ) : ('Profil actif')}
                         </div>
                    
                        

                        {/* <button><i class="fas fa-user-friends"></i></button> */}
                      </div></div>

                  </div>



                </div>
                //     <div className="child" key={generateUniqueKey(e)}>
                //     <div className="formation_title" id={`title${e.id}`}>{e.user}</div>
                //     <div className="formations_img">
                //         {/* <img className="formation_title_image" id={`image${e.id}`} src={e.img} onClick={(f) => changeImage(e.id)} /></div> */}
                //         <img className="formation_title_image" id={`image${e.id}`} src={e.img} /></div>
                //     <div className="url"><input type="text" id={`input_image${e.id}`} className="input_img" defaultValue={e.img} onChange={(g) => changeImage(g, e.id)} /></div>
                //     <div className="formation_content_admin" id={e.id}>{e.description}</div>
                //     <div className="formation_download">
                //     <div className="pricead" id={`price${e.id}`}>{e.price}</div>
                //     <button className="button_prestas_dwl" id={`button${e.id}`} onClick={() => ModifyFormation(e.id)}>Modifier</button>
                //         {/* {connected ? (
                //         <button className="button_prestas_dwl"><BsFillDeviceHddFill className="mr" />Acheter</button>
                //         ) : (
                //             <button className="button_prestas_dwl"><BsFillDeviceHddFill className="mr" />Se connecter pour acheter</button>
                //         )} */}
                //     </div>
                // </div>
              ))}


            </div></>
           )}
   </>
 );
}

export default Users;
