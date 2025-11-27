# ⛏️ Mining Fracture Analyser

![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Game](https://img.shields.io/badge/Star%20Citizen-3.24+-orange)

**A real-time cooperative mining calculator for Star Citizen.**

<a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 Live Demo</a> | <a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a> | <a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>

![App Screenshot](path/to/screenshot.png)
*(Note: Don't forget to upload a `screenshot.png` to your repo!)*

## 📖 About
The **Mining Fracture Analyser** is a web-based tool developed by **CHIRONDRAGON** for the **THRUSTERS & DUST** organization.

It is designed to help mining crews (Argo MOLE, MISC Prospector, Drake Golem) calculate their **Total Combined Effective Laser Power** against a rock's specific Mass, Resistance, and Instability. It uses OCR technology to read rock data directly from screenshots, minimizing data entry errors during high-intensity gameplay.

## ✨ Key Features
* **📷 OCR Auto-Scan:** Paste a screenshot (`Ctrl+V`) to automatically detect Rock Mass, Resistance, and Instability using Tesseract.js.
* **🚀 Multi-Crew Simulation:** Support for mixed fleets and toggling individual laser heads.
* **📊 Visual Analytics:**
    * **Power Margin Chart:** Visualizes power surplus/deficit.
    * **Risk Profile:** Doughnut chart (Resistance vs. Instability vs. Safety).
    * **Resistance Curve:** Predictive graph for heat vs. resistance.
* **💡 Smart Recommendations:** automatically suggests module loadouts (Surge, Stampede, etc.) if the crew is underpowered.

## 🛠️ Built With
* **Core:** HTML5, Vanilla JavaScript
* **Styling:** Tailwind CSS
* **Visualization:** Chart.js
* **OCR:** Tesseract.js

## 📦 Getting Started

### Prerequisites
You need a modern web browser. No backend installation is required.

### Installation / Local Development
1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/esramos-design/mfa.github.io.git](https://github.com/esramos-design/mfa.github.io.git)
    ```
2.  **Navigate to the folder:**
    ```bash
    cd mfa.github.io
    ```
3.  **Run the App:**
    * Because this app uses Tesseract.js workers, it works best when run through a local server (opening `index.html` directly in the browser may cause CORS errors).
    * If using VS Code, use the **Live Server** extension.
    * Or via Python: `python -m http.server 8000`

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please look at <a href="CONTRIBUTING.md" target="_blank">CONTRIBUTING.md</a> for details on our code of conduct, and the process for submitting pull requests.

## ⚠️ Disclaimer
This application uses empirical data and established community formulas. In-game variables, server FPS, and desync can affect actual mining results. **Use at your own risk.**

## 📄 License
Distributed under the GNU General Public License (GPL). See `LICENSE` for more information.

## 📞 Contact
**Developer:** CHIRONDRAGON
**Organization:** THRUSTERS & DUST
# ⛏️ Mining Fracture Analyser

**Stop Guessing. Start Fracturing.**
[🔴 Live Demo](https://esramos-design.github.io/mfa.github.io/) | [🐛 Report Bug](YOUR_LINK_HERE) | [✨ Request Feature](YOUR_LINK_HERE) | [💬 Join Discord](YOUR_LINK_HERE)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> **📖 Introduction**
> The **Mining Fracture Analyser** is a precision calculation engine designed for serious industrial crews in Star Citizen (MOLEs, Prospectors, Golems).
>
> It simplifies complex mechanics by calculating your crew's **Total Combined Effective Laser Power (MW)** in real-time. Instantly determine if your team has enough power to crack a rock *before* you waste consumables or overheat your lasers.

**🤝 The Collaboration Team**
Developed by **CHIRONDRAGON** for the **THRUSTERS & DUST** organization.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### ✨ KEY FEATURES

📸 **OCR Auto-Scan (Magic Paste)**
Stop manually typing numbers while flying!
* Simply take a screenshot of your mining UI.
* **Paste (`Ctrl+V`)** directly into the browser.
* The tool automatically detects **Mass**, **Resistance**, and **Instability**.

🚀 **Advanced Multi-Crew Support**
Simulate any fleet composition:
* Mix ships (MOLEs + Prospectors + Golems).
* Toggle individual laser heads On/Off.
* Assign specific modules (Surge, Stampede) to specific heads.

📊 **Visual Analytics Suite**
Don't just see numbers; visualize the fracture:
* **Power Margin Chart:** See exactly how much overhead you have.
* **Risk Profile:** A doughnut chart balancing Resistance vs. Instability vs. Safety.
* **Resistance Curve:** A predictive line graph showing laser performance as heat increases.

💡 **Smart Recommendations**
Underpowered? The system thinks for you. It automatically suggests the **minimum laser heads required** and optimal **module configurations** to guarantee a break.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 📦 HOW TO USE

**1️⃣ Input Target Data**
* **Auto:** Paste a screenshot (`Ctrl+V`) into the "Auto-Scan" box.
* **Manual:** Enter Base Resistance (%), Instability (%), and Mass (kg).

**2️⃣ Assemble Team & Loadouts**
* Select your ship chassis.
* Click `Add` to generate laser slots.
* Configure Laser Heads, Modules, and Gadgets.

**3️⃣ Run Simulation**
* Click `RUN ANALYTIC SIMULATION`.
* Review the **Verdict**, **Effective Resistance**, and **Total Power** output.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## Disclaimer of Accuracy & Safety
**🛠️ Built With:** HTML5, Tailwind CSS (Space-Themed), Chart.js, Tesseract.js

**⚠️ Disclaimer:** Results are based on empirical community data. Server tick rates and desync may impact in-game results.

**📄 License:** This project is open-source and released under the GNU General Public License (GPL).

**Estimation Tool:** This is not a guarantee of success. In-game variables, ping, server latency, pilot charge control, and minor patch updates can all affect the actual results.  

**Use at Your Own Risk:** The developer is not responsible for any catastrophic failure (rock explosion) that may occur in the game.  

**Data Updates:** Values are based on the latest available data at the time of development. Star Citizen is an alpha, and all ship/laser/module stats are subject to change by Cloud Imperium Games (CIG).

