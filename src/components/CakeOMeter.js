import React from "react";
import BakingTinSelector from "./BakingTinSelector";
import IngredientEditor from "./IngredientEditor";
import {
  tinScalingFactor,
  scaleIngredients,
} from "../logic/convertIngredients";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CakeOMeter() {
  const [ingredients, setIngredients] = useLocalStorage("ingredients", [{}]);
  const [oldTin, setOldTin] = useLocalStorage("oldTin", {});
  const [newTin, setNewTin] = useLocalStorage("newTin", {});

  const addIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, { name: "", quantity: "", unit: "each" }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const updateIngredient = (index, newData) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = newData;
    setIngredients(newIngredients);
  };

  const resetIngredients = () => {
    setIngredients([{ name: "", quantity: "", unit: "each" }]);
  };

  // Calculate new ingredient quantities. Returns null if the form
  // is not completely filled in.
  const scalingFactor = tinScalingFactor(oldTin, newTin);
  const convertedIngredients = scaleIngredients(ingredients, scalingFactor);

  return (
    <div id="container">
      <div id="cakeometer-inputs">
        <h2>Existing Recipe</h2>
        {ingredients.map((ingredient, index) => (
          <IngredientEditor
            key={index}
            ingredient={ingredient}
            index={index}
            onUpdate={updateIngredient}
            onRemove={removeIngredient}
          />
        ))}
        <button onClick={addIngredient}>Add Ingredient</button>
        <button className="clear-all" onClick={resetIngredients}>
          Clear all
        </button>
        <h2>Existing Baking Tin</h2>
        <BakingTinSelector tin={oldTin} onUpdate={setOldTin} />
        <h2>
          New Baking Tin
          {scalingFactor ? (
            <span className="scaling-factor">
              &nbsp;(scaled {scalingFactor.toFixed(1)} times)
            </span>
          ) : (
            ""
          )}
        </h2>
        <BakingTinSelector tin={newTin} onUpdate={setNewTin} />
      </div>
      <div id="cakeometer-result">
        <h2>New Recipe</h2>
        {convertedIngredients === null ? (
          <p>Your new recipe will appear here automatically!</p>
        ) : (
          <table className="ingredient-list">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {convertedIngredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.name || "-"}</td>
                  <td>
                    {ingredient.quantity.toFixed(1)} {ingredient.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
