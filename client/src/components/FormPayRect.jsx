import React, { useRef, useState } from 'react';

const FormPayRect = () => {
    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        whatsapp: '',
        periodicite: '',
        autrePeriodicite: '',
        unitPeriodicite: '',
        duree: '',
        uniteDuree: 'An',
        montant: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (value) => {
        setFormData(prev => ({ ...prev, periodicite: value }));
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
            periodicite: formData.periodicite === 'Autre' ? formData.autrePeriodicite : formData.periodicite,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="text" name="prenoms" placeholder="Prénoms" value={formData.prenoms} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                <input type="text" name="whatsapp" placeholder="Numéro whatsapp" value={formData.whatsapp} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
            </div>

            <input
                type="number"
                name="montant"
                min={0}
                step={5}
                onwheel={handleWheel}
                placeholder="Montant"
                value={formData.montant}
                onChange={handleChange}
                className="outline-none border p-3 rounded w-full focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
            />
            {/* Périodicité */}
            <div className="my-8">
                <p className="font-semibold text-center mb-4">Périodicité</p>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {["Mensuel", "Trimestriel", "Annuel", "Autre"].map((period) => (
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

                {formData.periodicite === "Autre" && (
                    <div className="mt-5 flex flex-col items-center justify-center sm:flex-row gap-4">
                        <input
                            type="number"
                            name="autrePeriodicite"
                            min={0}
                            onwheel={handleWheel}
                            placeholder="Entrez la périodicité"
                            value={formData.autrePeriodicite}
                            onChange={handleChange}
                            className="outline-none border p-3 rounded w-full sm:w-1/2 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                        />
                        <select
                            name="uniteDuree"
                            value={formData.unitPeriodicite}
                            onChange={handleChange}
                            className="outline-none border p-3 rounded w-full sm:w-auto focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                        >
                            <option value="An">An</option>
                            <option value="Mois">Mois</option>
                            <option value="Semaines">Semaines</option>
                        </select>
                    </div>
                )}
            </div>


            {/* Durée d’engagement */}
            <div className="my-8">
                <p className="font-semibold text-center mb-4">Durée d'engagement</p>
                <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
                    <input
                        type="number"
                        name="duree"
                        min={0}
                        onwheel={handleWheel}
                        placeholder="Durée"
                        value={formData.duree}
                        onChange={handleChange}
                        className="outline-none border p-3 rounded w-full sm:w-1/2 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
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

            {/* Bouton de validation */}
            <button
                type="submit"
                className="bg-normal-yellow text-white text-lg font-bold w-full mt-5 py-3 rounded-lg hover:opacity-90 transition"
            >
                Je m’engage
            </button>
        </form>
    );
};

export default FormPayRect;
