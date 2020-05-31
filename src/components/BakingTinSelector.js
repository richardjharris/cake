import React from "react";

const shapes = ["Round", "Square"];
const shapeGlyphs = ["⚪", "□"];
const units = ["cm", "inches"];

export default function BakingTinSelector({ tin: inputTin, onUpdate }) {
  let tin = { ...inputTin };

  // Set initial state if missing
  if (!tin.shape) {
    tin.shape = shapes[0];
    tin.unit = units[0];
  }

  const handleUpdate = (e) => {
    tin[e.target.name] = e.target.value;
    onUpdate(tin);
  };

  const NumInput = ({ label, field }) => {
    return (
      <label>
        {label}
        {": "}
        <input
          type="number"
          required
          step="any"
          min="0.0001"
          name={field}
          value={tin[field]}
          onChange={handleUpdate}
        />
      </label>
    );
  };

  return (
    <form className="tin-selector">
      Type:{" "}
      {shapes.map((shape, index) => (
        <label key={shape} className="radio-label">
          <input
            type="radio"
            name="shape"
            value={shape}
            checked={tin.shape === shape}
            onChange={handleUpdate}
          />
          {shape} &nbsp;{shapeGlyphs[index]}
        </label>
      ))}
      <br />
      {tin.shape === "Square" ? (
        <>
          <NumInput label="Width" field="width" />
          <NumInput label="length" field="length" />
        </>
      ) : (
        <NumInput label="Diameter" field="diameter" />
      )}
      <NumInput label="Height" field="height" />
      <select name="unit" value={tin.unit} onChange={handleUpdate}>
        <option value="cm">cm</option>
        <option value="in">inches</option>
      </select>
    </form>
  );
}
