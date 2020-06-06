import React from "react";
import { Link } from "react-router-dom";

import BakingTinSelector from "./BakingTinSelector";
import { tinScalingFactor } from "../logic/convertIngredients";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CakeOMeterBasic() {
  const [oldTin, setOldTin] = useLocalStorage("oldTin", {});
  const [newTin, setNewTin] = useLocalStorage("newTin", {});

  const scalingFactor = tinScalingFactor(oldTin, newTin);

  return <>
    <div id="container">
      <div id="cakeometer-inputs">
        <h2>Existing Baking Tin</h2>
        <BakingTinSelector tin={oldTin} onUpdate={setOldTin} />
        <h2>New Baking Tin</h2>
        <BakingTinSelector tin={newTin} onUpdate={setNewTin} />
        <h2>Result</h2>
        <div>
          {scalingFactor ? (<span>
            You should scale your recipe quantities by {scalingFactor.toFixed(1)}x
             ({(scalingFactor * 100).toFixed(1)}%)</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
    <p class="footer">Try the <Link to="/recipe">recipe version</Link> if you want to type
      in your whole recipe and have the amounts scaled for you.</p>
  </>;
}
