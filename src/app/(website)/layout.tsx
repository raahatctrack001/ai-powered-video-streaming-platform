import React from "react";
import LandingPageNavbar from "./_components/LandingPageNavbar";

export default function Layout({ children }: {children: React.ReactNode}){
    return <div>
        <LandingPageNavbar />
        { children }
    </div>
}