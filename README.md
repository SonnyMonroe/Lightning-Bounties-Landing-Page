# Lightning Bounties Landing Page

The official landing page for **Lightning Bounties**, the frictionless marketplace for Open Source bounties paid instantly via the Bitcoin Lightning Network.

Visit the live site: [www.lightningbounties.com](https://www.lightningbounties.com)

## About

Lightning Bounties connects open-source developers with organizations and individuals who need bugs fixed or features built. We remove the friction of traditional freelance marketplaces by utilizing the Bitcoin Lightning Network for instant, global, permissionless payments.

**Core Value Proposition:**
- **Instant Payments:** Rewards are settled in seconds via Lightning Network.
- **Global Access:** No banking requirements, no region locking.
- **Zero Friction:** No signup required to view bounties. Login with GitHub to participate.
- **GitHub Native:** Seamless integration with GitHub issues and pull requests.

## Tech Stack

This landing page is built with:
- **React** (v18+)
- **TypeScript**
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Google Gemini API** for the AI Bounty Architect feature
- **Lucide React** for icons

## Key Features

1.  **Live Bounty Feed:** Real-time updates of open bounties and developer leaderboards.
2.  **AI Bounty Architect:** Uses Generative AI to help users draft professional bounty descriptions from simple ideas.
3.  **Responsive Design:** Optimized for mobile and desktop viewing.
4.  **Dark/Light Mode:** Full theme support.

## Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Lightning-Bounties/landing-page.git
    cd landing-page
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file and add your Google Gemini API key:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.