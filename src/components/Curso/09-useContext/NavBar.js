import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <NavLink exact activeClassName="active" to="./">Home</NavLink>
                <NavLink exact activeClassName="active" to="/about">About</NavLink>
                <NavLink exact activeClassName="active" to="/login">Login</NavLink>
            </ul>
        </nav>
    )
}
