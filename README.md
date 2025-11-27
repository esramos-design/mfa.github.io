<div align="center">
  <a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">
    <img src="https://raw.githubusercontent.com/esramos-design/mfa.github.io/main/mpa.jpg" alt="Mining Fracture Analyser Logo" width="50%">
  </a>

  <h1 align="center">Mining Fracture Analyser</h1>

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

---

## 📑 Table of Contents
1. [About The Project](#-about-the-project)
2. [Key Features](#-key-features)
3. [How It Works](#-how-it-works)
4. [Getting Started](#-getting-started)
5. [Contributing](#-contributing)
6. [License](#-license)
7. [Contact](#-contact)

---

## 📖 About The Project

The **Mining Fracture Analyser** is a specialized web application developed by **CHIRONDRAGON** for the **THRUSTERS & DUST** organization.

Star Citizen mining mechanics involve complex variables: Laser Power, Instability, Resistance, Distance, and Consumables. Guessing these values often results in overheated rocks (explosions) or wasted time on rocks that are mathematically impossible to break.

This tool solves that problem by calculating the **Total Combined Effective Laser Power** of your entire crew in real-time, providing a simple "Pass/Fail" verdict before you even activate your lasers.

---

## ✨ Key Features

### 📸 OCR Auto-Scan (Tesseract.js)
Don't waste time typing numbers while piloting.
* **Step 1:** Take a screenshot of your mining UI.
* **Step 2:** Press `Ctrl+V` (Paste) directly into the app.
* **Result:** The app automatically reads and inputs Rock Mass, Resistance, and Instability.

### 🚀 Multi-Crew Fleet Simulation
Simulate any combination of ships currently in the game:
* **Argo MOLE** (3 Laser Heads)
* **MISC Prospector** (1 Laser Head)
* **Drake Golem** (Mining Turret Support)
* *Configurable:* Toggle individual heads on/off to simulate heat management strategies.

### 📊 Advanced Visual Analytics
We don't just show numbers; we visualize the physics:
* **Power Margin Chart:** Visualizes your power surplus vs. the rock's requirement.
* **Risk Profile:** A Doughnut chart comparing Resistance, Instability, and your Safety Margin.
* **Resistance Curve:** A predictive line graph showing how your laser efficiency performs across the heating window.

### 💡 Smart Recommendations
If your simulation fails, the **Recommendation Engine** kicks in. It will analyze available modules and tell you:
> *"You need 2 more active lasers and a Surge Module to crack this rock."*

---

## 🧠 How It Works
The application uses established community formulas (verified by SC-Trade-Tools and RedMonsterSC) to calculate:

1.  **Base Power:** Sum of all active laser heads.
2.  **Module Modifiers:** Applies buffs/debuffs from Surges, Stampedes, Torrents, etc.
3.  **Resistance Calculation:** `Effective Power = Total Power * (1 - Rock Resistance)`.
4.  **Heat Transfer:** Determines if `Effective Power` > `Rock Heat Threshold`.

---

## 📦 Getting Started

### Prerequisites
* A modern web browser (Chrome, Firefox, Edge, Brave).
* No installation required for the Live Demo.

### Local Installation (For Developers)
If you wish to run this locally or contribute to the code:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/esramos-design/mfa.github.io.git](https://github.com/esramos-design/mfa.github.io.git)
    ```
2.  **Navigate to the folder:**
    ```bash
    cd mfa.github.io
    ```
3.  **Run via Local Server:**
    * *Note:* Due to browser security policies (CORS) regarding Web Workers (used by Tesseract OCR), simply opening `index.html` file will not work for scanning.
    * **VS Code:** Right-click `index.html` -> "Open with Live Server".
    * **Python:** `python -m http.server 8000`

---

## 🤝 Contributing
Contributions are the lifeblood of open source. If you want to improve the UI, update the laser stats, or refine the OCR accuracy:

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`).
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`).
4.  Push to the Branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

Please see <a href="CONTRIBUTING.md" target="_blank">CONTRIBUTING.md</a> for more details.

---

## ⚠️ Disclaimer
This application is a fan-made tool. It uses empirical data. In-game variables such as server tick rates (FPS), desync, and unannounced CIG balance changes can affect actual mining results. **Use this tool as a guide, not a guarantee.**

## 📄 License
Distributed under the GNU General Public License (GPL). See `LICENSE` for more information.

## 📞 Contact
**Developer:** CHIRONDRAGON
**Organization:** THRUSTERS & DUST
