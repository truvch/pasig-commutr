import logo from '../assets/logo.svg'

function Navbar() {
  return (
    <nav className="bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          {/* Mobile menu button (hidden on sm and up) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="PasigCommutr"
              />
              <span className="text-white text-xl font-semibold">PasigCommutr</span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
      </div>
    </nav>
  );
}

export default Navbar;
