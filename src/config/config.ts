
 interface AppConfig {
    apiBaseUrl: string;
    paypal: {
        clientId: string;
        currency: string;
        intent: string;
    };
    google: {
        clientId: string;
};
}

const config: AppConfig = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000", // error page
    paypal: { // paypal sandbox
        currency: import.meta.env.VITE_PAYPAL_CURRENCY ?? "AUD",
        clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
        intent: "CAPTURE",
    },
    google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENTID,
    }
}

export default config;