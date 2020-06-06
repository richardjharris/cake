import React from "react";

const shapes = ["Round", "Square"];
const shapeGlyphs = ["⚪", "□"];
const units = ["cm", "inches"];

const NumInput = ({ label, field, value, onChange }) => {
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
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default function BakingTinSelector({ tin: inputTin, onUpdate }) {
  let tin = { ...inputTin };

  // Set initial state if missing
  if (!tin.shape) {
    tin.shape = shapes[0];
    tin.unit = units[0];
  }

  const handleUpdate = React.useCallback((e) => {
    tin[e.target.name] = e.target.value;
    onUpdate(tin);
  }, [onUpdate]);

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
          <NumInput label="Width" field="width" value={tin.width} onChange={handleUpdate} />
          <NumInput label="length" field="length" value={tin.length} onChange={handleUpdate} />
        </>
      ) : (
        <NumInput label="Diameter" field="diameter"  value={tin.diameter} onChange={handleUpdate} />
      )}
      <NumInput label="Height" field="height" value={tin.height} onChange={handleUpdate} />
      <select name="unit" value={tin.unit} onChange={handleUpdate}>
        <option value="cm">cm</option>
        <option value="in">inches</option>
      </select>
    </form>
  );
}
