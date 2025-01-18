import Navbar from './Navbar'
import React from "react";
export default function Layout({ children}: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="-mt-16"><main className="bg-black min-h-screen">{children}</main></div>
        </>
    )
}