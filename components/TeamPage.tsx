import React from 'react';
import { Linkedin, Github, Twitter, Globe, ArrowLeft } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
        twitter?: string;
        github?: string;
        linkedin?: string;
        website?: string;
    }
}

interface TeamPageProps {
  onBack: () => void;
}

// Using Unsplash images as placeholders for the team members to demonstrate the grayscale effect
const teamMembers: TeamMember[] = [
    {
        name: "Enrique Gamboa",
        role: "AI & Database Architect",
        bio: "DataEngineer who builds robust APIs, data pipelines, and cloud architectures that keeps Lightning Bounties fast, secure, and scalable. Motivated to bring Bitcoin earning opportunities to Latin America.",
        image: "images/team/enrique.jpg",
        socials: { twitter: "https://x.com/JEGamboaFuentes", github: "https://github.com/jegamboafuentes", linkedin: "https://www.linkedin.com/in/jegamboafuentes/" }
    },
    {
        name: "Will Sutton",
        role: "Product Strategy & Engineering",
        bio: "Full-stack engineer passionate about open-source collaboration models. Co-founder of BosLab biology hackerspace. Leads Lightning Bounties engineering.",
        image: "images/team/will.jpg",
        socials: { twitter: "https://x.com/WillSuttonCodes", github: "https://github.com/sutt", linkedin: "https://www.linkedin.com/in/willsutton17/" }
    },
    {
        name: "Mike Abramo",
        role: "Marketing & Developer Relations",
        bio: "Seasoned crypto researcher leading product design, marketing, and technical writing. Spearheads developer relations strategy. Connects Bitcoin innovation with global open-source communities.",
        image: "images/team/mike.jpg",
        socials: { twitter: "https://x.com/SonnyTheDegen", github: "https://github.com/SonnyMonroe", linkedin: "https://www.linkedin.com/in/michael-abramo/" }
    },
    {
        name: "Pavel Kononov",
        role: "Engineering & Security",
        bio: "Security-focused backend engineer who built merchant payments systems and chip design tools. Architects Lightning Bounties infrastructure and payment security protocols.",
        image: "images/team/pavel.jpg",
        socials: { twitter: "https://x.com/pavelkononov93", github: "https://github.com/super-jaba", linkedin: "https://www.linkedin.com/in/kononovp/" }
    }
];

export const TeamPage: React.FC<TeamPageProps> = ({ onBack }) => {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-black overflow-hidden relative">
             {/* Decorative Background for Header */}
             <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-cyan-100/40 via-purple-100/20 to-transparent dark:from-cyan-900/10 dark:via-purple-900/10 dark:to-transparent rounded-full blur-[100px] opacity-70"></div>
             </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-cyan-800 dark:hover:text-mv-cyan transition-colors mb-12 group font-bold text-sm uppercase tracking-wider font-display bg-white/60 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 backdrop-blur-sm"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="text-center mb-20 relative">
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-950 dark:text-white font-display uppercase tracking-tight mb-8 leading-[0.9] drop-shadow-sm">
                        Meet The <br className="md:hidden"/>
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-20 dark:opacity-40 rounded-full"></span>
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Team</span>
                        </span>
                    </h1>

                    <div className="inline-block mb-10 animate-in fade-in zoom-in duration-700 delay-100">
                        <span className="py-2 px-6 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-lg border border-slate-200 dark:border-none">
                            Building Bitcoin's Open-Source Future
                        </span>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        <p>
                            Our team blends Bitcoin, Lightning, and open‑source to create a simple promise: if you fix bugs and ship features, you get paid instantly in sats—no banks, no borders.
                        </p>
                        <p className="text-base text-slate-500 dark:text-slate-500 italic">
                            Decentralizing opportunity and accelerating open-source innovation with Bitcoin.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, idx) => (
                        <div key={idx} className="group relative bg-white dark:bg-[#0a0a0f] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300">
                            
                            {/* Image Container with Grayscale Effect */}
                            <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                />
                                
                                {/* Overlay Gradient for Text readability if needed, mostly mainly for the social icons pop up */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Social Icons Pop-up */}
                                <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                                    {member.socials.twitter && (
                                        <a href={member.socials.twitter} className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cyan-500 hover:border-cyan-500 transition-colors">
                                            <Twitter size={18} />
                                        </a>
                                    )}
                                    {member.socials.github && (
                                         <a href={member.socials.github} className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-slate-900 hover:border-slate-900 transition-colors">
                                            <Github size={18} />
                                        </a>
                                    )}
                                    {member.socials.linkedin && (
                                         <a href={member.socials.linkedin} className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-blue-600 hover:border-blue-600 transition-colors">
                                            <Linkedin size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    {member.name} 
                                </h3>
                                <div className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-400 uppercase tracking-widest mb-4">
                                    {member.role}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                    {member.bio}
                                </p>
                                
                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-100 dark:border-slate-800 rounded-tr-lg group-hover:border-cyan-500 transition-colors"></div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};