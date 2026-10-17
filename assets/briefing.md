# Microsoft 365 Copilot Capability Briefing & Architecture Overview

## 1. Developer Rosetta Stone: Translating Microsoft 365 Copilot to Claude Code Concepts

For software engineers and AI system architects accustomed to terminal-first agentic environments like Claude Code and Model Context Protocol (MCP) toolchains, evaluating Microsoft 365 Copilot requires translating Microsoft’s enterprise primitives into familiar developer paradigms. 

Microsoft 365 Copilot abstracts its engine across prebuilt orchestrators, enterprise data retrieval chains, and declarative or custom engine execution runtimes. The matrix below maps core Microsoft 365 Copilot nomenclature directly to corresponding paradigms, execution abstractions, and CLI tooling in Claude Code.

| Microsoft 365 Copilot Concept | Claude Code Equivalent / Paradigm | Architectural Description |
| :--- | :--- | :--- |
| **Declarative Agent** | Sub-agent / Custom System Prompt with targeted knowledge files (RAG) and API tools | An agent configured via custom system instructions, grounded in specific files or connectors, running on Microsoft's managed orchestrator and foundation models within M365 security boundaries. |
| **Custom Engine Agent** | Standalone Agentic Application / Custom LLM Loop using external orchestrators, custom models, and hosting (e.g., Python, Azure) | A custom agentic application using bespoke LLMs (small, large, or fine-tuned), external orchestrators, proactive event triggers, and self-hosted cloud runtimes (e.g., Azure Web Apps or Functions). |
| **Copilot Cowork** | Autonomous multi-step agent with Human-in-the-Loop (HITL) approval steps and native file/app tools | An autonomous execution framework that decomposes user goals into multi-step execution graphs, operating across local/cloud environments with mandatory approval gates for state-altering actions. |
| **Work IQ Dev Tools (`wiqd` CLI)** | Terminal CLI tool for agent project scaffolding, validation, packaging, and lifecycle management | A command-line interface used by developers to scaffold, validate schema, provision resources, package deployment assets, publish to catalogs, and monitor declarative agents directly from the terminal. |
| **Actions / Connectors** | Tool Use / Function Calling / MCP (Model Context Protocol) Server tools | OpenAPI bindings and data retrieval connectors allowing agents to perform real-time function calls, execute external transactional logic, or ingest external data feeds outside base model weights. |
| **Knowledge Grounding / Work IQ** | Enterprise Context RAG (Microsoft Graph, OneDrive, SharePoint files/emails/chats) | Enterprise Retrieval-Augmented Generation grounded dynamically across Microsoft Graph assets, inheriting security trimming across SharePoint, OneDrive, Teams chats, Outlook emails, and calendar events. |
| **Custom Skills (in Cowork)** | Custom tools or bash/script functions callable by the agent | Extensible function and script definitions (up to 50 custom skills per user) loaded dynamically during session initialization to extend native agent capabilities. |

---

## 2. Subscription & Security Architecture: Home Plan vs. Work Plan

Microsoft 365 Copilot operates across consumer (Personal, Family, Premium) and commercial/enterprise (Entra ID Work/School) subscription tiers. Architectural boundaries, storage models, computational limits, and regulatory controls vary significantly depending on whether the user authenticates with a personal Microsoft Account (MSA) or an enterprise Entra ID identity.

### Tier & Plan Comparison

| Feature / Architectural Dimension | Free Plan | Personal Plan ($9.99/mo) | Family Plan ($12.99/mo) | Premium Plan ($19.99/mo) | Commercial / Enterprise Work Accounts |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Target User & Licensing** | Individuals | 1 Person | Up to 6 People (AI for owner only) | Up to 6 People (AI for owner only) | Commercial / Business Users ($30/user/month add-on license) |
| **Copilot Usage Limits** | Limited capacity | Higher usage limits | Higher usage limits | Highest usage limits | Enterprise-allocated priority processing limits |
| **In-App Copilot (Word, Excel, PowerPoint, Outlook, OneNote)** | No | Yes | Yes | Yes | Yes |
| **Prebuilt Reasoning Agents** | None | None | None | Researcher, Analyst, Photos Agent | Researcher, Analyst, Workflows, Sales Agents |
| **Cloud Storage Allocation** | 5 GB | 1 TB | Up to 6 TB (1 TB/person standard; 2 TB pooled)* | Up to 6 TB (1 TB/person standard; 2 TB pooled)* | Enterprise OneDrive / SharePoint allocation (5 TB pooled for Pro) |
| **Security & Privacy Boundary** | Consumer privacy | Consumer data privacy | Consumer data privacy | Consumer data privacy | Enterprise Data Protection (EDP) guarantees |

*\*Note on Cloud Storage Transition Schedule:* Starting **October 8, 2026**, all new, expired, and repurchased Microsoft 365 Family and Premium subscriptions transition to **2 TB of pooled cloud storage**. Existing active subscribers transition upon renewal starting **May 2, 2027**. Subscriptions can be extended up to 10 TB total. Microsoft 365 Pro subscribers receive **5 TB of pooled cloud storage**.

### Data Boundaries & Enterprise Data Protection (EDP)

*   **Personal Accounts (MSA):** Operating via a personal Microsoft, Google, or Apple account subjects prompt interactions to standard consumer privacy policies. While personal content is saved to personal OneDrive accounts, consumer tiers do not offer corporate tenant-isolated governance or administrative logging.
*   **Work Accounts (Entra ID) & Enterprise Data Protection (EDP):** Enterprise users operate under formal Enterprise Data Protection guarantees:
    *   **No Model Training:** Prompts, responses, chat histories, and corporate files ingested via Microsoft Graph are strictly isolated and never used to train underlying public foundation models.
    *   **Commercial Data Boundaries:** Data stays within specified tenant geographic boundaries. Content retrieval strictly adheres to Security Trimming—Copilot only ground responses in files the specific user already has explicit Entra ID read permissions to access.
    *   **Defensive Guardrails:** Built-in security protections defend against prompt injection, data exfiltration, and harmful content generation, backstopped by Customer Copyright Commitment protections and full Purview audit logging.

### Bring Your Own Copilot (BYOCopilot) & Multi-Account Access

For enterprise professionals who own personal Microsoft 365 subscriptions (Personal, Family, or Premium) and also maintain corporate Entra ID credentials, Microsoft enables a dual-identity architecture within desktop productivity apps (Word, Excel, PowerPoint, Outlook, and OneNote on Windows, macOS, iPad, and mobile).

```
+-----------------------------------------------------------------------------------+
|                  MULTI-ACCOUNT ACCESS ARCHITECTURE (BYOCopilot)                   |
+-----------------------------------------------------------------------------------+
|  PERSONAL IDENTITY (MSA)               |  ENTERPRISE TENANT BOUNDARY (Entra ID)   |
|  • Licensing: M365 Premium Subscription |  • File Storage: Corporate SharePoint   |
|  • Unlocks desktop app Copilot canvas  |  • Isolation: Tenant EDP Active          |
|  • Personal settings & capabilities     |  • Access Control: Strictly inherited    |
|                                        |                                          |
|        [ USER DESKTOP APP CANVAS (Word / Excel / PowerPoint / OneNote) ]          |
|        - Personal MSA licenses the Copilot visual interface and features.          |
|        - Work Entra ID identity locks target document into Enterprise Data protection. |
+-----------------------------------------------------------------------------------+
```

*   **Identity Switcher Context:** Users sign into desktop apps with their personal account to license Copilot capabilities, while adding their work Entra ID identity within the app switcher.
*   **Tenant Data Isolation:** When opening a file hosted on an employer’s corporate SharePoint or OneDrive, Copilot dynamically binds execution to Enterprise Data Protection (EDP). Work data cannot cross into personal telemetry or storage channels, keeping corporate data within the tenant while enabling employee-provided licensing. Enterprise IT administrators maintain tenant-level policy controls to allow or restrict multi-account access.

---

## 3. Surface Area Analysis: The Four Doors of Interaction

Access to Microsoft 365 Copilot spans four distinct surface interaction points across web, desktop, and mobile platforms.

```
+-----------------------------------------------------------------------------------+
|                        MICROSOFT 365 COPILOT SURFACE AREA                         |
+-----------------------------------------------------------------------------------+
|  [DOOR 1] Standalone Copilot Chat App & Web Interface (copilot.cloud.microsoft)   |
|  [DOOR 2] Embedded Microsoft 365 Apps (Word, Excel, PowerPoint, Teams, OneNote)   |
|  [DOOR 3] Dedicated Workspaces & Canvases (Pages, Notebooks, Cowork Space)        |
|  [DOOR 4] Integrated Skilling & Knowledge Surfaces (Copilot Academy / Viva)       |
+-----------------------------------------------------------------------------------+
```

### Door 1: Standalone Copilot Chat App & Web Interface (`copilot.cloud.microsoft`)
*   Central conversational hub available via standard web browsers, native desktop apps (Windows/macOS), and mobile platforms (iOS/Android).
*   Provides structured chat interface for open-ended research, enterprise data retrieval, voice interaction, vision input, and GPT-4o powered AI image generation.
*   Functions as the primary orchestration launcher for prebuilt reasoning agents (e.g., Researcher, Analyst) and custom declarative agents.
*   Extends to mobile hardware via Siri shortcuts, iOS home screen widgets, dedicated action buttons, and Apple CarPlay voice interfaces.

### Door 2: Embedded Microsoft 365 Apps (In-App Copilot)
AI assistance integrated directly inside canvas productivity applications:
*   **Word:** Drafts initial document structures, rephrases text, generates summaries, accepts hands-free voice commands, and hosts inline agents like Researcher.
*   **Excel:** Automates data transformations, generates dynamic visual charts, applies formulas, and executes advanced data reasoning via Analyst agent and Agent Mode (requires file to be cloud-saved to OneDrive/SharePoint with AutoSave active).
*   **PowerPoint:** Builds structured presentations from natural language prompts or reference Word/PDF files, reformats layouts, and generates custom image assets.
*   **Outlook:** Summarizes long email threads, drafts structured replies, organizes inbox communications, and assists in meeting scheduling.
*   **Teams:** Synthesizes meeting conversations in real-time, extracts action items with speaker attributions, answers in-meeting queries, and drafts chat messages.
*   **OneNote:** Analyzes handwritten or typed notes across sections, generates page-level summaries, extracts project action items, and drafts structured meeting notes.

### Door 3: Dedicated Workspaces & Agent Canvases (Pages, Notebooks, Cowork Space)
*   **Copilot Pages:** Dynamic, multi-modal multiplayer workspaces that convert transient chat output into editable, persistent canvases. Supports team co-authoring, lightweight interactive app generation, and export to Word/PDF formats.
*   **Copilot Notebooks:** Context-focused workspaces for working with large collections of reference documents. Features custom instruction prompts, audio overviews, structured mind mapping, and infographic generation.
*   **Cowork Space:** A dedicated agent execution side-canvas designed for monitoring and controlling autonomous, multi-step tasks across enterprise files, calendars, and communications.

### Door 4: Integrated Skilling & Knowledge Surfaces (Copilot Academy / Viva Learning)
*   Centralized learning and onboarding hub surfaced through Microsoft Teams or the web (`aka.ms/copilotacademy`) via Viva Learning.
*   Delivers role-based learning paths with short video modules structured for specific functions (e.g., Finance, HR, IT, Legal, Operations, Sales, Communications, and Executives).
*   Enables administrators to duplicate, modify, and assign custom skilling paths across departments while tracking enterprise completion metrics in Viva Learning.

---

## 4. Specialized Intelligence: Prebuilt Agents

Microsoft provides built-in reasoning agents designed to execute domain-specific workflows that go beyond single-turn prompt interactions.

```
               +-------------------------------------------------+
               |             PREBUILT REASONING AGENTS           |
               +-------------------------------------------------+
               |                                                 |
               |  +--------------------+  +-------------------+  |
               |  |  RESEARCHER AGENT  |  |   ANALYST AGENT   |  |
               |  |  Multi-Step RAG /  |  |  Data Reasoning / |  |
               |  |  Claude Model Opt. |  | Excel Automation  |  |
               |  +--------------------+  +-------------------+  |
               |                                                 |
               |  +--------------------+  +-------------------+  |
               |  |  WORKFLOWS AGENT   |  |    SALES AGENT    |  |
               |  | Process Auto /     |  | Dynamics 365 /    |  |
               |  | Trigger Execution  |  | Salesforce Sync   |  |
               |  +--------------------+  +-------------------+  |
               |                                                 |
               |  +--------------------+  +-------------------+  |
               |  |    OFFICE AGENT    |  |   PHOTOS AGENT    |  |
               |  | Document Creation  |  | Image Management  |  |
               |  +--------------------+  +-------------------+  |
               |                                                 |
               +-------------------------------------------------+
```

### Researcher Agent
*   **Core Strengths:** Deep, multi-step reasoning across internal enterprise knowledge (files, emails, chats, meetings) and public web data. Generates cited research reports complete with structured headings and inline data visualizations.
*   **Supported Models:** Default foundation models, with administrator-managed support for **Anthropic's Claude** models (configurable within the Microsoft 365 admin center).
*   **Inputs / Outputs:** Ingests open-ended research topics, search scope definitions, and answers to clarifying prompts; outputs multi-page, cited research documents.
*   **Requirements:** Requires a Microsoft 365 Premium, Pro, or commercial Microsoft 365 Copilot add-on license.
*   **Comparison vs. Standard Copilot Chat:** Standard Copilot Chat prioritizes speed for quick drafts, short summaries, and instant lookup. Researcher operates across extended processing windows to conduct iterative multi-source retrieval, cross-reference datasets, and draft thorough analysis.

### Analyst Agent
*   **Core Strengths:** Specialized data reasoning engine embedded within Microsoft Excel. Ingests raw tabular data, cleans unstructured content, surfaces hidden trends, creates dynamic visual charts, and converts feedback into structured task lists.
*   **Inputs / Outputs:** Tabular data, numerical spreadsheets, and unstructured feedback files; outputs structured task grids, statistical summaries, pivot tables, and visual charts.
*   **Requirements:** Microsoft 365 Premium or Enterprise Copilot add-on; target spreadsheet must be saved in OneDrive or SharePoint with AutoSave turned on.

### Other Prebuilt Agents
*   **Workflows Agent:** Automates business processes and multi-step operational logic across Microsoft 365 services and external connectors.
*   **Office Agent:** Operates across Word, Excel, and PowerPoint to turn plain-text user intent into formatted documents, presentation decks, and analytical spreadsheets.
*   **Photos Agent:** Specialized media agent in the Copilot app for editing, analyzing, and organizing visual image assets.
*   **Sales Agent:** Automates sales operations by converting incoming client contacts into leads within Dynamics 365 or Salesforce, scheduling client meetings, and drafting personalized pitch communications grounded in enterprise data.

---

## 5. Autonomous Execution Engine: Copilot Cowork

Copilot Cowork is an autonomous agentic execution framework designed to execute complex, multi-step workflows across an organization's Microsoft 365 environment.

### Availability Status
*   **Work & School Accounts (Entra ID):** Generally Available (GA).
*   **Personal Accounts (MSA):** Preview (transitioned from the legacy Copilot Tasks preview; active execution access requires a Microsoft 365 Premium or Pro subscription).

### Execution & Control Loop

Cowork uses a transparent, step-by-step execution pipeline that keeps human operators in control while delegating multi-step execution to the agent.

```
+-----------------------------------------------------------------------------------+
|                        COWORK AUTONOMOUS EXECUTION LOOP                           |
+-----------------------------------------------------------------------------------+
|  1. PROMPT INPUT      User describes multi-step goal & attaches reference files.  |
|         │                                                                         |
|         ▼                                                                         |
|  2. DECOMPOSITION     Engine plans execution graph and displays steps in panel.   |
|         │                                                                         |
|         ▼                                                                         |
|  3. EXECUTION         Loads native/custom skills, parses Work IQ, executes tasks. |
|         │                                                                         |
|         ▼                                                                         |
|  4. HITL APPROVAL     Pause gate for Medium/High Risk state changes (Send/Post).   |
|         │             [ Approve (Send/Post) | Skip Future | Cancel ]             |
|         ▼                                                                         |
|  5. ITERATION         User reviews assets, steers context, or finalizes outputs.  |
+-----------------------------------------------------------------------------------+
```

1.  **Prompt Description:** The user specifies a goal in natural language (e.g., *"Audit the quarterly logistics reports in SharePoint, compile a summary presentation in PowerPoint, and send an email update to the project team"*).
2.  **Step Decomposition:** Cowork decomposes the goal into explicit, sequential execution steps displayed in a side-panel execution timeline.
3.  **Autonomous Execution & Dynamic Skill Discovery:** At session initialization, Cowork dynamically loads native skills, active M365 App Store plugins, and registered custom skills (up to 50 custom skills per user). It evaluates tool definitions against Model Context Protocol (MCP) tool schemas and script functions, automatically invoking the appropriate tool as execution progresses.
4.  **Browser Execution Modes:** When web interaction is required, Cowork uses a **Local Browser mode via Microsoft Edge**, operating within the user's active Edge session and authenticated state. A fully isolated, sandboxed **Remote Browser** cloud execution mode is scheduled for future release.
5.  **Human-in-the-Loop (HITL) Approval:** For actions that modify external state or communicate outside the session—classified with Medium or High Risk indicators (e.g., *Send Email*, *Post Teams Message*, *Decline Meeting Invites*)—Cowork pauses execution. It presents a permission dialog showing exact action parameters and risk levels, offering action buttons (**Send**, **Post**, or **Cancel**) along with a toggle to skip future prompts for identical actions in that session.
6.  **Review & Iteration:** Users can pause, steer with new instructions, edit intermediate outputs, or accept finalized artifacts (e.g., Word docs, PDFs, Copilot Pages).

### Native Skills & Extensibility

*   **Built-in Native Skills:** Pre-configured skills include *Word*, *Excel*, *PowerPoint*, *PDF*, *Email*, *Scheduling*, *Calendar Management*, *Meetings*, *Daily Briefing*, *Enterprise Search*, *Communications*, *Deep Research*, *Adaptive Cards*, and *App (Frontier)*.
*   **Custom Skills & MCP Alignment:** Users can define up to 50 custom skills using script functions or OpenAPI tool definitions. Cowork automatically registers and exposes these tools to the orchestrator at session boot.
*   **App Store Plugins:** Integrates with commercial enterprise plugins to provide domain-specific capability sets (e.g., specialized legal indexes, financial market feeds).
*   **Automations & Scheduled Prompts:** Supports temporal prompt scheduling for recurring tasks and event-driven automation triggers (e.g., triggering workflows based on incoming emails or Teams messages).

### App Skill (Frontier Preview)
Available via the Frontier Preview program, the **App Skill** allows users to generate full-stack, interactive data visualization and business apps directly within chat using natural language prompts. Grounded in enterprise files and spreadsheets, generated apps can be iteratively modified in conversation, saved directly to OneDrive, and published for team use.

---

## 6. Agent Development Continuum: From No-Code to Pro-Code

Extending Microsoft 365 Copilot spans a continuum from no-code web builders to pro-code custom agent applications hosted on dedicated cloud infrastructure.

### Declarative Agents vs. Custom Engine Agents

| Parameter / Dimension | Declarative Agents | Custom Engine Agents |
| :--- | :--- | :--- |
| **Primary Use Case** | Focused, scenario-specific productivity enhancements within M365. | Complex business logic, custom multi-step orchestration, bespoke external integrations. |
| **Sharing & User Context** | **Designed primarily for individuals** operating in personal scenario contexts. | **Supports individual use and group collaboration** across Teams channels, meetings, and external channels. |
| **Orchestrator & LLMs** | Built-in Microsoft 365 Copilot orchestrator and foundation models. | Custom orchestrator; supports custom, fine-tuned, small language, or multimodal LLMs. |
| **Proactive Interactions** | Not supported (Relies entirely on user-initiated prompts or explicit `@mentions`). | **Supported** (Triggers proactive messaging and event-driven tasks without direct user input). |
| **Hosting Infrastructure** | Fully hosted inside Microsoft 365 (No external cloud infrastructure required). | Requires external cloud hosting (e.g., Azure Web Apps / Azure Functions) at additional cost. |
| **Compliance & Security** | Automatically inherits Microsoft 365 Enterprise Data Protection (EDP), RAI, and compliance. | Developer managed (Developer must explicitly build security, RAI, and compliance controls). |
| **Agent Collaboration** | Single scenario execution within M365 boundaries. | Supports agent-to-agent communication, task delegation, and multi-agent coordination. |

### No-Code / Low-Code Tooling

*   **Agent Builder (in M365 Copilot):** Web interface for business users to quickly create declarative agents by writing system instructions, selecting SharePoint/OneDrive knowledge sources, and linking basic actions.
*   **Microsoft Copilot Studio:** Graphical low-code environment for enterprise authors to build declarative agents or custom engine orchestrations featuring visual dialog flows, variable routing, enterprise connectors, and custom triggers.

### Pro-Code Developer Tooling

*   **IDE Extensions:** Visual Studio Code and Visual Studio equipped with the **Microsoft 365 Agents Toolkit**.
*   **API Interface Contracts:** Uses **TypeSpec** to formally define declarative agent manifests, parameter schemas, and OpenAPI action plugins.
*   **SDKs & Frameworks:** Build custom engine execution loops using the **Microsoft 365 Agents SDK**, **Teams SDK**, or open-source frameworks like **Semantic Kernel** and **LangChain** in .NET, Python, and JavaScript.

### Terminal-First Developer Lifecycle (`wiqd` CLI)

For developers who prefer terminal-native workflows, Microsoft provides the **Work IQ Dev Tools (`wiqd`) CLI**. This command-line utility manages the declarative agent lifecycle directly from the terminal:
*   `wiqd` handles **scaffolding** project structures, **validating** manifest schemas, **provisioning** local/cloud dev environments, **packaging** agent archives, **publishing** to tenant catalogs, and streaming runtime **logs** directly to the terminal shell.

---

## 7. Feature Sunset Roadmap: August 2026 Retirements

Microsoft is executing a series of platform consolidations and feature retirements taking effect on **August 18, 2026**. System administrators and users must complete content extraction and migration before this deadline.

```
+-----------------------------------------------------------------------------------+
|               CRITICAL PLATFORM RETIREMENT DEADLINE: AUGUST 18, 2026              |
+-----------------------------------------------------------------------------------+
| Deprecated Feature    | Action Required & Migration Impact                        |
+-----------------------+-----------------------------------------------------------+
| Copilot Group Chat    | Thread histories, messages, and created images WILL NOT   |
|                       | be preserved. Users must manually extract content.        |
+-----------------------+-----------------------------------------------------------+
| Copilot Podcasts      | Feature fully retired. Users must manually download audio |
|                       | files from their podcast library prior to deadline.       |
+-----------------------+-----------------------------------------------------------+
| Consumer Deep Research| Retired in consumer app. Pro/Premium users transition to  |
|                       | Researcher agent; Personal/Family chats stay in history.  |
+-----------------------+-----------------------------------------------------------+
| Copilot Tasks Migration| Automated migration to Copilot Cowork with functional    |
| to Cowork (Preview)   | breaking changes (detailed below).                        |
+-----------------------------------------------------------------------------------+
```

### Critical Migration Impacts: Copilot Tasks -> Copilot Cowork

When accounts migrate from the legacy Copilot Tasks preview to Copilot Cowork, technical leads must note the following structural and access changes:

*   **Shared Links Invalidation:** Existing shared web links that point to legacy Copilot Tasks responses or generated content **will cease functioning permanently** post-migration.
*   **Subscription Execution Restrictions:** Cowork is a Premium/Pro preview feature. Users on standard Personal or Family subscriptions **will lose active execution capabilities in Cowork** upon migration. They retain read-only access to view historical Tasks conversations, but running active tasks or creating new ones requires upgrading to a Microsoft 365 Premium or Pro subscription.
*   **Conversations & Memories:** Task conversation threads automatically move to Cowork, but **saved memories from Tasks do not migrate**.
*   **Files & Copilot Pages Conversion:** Generated documents, presentations, and lightweight apps migrate to OneDrive, with saved text outputs converted into **Copilot Pages**.
*   **Generated Apps:** Apps created via Tasks move to OneDrive as separate files, but lose direct binding links to legacy historical task data.
*   **Scheduled Tasks:** Scheduled tasks migrate to Cowork but are set to **Off** by default, requiring manual reactivation and setup.
*   **Deprecated Channels:** Interacting with agents via direct SMS text messaging or email channels is fully deprecated under Cowork.

---

## 8. Implementation Strategy: Three-Stage Skilling & Adoption Plan

To drive enterprise adoption and build agent development capabilities, organizations should execute a structured, 3-stage program using resources from the **Copilot Skilling Center** and **Copilot Academy**.

```
+-----------------------------------------------------------------------------------+
|                     3-STAGE SKILLING & ADOPTION ROADMAP                           |
+-----------------------------------------------------------------------------------+
|  STAGE 1: Core AI Foundations & Prompt Engineering                                 |
|  ├── Master Copilot Chat interface & cross-app entry points                       |
|  ├── Standardize prompt structures (Goal, Context, Source, Expectation) in Lab    |
|  └── Complete core foundational learning paths in Copilot Academy                 |
|                                                                                   |
|  STAGE 2: Advanced Capabilities & Workflow Automation                             |
|  ├── Deploy prebuilt reasoning agents (Researcher with Claude, Analyst)           |
|  ├── Adopt Copilot Cowork for autonomous scheduling, email, & doc generation      |
|  └── Utilize Copilot Pages & Notebooks for persistent multiplayer drafting       |
|                                                                                   |
|  STAGE 3: Enterprise Extensibility & Pro-Code Agent Engineering                   |
|  ├── Build domain declarative agents via Agent Builder & Copilot Studio           |
|  ├── Develop pro-code agents with VS Code, M365 Agents Toolkit, & TypeSpec        |
|  └── Operationalize terminal workflows using wiqd CLI & custom engine runtimes    |
+-----------------------------------------------------------------------------------+
```

### Stage 1: Core AI Foundations & Prompt Engineering
*   **Objective:** Establish baseline AI literacy, operational security awareness, and prompting efficiency across the organization.
*   **Action Items:**
    1.  **Copilot Chat Onboarding:** Deploy standalone Copilot Chat (`copilot.cloud.microsoft`) across user endpoints and introduce embedded entry points in Word, Excel, PowerPoint, Outlook, Teams, and OneNote.
    2.  **Prompt Framework Standardization:** Train teams on four-part prompt construction (Goal, Context, Source, Expectation) using the **Prompt Lab** and sample galleries.
    3.  **Copilot Academy Onboarding:** Access Copilot Academy via Viva Learning in Teams or web (`aka.ms/copilotacademy`); assign foundational paths (*Get started with Copilot* and *Get started with Microsoft Copilot Chat*).

### Stage 2: Advanced Capabilities & Workflow Automation
*   **Objective:** Integrate domain reasoning agents and autonomous task execution into day-to-day business operations.
*   **Action Items:**
    1.  **Reasoning Agent Rollout:** Enable **Researcher** (configuring Anthropic's Claude models in the M365 admin center for advanced synthesis) and **Analyst** in Excel to automate multi-step research and dataset cleaning.
    2.  **Cowork Operationalization:** Adopt Copilot Cowork for daily briefings, meeting scheduling, email drafting, and status updates, training users on Human-in-the-Loop (HITL) approval gates.
    3.  **Persistent Workspace Integration:** Transition ephemeral chat conversations into co-authored documents using **Copilot Pages**, and analyze multi-document reference sets using **Copilot Notebooks**.

### Stage 3: Enterprise Extensibility & Pro-Code Agent Engineering
*   **Objective:** Empower software developers and system architects to build custom agents, integrate external APIs, and manage agent lifecycles via terminal-first tooling.
*   **Action Items:**
    1.  **Low-Code Agent Building:** Enable business developers to build SharePoint-grounded **Declarative Agents** using **Agent Builder** and **Copilot Studio**.
    2.  **Pro-Code Engineering:** Equip professional developer teams with Visual Studio Code, the **Microsoft 365 Agents Toolkit**, and **TypeSpec** to author custom OpenAPI actions and connectors.
    3.  **Terminal-First Dev Lifecycles (`wiqd` CLI):** Standardize developer toolchains around the `wiqd` CLI. Implement terminal commands into developer CI/CD workflows for local validation, provisioning, packaging, catalog publishing, and real-time log monitoring:
        ```bash
        # Terminal-first agent lifecycle management via wiqd CLI
        wiqd init --name "EnterpriseDocAgent"    # Scaffold agent project structure
        wiqd validate --manifest ./declarativeAgent.json  # Validate schema & OpenAPI definitions
        wiqd provision --env dev                  # Provision developer resources
        wiqd package --output ./build/agent.zip   # Package bundle for deployment
        wiqd publish --target tenant              # Publish agent bundle to M365 tenant catalog
        wiqd logs --tail                          # Stream real-time runtime agent execution logs
        ```
    4.  **Custom Engine Agent Architecture:** Where proactive event-driven execution, custom LLM models (e.g., Azure OpenAI, fine-tuned SLMs), or multi-agent orchestration frameworks (e.g., Semantic Kernel, LangChain) are required, design and host **Custom Engine Agents** on Azure infrastructure, enabling group collaboration across Teams channels and meetings.