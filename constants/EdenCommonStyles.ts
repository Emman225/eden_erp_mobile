import { StyleSheet } from 'react-native';

/**
 * Styles communs utilisés dans toute l'application Eden
 */
export const EdenCommonStyles = StyleSheet.create({
  /**
   * Style pour les en-têtes de section avec fond coloré
   */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  
  /**
   * Style pour les headers de navigation (app bar)
   */
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50, // Augmenté pour éviter la barre de statut sur iPhone
    paddingBottom: 16,
    paddingHorizontal: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});