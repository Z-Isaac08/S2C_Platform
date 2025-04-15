import {
    FaFacebookF,
    FaYoutube,
    FaWhatsapp,
    FaInstagram,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import LogoWhite from "../assets/logo_white.svg"
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-normal-purple text-white py-4 px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
                {/* Logo / Titre */}
                <div className="flex items-center space-x-2">
                    <img src={LogoWhite} alt="logo" className="h-14 w-auto" />
                </div>
                <p className="text-sm font-josefin text-gray-200 max-w-md">
                    Rejoignez-nous pour une expérience spirituelle et humaine unique, 
                    autour de la louange, l'adoration et la prière.
                </p>

                {/* Icônes de contact */}
                <div className="flex flex-col md:flex-row font-josefin justify-center gap-5 items-center space-y-1">
                    <Link to="tel:+2250757414458" className="hover:text-yellow-400 flex items-center space-x-2">
                        <MdPhone size={22} />
                        <span>07 57 41 44 58</span>
                    </Link>
                    <Link to="tel:+2250788257233" className="hover:text-yellow-400 flex items-center space-x-2">
                        <MdPhone size={22} />
                        <span>07 88 25 72 33</span>
                    </Link>
                    <Link to="mailto:lastructure.s2c@gmail.com" className="hover:text-yellow-400 flex items-center space-x-2">
                        <MdEmail size={22} />
                        <span>lastructure.s2c@gmail.com</span>
                    </Link>
                </div>

                {/* Réseaux sociaux */}
                <div className="flex items-center justify-center space-x-6 mt-4 text-xl">
                    <Link href="https://www.facebook.com/share/1A2FRSr4MG/" className="hover:text-yellow-400">
                        <FaFacebookF />
                    </Link>
                    <Link href="https://youtube.com/@associationchretienneevangeliq?si=cEhd3x3ewoLG8RwT" className="hover:text-yellow-400">
                        <FaYoutube />
                    </Link>
                    <Link to="https://wa.me/2250788257233" className="hover:text-yellow-400">
                        <FaWhatsapp />
                    </Link>
                    <Link href="https://www.instagram.com/ace_esatic?igsh=eHF5dnd0ZjlnaGgx" className="hover:text-yellow-400">
                        <FaInstagram />
                    </Link>
                </div>

                {/* Footer text */}
                <p className="text-xs font-montserrat text-gray-300 mt-5">
                    &copy;{new Date().getFullYear()} - Salon de Célébration & de Contemplation - Tous droits réservés
                </p>
            </div>
        </footer>
    );
}
