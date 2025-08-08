# 🔍 Vuln Net Sim – Attack Topology Visualizer

**Vuln Net Sim** is an interactive **cyber attack topology visualizer** built with **React** and **react-cytoscapejs**.  
It depicts various **cyber attack scenarios** as network graphs, helping visualize how vulnerabilities propagate through different infrastructures.

---

## 🎯 Features

- **Dynamic Graph Rendering** using [Cytoscape.js](https://js.cytoscape.org/)
- **Multiple Attack Topologies** to illustrate different threat models
- **Interactive Nodes & Edges** for exploration
- **React-based SPA** for quick loading and smooth interaction

---

## 🗺️ Attack Topologies & Scenarios

Each attack type is represented with a **network topology** suited to the scenario:

| Attack Type | Description | Graph Topology |
|-------------|-------------|----------------|
| **Compromised Libraries** | Malicious code injected into widely used libraries, spreading through dependency trees. | **Dependency Tree** |
| **Tampered Updates** | Malicious updates pushed via compromised update servers. | **Star Topology** |
| **API Breaches** | Unauthorized access to APIs connecting multiple services. | **Bipartite Graph** |
| **Insider Threats** | Authorized internal actors misusing privileges. | **Mesh Network** |
| **Man-in-the-Middle** | Intercepting & modifying communications between two parties. | **Linear Path** |
| **Supply Chain Compromise** | Infiltration at any supply chain point affecting all downstream components. | **Multi-level Network** |
| **Zero-Day Exploits** | Exploiting unknown vulnerabilities to compromise multiple systems. | **Hub & Spoke** |
| **Ransomware Attack** | Malware encrypting data and spreading across systems. | **Tree Structure** |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/vuln-net-sim.git
cd vuln-net-sim
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm start
```
The app will start at **http://localhost:3000**

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Graph Visualization:** Cytoscape.js & react-cytoscapejs
- **Styling:** CSS / Tailwind (if used)

---

## 📌 Usage

- Select an attack type from the menu.
- The corresponding network topology will render.
- Hover or click nodes to inspect relationships and potential vulnerabilities.

---
- [React Official Docs](https://react.dev/)
