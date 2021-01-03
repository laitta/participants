import React from 'react';
import { ParticipantsPage } from './participants/ParticipantsPage';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div>
          <div className="logo" />
          <h1>Nord software</h1>
        </div>
      </header>
      <ParticipantsPage />
    </div>
  );
}

export default App;
