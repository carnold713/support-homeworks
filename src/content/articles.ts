/* =====================================================================
   HELP & FAQs — "Help & FAQs for a HomeWorks system."

   HOW TO EDIT
   • Topics are the bold rows in the left rail; subtopics sit under them.
   • Add an article: add { title, description } to a subtopic's `articles`.
     Add `kind: "video"` to show "Watch Video" instead of "Read Article".
   • Add a subtopic or topic by copying an existing block.
   • "All <Topic>" and "All Articles" views are built automatically, and
     articles are listed A–Z, so order here doesn't matter.
   ===================================================================== */

export type Article = { title: string; description: string; kind?: "article" | "video" };
export type Subtopic = { name: string; articles: Article[] };
export type Topic = { name: string; subtopics: Subtopic[] };

export const helpTopics: Topic[] = [
  {
    name: "Troubleshooting",
    subtopics: [
      {
        name: "Activation & Replacement",
        articles: [
          { title: "Application note #808 - Returning Clear Connect System Devices to Factory Default Settings", description: "Explains how devices get system addresses and how to reset Clear Connect devices to factory defaults." },
          { title: "Clear Connect Type-A Activation via Lutron App", description: "Describes the workflow for activating Clear Connect Type A devices using Lutron Designer and the Lutron app." },
          { title: "Complete App-Based Activation Guide", description: "Covers activating both CCA and CCX devices in a RadioRA 3 or HomeWorks system using the Lutron app." },
          { title: "How to Deactivate a CCX Device via the Lutron Mobile App", description: "Step-by-step deactivation of CCX devices after an accidental activation or a like-for-like replacement." },
        ],
      },
      {
        name: "Diagnostics & Monitoring Tools",
        articles: [
          { title: "Lutron Connect Portal - System Monitor Tool", description: "Introduces the System Monitor tool in the Lutron Connect Portal for checking system health remotely." },
          { title: "Lutron Connect Portal Overview", description: "Introduces the Lutron Connect Portal and its main features for managing systems." },
          { title: "Troubleshooting within Lutron Designer", description: "Overview of the Diagnostic tab and Terminal tool in Lutron Designer for testing and troubleshooting a system." },
        ],
      },
      {
        name: "Error & Blink Codes",
        articles: [
          { title: "Application Note #803 - Adaptive Power Module Troubleshooting Guide", description: "Helps troubleshoot Phase Adaptive Power Modules, including units with local interfaces and overloaded outputs." },
          { title: "Blink Codes for System Sunnata Devices", description: "Lists Sunnata dimmer, switch and keypad blink codes and links each one to its troubleshooting steps." },
          { title: "Blink codes for System-based Maestro devices", description: "Explains what blinking LEDs on system Maestro dimmers, switches and seeTouch keypads mean, with likely causes and fixes." },
          { title: "CCX Processors and PoE Injector Blink Codes", description: "Decodes the common status LED blink patterns on Clear Connect Type X processors and their PoE injectors." },
          { title: "Multi-Channel Tape Controller Troubleshooting", description: "Steps for resolving performance issues or blink codes on Lumaris RGB tape light and its multi-channel controller." },
          { title: "Troubleshooting LQSE Din-Rail Modules", description: "Walks through diagnosing a blink code shown on an LQSE DIN-rail power module." },
        ],
      },
      {
        name: "Lights Turning On & Off Unexpectedly",
        articles: [
          { title: "Why are my Lights turning On & Off unexpectedly? How to check Automations in the Alexa App that may be causing unwanted behavior of lights within the Lutron System", description: "Explains checking Alexa Hunches, Guard and Routines that could be changing Lutron lights at random." },
          { title: "Why are my Lights turning On & Off unexpectedly? How to check Automations within Apple HomeKit that may be causing unwanted behavior of lights turning on/off within the Lutron System", description: "Shows how to review Apple Home automations that may be switching Lutron lights on or off unexpectedly." },
          { title: "Why are my lights turning On & Off unexpectedly? How to Check Routines within the Google Home App that may have been programmed in error and now may be causing random lights to turn on or off in the Lutron System", description: "Describes finding Google Home routines programmed in error that cause random Lutron lights to turn on or off." },
        ],
      },
      {
        name: "Wireless & Communication",
        articles: [
          { title: "Application Note #809 - One-Way Transmitter Frequency Changing Procedures", description: "Explains how systems with multiple repeaters or processors use separate wireless channels to avoid communication problems." },
          { title: "Change CCA Device Channel via Lutron app", description: "Changes the channel on transmit-only CCA devices such as Picos and sensors so they talk to the processor." },
          { title: "Clear Connect Type X Live Channel Change", description: "Explains how to change the Clear Connect Type X wireless channel in near real time." },
          { title: "Determining and Troubleshooting QS Link Noise", description: "Describes QS Link noise, the symptoms it causes on wired devices, and how to track down its source." },
        ],
      },
    ],
  },
  {
    name: "Lighting & Controls",
    subtopics: [
      {
        name: "Dimming & LED Compatibility",
        articles: [
          { title: "Application Note #487 - Minimum and Maximum loads for LED and CFL lamps/fixtures", description: "Explains why incandescent-based min and max load ratings don't apply directly to LED and CFL loads." },
          { title: "Application Note #579 - Color Tuning with Lutron Controls", description: "Describes using Lutron controls to tune LED color for presentation, comfort and well-being." },
          { title: "Application Note #637 - NEMA SSL 7A Dimmer Compliance List Including Compliance With CA Title 24", description: "Lists Lutron dimmers compliant with NEMA SSL 7A phase-cut LED dimming and California Title 24." },
          { title: "Application Note #658 - Programming Residential Systems with Lutron LED Drivers", description: "How to program Lutron LED drivers in residential systems for smooth, flicker-free dimming." },
          { title: "Cycle Dim", description: "Explains what Cycle Dim is, how it behaves, and how to adjust its settings." },
        ],
      },
      {
        name: "Ketra & Tape Light",
        articles: [
          { title: "Identifying Lamp Order Codes by Lamp Type", description: "Shows how to read markings on CCX Ketra and Rania lamps to find the correct order code." },
          { title: "Ketra x96 LS0 Lightbar Slim Troubleshooting", description: "Troubleshooting resources for the Ketra X96 controller and LS0 Lightbar Slim." },
          { title: "Lumaris Tape Light Programming Overview", description: "How to add Lumaris tape light in Lutron Designer and program its Day/Night Mode and Natural Show." },
          { title: "Tape Light Troubleshooting", description: "Troubleshooting steps for common problems with Lumaris Tunable White tape light installations." },
        ],
      },
      {
        name: "Keypads & Wall Controls",
        articles: [
          { title: "Application Note #734 - Sunnata Dimmer MyLevel Personalization", description: "Customizing a Sunnata touch dimmer, including light bar brightness and a favorite light level." },
          { title: "Application Note #793 - Sunnata Switch MyLevel Personalization", description: "Adjusting a Sunnata switch's light bar brightness or turning off its locator light from the switch itself." },
          { title: "Device and Zone Lockouts in Lutron Designer", description: "Steps for locking out a wall control or zone to prevent unauthorized use, such as during an event." },
          { title: "Dimmer and Switch Button Programming", description: "Walks through programming Maestro and Sunnata dimmer and switch buttons in Lutron Designer." },
          { title: "Explore Lighting Designer Mode in the Lutron App", description: "Lutron Electronics video introducing Lighting Designer Mode in the Lutron app for HomeWorks QSX and Athena.", kind: "video" },
          { title: "Improved Palladiom Engraving Ordering with Lutron Designer", description: "Describes Designer 25.2 changes that simplify ordering Palladiom keypad, button kit and faceplate engraving." },
          { title: "Lighting Designer Mode in the Lutron App", description: "Using Lighting Designer Mode in the Lutron app to adjust live scenes and save them to Area Scenes." },
        ],
      },
    ],
  },
  {
    name: "System Design & Setup",
    subtopics: [
      {
        name: "Choosing & Planning a System",
        articles: [
          { title: "Natural Light Optimization", description: "Introduces Natural Light Optimization for HomeWorks QSX and RadioRA 3, supported shades, and its Lutron app features." },
          { title: "Power Outage Situations", description: "Describes how the system and its devices behave during and after a power outage." },
          { title: "Which Lutron Residential System is Best for Me?", description: "Compares Lutron's residential systems, including HomeWorks, to help you pick the right one." },
        ],
      },
      {
        name: "Legacy Upgrades",
        articles: [
          { title: "App Note 840 Hardware Overview", description: "Summarizes the hardware used to upgrade a HomeWorks Illumination system to HomeWorks QSX." },
          { title: "How to Convert a HomeWorks QS project to a HomeWorks QSX project", description: "Best practices and the general process for converting a HomeWorks QS project into HomeWorks QSX." },
          { title: "Panel Link to QS Link Translator Overview", description: "Describes the Panel Link Translator, its features and compatibility for legacy panel upgrades." },
          { title: "What is Homeworks Illumination?", description: "Overview of the legacy HomeWorks Illumination system and how it compares with current Lutron systems." },
        ],
      },
      {
        name: "Lutron Designer & Programming",
        articles: [
          { title: "Creating a Template Project for RA3 and QSX", description: "How to build a reusable template project file in Lutron Designer for RadioRA 3 and HomeWorks QSX." },
          { title: "Lutron Designer Set Shade Speed Alignment (IHA Tool) Guide", description: "How to use the Intelligent Hembar Alignment tool in Lutron Designer to align shade speeds." },
          { title: "System Monitor - Clear Connect Type A Device Firmware Update Support", description: "Instructions for updating firmware on Clear Connect Type A devices through System Monitor." },
        ],
      },
    ],
  },
  {
    name: "Networking",
    subtopics: [
      {
        name: "Cloud, Security & Remote Access",
        articles: [
          { title: "Managing and Sharing Cloud Access", description: "Explains how to manage and share access to Places through the Lutron Connect cloud." },
          { title: "RadioRA 2 | HomeWorks QS Telnet Lockout", description: "Answers common questions about Telnet Lockout, a security feature on RadioRA 2 and HomeWorks QS." },
          { title: "Why Upgrading Lutron Designer is Required for Enhanced Communications to the Processor", description: "Explains security updates in Designer 25.4 that affect communication with RadioRA 3, HomeWorks QSX, Athena and myRoom XC." },
        ],
      },
      {
        name: "Network Setup & Requirements",
        articles: [
          { title: "Creating a New Radio RA3 or HomeWorks System without Internet", description: "Best practices for setting up a new RadioRA 3 or HomeWorks QSX system with no internet access." },
          { title: "Ensuring Reliable Communication for Software, Processors, and Networks", description: "Helps isolate PC and network problems that delay projects, to improve processor reliability and connectivity." },
          { title: "Network Outage Situations", description: "How the system behaves during a network outage and how to check the processor's network status." },
          { title: "Network Requirements for Lutron Residential Systems", description: "Lists network requirements for Lutron residential lighting and shading systems." },
          { title: "Power over Ethernet (PoE): Overview and Lutron Compatibility", description: "Briefly explains powering the system processor using Power over Ethernet." },
        ],
      },
      {
        name: "Third-Party Integration",
        articles: [
          { title: "Application Note #704 - Interfacing Amazon Alexa with RadioRA 2 and HomeWorks QS", description: "Introduces voice control basics and command structure for using Alexa with RadioRA 2 and HomeWorks QS." },
          { title: "Application Note #798 - Integrating Sonos with RadioRA 3 and HomeWorks QSX", description: "Covers Sonos integration with RadioRA 3 and HomeWorks QSX, including control from the Lutron app." },
          { title: "HomeWorks QSX or myRoom XC Integration with CoolMaster LP by CoolAutomation", description: "Controlling VRV/VRF HVAC systems through CoolMaster LP, which connects to HomeWorks via Lutron's API." },
          { title: "Lutron's LEAP API Integration Protocol", description: "Information about LEAP, Lutron's API protocol for integrating third-party systems." },
        ],
      },
    ],
  },
  {
    name: "Application Notes",
    subtopics: [
      {
        name: "Fixtures & DALI",
        articles: [
          { title: "Application Note #482 - DALI Compatibility with Lutron DALI Controllers", description: "Contrasts certified DALI-2 devices with self-declared DALI version-1 devices that can cause interoperability issues." },
          { title: "Application Note #677 - Finire Prime Design Guide", description: "Design guidance for Finiré Prime downlights, including tilting modules for slanted ceilings." },
          { title: "Application Note #818 - Using DALI DIN Rail Power Modules in a HomeWorks System", description: "Integrating DALI DIN rail power modules into HomeWorks and which DALI devices count as DALI-2 certified." },
        ],
      },
      {
        name: "HVAC & Systems Integration",
        articles: [
          { title: "Application Note #650 - CoolMaster, CoolMasterNet, and CooLinkNet HVAC Integration with HomeWorks", description: "Describes integrating CoolAutomation VRV/VRF HVAC systems with HomeWorks." },
          { title: "Application Note #652 - Heatmiser HVAC Integration with HomeWorks", description: "How to use Heatmiser controls to manage underfloor heating from a HomeWorks system." },
        ],
      },
      {
        name: "Legacy System Retrofits",
        articles: [
          { title: "Application Note #817 - UL Listed Retrofit Solution for Savant-Litetouch Systems to QSX DIN Rail", description: "A UL listed path for retrofitting centralized Savant/LiteTouch lighting with HomeWorks QSX DIN rail, avoiding rewiring." },
          { title: "Application Note #829 - HomeWorks Illumination Extraction Procedure", description: "Steps to extract an existing project file from a HomeWorks Illumination P5 processor over the network." },
          { title: "Application Note #840 - Solutions for Upgrading from HomeWorks Illumination to HomeWorks QSX", description: "Explains QSX processor benefits and the upgrade paths available to existing HomeWorks Illumination customers." },
        ],
      },
      {
        name: "Sensors, Codes & Safety",
        articles: [
          { title: "Application Note #097 - Lightning/Surge Protection for RadioRA 2, HomeWorks QS, and HomeWorks Devices", description: "Explains that lightning can permanently damage Lutron gear, isn't covered by warranty, and how to protect against surges." },
          { title: "Application Note #602 - Best Practices for Occupancy Sensors in Server Rooms", description: "Addresses server-room challenges for occupancy sensors, such as hot, high airflow and low foot traffic." },
          { title: "Application Note #693 - Using Arc Fault Circuit Interrupters FAQ", description: "FAQ on arc-fault circuit interrupters and which breakers can handle a full circuit of dimmed lighting." },
        ],
      },
    ],
  },
  {
    name: "Installation & Care",
    subtopics: [
      {
        name: "Panels & DIN Rail Modules",
        articles: [
          { title: "Application Note #466 - Mounting Guidelines for Lutron's DIN Rail Products", description: "How to mount Lutron products on 35 mm top-hat DIN rail inside enclosures." },
          { title: "Application Note #670 - Wiring Low-Voltage and Line-Voltage Using DIN Power Modules and Panels", description: "Rules for running Class 2 low-voltage and line-voltage conductors in the same box with DIN power modules." },
          { title: "Application Note #697 - Using EcoSystem in HomeWorks QS", description: "Explains EcoSystem driver and ballast capacity for power modules and GRAFIK Eye QS units." },
          { title: "Application Note #701 - HomeWorks Manual Override Setup Guide", description: "Setting up manual override on DIN or remote power modules for use if keypad communication fails." },
        ],
      },
      {
        name: "Power & Wiring Protection",
        articles: [
          { title: "Application Note #406 - Using an Auxiliary Power Supply to Power Lutron Clear Connect RF Keypads", description: "Powering certain line-voltage CCA RF keypads with NEC Class 2 wiring and approved auxiliary supplies." },
          { title: "Application Note #775 - Using Output Breakers with Dimmers and Switches", description: "When a breaker must be installed on a Lutron control's output, due to local codes or added protection." },
        ],
      },
      {
        name: "Wallbox & Keypad Installation",
        articles: [
          { title: "Application Note #232 - How to Retrofit a Wall-Mounted RF seeTouch Keypad into an Existing Home", description: "Installing wireless seeTouch wall keypads in existing homes, including bracket mounting." },
          { title: "Application Note #567 - Mounting Wireless Phase Control Dimmers to a Ceiling Mounted Junction Box", description: "Mounting dimmers in an above-ceiling junction box instead of a wallbox, and where to find wiring directions." },
          { title: "Application note #705 - International Palladiom Keypad Installation Best Practices", description: "International installation best practices for Palladiom keypads." },
          { title: "Application Note #791 - Alisse Keypads - Round Backbox Installation Best Practices", description: "International best practices for installing Alisse keypads in round backboxes." },
          { title: "New Architectural Accessories Mounting Guide", description: "Wallbox requirements, installation and troubleshooting for New Architectural style receptacles." },
        ],
      },
    ],
  },
];
