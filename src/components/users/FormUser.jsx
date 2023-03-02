import React, { useEffect, useState } from 'react'

const FormUser = ({ modeEdit, modeInsert, handleShowInsert, setModeEdit, updateList, datosEdit }) => {
    const datesEdit = {
        nombre: "",
        edad: "",
        email: ""
    }
    const Api = 'http://localhost:4000/user'
    const [datesForm, setDatosForm] = useState(datesEdit);
    // create user
    const handleChange = (e) => {
        setDatosForm({
            ...datesForm,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${Api}`, {
            method: 'POST',
            body: JSON.stringify(datesForm),
            headers: {
                'content-type': 'application/json',
            }
        }).then(res => res.json())
            .then((result) => {
                console.log(datesForm);
                handleShowInsert();
            })
    }

    // edit user
    const id = datosEdit?._id;
    // console.log(datesEdit)
    useEffect(() => {
        if (modeEdit) {
            // console.log('editando')
            setDatosForm(datosEdit);
            console.log(datosEdit)
            return;
        }
    },[])

    const insertEdit = async (e) => {
        e.preventDefault();
        await fetch(`${Api}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datesForm),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        setDatosForm(datesForm);
        updateList();
        setModeEdit();
    }



    return (
        <div>
            <h1>{modeInsert && "Insertar Usuario"}{modeEdit && "Editar Usuario"} </h1>

            <form className='row' onSubmit={modeEdit ? insertEdit : handleSubmit}>
                <label htmlFor="lblautor" className='col-md-2'> Nombre</label>
                <input type="text"
                    name='nombre'
                    id='lblautor'
                    placeholder='Escriba su nombre'
                    className='col-md-9 mb-3'
                    onChange={handleChange}
                    value={datesForm.nombre || ""}

                />
                <label htmlFor="lblEdad" className='col-md-2'> Edad</label>
                <input type="number"
                    name='edad'
                    id='lblEdad'
                    placeholder='Escriba su edad'
                    className='col-md-9 mb-3'
                    onChange={handleChange}
                    value={datesForm.edad || ""}

                />

                <label htmlFor="lblEmail" className='col-md-2'> Email</label>
                <input type="text"
                    name='email'
                    id='lblEmail'
                    placeholder='Escriba su email'
                    className='col-md-9 mb-3'
                    onChange={handleChange}
                    value={datesForm.email || ""}
                />
                <input type="submit" value="Enviar" className="btn btn-primary" />
                {
                    modeInsert &&
                    <input type="reset" value="Cancelar " onClick={() => handleShowInsert()} className="btn btn-warning" />
                }
                {
                    modeEdit &&
                    <input type="reset" value="Cancelar" onClick={() => setModeEdit()} className="btn btn-warning" />

                }
            </form>

        </div>
    )
}

export default FormUser
