import React, { useState } from 'react';

const FormPayRect = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        periodicite: '',
        duree: '',
        uniteDuree: 'An',
        montant: '',
    });

    const [selectedMethod, setSelectedMethod] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (value) => {
        setFormData(prev => ({ ...prev, periodicite: value }));
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
        { id: 'card', label: 'VISA / MASTERCARD / AMERICAN EXPRESS', icons: ['/card.png'] },
        { id: 'momo', label: 'MOBILE MONEY', icons: ['/momo.png'] },
        { id: 'wave', label: 'WAVE', icons: ['/wave.png'] },
    ];

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="text" name="prenoms" placeholder="Prénoms" value={formData.prenoms} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="text" name="whatsapp" placeholder="Numéro whatsapp" value={formData.whatsapp} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
            </div>

            {/* Périodicité */}
            <div className="my-8">
                <p className="font-semibold text-center mb-4">Périodicité</p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {["Toutes les semaines", "Mensuel", "Semestriel", "Trimestriel", "Annuel", "Autre"].map((period) => (
                        <label key={period} className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="periodicite"
                                value={period}
                                checked={formData.periodicite === period}
                                onChange={() => handleRadioChange(period)}
                            />
                            {period}
                        </label>
                    ))}
                </div>
            </div>

            {/* Durée d’engagement */}
            <div className="my-8">
                <p className="font-semibold text-center mb-4">Durée d'engagement</p>
                <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
                    <input
                        type="number"
                        name="duree"
                        placeholder="Montant"
                        value={formData.duree}
                        onChange={handleChange}
                        className="outline-none border p-3 rounded w-full sm:w-auto focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                    />
                    <select
                        name="uniteDuree"
                        value={formData.uniteDuree}
                        onChange={handleChange}
                        className="outline-none border p-3 rounded w-full sm:w-auto focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                    >
                        <option value="An">An</option>
                        <option value="Mois">Mois</option>
                        <option value="Semaines">Semaines</option>
                    </select>
                </div>
            </div>

            {/* Montant */}
            <input
                type="number"
                name="montant"
                placeholder="Montant"
                value={formData.montant}
                onChange={handleChange}
                className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
            />

            {/* Mode de paiement */}
            <h2 className="text-center font-semibold text-xl mb-6">Mode de paiement</h2>
            <div className="flex md:flex-row flex-col items-center gap-6 justify-center">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition ${selectedMethod === method.id ? 'border-normal-yellow bg-white' : 'border-transparent hover:border-gray-400'
                            }`}
                        onClick={() => setSelectedMethod(method.id)}
                    >
                        <p className="text-sm text-center font-medium mb-2">{method.label}</p>
                        <div className="flex justify-center gap-2">
                            {method.icons.map((icon, i) => (
                                <img key={i} src={icon} alt={method.label} className="h-6 sm:h-8" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bouton de validation */}
            <button
                type="submit"
                className="bg-normal-yellow text-white text-lg font-bold w-full mt-10 py-3 rounded-lg hover:opacity-90 transition"
            >
                Je m’engage
            </button>
        </form>
    );
};

export default FormPayRect;
