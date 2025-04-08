import React from 'react'
import { NavLink } from 'react-router';
import Logo from "../assets/logo.svg"

const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/soutien", label: "Soutenir" },
    { path: "/inscription", label: "S'inscrire" },
    { path: "/boutique", label: "Boutique" },
];

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between fixed top-0 left-0 w-full px-14 font-montserrat py-2 bg-white shadow z-20">
            <div className="flex items-center space-x-2">
                <img src={Logo} loading='lazy' alt="logo" className="h-14 w-auto" />
            </div>
            <div className='flex space-x-8'>
                {navLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? 'text-normal-purple text-base font-bold' : 'hover:text-normal-purple-hover  transition duration-200'
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}

export default NavBar