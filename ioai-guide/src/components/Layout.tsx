import Navbar from './Navbar'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="-mt-16"><main className="bg-black min-h-screen">{children}</main></div>
        </>
    )
}