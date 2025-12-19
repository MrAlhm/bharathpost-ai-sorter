# BharathPost AI Sorter

Welcome to BharathPost AI Sorter — your friendly, high-speed assistant for detecting, organizing, and managing AI-generated content.

Whether you're an editor, developer, or researcher, this project helps you quickly identify material that likely originated from a language model so your team can focus on verification, quality, and storytelling.

Why you'll love it
- Save time — automatically surface likely AI-generated content for human review.
- Improve quality — prioritize trusted, human-written pieces while auditing machine drafts.
- Integrates easily — lightweight CLI and modular API for editorial pipelines.

Highlights
- Fast batch analysis with confidence scores
- Configurable thresholds and categorization rules
- Report output that’s clear and actionable for editors
- Modular design for easy integration into existing workflows

Quick demo
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the sorter against a folder of articles:
   ```bash
   npm start -- --input ./articles --output ./reports
   ```
3. Open the generated report and review items flagged as "Likely AI" or "Review Recommended".

Developer quick start
- Clone the repo:
  ```bash
  git clone https://github.com/MrAlhm/bharathpost-ai-sorter.git
  cd bharathpost-ai-sorter
  ```
- Install dependencies and follow project docs to run locally.

Configuration notes
- Adjust sensitivity and rules in the config (e.g., `config/default.json`).
- Use `--threshold` on the CLI to change how aggressively content is flagged.

Contributing
Contributions are welcome! A quick path:
1. Fork the repo
2. Create a branch: `git checkout -b feature/your-idea`
3. Make changes and add tests
4. Open a PR describing the change and why it helps

Need help or want a feature?
Open an issue or reach out to @MrAlhm on GitHub.

License
This project is MIT licensed — see the LICENSE file for details.

Thanks for checking out BharathPost AI Sorter — let’s make editorial review faster and smarter!
