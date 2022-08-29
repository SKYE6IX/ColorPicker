import chroma, { rgb } from "chroma-js";

// setting level of the colors brightiness
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

//creating a function that will generate a palette for us... 'starterPalette' will be object from seed color

function generatePalette(starterPalette) {
  //setting a new from palette
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  //looping over levels to set each of the value to have an array inside colors properties.
  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  //looping over every starterPalette colors and get the scale of the lightest one, then input
  // it into lower levels and then next one up ward and get the 'rgb' and 'rgba' along the way

  for (let color of starterPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }

  return newPalette;
}

// A function that create a range of colors which takes hexColor and generate an array with three
//color value

function getRange(hexColor) {
  const endColor = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, endColor];
}

// generate scale of colors base on how light and dark its..... which take two argument,
// hexColor and numberOfColor to generate

function generateScale(hexColor, numberOfColor) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColor);
}

export { generatePalette };
