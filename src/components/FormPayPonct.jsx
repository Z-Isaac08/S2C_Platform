import React, { useState } from 'react';

const FormPayPonct = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        montant: '',
    });

    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedMethod) {
            console.warn("Aucun moyen de paiement sélectionné !");
            return;
        }

        console.log("✅ Données envoyées :", {
            ...formData,
            moyenPaiement: selectedMethod,
        });
    };

    const paymentMethods = [
        {
            id: 'card',
            label: 'VISA / MASTERCARD / AMERICAN EXPRESS',
            icons: ['/card.png'],
        },
        {
            id: 'momo',
            label: 'MOBILE MONEY',
            icons: ['/momo.png'],
        },
        {
            id: 'wave',
            label: 'WAVE',
            icons: ['/wave.png'],
        },
    ];

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
                    className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/50"
                    value={formData.nom}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="prenoms"
                    placeholder="Prénoms"
                    className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/50"
                    value={formData.prenoms}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/50"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="whatsapp"
                    placeholder="Numéro whatsapp"
                    className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/50"
                    value={formData.whatsapp}
                    onChange={handleChange}
                />
            </div>

            <input
                type="number"
                name="montant"
                placeholder="Montant"
                className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-purple/70"
                value={formData.montant}
                onChange={handleChange}
            />

            {/* Mode de paiement */}
            <h2 className="text-center font-semibold text-xl mb-6">Mode de paiement</h2>

            <div className="flex md:flex-row flex-col items-center gap-6 justify-center">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition ${selectedMethod === method.id
                                ? 'border-normal-purple bg-white'
                                : 'border-transparent hover:border-gray-400'
                            }`}
                        onClick={() => setSelectedMethod(method.id)}
                    >
                        <p className="text-sm text-center font-medium mb-2">{method.label}</p>
                        <div className="flex justify-center gap-2">
                            {method.icons.map((icon, index) => (
                                <img key={index} src={icon} alt={method.label} className="h-6 sm:h-8" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Valider le paiement */}
            <button
                type="submit"
                className="bg-normal-purple text-white text-lg font-bold w-full mt-10 py-3 rounded-lg hover:opacity-90 transition"
            >
                Valider le paiement
            </button>
        </form>
    );
};

export default FormPayPonct;
