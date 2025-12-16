import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
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
            <Shield size={40} className="text-cyan-800 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight mb-6 text-black dark:text-white">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">Policy</span>
          </h1>
          <p className="text-xl text-black dark:text-white max-w-2xl mx-auto font-bold">
            We value your privacy. No tracking, no data collection.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-black dark:text-white">1. Introduction</h2>
            <p className="text-black dark:text-white leading-relaxed font-medium">
              Welcome to Lightning Bounties. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy applies to <span className="font-mono text-cyan-800 dark:text-cyan-400 font-bold">www.lightningbounties.com</span> and governs data collection and usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-black dark:text-white">2. No Data Collection</h2>
            <p className="text-black dark:text-white leading-relaxed font-medium">
              We do not collect, store, or process any personal identification information (PII) from users visiting this website. You can browse our landing page, view bounties, and access documentation without providing any personal details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-black dark:text-white">3. No Third-Party Tracking</h2>
            <p className="text-black dark:text-white leading-relaxed font-medium">
              We do not use third-party analytics services (such as Google Analytics), tracking pixels, or advertising cookies on <span className="font-mono text-cyan-800 dark:text-cyan-400 font-bold">www.lightningbounties.com</span>. Your browsing activity on this site remains private and is not shared with any external parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-black dark:text-white">4. External Links</h2>
            <p className="text-black dark:text-white leading-relaxed font-medium">
              Our website contains links to external sites, specifically our application (<span className="font-mono font-bold">app.lightningbounties.com</span>), GitHub, and social media platforms. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-black dark:text-white">5. Changes to this Policy</h2>
            <p className="text-black dark:text-white leading-relaxed font-medium">
              Lightning Bounties reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by placing a prominent notice on our site, and/or by updating any privacy information on this page.
            </p>
          </section>

          <div className="pt-8 border-t border-black/10 dark:border-white/10">
            <p className="text-sm text-black dark:text-white font-bold opacity-70">
              Last Updated: October 26, 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};