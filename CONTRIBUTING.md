# Contributing to Mining Fracture Analyser

First off, thanks for taking the time to contribute! 🎉

The Mining Fracture Analyser is a community tool built for Star Citizen players. We welcome contributions from developers of all skill levels, whether it's fixing a typo, improving the OCR accuracy, or adding new ship profiles.

## 🤝 Code of Conduct
By participating in this project, you agree to keep the environment safe and welcoming for everyone. Please be respectful in issues and pull requests.

## 🚀 How Can I Contribute?

### 1. Reporting Bugs
This section guides you through submitting a bug report.
* **Search existing issues** to see if the bug has already been reported.
* **Create a new issue** using the Bug Report template.
* **Include details:** Browser version, screen resolution (if OCR failed), and the specific rock parameters used.

### 2. Suggesting Enhancements
* Open a new issue with the tag `enhancement`.
* Explain why this feature would be useful to the mining community.

### 3. Pull Requests (Code Contributions)
1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## 💻 Development Guidelines

### Project Structure
* `index.html`: Main application structure.
* `/css`: Custom styles (if not using Tailwind classes directly).
* `/js`: Logic files.
    * `app.js`: Main logic.
    * `ocr.js`: Tesseract handling.
    * `charts.js`: Chart.js configurations.

### Coding Style
* **HTML:** Semantic HTML5.
* **CSS:** Use Tailwind utility classes where possible. If writing custom CSS, keep it in the separate CSS file.
* **JS:** Modern ES6+ syntax (Arrow functions, const/let).
* **Comments:** Please comment your code, specifically where mining formulas are applied, so we can update them if CIG changes the game mechanics.

### OCR & Tesseract
If you are working on the OCR features, please test with screenshots from different resolutions (1080p, 1440p, 4k) if possible, as UI scaling affects recognition accuracy.

## ⚖️ License
By contributing, you agree that your contributions will be licensed under its GNU General Public License (GPL).
