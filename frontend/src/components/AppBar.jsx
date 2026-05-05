export function AppBar() {
  return (
    <header className="w-full bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  fill="url(#g)"
                />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <path
                  d="M7 12h10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 8h10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white text-lg">PayTM</span>
              <span className="text-xs text-white/80 -mt-0.5">
                Smart payments
              </span>
            </div>
          </div>

          {/* Center: Nav (hidden on small screens) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/90">
            <a href="#" className="hover:text-white/100 transition">
              Home
            </a>
            <a href="#" className="hover:text-white/100 transition">
              Payments
            </a>
            <a href="#" className="hover:text-white/100 transition">
              Offers
            </a>
            <a href="#" className="hover:text-white/100 transition">
              More
            </a>
          </nav>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <svg
                className="h-4 w-4 text-white/80 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                ></path>
              </svg>
              <input
                className="bg-transparent placeholder-white/70 text-white text-sm outline-none w-40"
                placeholder="Search transactions, merchants..."
                aria-label="Search"
              />
            </div>

            <button
              className="relative p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Notifications"
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-red-700 bg-white rounded-full">
                3
              </span>
            </button>

            <button
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
              aria-label="Open profile"
            >
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-medium">User</span>
                <span className="text-xs text-white/70">PayTM Member</span>
              </div>
              <svg
                className="h-4 w-4 text-white/90"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
