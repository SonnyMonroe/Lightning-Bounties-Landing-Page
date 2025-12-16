import React from 'react';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';

interface FaqPageProps {
  onBack: () => void;
}

const FaqItem = ({ question, children }: { question: React.ReactNode, children?: React.ReactNode }) => {
  return (
    <details className="group border-b border-slate-200 dark:border-slate-800 last:border-0">
      <summary className="flex justify-between items-center cursor-pointer py-6 w-full list-none text-lg md:text-xl font-bold text-slate-900 dark:text-white transition-colors font-display uppercase tracking-wide select-none hover:text-cyan-900 dark:hover:text-cyan-400">
        <span className="pr-6 leading-tight flex-1">{question}</span>
        <div className="shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full 
                        bg-slate-100 dark:bg-slate-800 
                        border border-slate-300 dark:border-slate-600
                        text-slate-700 dark:text-slate-300
                        group-hover:bg-white dark:group-hover:bg-slate-700
                        group-hover:border-cyan-700 dark:group-hover:border-cyan-400
                        group-hover:text-cyan-900 dark:group-hover:text-cyan-400
                        group-open:bg-cyan-50 dark:group-open:bg-cyan-900/30
                        group-open:border-cyan-800 dark:group-open:border-cyan-400
                        group-open:text-cyan-900 dark:group-open:text-cyan-300
                        transition-all duration-300 shadow-sm">
            <ChevronDown className="transition-transform duration-300 group-open:rotate-180" size={20} strokeWidth={2.5} />
        </div>
      </summary>
      <div className="pb-8 pr-4 md:pr-12 text-slate-700 dark:text-slate-200 leading-relaxed space-y-4 text-base md:text-lg font-medium animate-in fade-in slide-in-from-top-1 duration-200 [&_a]:text-cyan-800 [&_a]:dark:text-cyan-400 [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a]:font-bold hover:[&_a]:text-cyan-950 hover:[&_a]:dark:text-cyan-200">
        {children}
      </div>
    </details>
  );
};

export const FaqPage: React.FC<FaqPageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-cyan-900 dark:hover:text-mv-cyan transition-colors mb-8 group font-bold text-sm uppercase tracking-wider font-display"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-full mb-6 ring-1 ring-slate-200 dark:ring-slate-700 shadow-sm">
            <HelpCircle size={40} className="text-cyan-800 dark:text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white font-display uppercase tracking-tight mb-6 drop-shadow-sm">
            Lightning Bounties <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-purple-700 dark:from-cyan-400 dark:to-purple-400">FAQ</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto font-bold">
            Everything you need to know about earning Bitcoin for code.
          </p>
        </div>

        <div className="space-y-16">
          {/* General Questions */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b-2 border-slate-200 dark:border-slate-800 pb-4 font-display uppercase tracking-wider flex items-center gap-3">
              <span className="w-1.5 h-8 bg-cyan-700 dark:bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
              General Questions
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 md:px-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <FaqItem question="What's Lightning Bounties?">
                <p>Lightning Bounties is a Bitcoin-powered bug bounty platform that seamlessly integrates with GitHub’s familiar workflows, allowing developers to earn Bitcoin for fixing bugs and contributing to open-source projects.</p>
                <p>Getting started is simple—no installations or complicated setups required. Just visit <a href="https://app.lightningbounties.com/">app.lightningbounties.com</a>, log in with your GitHub account, and you’re ready to post or solve bounties instantly. Lightning Bounties makes it easy for anyone to contribute their skills, support open-source innovation, and get rewarded in Bitcoin.</p>
              </FaqItem>
              
              <FaqItem question="Who Typically Uses Lightning Bounties?">
                <p>Lightning Bounties caters to two primary groups: <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 px-2 py-0.5 rounded-md font-bold border border-orange-200 dark:border-orange-700">developers</span> and <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100 px-2 py-0.5 rounded-md font-bold border border-green-200 dark:border-green-700">organizations</span>.</p>
                <p><strong className="text-orange-900 dark:text-orange-200">Developers</strong> can showcase their skills, earn Bitcoin, and contribute to the growth of open-source technology.</p>
                <p><strong className="text-green-900 dark:text-green-200">Organizations</strong> can tap into a talented pool of developers to improve the quality and security of their software projects.</p>
              </FaqItem>

              <FaqItem question="Why Do I Have To Link My GitHub Account To Use Lightning Bounties?">
                 <p>See <a href="https://docs.lightningbounties.com/docs/getting-started/first-time-onboarding/github-auth-and-lightning-bounties">github-auth-and-lightning-bounties</a> for more detailed info.</p>
                 <div className="bg-slate-100 dark:bg-slate-800/50 p-5 rounded-lg border-l-4 border-cyan-700 dark:border-cyan-400 mt-3 shadow-inner">
                    <p className="font-bold text-slate-900 dark:text-white mb-1 uppercase text-xs tracking-wider">TL;DR</p>
                    <p className="italic text-slate-800 dark:text-slate-200 font-medium">Linking your GitHub account streamlines bug hunting, promotes collaboration, and ensures proper reward distribution.</p>
                 </div>
              </FaqItem>

              <FaqItem question="Does Lightning Bounties Have a Token or Plan to Launch one in the Future?">
                <p>Nope. Bitcoin is the best currency for Lightning Bounties because it’s decentralized, secure, and globally accessible. It aligns with our ethos of empowering developers without relying on speculative tokens.</p>
              </FaqItem>

              <FaqItem question="How Does Lightning Bounties Work?">
                <p>Users post bounties for GitHub issues, developers solve them, and once a pull request is merged, the contributor is instantly rewarded in Bitcoin via the Lightning Network.</p>
              </FaqItem>

              <FaqItem question="Do I Need to Install Anything to Use Lightning Bounties?">
                <p>No installations are required. Simply log in with your GitHub account to get started.</p>
              </FaqItem>

              <FaqItem question="Who Can Use Lightning Bounties?">
                <p>Anyone with a GitHub account can use Lightning Bounties to post or solve bounties—no restrictions based on location or experience level.</p>
              </FaqItem>
            </div>
          </section>

          {/* Bounty Hunter Questions */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b-2 border-slate-200 dark:border-slate-800 pb-4 font-display uppercase tracking-wider flex items-center gap-3">
              <span className="w-1.5 h-8 bg-purple-700 dark:bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"></span>
              Bounty Hunter Questions
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 md:px-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <FaqItem question="How Do I Find Bounties to Work On?">
                <p>Visit <a href="https://app.lightningbounties.com/">app.lightningbounties.com</a> and browse the "Available Bounties" section. You can filter bounties by:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-cyan-700 dark:marker:text-cyan-400 font-medium">
                  <li>Technology/programming language</li>
                  <li>Reward amount</li>
                  <li>Time commitment</li>
                  <li>Repository popularity</li>
                </ul>
                <p className="mt-4">Find an issue that matches your skills and interests, then click to view details about the task and reward.</p>
              </FaqItem>

              <FaqItem question="How Do I Submit a Solution?">
                <ol className="list-decimal pl-6 space-y-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Fork the GitHub repository containing the issue</li>
                  <li>Create a branch for your solution</li>
                  <li>Make your changes and commit them</li>
                  <li>Submit a Pull Request referencing the issue number</li>
                  <li>Once merged by the repository maintainer, your reward will be automatically processed</li>
                </ol>
              </FaqItem>

              <FaqItem question="How Are Rewards Distributed?">
                <p>Once your pull request is merged, the GitHub API acts as an oracle to verify your contribution. The Lightning Bounties platform then automatically sends the reward to your account, where you can withdraw it to your Lightning wallet.</p>
              </FaqItem>

              <FaqItem question="How Do I Withdraw My Earnings?">
                 <ol className="list-decimal pl-6 space-y-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Visit your Lightning Bounties account dashboard</li>
                  <li>Click on "Withdraw"</li>
                  <li>Generate a Lightning invoice from your wallet</li>
                  <li>Paste the invoice into the withdrawal field</li>
                  <li>Confirm the withdrawal</li>
                  <li>Receive funds instantly in your Lightning wallet</li>
                 </ol>
              </FaqItem>

              <FaqItem question="What Happens if My Solution is Rejected?">
                 <p>If your solution is rejected, the bounty remains open for you or others to attempt again. The repository maintainer typically provides feedback on why the solution wasn't accepted, giving you an opportunity to improve and resubmit.</p>
              </FaqItem>

              <FaqItem question="Can I Work on Multiple Bounties at Once?">
                 <p>Yes! You can work on as many bounties as you'd like simultaneously. There are no restrictions on the number of bounties you can tackle at one time.</p>
              </FaqItem>

              <FaqItem question="Do I Need to Run a Lightning Node to Receive Payments?">
                 <p>Nope, you don't need to run a node to use the Lightning Network. You can simply use a lightning wallet app to send and receive payments.</p>
              </FaqItem>

              <FaqItem question="What Lightning Wallets Can I Use?">
                 <p>Popular Lightning Network wallets include:</p>
                 <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  {['Phoenix', 'Muun', 'Breez', 'Wallet of Satoshi', 'Blue Wallet', 'Cash App'].map(wallet => (
                    <li key={wallet} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-3 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white shadow-sm hover:border-cyan-700 dark:hover:border-cyan-400 hover:bg-white dark:hover:bg-slate-700 transition-all">
                      <span className="w-2 h-2 rounded-full bg-cyan-700 dark:bg-cyan-400 shadow-[0_0_5px_rgba(0,240,255,0.5)]"></span>
                      {wallet}
                    </li>
                  ))}
                 </ul>
                 <p className="mt-4">Any Lightning-compatible wallet that supports BOLT-11 invoices will work with Lightning Bounties.</p>
              </FaqItem>

              <FaqItem question="How Do I Convert Sats to My Local Currency?">
                 <p>After withdrawing to your Lightning wallet, you can:</p>
                 <ol className="list-decimal pl-6 space-y-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Transfer to an exchange that supports Lightning Network deposits</li>
                  <li>Convert to your local currency on the exchange</li>
                  <li>Withdraw to your bank account</li>
                 </ol>
                 <p className="mt-4">Alternatively, some Lightning wallets offer direct conversion features.</p>
              </FaqItem>

              <FaqItem question="Why Might My Lightning Withdrawal Fail?">
                 <p>Lightning Network transactions can fail for a few common reasons:</p>
                 <ul className="list-disc pl-6 space-y-2 marker:text-red-600 dark:marker:text-red-400">
                  <li>Not having enough funds in your channel to cover the payment</li>
                  <li>Routing issues in the Lightning Network</li>
                  <li>Using an expired invoice</li>
                  <li>Network congestion</li>
                 </ul>
                 <p className="mt-4 font-bold text-slate-900 dark:text-white bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700/50 inline-block text-sm">💡 Tip: Keep approximately 2% of your withdrawal amount in your account to cover Lightning Network routing fees.</p>
              </FaqItem>
            </div>
          </section>

           {/* Posting a Bounty */}
           <section>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b-2 border-slate-200 dark:border-slate-800 pb-4 font-display uppercase tracking-wider flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-700 dark:bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              Posting a Bounty
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 md:px-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
              <FaqItem question="How Do I Post a Bounty?">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-5 rounded-lg border-l-4 border-cyan-700 dark:border-cyan-400 mb-5 shadow-inner">
                    <p className="font-bold text-slate-900 dark:text-white mb-1 uppercase text-xs tracking-wider">TL;DR</p>
                    <p className="italic text-slate-800 dark:text-slate-200 font-medium">Log in with your GitHub account, copy-paste the issue URL, set a reward amount in Bitcoin, and post it in just a few clicks.</p>
                </div>
                <ol className="list-decimal pl-6 space-y-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Log in to Lightning Bounties with your GitHub account</li>
                  <li>Click "Post a Bounty"</li>
                  <li>Enter the URL of the GitHub issue</li>
                  <li>Set the reward amount in sats</li>
                  <li>Define the lock time period</li>
                  <li>Submit the bounty</li>
                 </ol>
              </FaqItem>

              <FaqItem question="Can I Increase the Reward for an Existing Bounty?">
                 <p className="font-bold text-slate-900 dark:text-white mb-2">Yes, you can increase the reward for an open bounty at any time by adding more sats (Bitcoin micropayments).</p>
                 <p>This is useful if you want to attract more attention to a high-priority issue or if the complexity turned out to be greater than initially estimated.</p>
              </FaqItem>

              <FaqItem question="What Happens If No One Solves My Issue?">
                 <p>If no one solves your issue, you can manually expire the bounty after the lock time ends and reclaim your funds.</p>
              </FaqItem>

              <FaqItem question="How Do I Review Submitted Solutions?">
                 <p>You'll review solutions through GitHub's standard pull request workflow:</p>
                 <ol className="list-decimal pl-6 space-y-2 mt-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Receive a notification when a PR is submitted</li>
                  <li>Review the code changes</li>
                  <li>Request changes or approve and merge the PR</li>
                  <li>Once merged, the reward is automatically processed by Lightning Bounties</li>
                 </ol>
              </FaqItem>

              <FaqItem question="How Do I Deposit Funds to Post Bounties?">
                 <ol className="list-decimal pl-6 space-y-2 marker:font-bold marker:text-slate-900 dark:marker:text-white">
                  <li>Log into your Lightning Bounties account</li>
                  <li>Navigate to the "Deposit" section</li>
                  <li>Generate a Lightning invoice in your Lightning Bounties account</li>
                  <li>Pay the invoice using your Lightning wallet</li>
                  <li>Funds will be credited to your account instantly</li>
                 </ol>
              </FaqItem>

              <FaqItem question="What is a Bounty Lock Time?">
                 <p className="font-bold text-slate-900 dark:text-white mb-2">A lock time guarantees that the reward remains available for a set period (e.g., two weeks) while developers work on solving the issue.</p>
                 <p>The lock time ensures that funds stay committed to the bounty, giving developers confidence that they'll be paid for their work once completed.</p>
              </FaqItem>

              <FaqItem question="Can Multiple Users Fund a Single Bounty?">
                 <p>Yes! Lightning Bounties supports crowdfunding for bounties. Multiple users can contribute sats to increase the reward for a single issue, making it more attractive to potential solvers.</p>
              </FaqItem>

              <FaqItem question="Can I Set Custom Requirements for Bounties?">
                 <p>Yes! You can specify requirements in the GitHub issue description, such as:</p>
                 <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-slate-500 dark:marker:text-slate-400">
                   <li>Required tests</li>
                   <li>Performance criteria</li>
                   <li>Documentation standards</li>
                   <li>Compatibility requirements</li>
                   <li>Code style guidelines</li>
                 </ul>
                 <p className="mt-4">These requirements will be visible to developers considering your bounty.</p>
              </FaqItem>

              <FaqItem question="Can I Post Bounties for Third-Party Projects?">
                 <p>Yes! You can post bounties for any open-source project on GitHub, even if you're not the project owner.</p>
              </FaqItem>

              <FaqItem question="Can I Expire a Bounty Early?">
                 <p>You can only expire a bounty and reclaim funds after the initial lock time has passed. This protection ensures developers have the promised time to work on solutions without the bounty being unexpectedly withdrawn.</p>
              </FaqItem>
            </div>
          </section>

           {/* Features FAQ */}
           <section>
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-b-2 border-slate-200 dark:border-slate-800 pb-4 font-display uppercase tracking-wider flex items-center gap-3">
              <span className="w-1.5 h-8 bg-slate-800 dark:bg-slate-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></span>
              Lightning Bounties Features
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 md:px-8 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
               <FaqItem question="What are Anonymous Rewards?">
                  <p>Anonymous Rewards allows logged-in users to contribute sats to bounties privately, ensuring their identity remains hidden while still supporting open-source development. This feature enables users to fund bounties discreetly while maintaining full control over their contributions.</p>
               </FaqItem>
               
               <FaqItem question="How do Crowdfunding Bounties work?">
                  <p>The Collaborative Funding feature allows multiple users to contribute sats (Bitcoin microtransactions) to fund a single bounty. This enables community-driven funding for important issues and helps bounties grow faster by allowing multiple contributors.</p>
               </FaqItem>

               <FaqItem question="Do I need to install anything to use Lightning Bounties?">
                  <p>No. Posting or solving a bounty requires no plugins, no installations on your computer, and no changes to your GitHub account. Simply log in with your GitHub account to get started.</p>
               </FaqItem>

               <FaqItem question="How does the GitHub API as Oracle feature work?">
                  <p>This feature uses the GitHub API to automatically verify when solutions are accepted. Rewards are automatically sent to contributors once their pull request is successfully merged, preventing fraudulent claims.</p>
               </FaqItem>

               <FaqItem question="What is the Guaranteed Escrow feature?">
                  <p>Rewards are locked for a set period (e.g., two weeks) to ensure bounty hunters know the reward will be available when they submit their solution. This lock time guarantees that the reward remains available while developers work on solving the issue.</p>
               </FaqItem>

               <FaqItem question="What happens if no one solves my bounty?">
                  <p>After the lock time ends, you can manually expire the bounty and reclaim your funds if priorities change or the issue is resolved elsewhere. If no one solves your issue, you can reclaim your funds after the lock time expires.</p>
               </FaqItem>

               <FaqItem question="Can I post bounties for projects I don't own?">
                  <p>Yes! You can post bounties on issues from popular open-source projects like VSCode, Django, or React—even if you're not the project owner. This allows you to support any open-source project on GitHub.</p>
               </FaqItem>

               <FaqItem question="What is the Add Without Login feature?">
                  <p>Add Without Login enables anyone to contribute sats to existing bounties without needing to create an account or log in. This makes it easier for non-developers or those without GitHub accounts to get involved. The feature leverages Branta's address verification for security.</p>
               </FaqItem>

               <FaqItem question="Does Lightning Bounties work worldwide?">
                  <p>Yes! Lightning Bounties operates globally with Bitcoin, bypassing region-restricted payment processors like Stripe. Anyone with a GitHub account can use Lightning Bounties to post or solve bounties—no restrictions based on location or experience level.</p>
               </FaqItem>

               <FaqItem question="How long does it take to post a bounty?">
                  <p>It takes just 5 clicks and a single copy-paste of a URL to post a bounty—under 30 seconds from start to finish. Getting started is simple—no installations or complicated setups required.</p>
               </FaqItem>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};