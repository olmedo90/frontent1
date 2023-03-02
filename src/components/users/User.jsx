import React, { useEffect, useState } from 'react'
import FormUser from './FormUser';

const User = () => {

  // edit o insert a new user
  const [modeEdit, setModeEdit] = useState(false);
  const handleShowEdit = () => setModeEdit(!modeEdit);

  const [modeInsert, setModeInsert] = useState(false);
  const handleShowInsert = () => setModeInsert(!modeInsert);

  const [List, setUpdateList] = useState(false);
  const updateList = () => setUpdateList(!List);

  //crud get
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      await fetch('http://localhost:4000/user')
        .then((response) => response.json())
        .then((json) => {
          setUser(json);
        })
    }
    getUser();
  }, [updateList]);
  // deleted
  async function deleted(e) {
    const id = e;
    await fetch(`http://localhost:4000/user/${id}`,{
      method : 'DELETE',
    })
    .then((response)=> response.json())
    .then((json)=>{
        let updateUser = [...user].filter(i => i.id ==id);
        setUser(updateUser);
        updateList();
    })
  }

  //edited
  const [datosEdit, setDatosEdit] = useState([]);
  function Edit(use) {
    handleShowEdit();
    setDatosEdit(use)
  }

  return (
    <div>
      <h1>Mis Usuarios</h1>
      <button className='btn btn-success' onClick={() => handleShowInsert()}>Crear Usuario</button><br /><br />
      <table className='table table-dark'>
        <thead>
          <tr>
            <th>Usuarios</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
            user.map((use) => {
              return <tr key={use._id}>
                <th>{use.nombre}</th>
                <th>{use.edad}</th>
                <th>{use.email}</th>
                <th className='row d-flex justify-content-between'>
                  <button className='btn btn-info col-md-4' onClick={() => Edit(use)} >editar</button>
                  <button className='btn btn-danger col-md-4' onClick={()=> deleted(use._id)}>eliminar</button>
                </th>
              </tr>
            })

          }
        </tbody>
      </table>
      {
        modeInsert && <FormUser
          modeInsert={modeInsert}
          handleShowInsert={handleShowInsert}
          />
      }
      {
        modeEdit && <FormUser
          modeEdit={modeEdit}
          setModeEdit={setModeEdit}
          updateList={updateList}
          datosEdit={datosEdit}
        />

      }
    </div>
  )
}

export default User;
