/**
 * Palette de couleurs pour Eden ERP Mobile
 * Moderne, minimaliste, chaleureux et spirituel
 */

// Couleurs principales
const primaryGreen = '#4CAF50'; // Vert clair
const darkGreen = '#2E7D32'; // Vert foncé
const navyBlue = '#1A237E'; // Bleu marine/foncé
const white = '#FFFFFF'; // Blanc

// Dégradés pastel
const pastelGreen = '#A5D6A7'; // Vert pastel
const pastelBlue = '#90CAF9'; // Bleu pastel

// Couleurs d'accentuation
const accentYellow = '#FFC107'; // Jaune pour notifications/alertes
const accentRed = '#F44336'; // Rouge pour erreurs/alertes importantes

// Couleurs de fond
const backgroundLight = '#FFFFFF'; // Fond clair
const backgroundDark = '#121212'; // Fond sombre

// Couleurs de texte
const textLight = '#212121'; // Texte sur fond clair
const textDark = '#FAFAFA'; // Texte sur fond sombre
const textMuted = '#757575'; // Texte secondaire

// Couleurs d'interface
const cardLight = '#FFFFFF'; // Cartes sur fond clair
const cardDark = '#1E1E1E'; // Cartes sur fond sombre
const dividerLight = '#EEEEEE'; // Séparateurs sur fond clair
const dividerDark = '#333333'; // Séparateurs sur fond sombre

export const EdenColors = {
  light: {
    primary: primaryGreen,
    secondary: darkGreen,
    tertiary: navyBlue,
    background: backgroundLight,
    card: cardLight,
    text: textLight,
    textSecondary: textMuted,
    divider: dividerLight,
    accent: accentYellow,
    error: accentRed,
    pastelPrimary: pastelGreen,
    pastelSecondary: pastelBlue,
    tint: primaryGreen,
    tabIconDefault: textMuted,
    tabIconSelected: primaryGreen,
  },
  dark: {
    primary: primaryGreen,
    secondary: pastelGreen,
    tertiary: pastelBlue,
    background: backgroundDark,
    card: cardDark,
    text: textDark,
    textSecondary: '#AAAAAA',
    divider: dividerDark,
    accent: accentYellow,
    error: accentRed,
    pastelPrimary: darkGreen,
    pastelSecondary: navyBlue,
    tint: pastelGreen,
    tabIconDefault: '#888888',
    tabIconSelected: pastelGreen,
  },
};