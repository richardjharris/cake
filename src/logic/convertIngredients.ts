// Convert ingredients for one type of baking tin to another

type BakingTinUnit = 'inches' | 'cm';

interface IBakingTin {
  unit: BakingTinUnit,
  height?: number,
}
interface RoundBakingTin extends IBakingTin {
  shape: 'Round',
  diameter?: number,
}
interface SquareBakingTin extends IBakingTin {
  shape: 'Square',
  width?: number,
  length?: number,
}
type BakingTin = RoundBakingTin | SquareBakingTin;

// Convert unit to centimeters if needed.
function unitConversion(unit: BakingTinUnit): number {
  if (unit === "cm") return 1;
  else return 1 / 2.54;
}

function tinBaseArea(tin: BakingTin): number | null {
  if (tin.shape === "Round") {
    if (!tin.diameter) return null;
    const diameter = tin.diameter * unitConversion(tin.unit);
    return Math.PI * Math.pow(diameter / 2, 2);
  } else {
    if (!tin.width || !tin.length) return null;
    return tin.width * tin.length * Math.pow(unitConversion(tin.unit), 2);
  }
}

function tinVolume(tin: BakingTin): number | null {
  const baseArea = tinBaseArea(tin);
  if (!tin.height || !baseArea) return null;
  return baseArea * tin.height * unitConversion(tin.unit);
}

export function tinScalingFactor(oldTin: BakingTin, newTin: BakingTin): number | null {
  const oldVol = tinVolume(oldTin);
  const newVol = tinVolume(newTin);
  if (!oldVol || !newVol) return null;

  const scaleFactor = newVol / oldVol;
  if (isNaN(scaleFactor) || !isFinite(scaleFactor)) return null;

  return scaleFactor;
}

type Ingredient = {
  quantity: number,
  name: string,
  unit: string,
}
type IngredientList = Ingredient[];

// TODO maybe use exceptions
export function scaleIngredients(ingredients: IngredientList, scaleFactor: number | null): IngredientList | null {
  if (scaleFactor === null || isNaN(scaleFactor)) return null;

  let converted: IngredientList = [];
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
