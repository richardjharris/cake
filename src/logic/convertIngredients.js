// Convert ingredients for one type of baking tin to another

// Convert unit to centimeters if needed.
function unitConversion(unit) {
  if (unit === "cm") return 1;
  else return 1 / 2.54;
}

function tinBaseArea(tin) {
  if (tin.shape === "Round") {
    if (isNaN(tin.diameter)) return null;
    const diameter = tin.diameter * unitConversion(tin.unit);
    return Math.PI * Math.pow(diameter / 2, 2);
  } else {
    if (isNaN(tin.width) || isNaN(tin.length)) return null;
    return tin.width * tin.length * Math.pow(unitConversion(tin.unit), 2);
  }
}

function tinVolume(tin) {
  if (isNaN(tin.height)) return null;
  return tinBaseArea(tin) * tin.height * unitConversion(tin.unit);
}

export function tinScalingFactor(oldTin, newTin) {
  const oldVol = tinVolume(oldTin);
  const newVol = tinVolume(newTin);
  if (isNaN(oldVol) || isNaN(newVol)) return null;

  const scaleFactor = newVol / oldVol;
  if (isNaN(scaleFactor) || !isFinite(scaleFactor)) return null;

  return scaleFactor;
}

// TODO maybe use exceptions
export function scaleIngredients(ingredients, scaleFactor) {
  if (isNaN(scaleFactor)) return null;

  let converted = [];
  for (const ingredient of ingredients) {
    // Skip over invalid or zero quantities, as the original script does.
    if (isNaN(ingredient.quantity) || !ingredient.quantity) continue;
    converted.push({
      ...ingredient,
      quantity: ingredient.quantity * scaleFactor,
    });
  }

  // If no valid ingredients, don't print a table.
  if (!converted.length) return null;

  return converted;
}
