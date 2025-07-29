// // colorUtils.js - Separate utility file for color handling

// /**
//  * Generates a palette of visually distinct colors using HSL color space
//  * @param {number} count - Number of colors to generate
//  * @returns {Array} - Array of CSS color strings
//  */
// export const generateColorPalette = (count) => {
//   // Color generation based on the golden angle for maximum visual distinction
//   return Array.from({ length: count }, (_, i) => {
//     const hue = (i * 137.508) % 360; // Golden angle approximation
//     const saturation = 65 + (i % 3) * 10; // Varying saturation bands (65-85%)
//     const lightness = 55 + (i % 5) * 3; // Varying lightness (55-70%)
//     return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   });
// };

// /**
//  * Gets a consistent color for a specific category
//  * @param {string} category - Category name
//  * @param {Object} colorMap - Map of categories to colors
//  * @param {number} index - Index of category in array
//  * @returns {string} - CSS color string
//  */
// export const getCategoryColor = (category, colorMap, index) => {
//   // If we have a stored color for this category, use it
//   if (colorMap && colorMap[category]) {
//     return colorMap[category];
//   }
  
//   // Otherwise generate a color based on the index
//   const hue = (index * 137.508) % 360;
//   const saturation = 65 + (index % 3) * 10;
//   const lightness = 55 + (index % 5) * 3;
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// };











// hicolorUtils.js
/**
 * Generates a palette of visually distinct colors using HSL color space
 * @param {number} count - Number of colors to generate
 * @returns {Array} - Array of CSS color strings
 */
export const generateColorPalette = (count) => {
  // Define a set of vibrant, visually distinct base colors
  const baseColors = [
    "#4285F4", // Google Blue
    "#EA4335", // Google Red
    "#FBBC05", // Google Yellow
    "#34A853", // Google Green
    "#FF6D01", // Orange
    "#46BDC6", // Teal
    "#9C27B0", // Purple
    "#2196F3", // Sky Blue
    "#FF5722", // Deep Orange
    "#795548", // Brown
    "#607D8B", // Blue Grey
    "#1ABC9C", // Turquoise
    "#F1C40F", // Sunflower
    "#E74C3C", // Alizarin
    "#9B59B6", // Amethyst
    "#3498DB", // Peter River
    "#2ECC71", // Emerald
    "#E67E22", // Carrot
    "#27AE60", // Nephritis
    "#D35400"  // Pumpkin
  ];

  // If we need fewer colors than in the base array, return a subset
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // If we need more colors, generate them using HSL with the golden angle
  const colors = [...baseColors]; // Start with our base colors

  // Generate additional colors using HSL with the golden angle
  for (let i = baseColors.length; i < count; i++) {
    const hue = (i * 137.508) % 360; // Golden angle approximation
    const saturation = 75 + (i % 3) * 8; // 75-91% saturation
    const lightness = 45 + (i % 5) * 5; // 45-65% lightness - not too dark, not too light
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

/**
 * Ensures a color is valid for CSS and not black
 * @param {string} color - CSS color string
 * @param {number} index - Fallback index for color generation
 * @returns {string} - Valid CSS color string
 */
export const ensureValidColor = (color, index) => {
  // If color is black or invalid, generate a new one
  if (!color || color === '#000000' || color === 'black' || color === 'rgb(0, 0, 0)') {
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, 80%, 60%)`; // Generate a bright, saturated color
  }
  return color;
};

/**
 * Gets a consistent color for a specific category
 * @param {string} category - Category name
 * @param {Object} colorMap - Map of categories to colors
 * @param {number} index - Index of category in array
 * @returns {string} - CSS color string
 */
export const getCategoryColor = (category, colorMap, index) => {
  // If we have a stored color for this category, validate and use it
  if (colorMap && colorMap[category]) {
    return ensureValidColor(colorMap[category], index);
  }
  
  // Otherwise generate a color based on the index
  const hue = (index * 137.508) % 360;
  const saturation = 75 + (index % 3) * 8;
  const lightness = 45 + (index % 5) * 5;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};