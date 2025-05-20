import React, { useEffect, useState } from 'react'
import { addTodo, getTodoById, updateTodo } from '../src/services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';

const TodoComponent = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()

    function saveOrUpdateTodo(e){
        e.preventDefault()

        const todo = { title, description, completed }
        console.log(todo);

        if(id){
            updateTodo(id, todo).then(() => {
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        } else {
            addTodo(todo).then((response) => {
                console.log(response.data)
                navigate('/todos')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Upravit úkol</h2>
        } else {
            return <h2 className='text-center'>Přidat úkol</h2>
        }
    }

    function pageButton(){
        if(id){
            return <button className='btn btn-success' onClick={(e) => saveOrUpdateTodo(e)}>Upravit</button>
        } else {
            return <button className='btn btn-success' onClick={(e) => saveOrUpdateTodo(e)}>Odeslat</button>
        }
    }

    useEffect(() => {
        if(id){
            getTodoById(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [])

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Název úkolu</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Zadejte název úkolu'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Popis úkolu</label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Zadejte popis úkolu'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Dokončeno</label>
                                <select
                                    className='form-control'
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value === 'true')}
                                >
                                    <option value="false">Ne</option>
                                    <option value="true">Ano</option>
                                </select>
                            </div>
                            <div className='text-center'>
                                {pageButton()}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent
