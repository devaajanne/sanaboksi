import { createContext } from "react";
import { lightModePalette } from "../../utility/ColorPalettes";
import type { MantineColorsTuple } from "@mantine/core";

export const ColorPaletteContext = createContext<MantineColorsTuple>(
  lightModePalette as MantineColorsTuple,
);
