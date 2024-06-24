import React, { useEffect, useState, useRef } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { generateUniqueKey } from 'src/functions';
import { Modal, Button } from "react-bootstrap";
import { Navigate, Redirect } from 'react-router-dom';
import { BsFillDeviceHddFill } from 'react-icons/bs';
import { BiUnlink } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import ReactHtmlParser from 'react-html-parser';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';
import swal from 'sweetalert';
import ModifyFormations from './modifyFormations';
import AddFormations from './addFormations';
import { useForm } from 'react-hook-form';
import store from 'src/store'
import './styles.scss';

function Formationadmin() {

     const [formationsAll, setFormationsAll] = useState([]);
    const [fileUrl, setFileUrl] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenImg, setIsOpenImg] = useState(false);
    const [isOpenFile, setIsOpenFile] = useState(false);
    const [isOpenModify, setIsOpenModify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);
    const [start, setStart] = useState(0);
    const [number, setNumber] = useState(3);
    const [total, setTotal] = useState(0);
    const [file, setFile] = useState(undefined);
    const [modifyId, setModifyId] = useState(undefined);

    const [pics, setPics] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
    }, [img])
    useEffect(() => {
    }, [start])
    useEffect(() => {
      setLoading(true)
    getFormations(0, 3);
    picsList();
    fileList();
    cleanUpload();
}, [])
useEffect(() => {
}, [file])
useEffect(() => {
  getFormations(start, number)
}, [isOpenModify])

    const picsList = () => {
      fetch('https://serveur.fansun.webmg.eu/admin/pics/list')
        .then((response) => response.json())
        .then((res) => {
          setPics(res.array);
          
          //  setLoading(false);
        });
    };

    const cleanUpload = () => {
      fetch('https://serveur.fansun.webmg.eu/admin/cleanupload', {
      // fetch('https:/d/serveur.fansun.webmg.eu/admin/cleanupload', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token' : localStorage.getItem('token_fansun_admin')

        }
    })
    .then((res) => res.json())
    // .then((response) => console.log(response.newList))
  }
      
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
    const fileList = () => {
      // fetch('https://serveur.fansun.webmg.eu/admin/files/list', {
      fetch('https://serveur.fansun.webmg.eu/admin/files/list', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token' : localStorage.getItem('token_fansun_admin')

        }

      })
        .then((response) => response.json())
        .then((res) => {
          setFiles(res.array);
         
          //  setLoading(false);
        });
    };

    const getFormations = (starte, numbere) => {
      // fetch(`https://serveur.fansun.webmg.eu/admin/formations/all`, {
        const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
      // fetch(`https://serveur.fansun.webmg.eu/admin/formations/total`, {
      fetch(`https://serveur.fansun.webmg.eu/admin/formations/total`, {

        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token' : localStorage.getItem('token_fansun_admin')

        },
      }).then((response) => {
        response.json().then(async (formations) => {
          let NoLinks = []
          //Attend que le map soit fini avant de passer a autre chose cool :-)
          await Promise.all(formations.data.map((e) => {
            if (e.link === "" && e.online === "true") {
              // console.log(e)
              NoLinks.push(e.name)
            }

          }))
          if (NoLinks.length > 0) {
            withReactContent(Swal).fire({
            title: `Attention !!!`,
            // text: `Ces formations sont en ligne mais n'ont pas de fichiers associés !  ${NoLinks.map((r) => `\n\n<span class="bold">${r}</span>`)}`,
            html: `Ces formations sont en ligne mais n'ont pas de fichiers associés !<br /><br />  ${NoLinks.map((r) => `<span class="bold">${r}</span>`)}`,
            icon: 'warning',
            buttons: ["Ok", "Annuler"]
          })
          // NoLinks.map((e) => )
        }
         setTotal(formations.data.length)
          setLoading(false);
        });
      });
    


        fetch(`https://serveur.fansun.webmg.eu/admin/formations/all/${starte}/${numbere}`, {

        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token' : localStorage.getItem('token_fansun_admin')

        },
      }).then((response) => {
        // console.log('formations', response)
        // if (response.message !== 'Access denied') {
          // setUsers(res.users)
          setLoading(false)
          // } else {
              
          
        response.json().then((formations) => {
          // if (formationsAll.length > 0) {
            // console.log(formationsAll)
            // console.log(formations.data)
            // setClassementComplet(classementComplet => [...classementComplet, {idEquipe: id, classement: res.phases[0].classements}])
          // setFormationsAll(formationsAll => [...formationsAll, formations.data])
          // } else {
            setFormationsAll(formations.data)
          // }
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
      swal({
        title: `Vous n'avez pas le droit !`,
        // text: "Vous ne pouvez pas revenir en arrière",
        icon: 'warning',
        buttons: ["Ok", "Annuler"]
      }).then((result) => {
        // console.log(result)
        if (result === null) {
            window.location.replace('/')
        }
        setLoading(false);
    })
    }
    }

    useEffect(() => {
    }, [formationsAll])
    
        const toggleFormation = (id, status) => {
          fetch(`https://serveur.fansun.webmg.eu/admin/formations/toggle/${id}/${status}`, {
            method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('token_fansun_admin')
        },
          })
          .then((res) => res.json())
          .then((response) => {
            getFormations(start, number);
          })
        }

        const deleteFormation = (id, nom) => {
          swal({
            title: `Êtes-vous sur de vouloir supprimer la formation "${nom}" ?`,
            text: "Une fois la formation supprimée, elle est perdue",
            icon: 'warning',
            buttons: ["Annuler", "Oui je suis sûr"]
          }).then((result) => {
            if (result) {
          fetch(`https://serveur.fansun.webmg.eu/admin/formations/delete/${id}/`, {
            method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('token_fansun_admin')
          }
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.msg === 'Delete OK') {
              swal({
                  title: 'Formation supprimée',
                  icon: 'success',
                })
                getFormations(start, number);

          } else {
              swal({
                  title: 'Formation non supprimée',
                  icon: 'error',
                })
          }
          getFormations(start, number);
        })
        }})
      }

        const changeImage = (g, e) => {
            document.getElementById(`image${e}`).src = g.target.value
          };
         
          

          function loadMore(start, number) {
            setStart(start);
            setNumber(number)
            getFormations(start, number)
          }

          const addFormation = () => {
            setIsOpen(true)

          }
            const closeModal = () => {
            setIsOpen(false);
        }
            const closeModalModif = () => {
            setIsOpenModify(false);
        }
            const closeModalImg = () => {
            setIsOpenImg(false);
        }
            const closeModalFiles = () => {
            setIsOpenFile(false);
        }

        function handleSubmitPic(event) {
          // setFile(event.target.files[0])
          event.preventDefault()
          // if (file.size < 2097152) {
          if (event.target.files[0].size < 209715200) {
            // const url = 'https://serveur.fansun.webmg.eu/admin/pics/upload';
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
                setImg(response.data.address);
                if (response.data.message === 'Image ajoutée') {
                  swal({
                    title: 'Image ajoutée',
              text: 'L\'image est ajoutée',
              icon: 'success',
              confirmButtonText: 'Ok',
                  })
                }
                picsList();
                // document.getElementById('upload').value = '';
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

        function handleSubmitFile(event, id) {
          event.preventDefault()
          // if (file.size < 2097152) {
          if (event.target.files[0].size < 209715200) {
            const url = `https://serveur.fansun.webmg.eu/admin/files/upload/add/${id}`;
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('fileName', event.target.files[0].name);
            const config = {
              method: 'POST',
              headers: {
                'content-type': 'multipart/form-data',
                'x-access-token' : localStorage.getItem('token_fansun_admin')
              },
            };
            axios.post(url, formData, config).then((response) => {
              setFileUrl(response.data.address)
              getFormations(start, number);
              // if (response.data.address !== '') {
              //   setImg(response.data.address);
              //   if (response.data.message === 'Image ajoutée') {
              //     swal({
              //       title: 'Image ajoutée',
              // text: 'L\'image est ajoutée',
              // icon: 'success',
              // confirmButtonText: 'Ok',
              //     })
              //   }
              //   fileList();
              //   // document.getElementById('upload').value = '';
              //   setFile(undefined)
    
              // }
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


        function handleChange(event) {
          setFile(event.target.files[0]);
        }

        function seePics() {
          setIsOpenImg(true)
          picsList()
        }

        function seeFiles() {
          setIsOpenFile(true)
          fileList()
        }

        


        function deleteFile(link, id) {
          const file = link.split('files/')[1];
          swal({
            title: `Êtes-vous sur de vouloir supprimer le fichier "${link}" ?`,
            text: "Une fois le fichier supprimé, il est perdu",
            icon: 'warning',
            buttons: ["Annuler", "Oui je suis sûr"]
          }).then((result) => {
            if (result) {
          // fetch(`https://serveur.fansun.webmg.eu/admin/files/delete/${file}/${id}`, {
          fetch(`https://serveur.fansun.webmg.eu/admin/files/delete/${file}/${id}`, {
            method: 'POST',
            // body: link,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('token_fansun_admin')
          }
        })
          .then((res) => res.json())
          .then((response) => {
            // console.log(response)
            if (response.deleted === 'ok') {
              swal({
                  title: 'fichier supprimé',
                  icon: 'success',
                })
                fileList();
                getFormations(start, number);

          } else {
              swal({
                  title: 'fichier non supprimé',
                  icon: 'error',
                })
          }
          fileList();
        })
        }})
        }
     
        function modif(id) {
          setIsOpenModify(true)
          setModifyId(id)
        }

        function searchFormation(nom) {
          if (nom.length > 0) {
          fetch(`https://serveur.fansun.webmg.eu/admin/searchformation/${nom}`, {
          // fetch(`http://localhost:3000/admin/searchformation/${nom}`, {
            method: 'GET',
            // body: link,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token' : localStorage.getItem('token_fansun_admin')
          }
          }).then((res) => res.json())
          .then((response) => {
            if (response.datas.length > 0) {
            setFormationsAll(response.datas)
            setTotal(response.datas.length)
            setStart(0)
            setNumber(response.datas.length)
            } else {
              setFormationsAll([])
            }
          })
        } else {
          getFormations(0, 6)
        }
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
            
            <div className="etablissement_title mtop-2">Actuellement, {total} formations sont sur le site</div>
            <div className="formation_menu"><button className='button_prestasml_admin' onClick={() => addFormation()}>Ajouter une formation</button>
            <label htmlFor="upload" className="button_prestasml_admin">
             Ajouter une image
            </label>
            {file && file.name !== undefined ? file.name : <input type="file" className='input_file' id="upload" accept="image/png, image/gif, image/jpeg" placeholder='Choisir un fichier' onChange={(e) => handleSubmitPic(e)} />}
            <button className="button_prestasml_admin" onClick={() => seePics()}>Mes images ({pics.length})</button>
            <button className="button_prestasml_admin" onClick={() => seeFiles()}>Mes fichiers ({files.length}) </button>
            <input type='text' placeholder='Chercher une formation' className="button_prestasml_admin" onChange={(e) => searchFormation(e.target.value)} />
            </div>
            <div className="formations_container">
              {formationsAll.length > 0 && formationsAll.map((e) => (
                <div className="child" key={generateUniqueKey(e)}>
                  <div className="formation_title_adm" id={`title${e.id}`}><div className="form_unit_title">{e.name}</div><div className="nolink">{!e.link && <BiUnlink />}</div></div>
                  <div className="formations_img_admin">
                    {/* <img className="formation_title_image" id={`image${e.id}`} src={e.img} onClick={(f) => changeImage(e.id)} /></div> */}
                    <img className="formation_title_image_admin" id={`image${e.id}`} src={e.img} /></div>
                  <div className="url"><input type="text" id={`input_image${e.id}`} className="input_img" defaultValue={e.img} onChange={(g) => changeImage(g, e.id)} /></div>
                  
                  <div className="formation_content_admin" id={e.id}>{ReactHtmlParser(e.description)}</div>
                  {/* <input type="button" value="G"  onClick={() => commande('bold')} /> */}
                  <div className="fileContainUpload">
                  {e.link ? (
                    <div className="formation_link_admin"><span className="linktofile"><BsFillDeviceHddFill /> <a href={e.link} target="_blank">{e.link.substring(38, e.link.length)}</a> <RiDeleteBinLine className="deletefile" onClick={() => deleteFile(e.link, e.id)} /> </span></div>
                  ): (
                    <label htmlFor="uploadS" className="label-file">{file && file.name !== undefined ? file.name : <button className="button_prestasfileS"><input type="file" className='input_fileS' id="uploadS" accept="application/pdf" placeholder='Choisir un fichier' onChange={(g) => handleSubmitFile(g, e.id)} /></button>}
            </label>
                  )}
                  </div>
                  
                  <div className="formation_download_admin">
                    <div className="pricead" id={`price${e.id}`}>{e.price}</div>
                    {/* <button className="button_prestas_dwl" id={`button${e.id}`} onClick={() => ModifyFormation(e.id)}>Modifier</button> */}
                    <button className="button_prestas_dwl" id={`button${e.id}`} onClick={() => modif(e.id)}>Modifier</button>

                    <label className="switch">
                      {e.online === 'true' ? (
                        <input type="checkbox" id={`article${e.id}`} defaultChecked={Boolean(e.online)} onClick={(f) => toggleFormation(e.id, 'false')} />
                      ) : (<input type="checkbox" id={`article${e.id}`} defaultChecked={false} onClick={(f) => toggleFormation(e.id, 'true')} />
                      )}
                      <span />
                    </label>
                    <button className="button_prestas_dwl" id={`button${e.id}`} onClick={() => deleteFormation(e.id, e.name)}>Supprimer</button>
                  </div>
                </div>
              ))}


            </div></>
           )}
           {/* total : {total}
           total affiché :  */}
           {!loading && formationsAll.length !== 0 ? (
  (start + number) < total &&  (
  <div className="loadMore_container"><button className="loadMore_button" onClick={() => loadMore(0, (start + number + 3))}>Voir plus</button></div>
  )) : (!loading && <div className="loadMore_container">Aucune formation correspondante</div>)
  }
          
            {(store.getState().User.user.admin === 'false') && <Navigate to='/' />}
             {isOpen && (
        <Modal className="modale" show={isOpen}>
              {/* <Modal.Header closeButton onClick={() => closeModal()}>
                  <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                <AddFormations />
              </Modal.Body>
              <Modal.Footer>
                  <Button className="buttonCloseAdd" onClick={() => closeModal()}>X</Button>
              </Modal.Footer>
          </Modal>
      )}
      {isOpenImg && (
        <Modal className="modaleS" show={isOpenImg}>
              {/* <Modal.Header closeButton onClick={() => closeModal()}>
                  <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header> */}
              {/* <Modal.Body> */}
                <div className="img_container">
                {pics.length > 0 && (
                  pics.map((e) => <div className="imgList"><img onClick={() => deletePic(e.name)} src={e.link} className="minipics" /></div>)
                )}
                </div>
              {/* </Modal.Body> */}
              <Modal.Footer>
                  <Button className="buttonCloseImg" onClick={() => closeModalImg()}>Fermer</Button>
              </Modal.Footer>
          </Modal>
      )}
      {isOpenFile && (
        <Modal className="modaleS" show={isOpenFile}>
              {/* <Modal.Header closeButton onClick={() => closeModal()}>
                  <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header> */}
              {/* <Modal.Body> */}
                <div className="img_container">
                <div className="fileList">
                  <div className="fileTitle">Mes fichiers Formations</div>
                {files.length > 0 && (
                  files.map((e) => 
                  // ((console.log(e.nameFormation))) ||
                    <div key={generateUniqueKey(e)} className="fileListItem">
                      {/* {e.nameFormation !== undefined ? (
                      <><div className="title_file">{e.nameFormation}</div><div className="link_file"><a href={e.link} target="_blank"> <BsFillDeviceHddFill />{e.name}</a></div></>

                      ) : ( */}
                        <><div className="link_file"><MdDeleteForever size={25} onClick={() => deleteFile(e.link, e.id)} /><a href={e.link} target="_blank"> <BsFillDeviceHddFill />{e.name}</a></div></>

                      {/* )} */}
                      </div>
                    )
                )}
                </div>
                </div>
              {/* </Modal.Body> */}
              <Modal.Footer>
                  <Button className="buttonCloseImg" onClick={() => closeModalFiles()}>Fermer</Button>
              </Modal.Footer>
          </Modal>
      )}
      {isOpenModify && (
        <Modal className="modale" show={isOpenModify}>
              {/* <Modal.Header closeButton onClick={() => closeModal()}>
                  <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
              <ModifyFormations id={modifyId} closeModalModif={closeModalModif} />
              </Modal.Body>
              <Modal.Footer>
                  <Button className="buttonCloseAdd" onClick={() => closeModalModif()}>X</Button>
              </Modal.Footer>
          </Modal>
      )}
   </>
 );
}

export default Formationadmin;
