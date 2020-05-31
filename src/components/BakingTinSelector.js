import React from 'react';

const shapes = ['Round', 'Square'];
const shapeGlyphs = ['⚪', '□']
const units = ['cm', 'inches'];

export default function BakingTinSelector({ tin: inputTin, onUpdate }) {
  let tin = { ...inputTin };

  // Set initial state if missing
  if (!tin.shape) {
    tin.shape = shapes[0];
    tin.unit = units[0];
  }

  const handleUpdate = e => {
    tin[e.target.name] = e.target.value;
    onUpdate(tin);
  };

  return <form class="tin-selector">
    Type: {shapes.map((shape, index) => <label class="radio-label">
      <input key={shape} type="radio" name="shape" value={shape}
        checked={tin.shape === shape} onChange={handleUpdate} />
      {shape} &nbsp;{shapeGlyphs[index]}
    </label>)}
    <br />
    {tin.shape === "Square" ? (
      <>
        <label>Width: <input type="number" step="any" required name="width" min="0.1" value={tin.width} onChange={handleUpdate} /></label>
        <label>Length: <input type="number" step="any" required name="length" min="0.1" value={tin.length} onChange={handleUpdate} /></label>
      </>
    ) : (
        <label>
          Diameter: <input type="number" step="any" required name="diameter" min="0.1" value={tin.diameter} onChange={handleUpdate} />
        </label>
      )}
    <label>Height: <input type="number" step="any" required name="height" min="0.1" value={tin.height} onChange={handleUpdate} /></label>
    <select name="unit" value={tin.unit} onChange={handleUpdate}>
      <option value="cm">cm</option>
      <option value="in">inches</option>
    </select>
  </form>;
}