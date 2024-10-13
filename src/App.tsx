import React, { useState } from 'react';
import Login from './components/Login';
import Selection from './components/Selection';
import POS from './components/POS';
import Admin from './components/Admin';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'pos' | 'admin' | null>(null);

  const handleLogin = (success: boolean) => {
    setLoggedIn(success);
  };

  const handleSelection = (mode: 'pos' | 'admin') => {
    setSelectedMode(mode);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (!selectedMode) {
    return <Selection onSelect={handleSelection} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedMode === 'pos' ? <POS /> : <Admin />}
    </div>
  );
}

export default App;