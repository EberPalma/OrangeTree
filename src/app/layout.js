
"use client"

import { useEffect } from "react";

//* Next auth imports
import Provider from "./components/provider";

//* Styles
import "../styles/bootstrap.min.css";
import "../styles/styles.css";
// import "../styles/bootstrap.bundle.min.js";

//* Fontawesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

//* Font
import { nunito } from "@/fonts/fonts";

// * Components
import Nav from "./components/nav";

library.add(fas, far, fab);

export const metadata = {
    title: "Orange Tree",
    description: "Generated by create next app"
};

export default function RootLayout ({ children }) {
    useEffect(() => {
        require("../styles/bootstrap.bundle.min.js");
    }, []);

    return (
        <html lang='es-MX' className={nunito.className}>
            <body>
                <Provider>
                    <header>
                        <Nav />
                    </header>
                    <main className='main-content container'>
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
}
