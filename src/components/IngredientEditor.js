import React from 'react';

const units = [
  'each',
  'ml',
  'litre',
  'fl/oz',
  'pint',
  'quart',
  'cup',
  'teaspoon',
  'tablespoon',
  'gram',
  'kg',
  'oz',
  'lb',
];

export default function IngredientEditor({ ingredient, index, onUpdate, onRemove }) {
  const hasDeleteButton = index !== 0;

  const handleUpdate = e => {
    onUpdate(index, { ...ingredient, [e.target.name]: e.target.value });
  };

  return <form className="ingredient-entry">
    <label>
      Ingredient {index + 1}:
      <input className="ingredient-name" type="text" name="name" value={ingredient.name} onChange={handleUpdate}
        placeholder="e.g. flour, eggs" />
    </label>
    <span style={{"display": "inline-block"}}>
    <label>
      Quantity:
      <input type="number" name="quantity" step="any" min="0.001" required value={ingredient.quantity} onChange={handleUpdate} />
    </label>
    <select name="unit" value={ingredient.unit} onChange={handleUpdate}>
      {units.map((unit) =>
        <option key={unit} value={unit}>{unit}</option>
      )}
    </select>
    {hasDeleteButton && <button onClick={() => onRemove(index)}>X</button>}
    </span>
  </form>
}