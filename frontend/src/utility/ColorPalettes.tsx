import type { MantineColorsTuple } from "@mantine/core";

const darkModePalette = [
  "#000000", // 0 background: app, text, button
  "#D3D3D3", // 1 fixed letter background light
  "#FFFFFF", // 2 text
  "#FFFFFF", // 3 border
  "#90EE90", // 4 correct light green
  "#ADD8E6", // 5 duplicate light blue
  "#F08080", // 6 incorrect light red
  "#000000", // 7 NOT USED
  "#000000", // 8 NOT USED
  "#000000", // 9 NOT USED
] as MantineColorsTuple;

const lightModePalette = [
  "#FFFFFF", // 0 background: app, text, button
  "#696969", // 1 fixed letter background dark
  "#000000", // 2 text
  "#000000", // 3 border
  "#006400", // 4 correct dark green
  "#00008B", // 5 duplicate dark blue
  "#8B0000", // 6 incorrect dark red
  "#FFFFFF", // 7 NOT USED
  "#FFFFFF", // 8 NOT USED
  "#FFFFFF", // 9 NOT USED
] as MantineColorsTuple;

export { darkModePalette, lightModePalette };
