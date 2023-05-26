import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from '../components/Layout/Donation/DonationForm';
import styles from './DonationPage.module.css';

// Replace 'your_stripe_public_key' with your actual Stripe public key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState(10);

  const handleDonationAmountChange = (e) => {
    setDonationAmount(parseInt(e.target.value));
  };

  const handleDonationSuccess = (paymentMethod) => {
    // Handle successful donation payment
    console.log('Donation payment succeeded:', paymentMethod);
  };

  return (
    <div className={styles.donationPage}>
      <h1 className={styles.donationPageHeader}>Make a Donation</h1>
      <div className={styles.donationFormContainer}>
        <label htmlFor="donationAmount" className={styles.donationAmountLabel}>
          Donation Amount ($)
        </label>
        <input
          type="number"
          id="donationAmount"
          className={styles.donationAmountInput}
          value={donationAmount}
          onChange={handleDonationAmountChange}
        />
        <Elements stripe={stripePromise}>
          <DonationForm
            donationAmount={donationAmount}
            onSuccess={handleDonationSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default DonationPage;
