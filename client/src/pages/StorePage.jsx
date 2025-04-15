import React, { useState } from 'react'

const produits = [
    {
        _id: '1',
        nom: 'T-shirt DevFest',
        prix: 5000,
        tailles: ['S', 'M', 'L'],
        couleurs: ['Rouge', 'Noir'],
    },
    {
        _id: '2',
        nom: 'Casquette JS',
        prix: 3000,
        tailles: ['Taille unique'],
        couleurs: ['Bleu'],
    },
]

const StorePage = () => {
    const [panier, setPanier] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ nom: '', numero: '', paiement: 'livraison' })

    const ajouterAuPanier = (produit) => {
        const exist = panier.find(p => p._id === produit._id)
        if (exist) {
            setPanier(panier.map(p =>
                p._id === produit._id ? { ...p, quantite: p.quantite + 1 } : p
            ))
        } else {
            setPanier([...panier, { ...produit, quantite: 1 }])
        }
    }

    const retirerDuPanier = (id) => {
        setPanier(panier.filter(p => p._id !== id))
    }

    const total = panier.reduce((acc, p) => acc + (p.prix * p.quantite), 0)

    const handleSubmitCommande = () => {
        console.log('Commande envoyée 🛒', {
            panier,
            utilisateur: form
        })

        // Tu peux ici faire un POST vers ton backend
        setShowModal(false)
        setPanier([])
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            {/* Hero section */}
            <div className="text-center py-20">
                <h2 className="text-4xl font-bold text-normal-purple">Habille-toi aux couleurs du #<span className='text-normal-yellow'>S2C</span></h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Produits */}
                <div className="lg:col-span-2 space-y-6">
                    {produits.map(prod => (
                        <div key={prod._id} className="bg-white rounded-xl shadow p-4 text-center flex flex-col">
                            <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
                            <h3 className="text-xl font-semibold">{prod.nom}</h3>
                            <p className="text-sm mt-2 font-josefin">Prix : {prod.prix} FCFA</p>
                            <button
                                onClick={() => ajouterAuPanier(prod)}
                                className="mt-4 bg-normal-purple text-white px-4 py-2 rounded hover:bg-[#440077] transition"
                            >
                                Ajouter
                            </button>
                        </div>
                    ))}
                </div>

                {/* Panier */}
                <div className="bg-white p-5 rounded-2xl shadow space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">🧺 Mon panier</h2>

                    {panier.length === 0 ? (
                        <p className="text-gray-500">Aucun article pour le moment.</p>
                    ) : (
                        <div className="space-y-4">
                            {panier.map(item => (
                                <div key={item._id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <h4 className="font-medium text-gray-700">{item.nom}</h4>
                                        <p className="text-sm text-gray-500">x{item.quantite}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">{item.prix * item.quantite} FCFA</span>
                                        <button onClick={() => retirerDuPanier(item._id)} className="text-red-500 hover:underline text-sm">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}

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

            {/* Modal Formulaire */}
            {showModal && (
                <div className="fixed inset-0 font-montserrat bg-[#111]/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h3 className="text-xl text-normal-purple font-bold mb-4">Confirmation de commande</h3>

                        <input
                            type="text"
                            placeholder="Nom complet"
                            className="outline-none w-full border p-2 rounded mb-3 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
                            value={form.nom}
                            onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        />
                        <input
                            type="tel"
                            placeholder="Numéro de téléphone"
                            className="outline-none w-full border p-2 rounded mb-3 focus:ring-2 focus:border-0 focus:ring-normal-yellow/70"
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
                                className="text-gray-500 cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-normal-purple cursor-pointer text-white px-4 py-2 rounded hover:bg-[#440077]"
                                onClick={handleSubmitCommande}
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StorePage
