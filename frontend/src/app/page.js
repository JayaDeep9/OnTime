import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white relative">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 text-center relative">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Real-Time Train Tracking<br />
          <span className="text-blue-500">Made Simple.</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Get accurate live train status, track delays, save your favourite routes,
          and receive instant updates — all in one seamless dashboard.
        </p>

        {/* Decorative Rings */}
        <div className="absolute left-1/2 -translate-x-1/2 top-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-40 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">🚆 Live Train Status</h3>
          <p className="text-gray-400">
            Get real-time updates on any train with accurate delay information.
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">⭐ Save Your Routes</h3>
          <p className="text-gray-400">
            Bookmark your frequent travel routes and receive instant updates.
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">📍 Smart Station Search</h3>
          <p className="text-gray-400">
            Auto-suggest stations with instant matching for faster searches.
          </p>
        </div>
      </section>

      {/* SECOND HERO / PREVIEW SECTION */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Train Delay Tracker
            </h1>

            <p className="text-gray-300 max-w-2xl">
              Get live train running status, delay alerts and save your favourite routes.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="/search"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium shadow"
              >
                Search Trains
              </Link>

              <Link
                href="/signup"
                className="inline-block border border-gray-700 px-6 py-3 rounded-lg text-gray-200 hover:bg-gray-800"
              >
                Create Account
              </Link>
            </div>

            <div className="flex gap-6 mt-8 text-sm text-gray-400">
              <div>
                <div className="text-white font-semibold">Realtime Status</div>
                <div>Live running status updates</div>
              </div>

              <div>
                <div className="text-white font-semibold">Saved Routes</div>
                <div>Delay alerts for your routes</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PREVIEW */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl border border-gray-800">
            <div className="flex flex-col gap-4">

              {/* Upcoming Trains */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400">Next arrivals (sample)</div>

                <div className="mt-3 space-y-3">

                  {/* TRAIN 1 */}
                  <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                    <div>
                      <div className="text-xs text-gray-400">
                        12733 • Narayanadri Express
                      </div>
                      <div className="font-semibold">
                        Departs 06:15 — Rajahmundry
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-300 font-bold">25m</div>
                      <div className="text-xs text-gray-400">Delayed</div>
                    </div>
                  </div>

                  {/* TRAIN 2 */}
                  <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                    <div>
                      <div className="text-xs text-gray-400">
                        12805 • Visakha Express
                      </div>
                      <div className="font-semibold">Departs 07:00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">On time</div>
                      <div className="text-xs text-gray-400">0m</div>
                    </div>
                  </div>

                  {/* TRAIN 3 */}
                  <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                    <div>
                      <div className="text-xs text-gray-400">
                        17643 • Circar Express
                      </div>
                      <div className="font-semibold">
                        Departs 08:30 — Samalkot
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-300 font-bold">45m</div>
                      <div className="text-xs text-gray-400">Delayed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-sm text-gray-400">Saved Routes</div>
                  <div className="font-semibold mt-2">3</div>
                </div>

                <div className="p-4 bg-gray-900 rounded-lg text-center">
                  <div className="text-sm text-gray-400">Daily Searches</div>
                  <div className="font-semibold mt-2">26</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <h2 className="text-xl font-bold">Start tracking trains now</h2>
          <p className="text-gray-400 mt-1">Real-time delay updates and routing</p>

          <div className="flex justify-center gap-4 mt-5">
            <Link
              href="/search"
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Search
            </Link>

            <Link
              href="/signup"
              className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
            >
              Register
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-10">
        © {new Date().getFullYear()} Train Delay Tracker. All rights reserved.
      </footer>
    </div>
  );
}
