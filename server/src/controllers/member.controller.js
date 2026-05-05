import { prisma } from '../../lib/prisma.js';
import { memberSchema } from '../schemas/index.js';

export const registerMember = async (req, res) => {
  try {
    // 1. Validation Zero Trust
    const validatedData = memberSchema.parse(req.body);

    // 2. Vérification existence
    const existingMember = await prisma.member.findUnique({
      where: { email: validatedData.email }
    });

    if (existingMember) {
      return res.status(400).json({ error: "Cet email est déjà inscrit." });
    }

    // 3. Création
    const member = await prisma.member.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        countryCode: validatedData.countryCode,
        phone: validatedData.phone,
      }
    });

    // TODO: Envoyer email de confirmation via Nodemailer

    res.status(201).json({ 
      message: "Inscription réussie !",
      member: { id: member.id, email: member.email }
    });

  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Register Error:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription." });
  }
};
