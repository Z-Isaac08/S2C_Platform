import React, { useState } from 'react'
import Hero from '../components/Hero'
import QRCode from 'react-qr-code'
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router';

const SignPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
    });
    const [qrData, setQrData] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert("Veuillez valider le reCAPTCHA !");
            return;
        }

        const payload = {
            ...formData,
            captcha: captchaToken
        };

        try {
            const response = await fetch('http://localhost:5000/api/inscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Erreur inconnue');

            // Message personnalisé selon le cas
            if (result.message.includes('déjà inscrit')) {
                setMessage("Merci 🙏 Vous êtes déjà inscrit !");
            } else {
                setMessage("Inscription réussie 🎉");
            }

            setQrData(result.qrCode || '');
            setSubmitted(true);

        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue : " + err.message);
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        setQrData('');
        setMessage('');
        setFormData({ nom: '', prenoms: '', email: '', whatsapp: '' });
        setCaptchaToken(null);
    };

    return (
        <section className='bg-white text-[#222] font-montserrat mt-[72px]'>
            {!qrData ? <Hero title={"S'inscrire pour le S2C #3"} subtitle={"C'est juste une formalité, t'inquiète ! 😊"} /> : <Hero title={"Inscription réussie !!!"} subtitle={"Tu as reçu ton Code QR par Mail et WhatsApp."} />}

            {!submitted ? (
                <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 my-10'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="text" name="prenoms" placeholder="Prénoms" value={formData.prenoms} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="text" name="whatsapp" placeholder="Numéro whatsapp" value={formData.whatsapp} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                    </div>

                    <div className='flex flex-col items-center justify-center gap-4'>
                        <ReCAPTCHA
                            sitekey="6Ld_RRArAAAAAE3WGo8_qk4x4_Ew-C55CVRUcRUp"
                            onChange={token => setCaptchaToken(token)}
                        />

                        <button type="submit" className="bg-normal-purple w-1/2 mx-auto text-white cursor-pointer py-3 px-8 mt-4 rounded hover:bg-purple-800 transition">
                            Je m'inscris
                        </button>
                    </div>

                </form>
            ) : (
                <div className="text-center my-10">
                    {qrData ? (
                        <>
                            <p className="mt-6 italic text-xl">Envie de soutenir l'oeuvre ?</p>
                            <p className='italic font-bold text-normal-purple text-xl'><Link to={"/soutien"}>CLIQUE ICI</Link></p>
                        </>
                    ) : (
                        <p className="text-gray-600 mt-4">Pas de QR Code disponible.</p>
                    )}

                    <button
                        onClick={resetForm}
                        className="mt-6 bg-normal-yellow cursor-pointer text-[#222] py-2 px-4 rounded hover:bg-yellow-400 transition"
                    >
                        Retour au formulaire
                    </button>
                </div>
            )}
        </section>
    );
};

export default SignPage;
