import React, { useRef, useState } from 'react';

const FormPayRect = () => {
    const inputRef = useRef(null);

    const [error, setError] = useState('');


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
        moyen_paiement: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...formData, [name]: value };
        setFormData(newForm);

        // Appelle la validation live
        const msg = validateDureeEtPeriodicite(newForm);
        setError(msg);
    }

    const validateDureeEtPeriodicite = (form) => {
        let periodeEnMois = 0;
        let dureeEnMois = 0;

        if (form.periodicite === "Mensuel") periodeEnMois = 1;
        else if (form.periodicite === "Trimestriel") periodeEnMois = 3;
        else if (form.periodicite === "Annuel") periodeEnMois = 12;
        else if (form.periodicite === "Autre") {
            const val = parseInt(form.autrePeriodicite);
            const unit = form.unitPeriodicite;
            if (unit === "An") periodeEnMois = val * 12;
            else if (unit === "Mois") periodeEnMois = val;
        }

        if (form.uniteDuree === "An") dureeEnMois = parseInt(form.duree) * 12;
        else if (form.uniteDuree === "Mois") dureeEnMois = parseInt(form.duree);

        if (periodeEnMois > 0 && dureeEnMois > 0 && dureeEnMois < periodeEnMois) {
            return "La durée d'engagement doit être supérieure ou égale à la périodicité.";
        }

        if (periodeEnMois > 0 && dureeEnMois % periodeEnMois !== 0) {
            return "La durée d'engagement doit être un multiple de la périodicité.";
        }

        return "";
    }

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
        const msg = validateDureeEtPeriodicite(formData);
        if (msg) {
            setError(msg);
            return;
        }

        setError("");
        console.log("✅ Données envoyées :", {
            ...formData,
            periodicite: formData.periodicite === 'Autre'
                ? formData.autrePeriodicite + " " + formData.unitPeriodicite
                : formData.periodicite,
        });
    };

    const isFormValid = () => {
        const requiredFields = ['nom', 'prenoms', 'email', 'whatsapp', 'montant', 'duree', 'periodicite'];

        // Vérifie les champs de base
        for (let field of requiredFields) {
            if (!formData[field]) return false;
        }

        // Si périodicité est "Autre", il faut aussi vérifier les sous-champs
        if (formData.periodicite === "Autre") {
            if (!formData.autrePeriodicite || !formData.unitPeriodicite) return false;
        }

        return true;
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
                onWheel={handleWheel}
                placeholder="Montant"
                value={formData.montant}
                onChange={handleChange}
                className="outline-none border p-3 rounded w-full focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
            />
            <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 my-8">

                {/* Périodicité */}
                <div className="w-full md:w-1/2">
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
                        <div className="mt-5 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <input
                                type="number"
                                name="autrePeriodicite"
                                min={0}
                                onWheel={handleWheel}
                                placeholder="Entrez la périodicité"
                                value={formData.autrePeriodicite}
                                onChange={handleChange}
                                className="outline-none border p-3 rounded w-full sm:w-1/2 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                            />
                            <select
                                name="unitPeriodicite"
                                value={formData.unitPeriodicite}
                                onChange={handleChange}
                                className="outline-none border p-3 rounded w-full sm:w-auto focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                            >
                                <option value="An">An</option>
                                <option value="Mois">Mois</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Durée d’engagement */}
                <div className="w-full md:w-1/2 md:mt-0 mt-8">
                    <p className="font-semibold text-center mb-4">Durée d'engagement</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input
                            type="number"
                            name="duree"
                            min={0}
                            onWheel={handleWheel}
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
                        </select>
                    </div>
                </div>
            </div>

            {error && (
                <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                <button
                    type="submit"
                    disabled={error || !isFormValid()}
                    className={`${(error || !isFormValid())
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-normal-yellow cursor-pointer hover:opacity-90'
                        } text-[#1e1e1e] text-lg font-semibold w-1/2 px-6 py-3 rounded-lg transition`}
                >
                    Je m’engage
                </button>

            </div>

        </form>
    );
};

export default FormPayRect;
