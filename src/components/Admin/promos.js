import React, { useState, useEffect } from 'react';
import { generateUniqueKey } from 'src/functions';
import { Modal, Button } from "react-bootstrap";
import { RiEdit2Line } from 'react-icons/ri'
import { AiFillDelete } from 'react-icons/ai'
import { TbSquareRoundedFilled } from 'react-icons/tb'
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import moment from 'moment';

import './styles.scss';

function Promos() {
    const [isOpenAddCode, setisOpenAddCode] = useState(false)
    const [promosCode, setPromosCode] = useState([])
    // const [promosCode, setPromosCode] = useState([
    //     {
    //         id: 1,
    //         code: "START10",
    //         promo: 0.9
    //     },
    //     {
    //         id: 2,
    //         code: "START20",
    //         promo: 0.8
    //     }
    // ])
    
    const getPromoCodes = async () => {
      const tokenAdmin = localStorage.getItem('token_fansun_admin');
      if (tokenAdmin) {

      // fetch('https://serveur.fansun.webmg.eu/promos/all', {

      fetch('https://serveur.fansun.webmg.eu/promos/all', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setPromosCode(res.datas)
          // setPics(res.array);
          // setIsOpenImg(true)
          //  setLoading(false);
        });
      }
    }

    const modify_code = async (e) => {
      // console.log(e)
      const { value: formValues } = await Swal.fire({
        title: `Modifier le code ${e.code}`,
        html:
        `<label for="code">Code :</label>` +
          `<input id="code" class="swal2-input" placeholder="Indiquer le code" value=${e.code}>` +
          `<label for="remise">Remise % :</label>` +
          `<input id="remise" type="number" class="swal2-input" placeholder="Indiquer la remise" value=${e.promo}>` + 
          `<label for="datedebut">Date de début :</label>` +
          `<input id="datedebut" type="date" class="swal2-input" placeholder="Indiquer la date de début" value=${e.date} >` +
          `<label for="datefin">Date de fin :</label>` +
          `<input id="datefin" type="date" class="swal2-input" placeholder="Indiquer la date de fin" value=${e.datefin} >`,
        focusConfirm: false,
        // showDenyButton: true,
  showCancelButton: true,
  cancelButtonText: "Annuler",
  // confirmButtonText: 'Save',
  // denyButtonText: `Don't save`,
        didOpen: () => {
          // console.log(moment(e.datefin).format('DD/MM/YYYY'))
          document.getElementById("datefin").value = moment(e.datefin).format('YYYY-MM-DD')
          document.getElementById("datedebut").value = moment(e.date).format('YYYY-MM-DD')
        },
        preConfirm: () => {
          return {
            startDate: document.getElementById('datedebut').value,
            endDate: document.getElementById('datefin').value,
            code: document.getElementById('code').value,
            remise: document.getElementById('remise').value
          }
        }
      })
      const tokenAdmin = localStorage.getItem('token_fansun_admin');
      if (tokenAdmin) {
      if (formValues) {
        fetch(`https://serveur.fansun.webmg.eu/promos/modify/${e.id}`, {
              method: "POST",
              body: JSON.stringify(formValues),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
        },
      })
        .then((response) => response.json())
        // .then((response) => console.log(response))
        // .then((res) => setPromosCode(res.datas))
        .then((res) => getPromoCodes())
      }
    }
    }


    const addPromoCode = async () => {

        const { value: formValues } = await Swal.fire({
            title: 'Ajouter un code promo',
            html:
            '<label for="code">Code promo</label>' +
              '<input id="code" class="swal2-input" placeholder="Indiquer le code">' +
              '<label for="remise">% de la remise</label>' +
              '<input id="remise" type="number" class="swal2-input" placeholder="Indiquer la remise">' + 
              '<label for="datedebut">Date de début</label>' +
              '<input id="datedebut" type="date" class="swal2-input" placeholder="Indiquer la date de debut">' +
              '<label for="datefin">Date de fin</label>' +
              '<input id="datefin" type="date" class="swal2-input" placeholder="Indiquer la date de fin">',
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: "Annuler",
            preConfirm: () => {
              return {
                startDate: document.getElementById('datedebut').value,
                endDate: document.getElementById('datefin').value,
                code: document.getElementById('code').value,
                remise: document.getElementById('remise').value
              }
            }
          })
        
          if (formValues) {
            // if (moment(formValues.endDate).format('DD-MM-YYYY') > moment().format('DD-MM-YYYY')) {
            //   console.log('C okkkk')
            
            if (formValues.endDate !== '' && formValues.code !== '' && formValues.remise !== '') {
            const tokenAdmin = localStorage.getItem('token_fansun_admin');
      if (tokenAdmin) {
            // console.log(formValues)
            // fetch('https://serveur.fansun.webmg.eu/promos/add', {
            fetch('https://serveur.fansun.webmg.eu/promos/add', {
              method: "POST",
              body: JSON.stringify(formValues),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res)
          if (res.datas !== 'exist') {
          // setPromosCode(res.datas)
          getPromoCodes()
          } else {
            Swal.fire({
              title: 'Erreur',
              text: "Le code que vous voulez ajouter existe déjà",
              icon: 'error'
              // timer: 2000
            })
          }
        })
      }
            // console.log(parseInt(formValues[1]))
            // console.log(Number((1 - ((formValues[1]) / 100)).toFixed(1)))
            // promosCode.push({
            //     id: 3,
            //     code: formValues[0],
            //     promo: Number((1 - ((formValues[1]) / 100)).toFixed(1))
            // })
            // setPromosCode(promosCode)
            // setPromosCode((promosCode) => ({
            //     id: 3,
            //     code: formValues[0],
            //     promo: Number((1 - ((formValues[1]) / 100)).toFixed(1))
            // }))
            // console.log('promocodes', promosCode)
            // Swal.fire(JSON.stringify(formValues))
          } else {
            Swal.fire({
              title: 'Erreur de saisie',
              text: "Vous n'avez pas rempli tous les champs ! Veuillez recommencer",
              timer: 2000,
              icon: 'error'
            }).then((e) => addPromoCode())
            // addPromoCode()
          }
        // } 
      // else { 
      //   Swal.fire({
      //     title: 'Erreur de saisie',
      //     text: "La date ne peut pas être déjà passée",
      //     timer: 2000,
      //     icon: 'error'
      //   }).then((e) => addPromoCode())
      //   // addPromoCode()
      // }
      }

    }

    const deletePromoCodeOut = () => {
      const tokenAdmin = localStorage.getItem('token_fansun_admin');
if (tokenAdmin) {
  swal({
    title: `Êtes-vous sur de vouloir supprimer les codes passés ?`,
    // text: "Une fois le code supprimé, il est perdu",
    icon: 'warning',
    buttons: ["Annuler", "Oui je suis sûr"]
  }).then((result) => {
    if (result) {
      fetch(`https://serveur.fansun.webmg.eu/promos/removeout/`, {
        method: "POST",
        // body: JSON.stringify(formValues),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'couscousgarbit',
    'x-access-token': tokenAdmin,
  },
})
  .then((response) => response.json())
  // .then((res) => console.log(res))
  .then((res) => setPromosCode(res.datas))
  // .then((res) => getPromoCodes())
}
  })
    }
    }

    const remove_code = (id) => {
      const tokenAdmin = localStorage.getItem('token_fansun_admin');
if (tokenAdmin) {
  swal({
    title: `Êtes-vous sur de vouloir supprimer le code promo ?`,
    text: "Une fois le code supprimé, il est perdu",
    icon: 'warning',
    buttons: ["Annuler", "Oui je suis sûr"]
  }).then((result) => {
    if (result) {
      fetch(`https://serveur.fansun.webmg.eu/promos/remove/${id}`, {
        method: "POST",
        // body: JSON.stringify(formValues),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': 'couscousgarbit',
    'x-access-token': tokenAdmin,
  },
})
  .then((response) => response.json())
  // .then((res) => setPromosCode(res.datas))
  .then((res) => getPromoCodes())
}
  })
    }
  }

    useEffect(() => {
     
    }, [promosCode])
    useEffect(() => {
      getPromoCodes()
    }, [])

   
    
    

  return (
   <div className="promos">
    <div className="etablissement_title">Liste des codes promos ({promosCode.length})</div>
    <div className="formation_menu">
      <button className='button_prestasml_admin' onClick={() => addPromoCode()}>Ajouter un code promo</button>
      <button className='button_prestasml_admin' onClick={() => deletePromoCodeOut()}>Supprimer les codes passés</button>
    </div>
            <div className="code_container">
            {/* {Math.round((1 - e.promo) * 100)} */}
            <div className="code_list">

            {/* <style type="text/css">
.tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
.tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
.tftable tr {background-color:#d4e3e5;}
.tftable td {font-size:12px;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;}
.tftable tr:hover {background-color:#ffffff;}
</style> */}




<table className="tftable">
  <thead>
    <tr>
    <td className="head_ar">Code</td>
    <td className="head_ar">Promo</td>
    <td className="tdFin head_ar"><span className="head_ar">Début </span> <span className="head_ar"> - </span> <span className="head_ar">Fin</span></td>
    <td className="head_ar">Modif</td>
    <td className="head_ar">Suppr</td>
    </tr>
  </thead>
  <tbody>
                {promosCode.length > 0 && (              
                     promosCode.map((e) => 
                    (
                      <tr key={generateUniqueKey(e)}>
                        <td >
                          {/* {e.dateFin} */}
                        {/* {moment(e.datefin).diff(moment(), 'days')} */}
                        {(moment(e.datefin).diff(moment(), 'days') >= 0) ? <TbSquareRoundedFilled className="pastilleverte" /> : <TbSquareRoundedFilled className="pastillerouge" />}
                          <span className="codep">{e.code} </span>
                          </td>
                          <td>
                          {(moment(e.datefin).diff(moment(), 'days') >= 0) ? <span className="percentgreen"> {e.promo} %</span> : <span className="percentred"> {e.promo} %</span>}
                            </td>
                            <td className="datepromo"><span className="dateO">{moment(e.date).format("DD-MM-YYYY")} </span>&nbsp;||&nbsp;<span className="dateO"> {moment(e.datefin).format("DD-MM-YYYY")}</span> </td>
                            {/* <td> </td> */}
                            <td  className="codeDate"><button className="remove_code" onClick={() => modify_code(e)}><RiEdit2Line /></button></td><td><button className="remove_code" onClick={() => remove_code(e.id)}><AiFillDelete /></button></td></tr>

                    ))
                    
                  )}
                  </tbody>
                  </table>
                </div>
            </div>
            
    </div>
 );
}

export default Promos;
