import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <span className="text-2xl text-slate-50 font-semibold"><a href="/">IOAI Guide</a></span>
                    <div className="flex space-x-4 text-slate-50">
                        <a href="/admin">Dashboard</a>
                        <a href="/login">Login</a>
                        <a href="/reference">Reference</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}