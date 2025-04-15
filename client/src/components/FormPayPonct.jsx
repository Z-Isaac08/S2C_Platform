import React, { useState } from 'react';

const modes = [
    { id: 'carte', label: 'Carte Bancaire', img: '/card.png' },
    { id: 'momo', label: 'Mobile Money & Wave', img: '/momo.png' },
];

const FormPayPonct = () => {

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
            if (formData.moyen_paiement === 'momo') {
                // Appel à ton backend qui utilise Djamo
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
                    window.open(data.redirectUrl, '_blank'); // Djamo
                    // Reset form
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
            } else {
                alert("Ce mode de paiement n'est pas encore disponible. Veuillez choisir Mobile Money.");
            }
        } catch (err) {
            console.error('Erreur réseau:', err);
        }
    };

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


            {/* Modes de paiement */}
            <div className="mb-6">
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
                    className="bg-normal-purple text-white text-lg cursor-pointer font-semibold w-1/2 px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Je donne
                </button>
            </div>
        </form>
    );
};

export default FormPayPonct;
