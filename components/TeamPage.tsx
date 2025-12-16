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
        role: "AI & Cloud Architect",
        bio: "DataEngineer, previous founder at MetaverseProfessional (NFT’s for merch shops). Motivated to bring tech and Bitcoin to Latin America.",
        image: "https://media.licdn.com/dms/image/v2/C5603AQHKcoUqcW2GUQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1578958443600?e=1767225600&v=beta&t=nczyB2synr-OXoefwRJjy7RIUK4f3MPfnyDQKd0Q3d0",
        socials: { twitter: "https://x.com/JEGamboaFuentes", github: "https://github.com/jegamboafuentes", linkedin: "https://www.linkedin.com/in/jegamboafuentes/" }
    },
    {
        name: "Will Sutton",
        role: "Backend & Frontend Architect",
        bio: "Fascinated by tech collaboration models: open-source ecosystems, Kaggle ML competitions, diy-biology hackerspaces. Background: finance, software instructor.",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQGj9WpUGh4vVQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725553871735?e=1767225600&v=beta&t=e6mpxXIRGJabD_hOtWFuSMia6tVWzQ1aqFPyrtY7cD4",
        socials: { twitter: "https://x.com/WillSuttonCodes", github: "https://github.com/sutt", linkedin: "https://www.linkedin.com/in/willsutton17/" }
    },
    {
        name: "Mike Abramo",
        role: "Backend & DevOps Architect",
        bio: "DeFi researcher, key player in BostonDAO. Inspired by the potential of Bitcoin to upend centralized power structures.",
        image: "https://media.licdn.com/dms/image/v2/D4E03AQE49CAHYOuLmg/profile-displayphoto-scale_200_200/B4EZsl0ZpkKMAY-/0/1765866057561?e=1767225600&v=beta&t=lWANYqG2Y8RzMXuRzn46KIYaiTXamNXhJmjScr2ZioE",
        socials: { twitter: "https://x.com/SonnyTheDegen", github: "https://github.com/SonnyMonroe", linkedin: "https://www.linkedin.com/in/michael-abramo/" }
    },
    {
        name: "Pavel Kononov",
        role: "Backend & Databases Architect",
        bio: "Concentration in Security & Backend, previously built a merchant payments app, and worked on chip design CAD. Currently completing CS degree.",
        image: "https://pbs.twimg.com/media/GnvACfWWAAEQN6N?format=jpg&name=4096x4096",
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

                <div className="text-center mb-24 relative">
                    <div className="inline-block mb-4 animate-in fade-in zoom-in duration-700 delay-100">
                        <span className="py-1.5 px-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                            The Builders
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-slate-950 dark:text-white font-display uppercase tracking-tight mb-8 leading-[0.9] drop-shadow-sm">
                        Meet The <br className="md:hidden"/>
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-20 dark:opacity-40 rounded-full"></span>
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Team</span>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        A multidisciplinary collective combining <span className="text-cyan-800 dark:text-cyan-400 font-bold">AI</span>, <span className="text-purple-800 dark:text-purple-400 font-bold">Cloud</span>, and <span className="text-slate-900 dark:text-white font-bold">Bitcoin</span> engineering.
                    </p>
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