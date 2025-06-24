// Graph configurations for different attack types

// Compromised Libraries - Dependency Tree
export const compromisedLibrariesConfig = {
  nodes: [
    { data: { id: 'root', label: 'Root Package' } },
    { data: { id: 'lib1', label: 'Library 1' } },
    { data: { id: 'lib2', label: 'Library 2' } },
    { data: { id: 'lib3', label: 'Library 3' } },
    { data: { id: 'dep1', label: 'Dependency 1' } },
    { data: { id: 'dep2', label: 'Dependency 2' } },
  ],
  edges: [
    { data: { source: 'root', target: 'lib1', label: 'depends on' } },
    { data: { source: 'root', target: 'lib2', label: 'depends on' } },
    { data: { source: 'lib1', target: 'lib3', label: 'depends on' } },
    { data: { source: 'lib2', target: 'dep1', label: 'depends on' } },
    { data: { source: 'lib3', target: 'dep2', label: 'depends on' } },
  ]
};

// Tampered Software Updates - Star Topology
export const tamperedUpdatesConfig = {
  nodes: [
    { data: { id: 'update', label: 'Update Server' } },
    { data: { id: 'client1', label: 'Client 1' } },
    { data: { id: 'client2', label: 'Client 2' } },
    { data: { id: 'client3', label: 'Client 3' } },
    { data: { id: 'client4', label: 'Client 4' } },
  ],
  edges: [
    { data: { source: 'update', target: 'client1', label: 'updates' } },
    { data: { source: 'update', target: 'client2', label: 'updates' } },
    { data: { source: 'update', target: 'client3', label: 'updates' } },
    { data: { source: 'update', target: 'client4', label: 'updates' } },
  ]
};

// API Breaches - Bipartite Graph
export const apiBreachesConfig = {
  nodes: [
    { data: { id: 'api1', label: 'API 1' } },
    { data: { id: 'api2', label: 'API 2' } },
    { data: { id: 'service1', label: 'Service 1' } },
    { data: { id: 'service2', label: 'Service 2' } },
    { data: { id: 'service3', label: 'Service 3' } },
  ],
  edges: [
    { data: { source: 'api1', target: 'service1', label: 'calls' } },
    { data: { source: 'api1', target: 'service2', label: 'calls' } },
    { data: { source: 'api2', target: 'service2', label: 'calls' } },
    { data: { source: 'api2', target: 'service3', label: 'calls' } },
  ]
};

// Insider Threats - Mesh Network
export const insiderThreatsConfig = {
  nodes: [
    { data: { id: 'user1', label: 'User 1' } },
    { data: { id: 'user2', label: 'User 2' } },
    { data: { id: 'user3', label: 'User 3' } },
    { data: { id: 'user4', label: 'User 4' } },
    { data: { id: 'system1', label: 'System 1' } },
    { data: { id: 'system2', label: 'System 2' } },
  ],
  edges: [
    { data: { source: 'user1', target: 'user2', label: 'communicates' } },
    { data: { source: 'user2', target: 'user3', label: 'communicates' } },
    { data: { source: 'user3', target: 'user4', label: 'communicates' } },
    { data: { source: 'user1', target: 'system1', label: 'accesses' } },
    { data: { source: 'user2', target: 'system1', label: 'accesses' } },
    { data: { source: 'user3', target: 'system2', label: 'accesses' } },
    { data: { source: 'user4', target: 'system2', label: 'accesses' } },
  ]
};

// Man-in-the-Middle Attacks - Linear Path
export const mitmConfig = {
  nodes: [
    { data: { id: 'client', label: 'Client' } },
    { data: { id: 'attacker', label: 'Attacker' } },
    { data: { id: 'server', label: 'Server' } },
  ],
  edges: [
    { data: { source: 'client', target: 'attacker', label: 'intercepted' } },
    { data: { source: 'attacker', target: 'server', label: 'forwards' } },
  ]
};

// Supply Chain Compromise - Multi-level Network
export const supplyChainCompromiseConfig = {
  nodes: [
    { data: { id: 'supplier1', label: 'Supplier 1' } },
    { data: { id: 'supplier2', label: 'Supplier 2' } },
    { data: { id: 'manufacturer', label: 'Manufacturer' } },
    { data: { id: 'distributor', label: 'Distributor' } },
    { data: { id: 'retailer1', label: 'Retailer 1' } },
    { data: { id: 'retailer2', label: 'Retailer 2' } },
    { data: { id: 'customer', label: 'End Customer' } },
  ],
  edges: [
    { data: { source: 'supplier1', target: 'manufacturer', label: 'supplies' } },
    { data: { source: 'supplier2', target: 'manufacturer', label: 'supplies' } },
    { data: { source: 'manufacturer', target: 'distributor', label: 'ships to' } },
    { data: { source: 'distributor', target: 'retailer1', label: 'distributes to' } },
    { data: { source: 'distributor', target: 'retailer2', label: 'distributes to' } },
    { data: { source: 'retailer1', target: 'customer', label: 'sells to' } },
    { data: { source: 'retailer2', target: 'customer', label: 'sells to' } },
  ]
};

// Zero-Day Exploits - Hub and Spoke with Hidden Nodes
export const zeroDayExploitsConfig = {
  nodes: [
    { data: { id: 'vulnerable', label: 'Vulnerable System' } },
    { data: { id: 'exploit1', label: 'Exploit 1' } },
    { data: { id: 'exploit2', label: 'Exploit 2' } },
    { data: { id: 'target1', label: 'Target 1' } },
    { data: { id: 'target2', label: 'Target 2' } },
    { data: { id: 'target3', label: 'Target 3' } },
    { data: { id: 'hidden', label: 'Hidden Node' } },
  ],
  edges: [
    { data: { source: 'vulnerable', target: 'exploit1', label: 'exploited by' } },
    { data: { source: 'vulnerable', target: 'exploit2', label: 'exploited by' } },
    { data: { source: 'exploit1', target: 'target1', label: 'affects' } },
    { data: { source: 'exploit1', target: 'target2', label: 'affects' } },
    { data: { source: 'exploit2', target: 'target2', label: 'affects' } },
    { data: { source: 'exploit2', target: 'target3', label: 'affects' } },
    { data: { source: 'hidden', target: 'vulnerable', label: 'monitors' } },
  ]
};

// Ransomware Attack - Tree with Multiple Entry Points
export const ransomwareConfig = {
  nodes: [
    { data: { id: 'entry1', label: 'Entry Point 1' } },
    { data: { id: 'entry2', label: 'Entry Point 2' } },
    { data: { id: 'server1', label: 'Server 1' } },
    { data: { id: 'server2', label: 'Server 2' } },
    { data: { id: 'workstation1', label: 'Workstation 1' } },
    { data: { id: 'workstation2', label: 'Workstation 2' } },
    { data: { id: 'database', label: 'Database' } },
  ],
  edges: [
    { data: { source: 'entry1', target: 'server1', label: 'infects' } },
    { data: { source: 'entry2', target: 'server2', label: 'infects' } },
    { data: { source: 'server1', target: 'workstation1', label: 'spreads to' } },
    { data: { source: 'server1', target: 'workstation2', label: 'spreads to' } },
    { data: { source: 'server2', target: 'database', label: 'encrypts' } },
    { data: { source: 'workstation1', target: 'database', label: 'accesses' } },
  ]
};

// Attack metadata with detailed information
export const attackMetadata = {
  'Compromised Libraries': {
    description: 'A supply chain attack where malicious code is injected into widely used libraries. The attack spreads through dependency trees, affecting all applications that use the compromised library.',
    impact: 'High - Can affect multiple applications and systems simultaneously',
    spreadPattern: 'Tree-based propagation through dependency chains',
    mitigation: [
      'Implement strict dependency verification',
      'Use package signing and verification',
      'Maintain an allowlist of trusted packages',
      'Regular security audits of dependencies'
    ],
    indicators: [
      'Unexpected network connections',
      'Unusual system behavior',
      'Modified package checksums',
      'Suspicious code execution patterns'
    ],
    spreadSpeed: 'Fast - Can propagate through entire dependency tree within minutes',
    affectedComponents: ['Package managers', 'Build systems', 'Deployment pipelines']
  },
  'Tampered Updates': {
    description: 'Attackers compromise the update distribution system, pushing malicious updates to multiple clients. The star topology shows how a single compromised update server can affect multiple endpoints.',
    impact: 'Critical - Can affect all systems receiving updates',
    spreadPattern: 'Centralized distribution from update server to clients',
    mitigation: [
      'Implement update signing and verification',
      'Use multiple update servers with verification',
      'Implement rollback capabilities',
      'Regular integrity checks of update packages'
    ],
    indicators: [
      'Failed update verifications',
      'Unexpected update packages',
      'Modified update signatures',
      'Unusual update server behavior'
    ],
    spreadSpeed: 'Very Fast - Can affect all clients within update cycle',
    affectedComponents: ['Update servers', 'Client systems', 'Verification systems']
  },
  'API Breaches': {
    description: 'Unauthorized access to APIs that connect different services. The bipartite graph shows the relationship between APIs and the services they connect, highlighting potential breach points.',
    impact: 'High - Can expose sensitive data and service functionality',
    spreadPattern: 'Lateral movement through connected services',
    mitigation: [
      'Implement strict API authentication',
      'Use API gateways with rate limiting',
      'Regular security audits of API endpoints',
      'Implement API versioning and deprecation'
    ],
    indicators: [
      'Unusual API access patterns',
      'Failed authentication attempts',
      'Unexpected data access',
      'Abnormal API response times'
    ],
    spreadSpeed: 'Medium - Depends on API usage patterns',
    affectedComponents: ['API endpoints', 'Service connections', 'Authentication systems']
  },
  'Insider Threats': {
    description: 'Internal actors with authorized access who misuse their privileges. The mesh network shows how insiders can move between different systems and services.',
    impact: 'Severe - Can bypass many security controls',
    spreadPattern: 'Privilege escalation and lateral movement',
    mitigation: [
      'Implement least privilege access',
      'Regular access reviews',
      'User behavior analytics',
      'Separation of duties'
    ],
    indicators: [
      'Unusual access patterns',
      'Privilege escalation attempts',
      'Data exfiltration patterns',
      'Bypass of security controls'
    ],
    spreadSpeed: 'Variable - Depends on attacker knowledge and access',
    affectedComponents: ['User accounts', 'Access controls', 'Monitoring systems']
  },
  'Man-in-the-Middle': {
    description: 'Attackers intercept and potentially modify communications between two parties. The linear path shows the interception point and data flow.',
    impact: 'High - Can compromise data integrity and confidentiality',
    spreadPattern: 'Point-to-point interception',
    mitigation: [
      'Use strong encryption',
      'Implement certificate pinning',
      'Regular certificate validation',
      'Network segmentation'
    ],
    indicators: [
      'Certificate warnings',
      'Unexpected network routes',
      'Modified data in transit',
      'Unusual network latency'
    ],
    spreadSpeed: 'Instant - Affects all traffic through compromised point',
    affectedComponents: ['Network connections', 'SSL/TLS', 'Certificate authorities']
  },
  'Supply Chain Compromise': {
    description: 'Attackers infiltrate the supply chain at any point, affecting all downstream components. The multi-level network shows how a compromise at any level can affect the entire chain.',
    impact: 'Critical - Can affect entire product lifecycle',
    spreadPattern: 'Downstream propagation through supply chain',
    mitigation: [
      'Supplier security assessments',
      'Component verification',
      'Secure shipping and handling',
      'Regular supply chain audits'
    ],
    indicators: [
      'Modified components',
      'Unexpected suppliers',
      'Changed shipping routes',
      'Altered component specifications'
    ],
    spreadSpeed: 'Slow but widespread - Can affect multiple products',
    affectedComponents: ['Suppliers', 'Manufacturers', 'Distributors', 'Retailers']
  },
  'Zero-Day Exploits': {
    description: 'Attacks using previously unknown vulnerabilities. The hub and spoke structure shows how a single vulnerable system can be exploited to affect multiple targets.',
    impact: 'Critical - No existing defenses',
    spreadPattern: 'Rapid exploitation of vulnerable systems',
    mitigation: [
      'Regular security updates',
      'Vulnerability scanning',
      'Network segmentation',
      'Intrusion detection systems'
    ],
    indicators: [
      'Unexpected system behavior',
      'Unknown attack patterns',
      'Failed security controls',
      'Unusual system crashes'
    ],
    spreadSpeed: 'Very Fast - Can spread before patches are available',
    affectedComponents: ['Vulnerable systems', 'Security controls', 'Monitoring systems']
  },
  'Ransomware Attack': {
    description: 'Malware that encrypts data and demands payment. The tree structure shows how ransomware can spread from entry points to multiple systems.',
    impact: 'Critical - Can halt business operations',
    spreadPattern: 'Network propagation and file encryption',
    mitigation: [
      'Regular backups',
      'Network segmentation',
      'Email filtering',
      'User training'
    ],
    indicators: [
      'File encryption patterns',
      'Ransom notes',
      'Unusual file access',
      'Network scanning activity'
    ],
    spreadSpeed: 'Fast - Can encrypt entire network within hours',
    affectedComponents: ['File systems', 'Network shares', 'Backup systems']
  }
}; 