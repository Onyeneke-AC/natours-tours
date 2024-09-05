import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PvHr4051Hp6Kkvxjezo3zbjCdMkWgRKuTEwoQfWnPgnSfIheeohFC9FNtBIEUWxLhwCesMbg8TgaAVPMf0Pjitb00F3XMlzMb',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
