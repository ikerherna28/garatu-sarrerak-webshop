
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Navbar';

const Footer: React.FC = () => (
    <footer className="bg-black/50 border-t border-white/10 pt-20 pb-10 px-6 mt-auto">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <Logo />
                <p className="text-white/40 text-sm max-w-sm mt-6">Euskal Herriko eszena underground eta mainstream-erako sarreren plataforma nagusia. Artistak eta hurrengo belaunaldiko zaleak konektatzen.</p>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Lotura azkarrak</h4>
                <ul className="space-y-4 text-white/60 text-sm font-medium">
                    <li><Link to="/" className="hover:text-primary transition-colors">Nor gara</Link></li>
                    <li><Link to="/" className="hover:text-primary transition-colors">Aretoak</Link></li>
                    <li><Link to="/" className="hover:text-primary transition-colors">Sarrerak saldu</Link></li>
                    <li><Link to="/" className="hover:text-primary transition-colors">Laguntza</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Komunitatea</h4>
                <div className="flex gap-4">
                    <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-xl">share</span>
                    </a>
                    <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-xl">camera</span>
                    </a>
                    <a className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all" href="#">
                        <span className="material-symbols-outlined text-xl">music_note</span>
                    </a>
                </div>
            </div>
        </div>
        <div className="max-w-[1200px] mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-widest">
            <p>© 2026 GARATU SARRERAK. ESKUBIDE GUZTIAK ERRESERBATUTA.</p>
            <div className="flex gap-8">
                <a className="hover:text-white transition-colors" href="#">Pribatutasun Politika</a>
                <a className="hover:text-white transition-colors" href="#">Zerbitzu Baldintzak</a>
            </div>
        </div>
    </footer>
);

export default Footer;
