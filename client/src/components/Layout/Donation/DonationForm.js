import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_DONATION } from '../../../utils/mutations';
import styles from './DonationForm.module.css';

const DonationForm = ({ donationAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [createDonation, { error }] = useMutation(CREATE_DONATION);

  const handleDonationSubmit = async (event) => {
    event.preventDefault();

    // Create a payment method using the card element
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      console.error('Stripe error:', stripeError);
      return;
    }

    // Process the donation with the payment method
    try {
      const { data } = await createDonation({
        variables: {
          amount: donationAmount,
          paymentMethodId: paymentMethod.id,
        },
      });

      onSuccess(data.createDonation);
    } catch (e) {
      console.error('Donation creation error:', e);
    }
  };

  return (
    <form className={styles.donationForm} onSubmit={handleDonationSubmit}>
      <div className={styles.cardElementContainer}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button type="submit" className={styles.donationButton}>
        Donate ${donationAmount}
      </button>
      {error && <div className={styles.error}>{error.message}</div>}
    </form>
  );
};

export default DonationForm;
