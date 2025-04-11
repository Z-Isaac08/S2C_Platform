import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const modes = [
    { id: 'carte', label: 'Carte Bancaire', img: '/card.png' },
    { id: 'moov', label: 'Moov Money', img: '/moov.png' },
    { id: 'mtn', label: 'MTN MoMo', img: '/mtn.png' },
    { id: 'orange', label: 'Orange Money', img: '/orange.png' },
    { id: 'wave', label: 'Wave', img: '/wave.png' },
];

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

    const navigate = useNavigate()

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

        let periodeEnMois = 0;

        if (formData.periodicite === "Mensuel") periodeEnMois = 1;
        else if (formData.periodicite === "Trimestriel") periodeEnMois = 3;
        else if (formData.periodicite === "Annuel") periodeEnMois = 12;
        else if (formData.periodicite === "Autre") {
            const unit = formData.unitPeriodicite;
            const val = parseInt(formData.autrePeriodicite);
            if (unit === "An") periodeEnMois = val * 12;
            else if (unit === "Mois") periodeEnMois = val;
        }

        let dureeEnMois = 0;
        if (formData.uniteDuree === "An") dureeEnMois = parseInt(formData.duree) * 12;
        else if (formData.uniteDuree === "Mois") dureeEnMois = parseInt(formData.duree);

        if (periodeEnMois > 0 && dureeEnMois > 0 && dureeEnMois < periodeEnMois) {
            setError("La durée d'engagement doit être supérieure ou égale à la périodicité.");
            return;
        }

        if (periodeEnMois > 0 && dureeEnMois % periodeEnMois !== 0) {
            setError("La durée d'engagement doit être un multiple de la périodicité.");
            return;
        }

        setError("");

        console.log("✅ Données envoyées :", {
            ...formData,
            periodicite: formData.periodicite === 'Autre' ? formData.autrePeriodicite + " " + formData.unitPeriodicite : formData.periodicite,
        });
    };

    const goToChoix = () => navigate('/soutien') 

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
                            onWheel={handleWheel}
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
                    </select>
                </div>
            </div>

            {/* Mode de paiement */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Mode de paiement</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {modes.map((mode) => (
                        <button
                            key={mode.id}
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, moyen_paiement: mode.id }))
                            }
                            className={`border rounded-lg p-3 text-center transition duration-200 ${formData.moyen_paiement === mode.id
                                ? 'border-normal-yellow bg-yellow-50 font-semibold'
                                : 'hover:border-normal-yellow'
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

            {error && (
                <div className="text-red-600 text-sm text-center mb-4">{error}</div>
            )}

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
                    className="bg-normal-yellow cursor-pointer text-[#1e1e1e] text-lg font-semibold w-1/2 px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    Je m’engage
                </button>
            </div>

        </form>
    );
};

export default FormPayRect;
