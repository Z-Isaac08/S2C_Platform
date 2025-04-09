import React, { useState } from 'react'
import Hero from '../components/Hero'
import QRCode from 'react-qr-code'

const SignPage = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
    })

    const [qrData, setQrData] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = `Nom : ${formData.nom}\nPrénoms : ${formData.prenoms}\nEmail : ${formData.email}\nWhatsApp : ${formData.whatsapp}`
        setQrData(data)
        setSubmitted(true)

        // Tu peux ici faire un appel à un backend pour envoyer par mail + whatsapp
    }

    return (
        <section className='bg-white text-[#222] font-montserrat mt-[72px]'>
            <Hero title={"Enregistre toi pour le S2C #3"} subtitle={"Viens vivre la présence de DIEU"} />

            {!submitted ? (
                <form onSubmit={handleSubmit} className='max-w-4xl mx-auto p-6 my-10'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="text" name="prenoms" placeholder="Prénoms" value={formData.prenoms} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                        <input type="text" name="whatsapp" placeholder="Numéro whatsapp" value={formData.whatsapp} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" required />
                    </div>
                    <button type="submit" className="bg-normal-purple text-white py-2 px-4 rounded hover:bg-purple-800 transition">
                        Valider & Recevoir QR
                    </button>
                </form>
            ) : (
                <div className="text-center my-10">
                    <h2 className="text-xl font-semibold mb-4">Voici ton QR Code pour l’événement :</h2>
                    <QRCode value={qrData} size={200} className='mx-auto' />
                    <p className="mt-4">📩 Tu vas aussi le recevoir par mail et WhatsApp.</p>
                </div>
            )}
        </section>
    )
}

export default SignPage
