import React, { useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router';

const modes = [
    { id: 'carte', label: 'Carte Bancaire', img: '/card.png' },
    { id: 'momo', label: 'Mobile Money & Wave', img: '/momo.png' },
];

const FormPayPonct = () => {
    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        montant: '',
        moyen_paiement: '', // par défaut
    });

    const handleWheel = (e) => {
        if (document.activeElement === inputRef.current) {
            e.preventDefault();
        }
    };

    const [isValid, setIsValid] = useState(false)
    const { handleValue } = useOutletContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nom: formData.nom,
            prenom: formData.prenoms,
            email: formData.email,
            whatsapp: formData.whatsapp,
            montant: formData.montant,
            moyen_paiement: formData.moyen_paiement,
        };

        try {
            if (formData.moyen_paiement === 'momo') {
                // Appel à ton backend qui utilise Djamo
                const response = await fetch(
                    'http://localhost:5000/api/soutiens/create-with-participant',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    }
                );

                const data = await response.json();
                if (response.ok && data.redirectUrl) {
                    window.open(data.redirectUrl, '_blank'); // Djamo

                    setFormData({
                        nom: '',
                        prenoms: '',
                        email: '',
                        whatsapp: '',
                        montant: '',
                        moyen_paiement: '',
                    });
                } else {
                    console.error('Erreur lors de la création:', data.error);
                }
            } else {


                const response = await fetch('http://localhost:5000/api/soutiens/paystack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nom: formData.nom,
                        prenoms: formData.prenoms,
                        whatsapp: formData.whatsapp,
                        email: formData.email,
                        montant: formData.montant,
                    }),
                });

                const data = await response.json();

                if (data.url) {
                    window.open(data.url, '_blank'); // Redirige vers la page Paystack
                } else { console.log("Erreur paystack :", data.error); }
            }
            setIsValid(true)
            handleValue(true)
        } catch (err) {
            console.error('Erreur réseau:', err);
        }
    };

    const isFormValid = () => {
        const requiredFields = ['nom', 'prenoms', 'email', 'whatsapp', 'montant'];

        // Vérifie les champs de base
        for (let field of requiredFields) {
            if (!formData[field]) return false;
        }

        return true;
    };

    return (
        !isValid ? (
            <form className="max-w-4xl mx-auto p-6 mt-10" onSubmit={handleSubmit}>
                {/* Inputs texte */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="prenoms"
                        placeholder="Prénoms"
                        className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                        value={formData.prenoms}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="whatsapp"
                        placeholder="Numéro whatsapp"
                        className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                    />
                </div>

                <input
                    type="number"
                    name="montant"
                    min={500}
                    step={5}
                    onWheel={handleWheel}
                    placeholder="Montant"
                    value={formData.montant}
                    onChange={handleChange}
                    className="outline-none border  p-3 rounded w-full focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                />

                {/* Modes de paiement */}
                <div className="my-6">
                    <h3 className="text-lg text-center font-semibold mb-3">Mode de paiement</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({ ...prev, moyen_paiement: mode.id }))
                                }
                                className={`border rounded-lg p-3 text-center transition duration-200 ${formData.moyen_paiement === mode.id
                                    ? 'border-normal-purple bg-purple-50 font-semibold'
                                    : 'hover:border-normal-purple'
                                    }`}
                            >
                                <img
                                    src={mode.img}
                                    alt={mode.label}
                                    className="h-10 mx-auto mb-2 object-contain"
                                />
                                <span className="text-sm">{mode.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`${!isFormValid()
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-normal-purple cursor-pointer  hover:opacity-90'
                            } text-white text-lg font-semibold w-1/2 px-6 py-3 rounded-lg transition`}
                    >
                        Je donne
                    </button>
                </div>
            </form>
        ) : (
            <div className="text-center my-10">
                <>
                    <p className="mt-6 italic text-xl">Merci de participer à l'organisation du S2C #3</p>
                    <br />
                    <p className='italic font-bold text-normal-purple text-xl'>
                        Que DIEU vous bénisse !!
                    </p>
                    <button
                        className="mt-6 bg-normal-yellow cursor-pointer text-[#222] py-2 px-4 rounded hover:bg-yellow-400 transition"
                    >
                        <Link to={"/"}>Retour à l'accueil</Link>
                    </button>
                </>
            </div>
        )
    );
};

export default FormPayPonct;
