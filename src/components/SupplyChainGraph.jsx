import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Box, Paper, Typography, Button, List, ListItem, ListItemText, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { attackMetadata } from '../data/graphConfigs';

const attackDescriptions = {
  'Compromised Libraries': 'A supply chain attack where malicious code is injected into widely used libraries. The attack spreads through dependency trees, affecting all applications that use the compromised library.',
  'Tampered Updates': 'Attackers compromise the update distribution system, pushing malicious updates to multiple clients. The star topology shows how a single compromised update server can affect multiple endpoints.',
  'API Breaches': 'Unauthorized access to APIs that connect different services. The bipartite graph shows the relationship between APIs and the services they connect, highlighting potential breach points.',
  'Insider Threats': 'Internal actors with authorized access who misuse their privileges. The mesh network shows how insiders can move between different systems and services.',
  'Man-in-the-Middle': 'Attackers intercept and potentially modify communications between two parties. The linear path shows the interception point and data flow.',
  'Supply Chain Compromise': 'Attackers infiltrate the supply chain at any point, affecting all downstream components. The multi-level network shows how a compromise at any level can affect the entire chain.',
  'Zero-Day Exploits': 'Attacks using previously unknown vulnerabilities. The hub and spoke structure shows how a single vulnerable system can be exploited to affect multiple targets.',
  'Ransomware Attack': 'Malware that encrypts data and demands payment. The tree structure shows how ransomware can spread from entry points to multiple systems.'
};

const SupplyChainGraph = ({ attackType, data }) => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [compromisedNodes, setCompromisedNodes] = useState(new Set());
  const [mitigatedNodes, setMitigatedNodes] = useState(new Set());
  const [selectedTopology, setSelectedTopology] = useState('default');

  // Define available topologies for each attack type
  const attackTopologies = {
    'Compromised Libraries': [
      { value: 'default', label: 'Default Library Dependencies' },
      { value: 'transitive', label: 'Transitive Dependencies' },
      { value: 'version', label: 'Version-based Spread' }
    ],
    'Tampered Updates': [
      { value: 'default', label: 'Update Distribution' },
      { value: 'cascade', label: 'Cascading Updates' },
      { value: 'rollback', label: 'Rollback Vulnerabilities' }
    ],
    'API Breaches': [
      { value: 'default', label: 'Direct API Connections' },
      { value: 'cascade', label: 'API Cascade Effect' },
      { value: 'circular', label: 'Circular Dependencies' }
    ],
    'Supply Chain Compromise': [
      { value: 'default', label: 'Direct Dependencies' },
      { value: 'transitive', label: 'Transitive Dependencies' },
      { value: 'circular', label: 'Circular Dependencies' }
    ]
  };

  const getSpreadPattern = (node, attackType, topology) => {
    switch (attackType) {
      case 'Compromised Libraries':
        switch (topology) {
          case 'transitive':
            // Spread through both direct and indirect dependencies
            return node.outgoers('edge').targets().union(
              node.outgoers('edge').targets().outgoers('edge').targets()
            );
          case 'version':
            // Only spread to nodes with the same version
            return node.neighborhood('node').filter(n => 
              n.data('version') === node.data('version')
            );
          default:
            // Default: only direct dependencies
            return node.outgoers('edge').targets();
        }
      case 'Tampered Updates':
        switch (topology) {
          case 'cascade':
            // Spread through update distribution chain
            return node.outgoers('edge').targets().union(
              node.outgoers('edge').targets().outgoers('edge').targets()
            );
          case 'rollback':
            // Spread to nodes with older versions
            return node.neighborhood('node').filter(n => 
              n.data('version') < node.data('version')
            );
          default:
            // Default: direct update recipients
            return node.outgoers('edge').targets();
        }
      case 'API Breaches':
        switch (topology) {
          case 'cascade': {
            let first = node.outgoers('edge').targets();
            let second = first.outgoers('edge').targets();
            return first.union(second).difference(node);
          }
          case 'circular':
            // Spread through circular dependencies (cycle detection)
            return node.closedNeighborhood().filter(n => n.id() !== node.id() && n.connectedEdges().connectedNodes().has(node));
          default:
            // Default: only direct outgoing API connections
            return node.outgoers('edge').targets();
        }
      case 'Supply Chain Compromise':
        switch (topology) {
          case 'transitive':
            // Spread through both direct and indirect dependencies
            return node.outgoers('edge').targets().union(
              node.outgoers('edge').targets().outgoers('edge').targets()
            );
          case 'circular':
            // Spread through circular dependencies
            return node.neighborhood('node').filter(n => 
              n.connectedEdges().connectedNodes().has(node)
            );
          default:
            // Default: direct dependencies
            return node.outgoers('edge').targets();
        }
      default:
        return node.outgoers('edge').targets();
    }
  };

  const simulateAttack = () => {
    if (!cyRef.current) return;
    
    setIsSimulating(true);
    setSimulationStep(0);
    setCompromisedNodes(new Set());
    setMitigatedNodes(new Set());
    
    const cy = cyRef.current;
    
    // Reset all nodes to green
    cy.nodes().forEach(node => {
      node.style({
        'background-color': '#2E7D32',
        'border-color': '#4CAF50',
        'border-width': '2px',
        'border-opacity': 1,
        'text-outline-color': '#fff',
        'text-outline-width': 2,
        'color': '#000',
      });
    });

    // Reset all edges
    cy.edges().forEach(edge => {
      edge.style({
        'line-color': '#2E7D32',
        'target-arrow-color': '#2E7D32',
        'width': 2,
      });
    });

    // Start with a random node
    const startNode = cy.nodes().first();
    const queue = [startNode];
    const visited = new Set();
    let currentStep = 0;

    const spreadInterval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(spreadInterval);
        setIsSimulating(false);
        return;
      }

      const currentNode = queue.shift();
      if (visited.has(currentNode.id())) return;
      visited.add(currentNode.id());

      // Compromise current node
      currentNode.style({
        'background-color': '#D32F2F',
        'border-color': '#EF5350',
        'border-width': '3px',
        'border-opacity': 1,
        'text-outline-color': '#fff',
        'text-outline-width': 2,
        'color': '#000',
      });
      setCompromisedNodes(prev => new Set([...prev, currentNode.id()]));

      // Get nodes to spread to based on attack type and selected topology
      const nextNodes = getSpreadPattern(currentNode, attackType, selectedTopology);
      
      // Animate connected edges
      const connectedEdges = currentNode.connectedEdges();
      connectedEdges.forEach(edge => {
        edge.style({
          'line-color': '#D32F2F',
          'target-arrow-color': '#D32F2F',
          'width': 3,
        });
      });

      // Add next nodes to queue with probability based on attack type and topology
      nextNodes.forEach(node => {
        if (!visited.has(node.id())) {
          const spreadProbability = getSpreadProbability(attackType, selectedTopology);
          if (Math.random() < spreadProbability) {
            queue.push(node);
          } else if (Math.random() < 0.3) { // 30% chance of mitigation
            node.style({
              'background-color': '#FBC02D',
              'border-color': '#FDD835',
              'border-width': '3px',
              'border-opacity': 1,
              'text-outline-color': '#fff',
              'text-outline-width': 2,
              'color': '#000',
            });
            setMitigatedNodes(prev => new Set([...prev, node.id()]));
          }
        }
      });

      currentStep++;
      setSimulationStep(currentStep);
    }, 1000);
  };

  const getSpreadProbability = (attackType, topology) => {
    // Base probability for each attack type
    const baseProbability = (() => {
      switch (attackType) {
        case 'Compromised Libraries': return 0.9;
        case 'Tampered Updates': return 0.95;
        case 'API Breaches': return 0.7;
        case 'Insider Threats': return 0.8;
        case 'Man-in-the-Middle': return 0.6;
        case 'Supply Chain Compromise': return 0.85;
        case 'Zero-Day Exploits': return 0.9;
        case 'Ransomware Attack': return 0.95;
        default: return 0.7;
      }
    })();

    // Adjust probability based on topology
    switch (topology) {
      case 'transitive':
      case 'cascade':
        return baseProbability * 0.8; // Slightly lower probability for wider spread
      case 'version':
      case 'rollback':
        return baseProbability * 1.2; // Higher probability for targeted spread
      case 'circular':
        return baseProbability * 1.1; // Higher probability for circular dependencies
      default:
        return baseProbability;
    }
  };

  useEffect(() => {
    if (containerRef.current && data) {
      // Initialize Cytoscape instance
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: data,
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#00ff00',
              'border-color': '#33ff33',
              'border-width': '2px',
              'border-opacity': 1,
              'label': 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'text-wrap': 'wrap',
              'text-max-width': '100px',
              'font-size': '14px',
              'font-weight': 'bold',
              'color': '#1B5E20',
              'text-outline-width': 0,
              'padding': '15px',
              'shape': 'round-rectangle',
              'width': 60,
              'height': 40,
              'transition-property': 'background-color, border-color, border-width',
              'transition-duration': '0.3s'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#00ff00',
              'target-arrow-color': '#00ff00',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'label': 'data(label)',
              'font-size': '12px',
              'font-weight': 'bold',
              'color': '#fff',
              'text-outline-color': '#000',
              'text-outline-width': 2,
              'text-rotation': 'autorotate',
              'transition-property': 'line-color, target-arrow-color, width',
              'transition-duration': '0.3s'
            }
          }
        ],
        layout: {
          name: 'cose',
          idealEdgeLength: 150,
          nodeOverlap: 20,
          refresh: 20,
          fit: true,
          padding: 50,
          randomize: false,
          componentSpacing: 150,
          nodeRepulsion: 450000,
          edgeElasticity: 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        }
      });

      // Add edge animations
      cyRef.current.edges().forEach(edge => {
        edge.style({
          'line-color': '#2E7D32',
          'target-arrow-color': '#2E7D32',
        });
      });

      // Add node styles
      cyRef.current.nodes().forEach(node => {
        node.style({
          'background-color': '#2E7D32',
          'border-color': '#4CAF50',
          'border-width': '2px',
          'border-opacity': 1,
          'text-outline-color': '#fff',
          'text-outline-width': 2,
          'color': '#000',
        });
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data]);

  const metadata = attackMetadata[attackType];
  const availableTopologies = attackTopologies[attackType] || [];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: 3,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      <Typography 
        variant="h3" 
        sx={{
          color: '#2E7D32',
          textShadow: '0 0 10px rgba(46, 125, 50, 0.5)',
          fontFamily: 'Courier New, monospace',
          textAlign: 'center',
          mb: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0) 100%)',
            zIndex: -1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #2E7D32, transparent)',
            boxShadow: '0 0 10px rgba(46, 125, 50, 0.5)',
          }
        }}
      >
        Digital Vulnerabilities Analysis
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            flex: '1 1 60%',
            minWidth: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #2E7D32',
            boxShadow: '0 0 10px rgba(46, 125, 50, 0.2)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              color: '#2E7D32',
              textShadow: '0 0 5px rgba(46, 125, 50, 0.5)',
              mb: 3,
            }}
          >
            {attackType} Attack Simulation
          </Typography>

          {availableTopologies.length > 0 && (
            <FormControl 
              fullWidth 
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: '#2E7D32',
                  '& fieldset': {
                    borderColor: '#2E7D32',
                  },
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#2E7D32',
                },
              }}
            >
              <InputLabel>Attack Topology</InputLabel>
              <Select
                value={selectedTopology}
                onChange={(e) => setSelectedTopology(e.target.value)}
                label="Attack Topology"
              >
                {availableTopologies.map((topology) => (
                  <MenuItem key={topology.value} value={topology.value}>
                    {topology.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Box
            ref={containerRef}
            sx={{
              width: '100%',
              flex: 1,
              minHeight: '400px',
              border: '1px solid #2E7D32',
              borderRadius: 1,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: 'inset 0 0 10px rgba(46, 125, 50, 0.2)',
            }}
          />

          <Button 
            variant="contained" 
            color="primary" 
            onClick={simulateAttack}
            disabled={isSimulating}
            sx={{ 
              mb: 3,
              minWidth: '200px',
              height: '45px',
              fontSize: '1.1rem',
              boxShadow: '0 0 10px rgba(46, 125, 50, 0.3)',
            }}
          >
            {isSimulating ? `Simulating... (Step ${simulationStep})` : 'Simulate Attack'}
          </Button>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
              flex: '1 1 40%',
              minWidth: 0,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #2E7D32',
              boxShadow: '0 0 10px rgba(46, 125, 50, 0.2)',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
                color: '#2E7D32',
                textShadow: '0 0 5px rgba(46, 125, 50, 0.5)',
              mb: 3,
            }}
          >
            Attack Details
          </Typography>

            <Box sx={{ color: '#4CAF50' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Description</Typography>
            <Typography paragraph>{metadata.description}</Typography>

              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Impact</Typography>
            <Typography paragraph>{metadata.impact}</Typography>

              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Spread Pattern</Typography>
            <Typography paragraph>{metadata.spreadPattern}</Typography>

              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Spread Speed</Typography>
            <Typography paragraph>{metadata.spreadSpeed}</Typography>

              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Mitigation Strategies</Typography>
            <List>
              {metadata.mitigation.map((strategy, index) => (
                <ListItem key={index}>
                  <ListItemText primary={strategy} />
                </ListItem>
              ))}
            </List>

              <Typography variant="h6" sx={{ mb: 2, color: '#2E7D32' }}>Attack Indicators</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {metadata.indicators.map((indicator, index) => (
                <Chip 
                  key={index}
                  label={indicator}
                  sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      color: '#2E7D32',
                      border: '1px solid #2E7D32',
                  }}
                />
              ))}
            </Box>

              <Typography variant="h6" sx={{ mb: 2, mt: 2, color: '#2E7D32' }}>Affected Components</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {metadata.affectedComponents.map((component, index) => (
                <Chip 
                  key={index}
                  label={component}
                  sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      color: '#2E7D32',
                      border: '1px solid #2E7D32',
                  }}
                />
              ))}
            </Box>
          </Box>
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
};

export default SupplyChainGraph; 