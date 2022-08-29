import { useState, useEffect } from "react";
import Pallate from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const localBase = JSON.parse(window.localStorage.getItem("palettes"));
  const [palette, setPalette] = useState(localBase || seedColors);

  useEffect(() => {
    syncLocalStorage();
  }); 

  function findPalette(id) {
    return palette.find(function (palette) {
      return palette.id === id;
    });
  }

  function savedPalette(newPalette) {
    setPalette([...palette, newPalette]);
  }

  function syncLocalStorage() {
    // save palette to local storage
    window.localStorage.setItem("palettes", JSON.stringify(palette));
  }

  function removePalette (id){
    setPalette(prvPalette => {
      return prvPalette.filter(palette => palette.id !== id)
    })
  }
  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(reactProps) => (
          <NewPaletteForm
            savedPalette={savedPalette}
            palettes={palette}
            {...reactProps}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(routeProps) => (
          <PaletteList palettes={palette} removePalette={removePalette} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId"
        render={(routeProps) => (
          <Pallate
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
}

export default App;
