export const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000", // error page
    paypal: { // paypal sandbox
        currency: import.meta.env.VITE_PAYPAL_CURRENCY ?? "AUD",
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
        intent: "CAPTURE",
  },
}