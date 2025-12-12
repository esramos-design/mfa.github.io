<div align="center">
<h1 align="center">Mining Fracture Analyser (MFA) v5.18</h1>
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
<a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 <strong>Launch Live Demo</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>
</p>
</div>
<br/>
</div>




# **Contributing Guidelines**

First off, thanks for taking the time to contribute! 🎉

The Mining Fracture Analyser is a community tool built for Star Citizen players. We welcome contributions from developers of all skill levels.

## **📂 Project Structure (v5.18)**

The project has been refactored for stability, modularity, and native compilation:

* **index.html**: Main structure containing the **Chrome Header** and the 4-Column Grid.
* **style.css**: Contains the **Logofolio Palette** variables (`--bg-main: #0D0D0D`) and the new **High-Contrast Light Mode** overrides.
* **script.js**: **THE CORE ENGINE.** Contains:
  * Database (Ships, Lasers, Modules).
  * **Dynamic Logic:** The `generateAdvancedTelemetry` function now intelligently separates Gadgets from Ship Loadouts.
  * AI Integration (Gemini API).
* **scanner.js**: **THE OPTICAL ENGINE (V30).** Contains:
  * **Nuclear Binarization** filter for high-contrast OCR.
  * Aggressive Regex parsing to clean up OCR noise (e.g. `HAgS` -> `MASS`).
* **run_app.py**: The Python wrapper script used to compile the standalone `.exe` using `pywebview`.

## **🚀 How Can I Contribute?**

### **1. Reporting Bugs**
* **Include details:** Browser version, screen resolution (if OCR failed), and the specific rock parameters.

### **2. Pull Requests**
1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## **💻 Development Focus Areas**

### **1. Updating Mining Data**
If CIG changes mining values, update the `allLaserHeads`, `powerModules`, or `gadgets` arrays in **script.js**.

### **2. Improving OCR (scanner.js)**
We currently use **Inverted Grayscale** with high thresholds.
* The logic uses a specific crop area. If the HUD changes in-game, this needs adjustment.
* Focus on refining the Regex in `parseMiningStats` to handle percentage misreads.

### **3. Building the EXE**
If you modify the source, you can rebuild the app using:
`pyinstaller --noconsole --onefile --icon "icon.ico" --name "MFA_v5.18" --add-data "index.html;." --add-data "style.css;." --add-data "script.js;." --add-data "scanner.js;." --add-data "ai-foreman.js;." run_app.py`

## **⚖️ License**
By contributing, you agree that your contributions will be licensed under its GNU General Public License (GPL).
