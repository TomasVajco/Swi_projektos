import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../src/services/TodoService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../src/services/AuthService';

const ListTodoComponent = () => {

    useEffect(() => {
        listTodos();
    }, [])

    const navigate = useNavigate();

    const isAdmin = isAdminUser();

    function listTodos(){
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const [todos, setTodos] = useState([]);

    function addNewTodo(){
        navigate('/add-todo')
    }

    function updateTodo(id){
        console.log(id)
        navigate(`/update-todo/${id}`)
    }

    function removeTodo(id){
        deleteTodo(id).then(() => {
            listTodos();
        }).catch(error => {
            console.error(error);
        })
    }

    function markCompleteTodo(id){
        completeTodo(id).then(() => {
            listTodos()
        }).catch(error => {
            console.error(error);
        })
    }

    function markInCompleteTodo(id){
        inCompleteTodo(id).then(() => {
            listTodos()
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Seznam úkolů</h2>
            {
                true &&
                <button className='btn btn-primary mb-2' onClick={addNewTodo}>Přidat úkol</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                    <tr>
                        <th>Název úkolu</th>
                        <th>Popis úkolu</th>
                        <th>Dokončeno</th>
                        <th>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? 'ANO' : 'NE'}</td>
                                <td>
                                    {
                                        isAdmin &&
                                        <button className='btn btn-primary' onClick={() => updateTodo(todo.id)}>Upravit</button>
                                    }

                                    {
                                        isAdmin &&
                                        <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{ marginLeft: "10px" }}>Smazat</button>
                                    }

                                    <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Dokončit</button>
                                    <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={{ marginLeft: "10px" }}>Nedokončeno</button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodoComponent
