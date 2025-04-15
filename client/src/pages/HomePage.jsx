import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

const slideUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
};

export default function S2CEventPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="bg-white text-[#222] font-montserrat mt-[72px]">
            {/* --- Hero Section --- */}
            <motion.div
                className="relative h-[500px] sm:h-[600px] bg-[#222]"
                variants={slideUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <img
                    src={images[currentIndex]}
                    alt="carousel"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#222] opacity-50"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase">
                        Salon de célébration et de contemplation
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto font-josefin text-sm sm:text-base md:text-lg">
                        Un programme de célébration, de prière, d'adoration, d'enseignement
                        et de réveil !
                    </p>
                    <button
                        onClick={() => navigate("/inscription")}
                        className="mt-10 bg-normal-purple cursor-pointer text-white text-base sm:text-lg px-16 py-3 rounded-full hover:bg-normal-purple-hover transition"
                    >
                        Je participe gratuitement
                    </button>
                </div>
            </motion.div>

            {/* --- Infos Générales --- */}
            <section className="bg-normal-purple text-white py-10 px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
                    <div className="md:w-1/2">
                        <h3 className="text-center md:text-left font-semibold text-lg mb-2">
                            Infos générales
                        </h3>
                        <p className="text-center md:text-left text-sm sm:text-base">
                            - Mouvement de jeunes chrétiens passionnés de Christ visant à
                            faire voir et vivre Dieu en cette génération.
                            <br />
                            - Le #S2C a vu le jour en Mai 2023 par le leader Privat Zrannoueu
                            sous inspiration du Saint-Esprit pendant la période de service
                            dans la maison ACE !
                        </p>
                    </div>

                    <div className="md:w-1/2 border-l-0 md:border-l-2 border-normal-yellow pl-0 md:pl-6">
                        <h3 className="text-center md:text-left font-semibold text-lg mb-2">
                            S2C #3
                        </h3>
                        <p className="text-center md:text-left text-sm sm:text-base">
                            - 30 Mai 2025, 21h00
                            <br />
                            - AD, Temple El-Shammah, Marcory Zone 4
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Soutien Section --- */}
            <section className="py-10 text-center px-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-6">
                    SOUTENIR NOTRE ÉVÉNEMENT
                </h2>
                <div className="flex justify-center items-center">
                    <button
                        onClick={() => navigate("/soutien")}
                        className="border border-normal-purple text-normal-purple px-6 py-3 rounded hover:bg-normal-purple hover:text-white transition w-full sm:w-auto"
                    >
                        Je participe financièrement
                    </button>
                </div>
            </section>

            {/* --- Boutique Section --- */}
            <section className="bg-gray-100 py-10 px-4">
                <h2 className="text-center text-lg sm:text-xl font-semibold mb-8">
                    MA BOUTIQUE S2C
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white rounded-xl shadow p-4 text-center flex flex-col"
                        >
                            <div className="w-full h-40 bg-gray-300 rounded mb-4" />
                            <h3 className="font-semibold">Chapeau couleur S2C</h3>
                            <p className="text-lg mt-2 font-josefin">2000 FCFA</p>
                            <button className="mt-4 bg-normal-purple text-white px-4 py-2 rounded hover:bg-[#440077] transition">
                                Ajouter au panier
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
