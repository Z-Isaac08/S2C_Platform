import React, { useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router';

const FormPayRect = () => {
    const inputRef = useRef(null);

    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const { handleValue } = useOutletContext();

    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        telephone: '',
        periodicite: '',
        autrePeriodicite: '',
        unitPeriodicite: '',
        duree: '',
        uniteDuree: 'An',
        montant: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = { ...formData, [name]: value };
        setFormData(newForm);

        const msg = validateDureeEtPeriodicite(newForm);
        setError(msg);
    };

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
    };

    const handleRadioChange = (value) => {
        setFormData(prev => ({ ...prev, periodicite: value }));
    };

    const handleWheel = (e) => {
        if (document.activeElement === inputRef.current) {
            e.preventDefault();
        }
    };

    const resetForm = () => {
        setFormData({
            nom: '',
            prenoms: '',
            email: '',
            telephone: '',
            periodicite: '',
            autrePeriodicite: '',
            unitPeriodicite: '',
            duree: '',
            uniteDuree: 'An',
            montant: '',
        });
        setIsValid(false);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msg = validateDureeEtPeriodicite(formData);
        if (msg) {
            setError(msg);
            return;
        }

        setError("");

        const dataToSend = {
            nom: formData.nom,
            prenom: formData.prenoms,
            email: formData.email,
            telephone: formData.telephone,
            montant_total: parseFloat(formData.montant),
            periodicite: formData.periodicite === "Autre"
                ? `${formData.autrePeriodicite} ${formData.unitPeriodicite}`
                : formData.periodicite,
            duree: `${formData.duree} ${formData.uniteDuree}`
        };

        try {
            const response = await fetch('http://localhost:5000/api/engagements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Une erreur est survenue.');
            }

            const result = await response.json();
            console.log('✅ Engagement enregistré avec succès :', result);

            setIsValid(true);
            handleValue(true);
        } catch (err) {
            console.error("❌ Erreur lors de l'envoi :", err.message);
            setError(err.message);
        }
    };

    const isFormValid = () => {
        const requiredFields = ['nom', 'prenoms', 'email', 'telephone', 'montant', 'duree', 'periodicite'];

        for (let field of requiredFields) {
            if (!formData[field]) return false;
        }

        if (formData.periodicite === "Autre") {
            if (!formData.autrePeriodicite || !formData.unitPeriodicite) return false;
        }

        return true;
    };

    return (
        !isValid ? (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                    <input type="text" name="prenoms" placeholder="Prénoms" value={formData.prenoms} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
                    <input type="text" name="telephone" placeholder="Numéro de téléphone" value={formData.telephone} onChange={handleChange} className="outline-none border p-3 rounded w-full mb-8 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70" />
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

                {/* Le reste du formulaire reste inchangé */}

            </form>
        ) : (
            <div className="text-center my-10">
                <>
                    <p className="mt-6 italic text-xl">Vous avez reçu les informations de paiement par mail !</p>
                    <br />
                    <p className='italic font-bold text-normal-purple text-xl'>
                        Que DIEU vous bénisse !!
                    </p>
                    <button
                        onClick={resetForm}
                        className="mt-6 bg-normal-yellow cursor-pointer text-[#222] py-2 px-4 rounded hover:bg-yellow-400 transition"
                    >
                        <Link to={"/"}>Retour à l'accueil</Link>
                    </button>
                </>
            </div>
        )
    );
};

export default FormPayRect;
