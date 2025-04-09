import React, { useState } from 'react';

const FormPayPonct = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        montant: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
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
        };
        const API_URL = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`{$API_URL}/api/soutiens/create-with-participant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
            if (response.ok && data.redirectUrl) {
                // Redirection vers la page de paiement CinetPay
                window.open(data.redirectUrl,'_blank');
            

                console.log('Participant et soutien créés:', data);
                // : reset du form
                setFormData({
                    nom: '',
                    prenoms: '',
                    email: '',
                    whatsapp: '',
                    montant: '',
                });
            } else {
                console.error('Erreur lors de la création:', data.error);
            }
    
        } catch (err) {
            console.error('Erreur réseau:', err);
        }
    };
    

    return (
        <form
            className="max-w-4xl mx-auto p-6 mt-10"
            onSubmit={handleSubmit}
        >
            {/* Inputs */}
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
                    required
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
                min={0}
                placeholder="Montant"
                className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                value={formData.montant}
                onChange={handleChange}
                required
            />

            {/* Valider le paiement */}
            <button
                type="submit"
                className="bg-normal-purple text-white text-lg font-bold w-full mt-5 py-3 rounded-lg hover:opacity-90 transition"
            >
                Valider le paiement
            </button>
        </form>
    );
};

export default FormPayPonct;
