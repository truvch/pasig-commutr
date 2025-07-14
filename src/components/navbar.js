import { useState } from "react"
import { Menu, X } from "lucide-react" 
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={require("../assets/logo.svg").default} alt="Logo" className="w-10 h-10" />
            </div>
            <Link to="/" className="ml-3 text-2xl font-bold tracking-tight text-white select-none hover:text-white/90">
              PasigCommutr
            </Link>
          </div>

          {/* Hamburger Button - Small Screens */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation - Medium+ Screens */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === "/" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/routes" 
              className={`font-medium transition-colors ${
                location.pathname === "/routes" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              Route Archives
            </Link>
            <Link 
              to="/contribute" 
              className={`font-medium transition-colors ${
                location.pathname === "/contribute" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              Contribute
            </Link>
          </nav>
        </div>

        {/* Dropdown Menu - Small Screens */}
        {isOpen && (
          <nav className="mt-4 flex flex-col space-y-2 md:hidden">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === "/" ? "text-white" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/routes" 
              className={`font-medium transition-colors ${
                location.pathname === "/routes" ? "text-white" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Route Archives
            </Link>
            <Link 
              to="/contribute" 
              className={`font-medium transition-colors ${
                location.pathname === "/contribute" ? "text-white" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contribute
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
