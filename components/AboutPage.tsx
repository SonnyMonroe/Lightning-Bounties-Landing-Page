import React from 'react';
import { ArrowLeft, Info, Target, Flag, Heart } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-black text-black dark:text-white transition-colors duration-300 relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-black dark:text-white hover:text-blue-900 dark:hover:text-cyan-400 transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display bg-white dark:bg-white/10 py-2.5 px-5 rounded-full border border-black/20 dark:border-white/20 shadow-sm"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-[#111] rounded-full mb-6 border border-black/10 dark:border-white/10 shadow-sm">
            <Info size={40} className="text-cyan-800 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tight mb-6 text-black dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Lightning Bounties</span>
          </h1>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto font-bold">
            Decentralizing opportunity and accelerating open-source innovation with Bitcoin.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* About Section */}
          <div className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h2 className="text-2xl font-bold font-display uppercase mb-6 text-black dark:text-white flex items-center gap-3">
               Lightning Bounties
            </h2>
            <div className="text-black dark:text-white leading-relaxed font-medium space-y-4 text-lg">
                <p>
                    Lightning Bounties is a Bitcoin-powered bug bounty platform that seamlessly integrates with GitHub’s familiar workflows, enabling developers to earn Bitcoin for fixing bugs and contributing to open-source projects.
                </p>
                <p>
                    Getting started is simple—no installations or complicated setups required. Just visit <a href="https://app.lightningbounties.com/" className="text-blue-700 dark:text-cyan-400 font-bold hover:underline">app.lightningbounties.com</a>, log in with your GitHub account, and you’re ready to post or solve bounties instantly. Lightning Bounties makes it easy for anyone to contribute their skills, support open-source innovation, and get rewarded in Bitcoin.
                </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-700 dark:text-purple-400">
                    <Target size={24} />
                </div>
                <h2 className="text-2xl font-bold font-display uppercase text-black dark:text-white">
                    Our Mission
                </h2>
            </div>
            <p className="text-black dark:text-white leading-relaxed font-medium text-lg">
                Lightning Bounties exists to empower a global community of developers and innovators to contribute freely to open-source technology, accelerating the growth of Bitcoin, Lightning, and decentralized ecosystems. By making bug bounties accessible to anyone, anywhere, we lower barriers to entry, onboard new talent to build the tools of tomorrow, and reward contributors with Bitcoin—the currency of freedom. Our mission is to decentralize opportunity and drive innovation that benefits everyone.
            </p>
          </div>

          {/* Goals Section */}
          <div className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-400">
                    <Flag size={24} />
                </div>
                <h2 className="text-2xl font-bold font-display uppercase text-black dark:text-white">
                    Our Goals
                </h2>
            </div>
            <p className="text-black dark:text-white leading-relaxed font-medium mb-6">
                Lightning Bounties exists to embody the ethos of Bitcoin and the Free and Open-Source Software (FOSS) movement. We are building a bug bounty platform that is as free, open, and decentralized as the technologies it supports.
            </p>
            <ul className="space-y-4">
                {[
                    { title: "Empower Global Talent", desc: "Enable anyone, anywhere, to contribute their skills to open-source technology without barriers or restrictions, fostering a meritocratic environment." },
                    { title: "Onboard Builders to Decentralized Tech", desc: "Bring more people into the Bitcoin, Lightning, Nostr, and open-source ecosystems—technologies essential to freedom and innovation." },
                    { title: "Educate Developers", desc: "Lower the barrier to entry for contributing to open-source projects by guiding developers from beginner-friendly issues to solving critical challenges." },
                    { title: "Accelerate Open-Source Innovation", desc: "Drive the rapid development of decentralized technologies by connecting talented contributors with impactful projects and fostering transparent, inclusive collaboration." },
                    { title: "Showcase Bitcoin’s Utility", desc: "Reward contributors in censorship-resistant, borderless Bitcoin—bypassing centralized intermediaries like banks or payment processors and demonstrating Bitcoin's real-world value." }
                ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-black dark:text-white font-medium">
                        <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400"></span>
                        <span>
                            <strong className="text-black dark:text-white">{item.title}:</strong> {item.desc}
                        </span>
                    </li>
                ))}
            </ul>
            <p className="mt-8 text-black dark:text-white font-medium italic border-l-4 border-cyan-500 pl-4 py-1 bg-slate-50 dark:bg-white/5">
                Lightning Bounties is more than just a platform—it’s a movement to decentralize opportunity, accelerate innovation, and empower individuals worldwide to build the tools that shape our future.
            </p>
          </div>

           {/* Values Section */}
           <div className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-700 dark:text-orange-400">
                    <Heart size={24} />
                </div>
                <h2 className="text-2xl font-bold font-display uppercase text-black dark:text-white">
                    Our Values
                </h2>
            </div>
            <p className="text-black dark:text-white leading-relaxed font-medium mb-6">
                 At Lightning Bounties, our values are rooted in the ethos of Bitcoin and the Free and Open-Source Software (FOSS) movement. These principles guide every aspect of our platform:
            </p>
            <ul className="space-y-4">
                {[
                    { title: "Decentralization", desc: "We break down barriers, empowering individuals worldwide to contribute freely without gatekeepers or restrictions." },
                    { title: "Accessibility", desc: "Talent and effort—not privilege or location—define success on our open platform, available to anyone, anywhere." },
                    { title: "Transparency", desc: "We uphold trust and accountability by fostering openness in every process, reflecting the collaborative spirit of FOSS." },
                    { title: "Empowerment", desc: "By rewarding contributors with Bitcoin, we champion financial sovereignty and provide a censorship-resistant way to earn for meaningful work." },
                    { title: "Innovation", desc: "We accelerate the development of decentralized technologies by connecting talent with impactful projects that shape the future." },
                    { title: "Community", desc: "Collaboration drives us. We cultivate a thriving ecosystem where creators, developers, and innovators come together to solve challenges and build tools for everyone." }
                ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-black dark:text-white font-medium">
                        <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                        <span>
                            <strong className="text-black dark:text-white">{item.title}:</strong> {item.desc}
                        </span>
                    </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};