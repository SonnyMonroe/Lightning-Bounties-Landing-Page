import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServicePageProps {
  onBack: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-mv-dark text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-cyan-900 dark:hover:text-mv-cyan transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-mv-card rounded-full mb-6 ring-1 ring-slate-200 dark:ring-mv-border shadow-sm">
            <FileText size={40} className="text-purple-800 dark:text-mv-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-mv-cyan dark:to-mv-purple">Service</span>
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold">
            Please read these terms carefully before using our platform.
          </p>
        </div>

        <div className="bg-white dark:bg-mv-card rounded-2xl border border-slate-200 dark:border-mv-border p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              By accessing and using <span className="font-mono text-cyan-800 dark:text-mv-cyan">www.lightningbounties.com</span>, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">2. Provision of Services</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              This website is strictly for informational purposes, serving as a landing page for the Lightning Bounties application. We do not facilitate payments, account creation, or direct bounty interactions on this specific domain. All functional services are provided on our application subdomain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">3. Privacy & Data</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              We respect your privacy. As stated in our Privacy Policy, we do not collect personal data on this landing page, nor do we utilize third-party tracking services. Your use of this site is private.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">4. Intellectual Property</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              The Site and its original content, features, and functionality are owned by Lightning Bounties and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">5. Limitation of Liability</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              In no event shall Lightning Bounties, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

           <section>
            <h2 className="text-2xl font-bold font-display uppercase mb-4 text-slate-900 dark:text-white">6. Changes to Terms</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100 dark:border-mv-border">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-bold">
              Last Updated: October 26, 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};