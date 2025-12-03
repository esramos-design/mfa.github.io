<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.15</h1>
<p align="center">
<strong>A real-time cooperative mining calculator for Star Citizen.</strong>
<br />
Stop Guessing. Start Fracturing.
<br />
<br />
<a href="https://github.com/esramos-design/mfa.github.io/blob/main/LICENSE" target="_blank">
<img alt="License: GPL-3.0" src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" />
</a>
<img alt="Status: Active" src="https://img.shields.io/badge/status-active-success.svg" />
<img alt="Game: Star Citizen" src="https://img.shields.io/badge/Star%20Citizen-4.4+-orange" />
<br />
<br />
<strong\>Help us build the best mining tool in the 'Verse.</strong\><br />  
<a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 <strong>Launch Live Demo</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>
</p><br />
</p\>\<br /\></div>
</div\>

# **Contributing Guidelines**

First off, thanks for taking the time to contribute\! 🎉

The Mining Fracture Analyser is a community tool built for Star Citizen players. We welcome contributions from developers of all skill levels, whether it's fixing a typo, improving the OCR accuracy, or adding new ship profiles.

## **📂 Project Structure (v5.15)**

The project has been refactored for modularity. Please ensure you edit the correct file:

* **index.html**: The main application structure, DOM elements, and button layout.  
* **style.css**: Tailwind utility classes and custom styles (glassmorphism, animations).  
* **script.js**: **THE CORE ENGINE.** Contains:  
  * Database (Ships, Lasers, Modules, Gadgets).  
  * Calculation Logic (window.calculate).  
  * Reactive Telemetry (Column 4 Logic).  
  * Chart.js renderings.  
  * AI Integration (Gemini API).  
* **scanner.js**: **THE EYES.** Contains:  
  * navigator.mediaDevices logic (Screen Sharing).  
  * Image Pre-processing (Greyscale, Inversion, Upscaling).  
  * Tesseract.js implementation and Regex parsing.

## **🤝 Code of Conduct**

By participating in this project, you agree to keep the environment safe and welcoming for everyone. Please be respectful in issues and pull requests.

## **🚀 How Can I Contribute?**

### **1\. Reporting Bugs**

This section guides you through submitting a bug report.

* **Search existing issues** to see if the bug has already been reported.  
* **Create a new issue** using the Bug Report template.  
* **Include details:** Browser version, screen resolution (if OCR failed), and the specific rock parameters used.

### **2\. Suggesting Enhancements**

* Open a new issue with the tag enhancement.  
* Explain why this feature would be useful to the mining community.

### **3\. Pull Requests (Code Contributions)**

1. **Fork the Project**  
2. **Create your Feature Branch** (git checkout \-b feature/AmazingFeature or fix/ocr-improvement)  
3. **Commit your Changes** (git commit \-m 'Add some AmazingFeature')  
4. **Push to the Branch** (git push origin feature/AmazingFeature)  
5. **Open a Pull Request**

## **💻 Development Focus Areas**

### **1\. Updating Mining Data**

If CIG changes mining values, update the allLaserHeads, powerModules, or gadgets arrays in **script.js**. Do not change the variable names, as the calculator relies on them.

### **2\. Improving OCR (Scanner.js)**

We currently use a **2.5x scale factor** and a **threshold of 90** for binarization to read glowing text.

* If you improve the Regex, test it against "glitchy" screenshots (e.g., text with chromatic aberration).  
* Ensure the whitelist in scanner.js allows for punctuation (.,%) used in data values.

### **3\. Reactive UI**

The "Optimized Fleet Loadouts" in script.js uses conditional logic (if (inst \> 60)...). If adding new logic, ensure you provide a fallback "Standard" case.

### **Coding Style**

* **HTML:** Semantic HTML5.  
* **CSS:** Use Tailwind utility classes where possible. If writing custom CSS, keep it in the separate CSS file.  
* **JS:** Modern ES6+ syntax (Arrow functions, const/let).  
* **Comments:** Please comment your code, specifically where mining formulas are applied, so we can update them if CIG changes the game mechanics.

## **⚖️ License**

By contributing, you agree that your contributions will be licensed under its GNU General Public License (GPL).
