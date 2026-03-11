import React, { useState } from 'react';
import Scene from './components/Scene';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const closeOverlay = () => setActiveSection(null);

  return (
    <div className="relative w-full h-full bg-gray-50 text-gray-900 pointer-events-none">
      
      {/* Overlay UI Layer - Main */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-between p-8 pointer-events-none transition-all duration-1000 ${activeSection ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        <header className="w-full max-w-7xl flex justify-between items-center pointer-events-auto">
          <h1 className="text-2xl font-bold tracking-tight">Alfian<span className="text-indigo-600">.</span></h1>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Work</a>
            <a href="#" className="hover:text-indigo-600 transition-colors font-medium">About</a>
            <a href="#" className="hover:text-indigo-600 transition-colors font-medium">Contact</a>
          </nav>
        </header>

        <main className={`text-center transition-all duration-700 mt-20 md:mt-0 ${isStarted ? 'opacity-0 pointer-events-none translate-y-[-20px]' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Creative <br className="md:hidden" /> Developer
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Building immersive and interactive digital experiences with WebGL.
          </p>
          <button 
            onClick={() => setIsStarted(true)}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:scale-105"
          >
            Start
          </button>
        </main>

        <div className={`pointer-events-auto text-sm text-gray-400 font-medium tracking-wider flex flex-col items-center transition-opacity duration-700 ${!isStarted && !activeSection ? 'opacity-100' : 'opacity-0'}`}>
          <span>DRAG TO ROTATE SCENE</span>
          <span className="mt-2 text-indigo-500 animate-pulse font-bold">KLIK KEYBOARD / PC / KURSI / BUKU / PINTU / FOTO / DIPLOMA</span>
        </div>
      </div>

      {/* TECH STACK overlay (Keyboard) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'keyboard' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Tech Stack & Projects</h3>
          <p className="text-gray-700 mb-6 font-medium">Teknologi utama yang saya gunakan untuk membangun solusi digital.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold shadow-sm">Flutter</span>
            <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl font-semibold shadow-sm">React</span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl font-semibold shadow-sm">JS</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold shadow-sm">Node.js</span>
          </div>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* EDUKASI overlay (Bookshelf) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'bookshelf' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Edukasi & Pengalaman</h3>
          <p className="text-gray-700 mb-6 font-medium">Latar belakang pendidikan dan perjalanan karir saya.</p>
          <ul className="text-left space-y-4 mb-8 w-fit mx-auto text-gray-800 font-semibold">
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> S1 Universitas Muria Kudus (UMK)</li>
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> PPG Universitas Negeri Semarang (Unnes)</li>
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> Pengalaman menjadi Guru</li>
          </ul>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* SETUP & GEAR overlay (PC Case) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'pc' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Setup & Gear</h3>
          <p className="text-gray-700 mb-6 font-medium">Senjata utama andalan dalam mengetik ribuan baris kode.</p>
          <ul className="text-left space-y-4 mb-8 w-fit mx-auto text-gray-800 font-semibold">
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="text-emerald-500 text-xl">💻</span> Macbook Pro M2 / Ryzen Custom PC</li>
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="text-emerald-500 text-xl">⌨️</span> Keychron K2 Mechanical Keyboard</li>
            <li className="flex items-center gap-4 bg-white/30 px-4 py-2 rounded-lg"><span className="text-emerald-500 text-xl">🖥️</span> Dual LG 27-inch 4K Monitors</li>
          </ul>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* EXPERIENCE overlay (Chair) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'chair' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(217,70,239,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Pengalaman & Gaya</h3>
          <p className="text-gray-700 mb-8 font-medium">Remote worker yang selalu siap *online* di segala zona waktu.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/40 p-4 rounded-xl shadow-sm text-left">
              <span className="block text-fuchsia-600 font-black text-2xl mb-1">3+</span>
              <span className="text-xs font-bold text-gray-600 tracking-wider">TAHUN PENGALAMAN</span>
            </div>
            <div className="bg-white/40 p-4 rounded-xl shadow-sm text-left">
              <span className="block text-fuchsia-600 font-black text-2xl mb-1">100%</span>
              <span className="text-xs font-bold text-gray-600 tracking-wider">REMOTE WORK</span>
            </div>
          </div>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* CONTACT overlay (Door) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'contact' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(251,191,36,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Contact Me</h3>
          <p className="text-gray-700 mb-8 font-medium">Tertarik berkolaborasi? Pintu selalu terbuka untuk diskusi!</p>
          <div className="space-y-4 mb-10 text-left w-fit mx-auto font-bold text-gray-800">
            <div className="flex items-center gap-4 bg-white/40 px-6 py-3 rounded-2xl hover:bg-white transition-colors cursor-pointer border border-white/20">
              <span className="text-2xl">📧</span> hi@alfian.dev
            </div>
            <div className="flex items-center gap-4 bg-white/40 px-6 py-3 rounded-2xl hover:bg-white transition-colors cursor-pointer border border-white/20">
              <span className="text-2xl">🔗</span> linkedin.com/in/alfian
            </div>
            <div className="flex items-center gap-4 bg-white/40 px-6 py-3 rounded-2xl hover:bg-white transition-colors cursor-pointer border border-white/20">
              <span className="text-2xl">📱</span> +62 812-3456-7890
            </div>
          </div>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* PHOTO / ABOUT overlay (Wall Frame) */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center p-8 transition-all duration-700 ${activeSection === 'photo' ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-w-lg w-full text-center">
          <h3 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">Tentang Saya</h3>
          <div className="w-32 h-32 bg-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-inner">👨‍💻</div>
          <p className="text-gray-700 mb-8 font-medium leading-relaxed">
            Seorang antusias teknologi yang percaya bahwa barisan kode bisa menciptakan keajaiban visual. Saya fokus pada pengembangan Web Interaktif dan solusi Digital yang berdampak.
          </p>
          <button onClick={closeOverlay} className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all hover:scale-105 w-full">Kembali</button>
        </div>
      </div>

      {/* R3F Canvas Container */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Scene activeSection={activeSection} onSectionClick={setActiveSection} />
      </div>
    </div>
  );
}

export default App;
