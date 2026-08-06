import 'dotenv/config';

export const createPaymentIntent = async (donation) => {
  const apiKey = process.env.HUB2_API_KEY;
  const apiUrl = process.env.HUB2_API_URL;

  // This is a simplified version of Hub2 API call.
  // In a real scenario, you'd use fetch or axios to call Hub2.
  
  /*
  const response = await fetch(`${apiUrl}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      amount: donation.amount,
      currency: 'XOF',
      purchase_id: donation.id,
      customer: {
        email: donation.email,
        phone: donation.phone
      },
      return_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    })
  });
  const data = await response.json();
  return data.checkout_url;
  */

  // For simulation purposes:
  console.log(`[HUB2] Creating payment for ${donation.amount} XOF (Donation ID: ${donation.id})`);
  return `https://checkout.hub2.io/pay/${donation.id}`;
};
