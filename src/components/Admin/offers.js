  import React, { useState, useEffect } from 'react';
  import { generateUniqueKey } from 'src/functions';
  import { RiEdit2Line } from 'react-icons/ri'
  import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai'
  import { TbSquareRoundedFilled } from 'react-icons/tb'
  import { Multiselect } from "multiselect-react-dropdown";
  import Swal from 'sweetalert2';
  import withReactContent from 'sweetalert2-react-content';
  import moment from 'moment';
  import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Modal from "@mui/material/Modal";
  import { Modal as Mod, Button as But } from "react-bootstrap";
  import Fade from "@mui/material/Fade";
  import logopromo from '../../../public/img/logopromo.png';
  import axios from 'axios';
  import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
  import { Carousel } from 'react-responsive-carousel';

  // import swal from '@sweetalert/with-react';


  import './styles.scss';

  function OffersAdmin() {
      const [isOpenAddCode, setisOpenAddCode] = useState(false)
      const [promos, setPromos] = useState([])
      const [pics, setPics] = useState([]);
      const [offerId, setOfferId] = useState(null);
      const [promoencours, setPromoencours] = useState([]);
      const [file, setFile] = useState(undefined);
      const [open, setOpen] = useState(true);
      const [mobile, setMobile] = useState(false);
      const [tintin, setTintin] = useState("")
      const [isOpenImg, setIsOpenImg] = useState(false)
      const [options, setOptions] = useState([])
      const [multiplesPics, setMultiplesPics] = useState([])
      const [picsSelected, setPicsSelected] = useState([])
      const handleClose = () => setOpen(false);
      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 450,
        bgcolor: "white",
        boxShadow: 5,
        p: 5,
        borderRadius:1
      
      };

      const picsList = () => {
        fetch('https://serveur.fansun.webmg.eu/admin/pics/list')
          .then((response) => response.json())
          .then((res) => {
            setPics(res.array);
            
            //  setLoading(false);
          });
      };

      function deletePic(name) {
        swal({
          title: `Êtes-vous sur de vouloir supprimer l'image "${name}" ?`,
          text: "Une fois l'image supprimée, elle est perdue",
          icon: 'warning',
          buttons: ["Annuler", "Oui je suis sûr"]
        }).then((result) => {
          if (result) {
        fetch(`https://serveur.fansun.webmg.eu/admin/pics/delete/${name}/`, {
          method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token' : localStorage.getItem('token_fansun_admin')
        }
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.deleted === 'ok') {
            swal({
                title: 'Image supprimée',
                icon: 'success',
              })
              picsList();
      
        } else {
            swal({
                title: 'Image non supprimée',
                icon: 'error',
              })
        }
        picsList();
      })
      }})
      }
      
      const getOffers = async () => {
        const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
        fetch(`https://serveur.fansun.webmg.eu/admin/getoffer`, {   
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
        }
      })
        }
      }
      
      useEffect(() => {
        // console.log('picsSelected', picsSelected)
      }, [picsSelected])
      

  
    const closeModalImg = () => {
      setIsOpenImg(false);
  }

    useEffect(() => {
      const newArray = pics.map((e) => ({...e, key: e.link, link: e.link, name: e.name, label: <div><img src={e.link} height="50px" width="50px"/></div>, checked: true}))
      setOptions(newArray)

      
    }, [pics])
    useEffect(() => {
      // console.log('options', options)
    }, [options])

      const modify_promo = async (e) => {
        
        let selectedPics = [];
        let pubpics = []
        let initialValues = []
      
          e.image.split(',').forEach((e) => pubpics.push(({ key: e, label: <div><img src={e} height="50px" width="50px"/></div>, checked: true})))
          pubpics.forEach((r) => {
            options.filter((e) => e.link === r.key).map((t) => initialValues.push(t))
          })
        
        
        const { value: formValues } = await withReactContent(Swal).fire({
          title: `Modifier la promo ${e.nom}`,
          html:
          <div className="prout" id="prout">
          <label htmlFor="name">Nom de la pub</label>
          <input id="name" className="swal2-input" placeholder="Nom de la pub" defaultValue={e.nom} />
          <label htmlFor="texte">Texte qui apparait sur la pub</label>
          <input id="texte" type="text" className="swal2-input" placeholder="Indiquer le texte qui apparait sur la pub" defaultValue={e.texte}/>
          <label htmlFor="datedebut">Date de début</label>
          <input id="datedebut" type="date" className="swal2-input" placeholder="Indiquer la date de debut" defaultValue={e.datestart} />
          <label htmlFor="datefin">Date de fin</label>
          <input id="datefin" type="date" className="swal2-input" placeholder="Indiquer la date de fin" defaultValue={e.dateend} />
          <div className="imgPicker">
        <Multiselect
        id='multiselect'
    onSelect={(selected) => {
      selectedPics = []
      selected.map((e) => selectedPics.push(e.link))
    } 
    }
    options={options}
    name="pics"
    selectedValues={initialValues}
    defaultValues={initialValues}
    onRemove={(selected) => {
      selectedPics = []
      selected.map((e) => selectedPics.push(e.link))} }
    placeholder="Choisir images"
    showCheckbox={false} displayValue="label" />

  </div>
          </div>
          ,
          focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Annuler",
          didOpen: () => {
            document.getElementById("datefin").value = moment(e.dateend).format('YYYY-MM-DD')
            document.getElementById("datedebut").value = moment(e.datestart).format('YYYY-MM-DD')
          },
          preConfirm: () => {
            if (selectedPics.length === 0) {
              return {
                startDate: document.getElementById('datedebut').value,
                    endDate: document.getElementById('datefin').value,
                    name: document.getElementById('name').value,
                    texte: document.getElementById('texte').value,
                    image: initialValues.map((e) => e.link)
              }
            } else {    
            return {
              startDate: document.getElementById('datedebut').value,
                  endDate: document.getElementById('datefin').value,
                  name: document.getElementById('name').value,
                  texte: document.getElementById('texte').value,
                  image: selectedPics
            }
          }
          }
        })
        const today = moment()
        const stat = moment(formValues.endDate);
        const diff = stat.diff(today, "days")
        const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
        if (formValues && formValues !== undefined && formValues.startDate !== "" && formValues.endDate !== "" && formValues.name !== "" && diff >= 0) {
          fetch(`https://serveur.fansun.webmg.eu/admin/modifyoffer/${e.id}`, {
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
          if (res.datas === 'ok') {
            getOffers()
          } else {
            Swal.fire({
              title: 'Erreur',
              text: "Il y a eu une erreur, veuillez réessayer",
              timer: 2000,
              icon: 'error'
            })
          }
          })
        } else {
          if (formValues !== undefined) {
          Swal.fire({
            title: 'Erreur',
            text: "Il y a eu une erreur, veuillez réessayer",
            timer: 2000,
            icon: 'error'
          }).then((r) => modify_promo(e))
        }
        }
      }
      }


      useEffect(() => {
      
      }, [pics])
      

      const addPub = async () => {
        let selectedPics = [];
        let initialValues = []      
        
        const { value: formValues } = await withReactContent(Swal).fire({
          title: `Ajouter une pub`,
          html:
          <div className="prout" id="prout">
          <label htmlFor="name">Nom de la pub</label>
          <input id="name" className="swal2-input" placeholder="Nom de la pub" />
          <label htmlFor="texte">Texte qui apparait sur la pub</label>
          <input id="texte" type="text" className="swal2-input" placeholder="Indiquer le texte qui apparait sur la pub" />
          <label htmlFor="datedebut">Date de début</label>
          <input id="datedebut" type="date" className="swal2-input" placeholder="Indiquer la date de debut" />
          <label htmlFor="datefin">Date de fin</label>
          <input id="datefin" type="date" className="swal2-input" placeholder="Indiquer la date de fin" />
          <div className="imgPicker">

        <Multiselect
        id='multiselect'
    onSelect={(selected) => {
      selectedPics = []
      selected.map((e) => selectedPics.push(e.link))
    } 
    }
    options={options}
    name="pics"
    selectedValues={initialValues}
    defaultValues={initialValues}
    onRemove={(selected) => {
      selectedPics = []
      selected.map((e) => selectedPics.push(e.link))} }
    placeholder="Choisir images"
    showCheckbox={false} displayValue="label" />

  </div>
          </div>
          ,
          focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Annuler",
      // }
      cancelButtonText: "Annuler",
      didOpen: () => {
      },
      preConfirm: () => {
        return {
          startDate: document.getElementById('datedebut').value,
              endDate: document.getElementById('datefin').value,
              name: document.getElementById('name').value,
              texte: document.getElementById('texte').value,
              // image:  document.getElementById('imgtemp').src,
              image: selectedPics
        
      }
                  }
                })
      if (formValues) {   
        const today = moment()
        const stat = moment(formValues.endDate);
        const diff = stat.diff(today, "days")       
                    if (formValues.endDate !== '' && formValues.startDate !== '' && formValues.name !== '' && diff >= 0) {
                    const tokenAdmin = localStorage.getItem('token_fansun_admin');
              if (tokenAdmin) {
                    fetch('https://serveur.fansun.webmg.eu/admin/addoffer', {
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
                  if (res.datas === "ok") {
                    getOffers()
                  }
                })
              }
                  
                  } else {
                    Swal.fire({
                      title: 'Erreur de saisie',
                      text: "Vous n'avez pas rempli tous les champs ! Veuillez recommencer",
                      timer: 2000,
                      icon: 'error'
                    }).then((e) => addPub())
                  }

              }
        
      }


    
      useEffect(() => {
          getOffers()
          picsList()
      }, [])

  

      function active(id, state) {
        if (state === "false") {
          const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
          fetch(`https://serveur.fansun.webmg.eu/admin/active/${id}/true`, {
            method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': tokenAdmin,
          },
          })
          .then((response) => response.json())
          .then((res) => {
            
            if (res.datas === "ok") {
              getOffers()
            }
            if (res.datas === "Erreur") {
              Swal.fire({
                title: 'Erreur',
                text: "La date de fin est passée !",
                timer: 2000,
                icon: 'error'
              })
            }
          })
        }
        } else {
          const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
          fetch(`https://serveur.fansun.webmg.eu/admin/active/${id}/false`, {
            method: "POST",
            // body: JSON.stringify(state),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': tokenAdmin,
          },
          })
          .then((response) => response.json())
          .then((res) => {
            if (res.datas === "ok") {
              getOffers()
            }
          })
        }
        }
      }

    

      useEffect(() => {
      }, [promoencours])

      function showOffer(id, e) {
        setOfferId(id)
        setPromoencours(e)
        setOpen(true)
      }

      function remove_promo(id) {
        Swal.fire({
          title: 'Êtes-vous sur de vouloir supprimer la pub ?',
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: 'Oui',
          denyButtonText: 'Non',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
          fetch(`https://serveur.fansun.webmg.eu/admin/deleteoffer/${id}`, {
                method: "POST",
              
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': tokenAdmin,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.datas === "ok") {
              Swal.fire({
                title: 'Pub supprimée',
                icon: 'success'
              }).then((r) => getOffers())
              
            }
          })
      }}})

      }    

      function handleSubmitPic(event) {
        event.preventDefault()
        if (event.target.files[0].size < 209715200) {
          const url = 'https://serveur.fansun.webmg.eu/admin/pics/upload';
          const formData = new FormData();
          formData.append('file', event.target.files[0]);
          formData.append('fileName', event.target.files[0].name);
          const config = {
            method: 'POST',
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
          axios.post(url, formData, config).then((response) => {
            if (response.data.address !== '') {
              if (response.data.message === 'Image ajoutée') {
                swal({
                  title: 'Image ajoutée',
            text: 'L\'image est ajoutée',
            icon: 'success',
            confirmButtonText: 'Ok',
                })
              }
              picsList();
              setFile(undefined)

            }
          });
        }
        else {
          swal({
            title: 'Erreur',
            text: 'L\'image est trop volumineuse ! Le poid doit être inférieur à 2 MO',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }

      useEffect(() => {

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

        function seePics() {
          setIsOpenImg(true)
          picsList()
        }

        function displayPromos(e) {
          return <tr key={generateUniqueKey(e)} className="test">
            <td>
              {(moment(e.dateend).diff(moment(), 'days') >= 0 && e.active === 'true') ? <TbSquareRoundedFilled className="pastilleverte" onClick={() => active(e.id, e.active)} /> : <TbSquareRoundedFilled className="pastillerouge" onClick={() => active(e.id, e.active)} />}
              {mobile && (moment(e.dateend).diff(moment(), 'days') >= 0 && e.active === 'true') ? (<span className="pubvisu" onClick={() => showOffer(e.id, e)}>{e.nom} </span>) : ((<span className="pubvisu" onClick={() => showOffer(e.id, e)}>{e.nom} </span>))}
            </td>
            {!mobile && (
              <td>
                <span className="textPromo" onClick={() => showOffer(e.id, e)}> {e.texte} </span>
              </td>
            )}
            <td className="datepromo"><span className="dateO">{moment(e.datestart).format("DD-MM-YYYY")} </span>&nbsp;||&nbsp;<span className="dateO"> {moment(e.dateend).format("DD-MM-YYYY")}</span> </td>
            <td className="codeDate"><button className="remove_code" onClick={() => modify_promo(e)}><RiEdit2Line /></button></td><td><button className="remove_code" onClick={() => remove_promo(e.id)}><AiFillDelete /></button></td></tr>;
        }
        function Pubmenu() {
          return <div className="formation_menu">
            <button className='button_prestasml_admin' onClick={() => addPub()}>Ajouter une pub</button>
            <button className="button_prestasml_admin" onClick={() => seePics()}>Mes images ({pics.length})</button>
            <label htmlFor="upload" className="button_prestasml_admin">
              Ajouter une image
            </label>
            {file && file.name !== undefined ? file.name : <input type="file" className='input_file' id="upload" accept="image/png, image/gif, image/jpeg" placeholder='Choisir un fichier' onChange={(e) => handleSubmitPic(e)} />}
          </div>;
        }
      

    return (
    <div className="promos">
      <div className="etablissement_title">Liste des pubs ({promos.length})</div>
      {Pubmenu()}
              <div className="code_container">
              <div className="code_list">

  <table className="tftable" >
    <thead>
      <tr>
      <td className="head_ar">Nom</td>
      {!mobile && (<td className="head_ar">Promo</td>)}
      <td className="tdFin head_ar"><span className="head_ar">Début </span> <span className="head_ar"> - </span> <span className="head_ar">Fin</span></td>
      <td className="head_ar">Modif</td>
      <td className="head_ar">Suppr</td>
      </tr>
    </thead>
    <tbody>
                  {promos.length > 0 && (promos.map((e) => displayPromos(e)))}
                    </tbody>
                    </table>
                  </div>
              </div>
              {open && promoencours.id !== undefined && (
    <Modal
    open
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Fade in={open} timeout={500}>
            
         
    <Box sx={style}>
      {/* <Button onClick={handleClose}>Fermer</Button> */}
      <AiOutlineCloseCircle className="closeBtnPuB" onClick={handleClose} />
      {/* {console.log(offer.image.length)} */}
      {promoencours.image && promoencours.image.split(',').length > 0 ? (
       <div className="w3-content w3-section">
       <Carousel autoPlay infiniteLoop interval={3000} showArrows showThumbs={false} swipeable stopOnHover>
         {promoencours.image.split(',').map((e) => (
           <img className="mySlides w3-animate-fading" key={generateUniqueKey(e)} src={e} alt="paysage" />
         ) )}
               </Carousel>
 
 </div>
      ) : (
   <img
              src={promoencours.image !== "" ? promoencours.image : logopromo}
              alt="Logo promo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              // style={{ maxHeight: "90%", maxWidth: "90%" }}
            />
      )}
   <div className="padding-modal">
      <Typography id="modal-modal-title" variant="h6" component="h4">
        {promoencours && promoencours.texte ? promoencours.texte : ''}
      </Typography>
      {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
       Le code est à entrer juste avant le paiement
      </Typography> */}
      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={10}>
      {promoencours ? `Offre valable jusqu'au ${promoencours && moment(promoencours.dateend).format("DD/MM/YYYY")}` : ''}
       
      </Typography>
      {/* <input type="checkbox" name="seen" id="seen" onChange={(e) => dontSee(e)} />
       <label className="seenlabel" htmlFor="seen">Ne plus voir pendant 24h</label> */}
       </div>
    </Box>
    </Fade>
  </Modal>
        )}
            
                    {isOpenImg && (
          <Mod className="modaleS" show={isOpenImg}>
              
                  <div className="img_container">
                  {pics.length > 0 && (
                    pics.map((e) => <div className="imgList"><img onClick={() => deletePic(e.name)} src={e.link} className="minipics" /></div>)
                  )}
                  </div>
                <Mod.Footer>
                    <But className="buttonCloseImg" onClick={() => closeModalImg()}>Fermer</But>
                </Mod.Footer>
            </Mod>
        )}
      </div>
  );

  


  }

  export default OffersAdmin;
