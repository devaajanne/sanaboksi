import type { MantineColorsTuple } from "@mantine/core";

const lightModePalette = [
  "#FFFAFA", // 0 light main color - backgrounds, buttons, game grid
  "#242424", // 1 dark main color - text, border, icons
  "#D3D3D3", // 2 light gray - fixed letter background
  "#006400", // 3 dark green - correct
  "#8B0000", // 4 dark red - incorrect
  "#00008B", // 5 dark blue - duplicate
  "#FFFFFF", // 6 NOT USED
  "#FFFFFF", // 7 NOT USED
  "#FFFFFF", // 8 NOT USED
  "#FFFFFF", // 9 NOT USED
] as MantineColorsTuple;

const darkModePalette = [
  "#242424", // 0 dark main color - backgrounds, buttons, game grid
  "#FFFAFA", // 1 light main color - text, border, icons
  "#696969", // 2 dark gray - fixed letter background
  "#90EE90", // 3 light green - correct
  "#F08080", // 4 light red - incorrect
  "#ADD8E6", // 5 light blue - duplicate
  "#000000", // 6 NOT USED
  "#000000", // 7 NOT USED
  "#000000", // 8 NOT USED
  "#000000", // 9 NOT USED
] as MantineColorsTuple;

export { lightModePalette, darkModePalette };
