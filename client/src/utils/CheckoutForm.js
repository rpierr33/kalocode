import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

export default function CheckoutForm({ handleClose }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}
      >
        Secure Payment
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
        style={{ marginBottom: "20px" }}
      />
      <Box
        sx={{ marginTop: 3, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          color="secondary"
          sx={{ padding: "10px 20px", borderRadius: 3 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
            borderRadius: 3,
            fontWeight: "bold",
          }}
          disabled={isProcessing || !stripe || !elements}
        >
          {isProcessing ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
      </Box>
      {message && (
        <Typography
          variant="body2"
          color="error"
          sx={{
            marginTop: 3,
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
