import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../src/services/AuthService'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    function handleLogout(){
        logout();
        navigator('/login');
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a href='http://localhost:3000' className='navbar-brand'>
                            Ukolujho
                        </a>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>

                            {
                                isAuth &&
                                <li className='nav-item'>
                                    <NavLink to='/todos' className='nav-link'>Úkoly</NavLink>
                                </li>
                            }

                        </ul>
                    </div>
                    <ul className='navbar-nav'>

                        {
                            !isAuth &&
                            <li className='nav-item'>
                                <NavLink to='/register' className='nav-link'>Registrovat</NavLink>
                            </li>
                        }

                        {
                            !isAuth &&
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link'>Přihlásit</NavLink>
                            </li>
                        }

                        {
                            isAuth &&
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link' onClick={handleLogout}>Odhlásit</NavLink>
                            </li>
                        }

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
