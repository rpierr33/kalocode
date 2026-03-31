import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../utils/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5252/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5252/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Pay Now
      </Button>
      <Dialog
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(10px)", // Adds the blur effect
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
          },
          "& .MuiPaper-root": {
            padding: 4,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm handleClose={handleClose} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Payment;
