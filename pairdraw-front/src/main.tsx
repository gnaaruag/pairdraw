import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';


import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

Sentry.init({
  dsn: "https://33a62e0bc5803b0b090e3100716d09b4@o4507855881502720.ingest.de.sentry.io/4507855888777296",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

 
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
      afterSignUpUrl="/home"
      afterSignInUrl="/home"
>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)