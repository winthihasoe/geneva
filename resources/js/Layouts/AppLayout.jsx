import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import FlashMessage from "@/Components/FlashMessage";

function AppLayout({ children }) {
    return (
        <>
            <FlashMessage />
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.6 }}
            >
                {children}
            </motion.main>
            <Footer />
        </>
    );
}

export default AppLayout;
