import React, { useState } from 'react';
import { Container, Box, Select, MenuItem, FormControl, InputLabel, ThemeProvider } from '@mui/material';
import SupplyChainGraph from './components/SupplyChainGraph';
import { matrixTheme } from './theme';
import {
  compromisedLibrariesConfig,
  tamperedUpdatesConfig,
  apiBreachesConfig,
  insiderThreatsConfig,
  mitmConfig,
  supplyChainCompromiseConfig,
  zeroDayExploitsConfig,
  ransomwareConfig
} from './data/graphConfigs';

const attackTypes = {
  'Compromised Libraries': compromisedLibrariesConfig,
  'Tampered Updates': tamperedUpdatesConfig,
  'API Breaches': apiBreachesConfig,
  'Insider Threats': insiderThreatsConfig,
  'Man-in-the-Middle': mitmConfig,
  'Supply Chain Compromise': supplyChainCompromiseConfig,
  'Zero-Day Exploits': zeroDayExploitsConfig,
  'Ransomware Attack': ransomwareConfig
};

function App() {
  const [selectedAttack, setSelectedAttack] = useState('Compromised Libraries');

  const handleAttackChange = (event) => {
    setSelectedAttack(event.target.value);
  };

  return (
    <ThemeProvider theme={matrixTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #FFFFFF 0%, #F5F5F5 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel 
                id="attack-type-label"
                sx={{
                  color: '#2E7D32',
                  '&.Mui-focused': {
                    color: '#4CAF50',
                  },
                }}
              >
                Attack Type
              </InputLabel>
              <Select
                labelId="attack-type-label"
                value={selectedAttack}
                label="Attack Type"
                onChange={handleAttackChange}
                sx={{
                  color: '#2E7D32',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2E7D32',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2E7D32',
                  },
                }}
              >
                {Object.keys(attackTypes).map((attack) => (
                  <MenuItem 
                    key={attack} 
                    value={attack}
                    sx={{
                      color: '#2E7D32',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(46, 125, 50, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.3)',
                        },
                      },
                    }}
                  >
                    {attack}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <SupplyChainGraph
              attackType={selectedAttack}
              data={attackTypes[selectedAttack]}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
