import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const produits = [
  {
    _id: "1",
    nom: "T-shirt DevFest",
    prix: 5000,
    tailles: ["S", "M", "L"],
    couleurs: ["Rouge", "Noir"],
  },
  {
    _id: "2",
    nom: "Casquette JS",
    prix: 3000,
    tailles: ["Taille unique"],
    couleurs: ["Bleu"],
  },
];

const colorMap = {
  Rouge: "#e11d48",
  Noir: "#000000",
  Bleu: "#2563eb",
};

const StorePage = () => {
  const [panier, setPanier] = useState(() => {
    const saved = localStorage.getItem("panier");
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({
    nom: "",
    numero: "",
    paiement: "livraison",
  });
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  const ajouterAuPanier = (produit) => {
    const exist = panier.find((p) => p._id === produit._id);
    if (exist) {
      setPanier(
        panier.map((p) =>
          p._id === produit._id ? { ...p, quantite: p.quantite + 1 } : p
        )
      );
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }]);
    }
  };

  const retirerDuPanier = (id) => {
    setPanier(panier.filter((p) => p._id !== id));
  };

  const viderPanier = () => {
    setPanier([]);
  };

  const total = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const nombreArticles = panier.reduce((acc, p) => acc + p.quantite, 0);

  const toggleColor = (produitId, couleur) => {
    setSelectedColors((prev) => {
      const currentColors = prev[produitId];
      if (currentColors === couleur) {
        // Si la couleur est déjà sélectionnée, on la désélectionne
        const copy = { ...prev };
        delete copy[produitId];
        return copy;
      } else {
        // Sinon on remplace la sélection par la nouvelle couleur
        return { ...prev, [produitId]: couleur };
      }
    });
  };

  const handleSubmitCommande = () => {
    console.log("Commande envoyée 🛒", {
      panier,
      utilisateur: form,
      couleursSelectionnees: selectedColors,
    });
    setShowModal(false);
    setPanier([]);
    setShowSidebar(false);
    setSelectedColors({});
    localStorage.removeItem("panier");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Header */}
      <div className="text-center py-20 flex justify-center items-center gap-3">
        <h2 className="text-4xl font-bold text-normal-purple">
          Habille-toi aux couleurs du #
          <span className="text-normal-yellow">S2C</span>
        </h2>
      </div>

      {/* Produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {produits.map((prod) => (
          <div
            key={prod._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <div className="w-full h-70 bg-gray-300 rounded-sm mb-4"></div>
            <h3 className="text-xl font-semibold">{prod.nom}</h3>
            <p className="text-sm mt-2 font-josefin">Prix : {prod.prix} FCFA</p>

            <div className="flex gap-3 mt-3">
              {prod.couleurs.map((couleur) => {
                const isSelected = selectedColors[prod._id] === couleur;
                return (
                  <button
                    key={couleur}
                    onClick={() => toggleColor(prod._id, couleur)}
                    type="button"
                    aria-label={`Couleur ${couleur}`}
                    className={`w-8 h-8 rounded-full border-2 ${
                      isSelected ? "border-normal-yellow" : "border-gray-300"
                    } flex items-center justify-center transition`}
                    style={{ backgroundColor: colorMap[couleur] || couleur }}
                  ></button>
                );
              })}
            </div>

            <button
              onClick={() => ajouterAuPanier(prod)}
              className="mt-4 bg-normal-purple text-white w-full py-2 rounded hover:bg-[#440077] transition"
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>

      {/* Bouton panier fixe à droite (disparu si sidebar ouvert) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed top-1/4 right-4 z-50 bg-normal-purple text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#440077] transition"
          aria-label="Ouvrir le panier"
        >
          <FaShoppingCart className="text-2xl" />
          {nombreArticles > 0 && (
            <span className="absolute -top-2 -right-2 ml-1 text-xs font-bold bg-red-600 rounded-full px-2 py-0.5">
              {nombreArticles}
            </span>
          )}
        </button>
      )}

      {/* Sidebar Panier */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">🧺 Mon panier</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-red-500 text-sm hover:underline"
              >
                Fermer
              </button>
            </div>

            {panier.length === 0 ? (
              <p className="text-gray-500">Aucun article pour le moment.</p>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1">
                {panier.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <h4 className="font-medium text-gray-700">{item.nom}</h4>
                      <p className="text-sm text-gray-500">x{item.quantite}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">
                        {item.prix * item.quantite} FCFA
                      </span>
                      <button
                        onClick={() => retirerDuPanier(item._id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {panier.length > 0 && (
            <div>
              <button
                onClick={viderPanier}
                className="w-full mb-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Vider le panier
              </button>
              <div className="pt-4 border-t text-lg font-semibold flex justify-between">
                <span>Total :</span>
                <span>{total} FCFA</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
              >
                Valider ma commande
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de commande */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl text-normal-purple font-bold mb-4">
              Confirmation de commande
            </h3>

            <input
              type="text"
              placeholder="Nom complet"
              className="outline-none w-full border p-2 rounded mb-3"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className="outline-none w-full border p-2 rounded mb-3"
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
            />
            <select
              className="w-full border p-2 rounded mb-4"
              value={form.paiement}
              onChange={(e) => setForm({ ...form, paiement: e.target.value })}
            >
              <option value="livraison">Payer à la livraison</option>
              <option value="maintenant">Payer maintenant</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="text-gray-500"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="bg-normal-purple text-white px-4 py-2 rounded hover:bg-[#440077]"
                onClick={handleSubmitCommande}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;
