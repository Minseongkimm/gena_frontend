import "../styles/globals.css";

export const metadata = {
  title: 'Gena Dashboard',
  description: 'Gena AI Chart Dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f6f8fb]">
          <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
            <a 
            href="/dashboards"
            className="flex items-center gap-3 px-4 py-4 ml-3 md:ml-0 md:px-6 md:py-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-tr from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M9 17V9m4 8V5m4 12v-6" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-base sm:text-lg text-gray-900">Gena AI</div>
                <div className="text-xs text-gray-400 hidden md:block">Dashboard, Charts</div>
              </div>
            </a>
            <div className="px-6 pt-6 pb-2 text-xs text-gray-400 tracking-wide hidden md:block">
              Navigation
            </div>
            <nav className="px-6 hidden md:block">
              <ul>
                <li>
                  <a
                    href="/dashboards"
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md bg-white shadow-sm border border-gray-100 text-xs text-gray-900 font-medium hover:bg-blue-50 transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                    <span>Dashboards</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="px-6 py-4  mt-auto hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">M</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Minseong Kim</div>
                  <div className="text-xs text-gray-400">Gena AI frontend</div>
                </div>
              </div>
            </div>
          </aside>
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
