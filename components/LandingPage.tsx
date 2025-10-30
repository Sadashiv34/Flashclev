import React, { useState } from 'react';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import AboutUsModal from './AboutUsModal';
import ContactUsModal from './ContactUsModal';

const HeroIllustration: React.FC = () => (
    <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-20"></div>
        <svg viewBox="0 0 400 300" className="relative z-10">
            <defs>
                <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#86EFAC" />
                    <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <path d="M250 280 Q200 320 150 280 T250 280" fill="#E5E7EB" />
            <path d="M160,210 C130,210 110,180 110,150 C110,110 140,80 180,80 C220,80 250,110 250,150 C250,170 240,190 230,200 L210,240 C200,260 180,260 170,240 L160,210 Z" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="2"/>
            <circle cx="165" cy="120" r="12" fill="#34D399" filter="url(#glow)"/>
            <circle cx="200" cy="120" r="12" fill="#A78BFA" filter="url(#glow)"/>
            <path d="M280 220 H340 V235 H280z M280 238 H340 V253 H280z M280 256 H340 V271 H280z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
            <path d="M310,218 L310,150 Q310,130 290,130 L205,120" stroke="#9CA3AF" strokeDasharray="4 2" strokeWidth="1.5" fill="none" />
            <circle cx="202" cy="120" r="3" fill="#A78BFA" />
            <circle cx="310" cy="218" r="3" fill="#34D399" />
            <g transform="translate(295, 100)">
                <path d="M0,0 A15,15 0 0,1 15,15 L15,0 Z" fill="#34D399" opacity="0.8"/>
                <path d="M0,0 A15,15 0 0,0 -15,15 L-15,0 Z" fill="#34D399" opacity="0.5"/>
                <circle cx="0" cy="0" r="3" fill="white"/>
            </g>
        </svg>
    </div>
);


const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-shadow duration-300">
        <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    const [isPrivacyPolicyVisible, setIsPrivacyPolicyVisible] = useState(false);
    const [isTermsVisible, setIsTermsVisible] = useState(false);
    const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);
    const [isContactUsVisible, setIsContactUsVisible] = useState(false);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                 <header className="py-6">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-800">Flashclev</span>
                    </div>
                </header>
                <main className="flex-grow">
                    <section className="py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Turn Book Knowledge into Real-Life Growth
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                                Discover books that match your goals, understand their core ideas deeply, and apply them to truly stand out in life.
                            </p>
                            <button
                                onClick={onStart}
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-violet-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                            >
                                Start Your Journey
                            </button>
                        </div>
                        <div className="hidden lg:block">
                            <HeroIllustration />
                        </div>
                    </section>
                    
                    <section className="py-16 sm:py-24">
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard 
                                icon={<svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 13a2 2 0 012-2h2a2 2 0 012 2m-4 0h4m-4 0l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13h6" /></svg>}
                                title="Goal-Based Discovery"
                            >
                                Find books tailored to your aspirations. Tell us your goal, we’ll suggest the perfect read.
                            </FeatureCard>
                            <FeatureCard 
                                icon={<svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                                title="Deep Understanding & Clarity"
                            >
                                Engage with actionable questions and insightful prompts to truly grasp key concepts.
                            </FeatureCard>
                            <FeatureCard 
                                icon={<svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                                title="Articulate Your Learning"
                            >
                                Solidify knowledge by writing your own summaries and reflections in your own words.
                            </FeatureCard>
                        </div>
                    </section>
                </main>
            </div>
            <footer className="bg-slate-100 mt-auto">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsTermsVisible(true); }} className="hover:text-gray-800 cursor-pointer">Terms & Conditions</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsPrivacyPolicyVisible(true); }} className="hover:text-gray-800 cursor-pointer">Privacy Policy</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsContactUsVisible(true); }} className="hover:text-gray-800 cursor-pointer">Contact Us</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsAboutUsVisible(true); }} className="hover:text-gray-800 cursor-pointer">About Us</a>
                    </div>
                </div>
            </footer>
            {isPrivacyPolicyVisible && <PrivacyPolicyModal onClose={() => setIsPrivacyPolicyVisible(false)} />}
            {isTermsVisible && <TermsAndConditionsModal onClose={() => setIsTermsVisible(false)} />}
            {isAboutUsVisible && <AboutUsModal onClose={() => setIsAboutUsVisible(false)} />}
            {isContactUsVisible && <ContactUsModal onClose={() => setIsContactUsVisible(false)} />}
        </div>
    );
};

export default LandingPage;