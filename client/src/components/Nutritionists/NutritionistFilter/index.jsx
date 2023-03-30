import React, { useState } from "react";

function NutritionistFilter({ setCredentialsFilter, setAreaFilter, areaFilter, credentialsFilter }) {

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <select
        value={credentialsFilter}
        onChange={(e) => setCredentialsFilter(e.target.value)}
        style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", minWidth: "150px" }}
      >
        <option value="">Credentials</option>
        <option value="RD">RD</option>
        <option value="MS">MS</option>
        <option value="PhD">PhD</option>
        <option value="MD">MD</option>
      </select>
      <select
        value={areaFilter}
        onChange={(e) => setAreaFilter(e.target.value)}
        style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", minWidth: "150px" }}
      >
        <option value="">Area of Expertise</option>
        <option value="Weight management">Weight management</option>
        <option value="Sports nutrition">Sports nutrition</option>
        <option value="Eating disorders">Eating disorders</option>
        <option value="Gut health">Gut health</option>
        <option value="Cardiovascular health">Cardiovascular health</option>
        <option value="Diabetes">Diabetes</option>
        <option value="Pediatric nutrition">Pediatric nutrition</option>
        <option value="Nutrigenomics">Nutrigenomics</option>
      </select>
    </div>
  );
}

export default NutritionistFilter;

