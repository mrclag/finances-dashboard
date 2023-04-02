// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

// Adding colors to the type declarations
declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor
  }
}