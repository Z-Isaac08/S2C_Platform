import React, { useState } from 'react';
import { Link, NavLink } from 'react-router'; // Remplace 'react-router' par 'react-router-dom'
import Logo from "../assets/logo.svg";
import { FaTimes } from "react-icons/fa"
import { FiMenu } from "react-icons/fi";; // ou tout autre icône pour menu

const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/soutien", label: "Soutenir" },
    { path: "/inscription", label: "S'inscrire" },
    // { path: "", label: "Boutique" },
];

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-20 bg-white shadow px-6 md:px-14 py-3 font-montserrat">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Link to='/'>
                        <img src={Logo} loading="lazy" alt="logo" className="h-12 w-auto" />
                    </Link>
                </div>

                {/* Menu (Desktop) */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-normal-purple text-base font-bold'
                                    : 'text-gray-700 hover:text-normal-purple-hover transition duration-200'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Hamburger Icon (Mobile) */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#111]">
                        {menuOpen ? <FaTimes size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex items-center flex-col space-y-4">
                    {navLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            onClick={() => setMenuOpen(false)} // close on click
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-normal-purple font-bold'
                                    : 'text-gray-700 hover:text-normal-purple-hover transition duration-200'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
