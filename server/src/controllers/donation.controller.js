import { prisma } from '../../lib/prisma.js';
import { donationSchema } from '../schemas/index.js';

export const initiateDonation = async (req, res) => {
  try {
    // 1. Validation Zero Trust
    const validatedData = donationSchema.parse(req.body);

    // 2. Création du don en attente
    const donation = await prisma.donation.create({
      data: {
        amount: validatedData.amount,
        email: validatedData.email,
        phone: validatedData.phone,
        method: validatedData.method,
        type: validatedData.type,
        status: 'PENDING',
      }
    });

    // 3. TODO: Appeler l'API Hub2 pour obtenir l'URL de paiement
    // Pour l'instant, on simule une URL
    const paymentUrl = `https://checkout.hub2.io/pay/${donation.id}`;

    res.status(200).json({ 
      message: "Don initialisé",
      paymentUrl,
      donationId: donation.id 
    });

  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Donation Error:", error);
    res.status(500).json({ error: "Impossible d'initialiser le don." });
  }
};
