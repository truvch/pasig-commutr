import { useState } from "react"
import { Menu, X } from "lucide-react" 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={require("../assets/logo.svg").default} alt="Logo" className="w-10 h-10" />
            </div>
            <span className="ml-3 text-2xl font-bold tracking-tight text-white select-none">PasigCommutr</span>
          </div>

          {/* Hamburger Button - Small Screens */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation - Medium+ Screens */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-white/80 font-medium">Home</a>
            <a href="#" className="text-white/80 hover:text-white font-medium">Contribute</a>
          </nav>
        </div>

        {/* Dropdown Menu - Small Screens */}
        {isOpen && (
          <nav className="mt-4 flex flex-col space-y-2 md:hidden">
            <a href="#" className="text-white hover:text-white/80 font-medium">Home</a>
            <a href="#" className="text-white/80 hover:text-white font-medium">Contribute</a>
          </nav>
        )}
      </div>
    </header>
  )
}
