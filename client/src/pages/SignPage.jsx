import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router";
import Hero from "../components/Hero";
import { indicatifs } from "../data/CountryCodes";

const SignPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    indicatif: "",
    telephone: "",
  });
  const [qrData, setQrData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!captchaToken) {
      setErrorMessage("Veuillez valider le reCAPTCHA !");
      return;
    }

    if (!formData.indicatif || !formData.telephone) {
      setErrorMessage("Veuillez renseigner un numéro de téléphone valide.");
      return;
    }    

    const payload = {
      nom: formData.nom,
      prenoms: formData.prenoms,
      email: formData.email,
      telephone: `${formData.indicatif}${formData.telephone}`,
      captcha: captchaToken,
    };    

    try {
      const response = await fetch(
        "https://s2c-platform.onrender.com/api/inscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Une erreur inconnue est survenue.");
        throw new Error(result.error || "Erreur inconnue");
      }

      setQrData(result.qrCode || "");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setQrData("");
    setErrorMessage("");
    setFormData({ nom: "", prenoms: "", email: "", telephone: "", indicatif: "" });
    setCaptchaToken(null);
  };

  return (
    <section className="bg-white text-[#222] font-montserrat mt-[72px]">
      {!qrData ? (
        <Hero
          title={"S'inscrire pour le S2C #3"}
          subtitle={"C'est juste une formalité, t'inquiète ! 😊"}
        />
      ) : (
        <Hero
          title={"Inscription réussie !!!"}
          subtitle={"Tu as reçu ton Code QR par mail."}
        />
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 my-10">
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
            <div className="flex gap-3 items-center mb-8 col-span-1 sm:col-span-2">
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

          <div className="flex flex-col items-center justify-center gap-4">
            {errorMessage && (
              <div className="text-red-600 font-semibold text-center mb-4">
                {errorMessage}
              </div>
            )}

            <ReCAPTCHA
              sitekey="6Ld_RRArAAAAAE3WGo8_qk4x4_Ew-C55CVRUcRUp"
              onChange={(token) => setCaptchaToken(token)}
            />

            <button
              type="submit"
              className="bg-normal-purple w-1/2 mx-auto text-white cursor-pointer py-3 px-8 mt-4 rounded hover:bg-purple-800 transition"
            >
              Je m'inscris
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center my-10">
          {qrData ? (
            <>
              <p className="mt-6 italic text-xl">
                Envie de soutenir l'oeuvre ?
              </p>
              <p className="italic font-bold text-normal-purple text-xl">
                <Link to={"/soutien"}>CLIQUE ICI</Link>
              </p>
            </>
          ) : (
            <p className="text-gray-600 mt-4">Pas de QR Code disponible.</p>
          )}

          <button
            onClick={resetForm}
            className="mt-6 bg-normal-yellow cursor-pointer text-[#222] py-2 px-4 rounded hover:bg-yellow-400 transition"
          >
            Retour au formulaire
          </button>
        </div>
      )}
    </section>
  );
};

export default SignPage;
