import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const modes = [
    { id: 'carte', label: 'Carte Bancaire', img: '/card.png' },
    { id: 'moov', label: 'Moov Money', img: '/moov.png' },
    { id: 'mtn', label: 'MTN MoMo', img: '/mtn.png' },
    { id: 'orange', label: 'Orange Money', img: '/orange.png' },
    { id: 'wave', label: 'Wave', img: '/wave.png' },
];

const FormPayPonct = () => {
    const navigate = useNavigate()
    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        montant: '',
        moyen_paiement: 'carte', // par défaut
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleWheel = (e) => {
        if (document.activeElement === inputRef.current) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nom: formData.nom,
            prenom: formData.prenoms,
            email: formData.email,
            telephone: formData.whatsapp,
            montant: formData.montant,
            moyen_paiement: formData.moyen_paiement,
        };

        try {
            const response = await fetch(
                'http://127.0.0.1:5000/api/soutiens/create-with-participant',
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
                window.open(data.redirectUrl, '_blank');

                setFormData({
                    nom: '',
                    prenoms: '',
                    email: '',
                    whatsapp: '',
                    montant: '',
                    moyen_paiement: 'carte',
                });
            } else {
                console.error('Erreur lors de la création:', data.error);
            }
        } catch (err) {
            console.error('Erreur réseau:', err);
        }
    };

    const goToChoix = () => navigate('/soutien')

    return (
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

            {/* Montant */}
            <input
                type="number"
                name="montant"
                min={0}
                step={5}
                onWheel={handleWheel}
                placeholder="Montant"
                className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                value={formData.montant}
                onChange={handleChange}
                required
            />

            {/* Modes de paiement */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Mode de paiement</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
                    type="button"
                    onClick={goToChoix}
                    className="border border-red-500 cursor-pointer text-red-500 font-semibold w-1/2 px-6 py-3 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                    Revenir au choix
                </button>

                <button
                    type="submit"
                    className="bg-normal-purple text-white text-lg cursor-pointer font-semibold w-1/2 px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Je m’engage
                </button>
            </div>
        </form>
    );
};

export default FormPayPonct;
