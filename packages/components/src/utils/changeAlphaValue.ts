export const changeAlphaValue = (rgb: string, alpha: string) =>
  rgb.replace(/[^,]+(?=\))/, alpha);
