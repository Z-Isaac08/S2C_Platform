import React, { useRef, useState } from 'react';

const FormPayPonct = () => {
    const inputRef = useRef(null);

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

    const handleWheel = (e) => {
        if (document.activeElement === inputRef.current) {
            e.preventDefault();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("✅ Données envoyées :", {
            ...formData,
        });
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
                />
                <input
                    type="text"
                    name="whatsapp"
                    placeholder="Numéro whatsapp"
                    className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                    value={formData.whatsapp}
                    onChange={handleChange}
                />
            </div>

            <input
                type="number"
                name="montant"
                min={0}
                step={5}
                onwheel={handleWheel}
                placeholder="Montant"
                className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/60"
                value={formData.montant}
                onChange={handleChange}
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
