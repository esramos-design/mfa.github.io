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
<a href="https://esramos-design.github.io/mfa.github.io/" target="_blank">🔴 <strong>Launch Live Demo</strong></a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">🐛 Report Bug</a>
|
<a href="https://github.com/esramos-design/mfa.github.io/issues" target="_blank">✨ Request Feature</a>
</p>
</div>

</div>


# **Mining Fracture Analyser (MFA) \- Desktop App**

The **Mining Fracture Analyser (MFA) \- Python Edition** stands as the definitive, professional-grade interface for Star Citizen mining crews who demand peak operational efficiency. While the web-based dashboard offers instant accessibility, this native Windows application represents a significant evolution in workflow optimization. By decoupling **MFA v5.15** from the constraints and resource consumption of a standard web browser, the desktop edition eliminates the screen clutter and "tab fatigue" that often plague high-stakes gameplay sessions. It transforms the calculator from a simple webpage into a dedicated, persistent tactical instrument—functioning virtually as a secondary Multi-Function Display (MFD) that lives outside your helmet.

Designed specifically for the high-pressure environment of volatile Quantanium extraction, this streamlined environment offers a focused, dark-mode workspace tailored for rapid data ingestion and real-time decision-making. It ensures critical fracture telemetry is always isolated from other browser processes, maximizing stability when system resources are under load. Beyond mere convenience, the desktop architecture unlocks the full potential of the MFA’s advanced feature set without the security sandboxing limits of a browser. It provides a robust, low-latency runtime for the **Reactive Loadouts** engine, seamlessly integrates the sophisticated **AI Foreman** for instant strategy generation, and drastically improves the **OCR 4.0** experience by enabling direct, permission-free access to screen capturing. This ensures you have the most powerful, responsive command center at your fingertips without compromise.

## **🛠️ Phase 1: Installation & Setup**

Setting up the desktop application involves a few straightforward steps designed to get your command center operational with minimal friction. This process creates a self-contained ecosystem for the tool, ensuring it runs reliably regardless of your browser settings or version.

### **1\. Install Python**

* **Download Python:** Begin by downloading the latest stable version of Python from the official website: [https://www.python.org/downloads/](https://www.python.org/downloads/). Python serves as the foundational runtime environment that powers the application's logic and interface wrapper. It acts as the engine under the hood, interpreting the code that makes the desktop window possible.  
* **Crucial Configuration:** During the installation process, you will see an option labeled **"Add Python to PATH"**. It is absolutely critical that you check this box before proceeding. Enabling this setting updates your system's environment variables, allowing your operating system to recognize Python commands from any command line interface. This is essential for installing dependencies and launching the application seamlessly. Failure to do so may result in "command not found" errors later, requiring manual system configuration to fix.

### **2\. Prepare Application Files**

Organization is key to a stable application environment. You will need to consolidate all necessary components into a single directory to ensure the application can locate its assets and logic files.

Create a dedicated new folder on your computer (for example, Desktop\\MFA\_Tool) to serve as the application's root directory. Ensure that you download and place **ALL** 5 core files listed below into this folder. Missing any single file will prevent the app from functioning correctly, as they work in concert to deliver the full experience:

1. run\_app.py: This is the **launcher script**, the Python file that initializes the window and loads the application logic. It acts as the bridge between your operating system and the web technologies used in the interface.  
2. index.html: The **main interface** file that defines the structure and layout of the dashboard. It contains the visual skeleton of the application.  
3. style.css: The **visual styles** sheet that controls the "Glassmorphism" aesthetic, responsive design elements, and dark mode theming. It ensures the app looks like a native piece of Star Citizen tech.  
4. script.js: The **calculation engine** and brain of the app, handling complex data processing, real-time math, chart rendering, and AI integration.  
5. scanner.js: The newly isolated **OCR and Camera logic** module. This file is **NEW in v5.15** and is specifically responsible for handling high-resolution image processing, video stream capture, and text recognition algorithms.

### **3\. Install the Window Wrapper**

To transform the standard HTML/JS web application into a native desktop window, we utilize a lightweight library called pywebview. This acts as a container, wrapping the web technologies in a native OS window frame.

Open your **Command Prompt** (cmd) or **Terminal** and execute the following command to install the necessary library:

pip install pywebview

*(This library effectively wraps the HTML tool, allowing it to run as a native window application. This provides a more immersive experience, independent of your web browser's tabs, history, or extensions, resulting in cleaner performance and better screen real estate management. It essentially creates a specialized browser instance just for this app, free from the distractions and overhead of Chrome or Firefox.)*

## **🔑 Phase 2: Activating the AI Foreman (Gemini API)**

To unlock the full potential of the MFA, specifically the advanced AI strategy and risk analysis features, you must authenticate with a valid API key from Google. This connects your local app to the powerful Gemini 2.5 Flash neural network, giving you access to an intelligent co-pilot.

1. **Get a Key:** Navigate to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a free API key. This key grants you access to the generative AI capabilities required for the Foreman's analysis. It acts as your personal credential for accessing Google's cloud computing power.  
2. **Launch the App:** Execute the run\_app.py script to open the MFA tool interface on your desktop.  
3. **Enter Key:**  
   * Locate the **"Senior Foreman AI"** section in the right-hand column (Column 4\) of the dashboard.  
   * Click the button labeled **"AUTH KEY"**.  
   * Paste your unique API key (which starts with the characters AIza...) into the input field and click **Initialize**.  
   * **Security Note:** The key is saved locally within the application's storage (LocalStorage). For added security, the system also employs a memory fallback mechanism, ensuring your session remains active even if local storage permissions are restricted, while keeping your key private to your local machine. It is never transmitted to any third-party server other than Google's official API endpoint.

## **🚀 Phase 3: Running the App**

Launching your tactical dashboard is simple once setup is complete. This process initializes the Python runtime, loads the pywebview wrapper, and renders the HTML interface.

1. Navigate to and open the folder containing your application files.  
2. Double-click the run\_app.py file to execute it.  
   (Advanced User Alternative: You can also right-click inside the folder, select "Open Terminal Here", and type python run\_app.py to run it directly from the command line. This method is useful for debugging as it allows you to see background logs and any potential error messages generated during runtime.)  
3. The application will immediately launch in a dedicated, borderless **"Dark Mode" window**. This window is optimized for low-light gaming environments and designed to visually integrate with the Star Citizen UI aesthetic, minimizing eye strain during long mining sessions.

## **🤖 Phase 4: Working with the AI Senior Foreman 2.0**

The AI module has been significantly upgraded and is now powered by **Gemini 2.5 Flash**. This new model supports rapid, context-aware analysis, including **pre-deployment strategy**, which saves you time and credits by preventing ill-equipped sorties. It acts as a virtual crew member, offering expert advice based on the complex variables of mining mechanics. The **Analytics Column** (Column 4\) provides four distinct modes of operation:

1. 🧠 **STRATEGY**  
   * *Best Use Case:* When you need a high-level assessment before undocking or immediately upon scanning a new deposit.  
   * **Function:** It performs a holistic analysis of the target rock's specific mass and resistance metrics against your current (or a hypothetical) fleet's power output. It considers standard laser capabilities and common module modifiers.  
   * **Outcome:** It provides a decisive "Go/No-Go" recommendation, advising on whether the fracture is safe to attempt with your current gear or if you critically need to deploy additional laser heads or heavier ships (like a MOLE) to overcome the resistance threshold.  
2. ⚠️ **RISK REPORT**  
   * *Best Use Case:* When dealing with Volatile materials (Quantanium) or rocks with dangerously high Instability ratings that threaten hull integrity.  
   * **Function:** It calculates the statistical probability of a catastrophic explosion based on the instability window, charge rates, and your available stability modifiers. It evaluates the "Green Zone" size relative to typical server tick rates and input lag.  
   * **Outcome:** It generates a detailed safety protocol, recommending specific safe engagement distances and identifying necessary stability modules (like the OptiMax or BoreMax) to widen the charge window and mitigate the threat of overcharging.  
3. 🔧 **LOADOUT**  
   * *Best Use Case:* When you want to min-max your efficiency for a specific, valuable deposit, or when you are struggling to break a tough rock.  
   * **Function:** It suggests mathematically optimal module combinations (balancing Surge, Brandt, and Torrent modules) tailored to the exact resistance and instability profile of the rock you are facing. It simulates the effects of stacking multiple modules to find the most efficient path to fracture.  
   * **Outcome:** This feature now integrates dynamically with the **Optimized Fleet Loadouts** panel. It doesn't just give generic advice; it suggests specific Stability vs. Power builds (e.g., "Use 2x Rieger-C3 on Head 1 for breaking power, switch to Focus III on Head 2 for extraction stability") based on real-time stats.  
4. 📢 **ORDERS**  
   * *Best Use Case:* When acting as the Crew Commander or Mining Lead in a multiplayer session with a MOLE crew or a fleet of Prospectors.  
   * **Function:** It synthesizes all technical data (rock stats, required power, recommended positioning, and module usage) into a concise, formatted "Command Uplink" text block.  
   * **Outcome:** This provides roleplay-ready text that you can read aloud over voice comms or copy/paste directly into the in-game chat. This ensures clear, professional communication, minimizing confusion and coordinating your team's laser fire for a synchronized fracture.

## **📷 Phase 5: Using OCR 4.0 in Python**

One of the standout features of the Python Desktop Edition is its ability to handle screen capturing more cleanly and efficiently than a browser tab. The native environment allows for direct access to screen buffers without the typical browser security prompts or UI chrome interference, resulting in a smoother, faster scanning experience.

**Option A: Live Stream Scanning (Recommended)**

This method allows for real-time data ingestion directly from your gameplay feed, making it the fastest way to input data during a chaotic mining run.

1. Click either the **"SCAN MINING ROCK"** or **"SCAN SHIP LOADOUT"** button within the app interface.  
2. A system window prompt will appear asking you to choose a source. Select your active **Star Citizen game window**.  
3. The app instantly applies the new **2.5x Scaling Filter** and high-contrast binarization algorithms to the video feed. This pre-processing step is crucial for accurately reading the pixelated, glowing, and often chromatic-aberrated text found in the game's HUD, which can confuse standard OCR engines.  
   * **Mining Scan:** Automatically detects and reads the **Mass**, **Resistance**, and **Instability** values from the rock's scanning UI. It parses these numbers, corrects for common OCR errors (like misreading '1' as 'I'), and populates the calculator fields instantly.  
   * **Loadout Scan:** Identifies and lists currently installed modules and laser heads from your VMA (Vehicle Manager App) or Mobiglas screen. This helps you quickly inventory your fleet's capability and ensure the calculator's fleet settings match your actual in-game loadout.

**Option B: Static Upload**

Useful for analyzing shared intelligence from discord, spectrum posts, or screenshots from previous sessions where live scanning isn't possible.

1. Take a standard screenshot of the rock's scan data or a loadout screen using your preferred capture tool.  
2. Click the **"OPTICAL SCAN (OCR)"** area in the app (or simply paste the image from your clipboard using CTRL+V).  
3. The tool processes the static image using the same high-res scaling engine used in the live stream, extracting the values instantly for analysis. This allows for asynchronous planning and strategy formulation.

## **⚠️ Troubleshooting**

If you encounter issues, refer to these common solutions to get back on track:

* **"Scanner not working" / Buttons unresponsive:** Double-check that the scanner.js file is present in the *exact same folder* as index.html. The app requires this file to load the OCR logic. If it's missing, the scanning functions will fail silently or throw errors in the console.  
* **"ModuleNotFoundError: No module named 'webview'":** This error indicates the Python library was not installed or is not accessible by the script. Close the app, open your terminal, and run the command pip install pywebview again to ensure the dependency is correctly installed in your current Python environment.  
* **"Black Screen on Scan":** This is often a DirectX/Vulkan capture issue where the game takes exclusive control of the display output. Ensure Star Citizen is running in **Borderless Windowed** mode in the game's graphics settings. Fullscreen mode can sometimes prevent external apps from capturing the video frame, resulting in a black screen.
