import React, { useRef, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { indicatifs } from "../data/CountryCodes";

const FormPayRect = () => {
  const inputRef = useRef(null);

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { handleValue } = useOutletContext();

  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    telephone: "",
    indicatif: "",
    periodicite: "",
    autrePeriodicite: "",
    unitPeriodicite: "",
    duree: "",
    uniteDuree: "An",
    montant: "",
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
    setFormData((prev) => ({ ...prev, periodicite: value }));
  };

  const handleWheel = (e) => {
    if (document.activeElement === inputRef.current) {
      e.preventDefault();
    }
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenoms: "",
      email: "",
      telephone: "",
      periodicite: "",
      autrePeriodicite: "",
      unitPeriodicite: "",
      duree: "",
      uniteDuree: "An",
      montant: "",
    });
    setIsValid(false);
    setError("");
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
      telephone: `${formData.indicatif}${formData.telephone}`,
      montant_total: parseFloat(formData.montant),
      periodicite:
        formData.periodicite === "Autre"
          ? `${formData.autrePeriodicite} ${formData.unitPeriodicite}`
          : formData.periodicite,
      duree: `${formData.duree} ${formData.uniteDuree}`,
    };

    try {
      const response = await fetch(
        "https://s2c-platform.onrender.com/api/engagements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Une erreur est survenue.");
      }

      const result = await response.json();
      console.log("✅ Engagement enregistré avec succès :", result);

      setIsValid(true);
      handleValue(true);
    } catch (err) {
      console.error("❌ Erreur lors de l'envoi :", err.message);
      setError(err.message);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "nom",
      "prenoms",
      "email",
      "telephone",
      "montant",
      "duree",
      "periodicite",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) return false;
    }

    if (formData.periodicite === "Autre") {
      if (!formData.autrePeriodicite || !formData.unitPeriodicite) return false;
    }

    return true;
  };

  return !isValid ? (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          className="outline-none border p-3 rounded w-full mb-5 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
          required
        />

        <input
          type="text"
          name="prenoms"
          placeholder="Prénoms"
          value={formData.prenoms}
          onChange={handleChange}
          className="outline-none border p-3 rounded w-full mb-5 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="outline-none border p-3 rounded w-full mb-5 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70 col-span-1 sm:col-span-2"
          required
        />

        {/* Numéro avec indicatif sur une ligne complète */}
        <div className="flex gap-3 items-center mb-5 col-span-1 sm:col-span-2">
          <select
            name="indicatif"
            value={formData.indicatif}
            onChange={handleChange}
            className="outline-none border p-3 rounded w-1/4 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
            required
          >
            {indicatifs.map((item) => (
              <option key={item.name} value={item.dial_code}>
                {item.name} ({item.dial_code})
              </option>
            ))}
          </select>

          <input
            type="text"
            name="telephone"
            placeholder="Numéro de téléphone"
            value={formData.telephone}
            onChange={handleChange}
            className="outline-none border p-3 rounded flex-1 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
            required
          />
        </div>
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
          className={`${
            error || !isFormValid()
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-normal-yellow cursor-pointer hover:opacity-90"
          } text-[#1e1e1e] text-lg font-semibold lg:w-1/2 px-6 py-3 rounded-lg transition`}
        >
          Je m’engage
        </button>
      </div>
    </form>
  ) : (
    <div className="text-center my-10">
      <>
        <p className="mt-6 italic text-xl">
          Vous avez reçu les informations de paiement par mail !
        </p>
        <br />
        <p className="italic font-bold text-normal-purple text-xl">
          Que DIEU vous bénisse !!
        </p>
        <button className="mt-6 bg-normal-yellow text-[#222] py-2 px-4 rounded hover:bg-yellow-400 transition">
          <Link to="/">Retour à l'accueil</Link>
        </button>
      </>
    </div>
  );
};

export default FormPayRect;
