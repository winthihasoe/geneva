import React, { createContext, useContext, useState } from "react";

const EmailContext = createContext();

// Create a provider component to wrap around your components that need access to the email.
export function EmailProvider({ children }) {
    const [email, setEmail] = useState("");

    return (
        <EmailContext.Provider value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
}

// Create a hook to easily access the context.
export function useEmail() {
    return useContext(EmailContext);
}
