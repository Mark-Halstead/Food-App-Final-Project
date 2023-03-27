import React, { useState, useEffect } from "react";
import axios from "axios";

function MyClients() {
  const [clients, setClients] = useState([]);
  const [pendingClients, setPendingClients] = useState([]);
  const [showMyClients, setShowMyClients] = useState(true);
  const [showPendingClients, setShowPendingClients] = useState(true);

  useEffect(() => {
    async function loadClients() {
      const response = await axios.get("http://127.0.0.1:5000/clients/");
      setClients(response.data.clients);
      setPendingClients(response.data.pending_clients);
    }

    loadClients();
  }, []);

  const toggleMyClients = () => {
    setShowMyClients(!showMyClients);
  }

  const togglePendingClients = () => {
    setShowPendingClients(!showPendingClients);
  }

  return (
    <div className="my-clients">
      <div className="my-clients-header" onClick={toggleMyClients}>
        <h2>My Clients <i className={showMyClients ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i></h2>
        
      </div>
      {showMyClients && 
        <ul className="client-list">
          {clients.map((client) => (
            <li key={client.id}>
              {client.name}
            </li>
          ))}
        </ul>
      }
      <div className="pending-clients-header" onClick={togglePendingClients}>
        <h2>Pending Clients <i className={showPendingClients ? "fa fa-chevron-down" : "fa fa-chevron-right"}></i></h2>
        
      </div>
      {showPendingClients && 
        <ul className="client-list">
          {pendingClients.map((client) => (
            <li key={client.id}>
              {client.name}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default MyClients;
