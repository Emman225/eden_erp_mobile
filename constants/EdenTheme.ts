import { StyleSheet } from 'react-native';
import { EdenColors } from './EdenColors';

/**
 * Thème et styles communs pour Eden ERP Mobile
 * Style: Moderne, minimaliste, chaleureux et spirituel
 */

export const EdenTheme = {
  // Typographie
  typography: StyleSheet.create({
    // Titres
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 34,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 26,
    },
    // Corps de texte
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    bodySemiBold: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    link: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      textDecorationLine: 'underline',
    },
  }),

  // Espacements
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Rayons de bordure
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Ombres
  shadows: {
    light: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
      },
    },
    dark: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
      },
    },
  },

  // Styles de composants communs
  components: {
    // Cartes
    card: (theme: 'light' | 'dark') => ({
      backgroundColor: EdenColors[theme].background,
      borderRadius: 16,
      padding: 16,
      ...(theme === 'light'
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }
        : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          }),
    }),

    // Boutons
    button: {
      primary: (theme: 'light' | 'dark') => ({
        backgroundColor: EdenColors[theme].primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      }),
      secondary: (theme: 'light' | 'dark') => ({
        backgroundColor: 'transparent',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: EdenColors[theme].primary,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      }),
      text: (theme: 'light' | 'dark') => ({
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      }),
    },

    // Champs de formulaire
    input: (theme: 'light' | 'dark') => ({
      backgroundColor: theme === 'light' ? '#F5F5F5' : '#333333',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: EdenColors[theme].text,
    }),
  },
};