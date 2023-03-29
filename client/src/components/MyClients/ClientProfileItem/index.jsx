import React from 'react';
import './styles.css';

function ClientProfileItem({ label, value, icon }) {
  return (
    <div className="client-profile-item">
      <div className="client-profile-label">
        {icon && <i className={icon}></i>}
        {label}
      </div> 
      <div>{value}</div>
    </div>
  );
}

export default ClientProfileItem;