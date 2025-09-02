import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type MenuItem = {
  id: string;
  label: string;
  icon: string;
  screen: string;
};

type EdenDrawerMenuProps = {
  activeItemId: string;
  onItemPress: (item: MenuItem) => void;
  onCloseDrawer: () => void;
  userName: string;
  userRole: string;
  userAvatar?: string;
  isDarkMode: boolean;
};

export function EdenDrawerMenu({
  activeItemId,
  onItemPress,
  onCloseDrawer,
  userName,
  userRole,
  userAvatar,
  isDarkMode,
}: EdenDrawerMenuProps) {
  const theme = isDarkMode ? 'dark' : 'light';

  // Liste des éléments du menu
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Accueil', icon: 'house.fill', screen: 'Dashboard' },
    { id: 'events', label: 'Événements', icon: 'calendar', screen: 'Events' },
    { id: 'media', label: 'Médiathèque', icon: 'play.fill', screen: 'MediaLibrary' },
    { id: 'groups', label: 'Groupes', icon: 'person.3.fill', screen: 'Groups' },
    { id: 'community', label: 'Communauté', icon: 'bubble.left.and.bubble.right.fill', screen: 'Community' },
    { id: 'donations', label: 'Dons', icon: 'heart.fill', screen: 'Donations' },
    { id: 'tasks', label: 'Tâches', icon: 'checklist', screen: 'Tasks' },
    { id: 'support', label: 'Support', icon: 'questionmark.circle.fill', screen: 'Support' },
  ];

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: EdenColors[theme].background }]}
      edges={['top', 'bottom']}
    >
      {/* En-tête du drawer avec profil utilisateur */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onCloseDrawer}>
          <IconSymbol 
            name="xmark" 
            size={24} 
            color={EdenColors[theme].text} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {userAvatar ? (
              <Image source={{ uri: userAvatar }} style={styles.avatar} />
            ) : (
              <View 
                style={[
                  styles.avatarPlaceholder, 
                  { backgroundColor: EdenColors[theme].primary }
                ]}
              >
                <Text style={styles.avatarText}>
                  {userName.substring(0, 1).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.userInfo}>
            <Text 
              style={[
                EdenTheme.typography.bodySemiBold, 
                { color: EdenColors[theme].text }
              ]}
            >
              {userName}
            </Text>
            <Text 
              style={[
                EdenTheme.typography.caption, 
                { color: EdenColors[theme].textSecondary }
              ]}
            >
              {userRole}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Liste des éléments du menu */}
      <ScrollView style={styles.menuItems}>
        {menuItems.map((item) => {
          const isActive = item.id === activeItemId;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                isActive && styles.activeMenuItem,
                isActive && { backgroundColor: EdenColors[theme].primary + '20' }, // Couleur primaire avec opacité
              ]}
              onPress={() => onItemPress(item)}
            >
              <IconSymbol
                name={item.icon as string}
                size={22}
                color={isActive ? EdenColors[theme].primary : EdenColors[theme].textSecondary}
              />
              <Text
                style={[
                  styles.menuItemText,
                  { color: isActive ? EdenColors[theme].primary : EdenColors[theme].text },
                ]}
              >
                {item.label}
              </Text>
              {isActive && (
                <View 
                  style={[
                    styles.activeIndicator, 
                    { backgroundColor: EdenColors[theme].primary }
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Pied de page */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => console.log('Déconnexion')}
        >
          <IconSymbol
            name="power"
            size={20}
            color={EdenColors[theme].textSecondary}
          />
          <Text 
            style={[
              styles.footerButtonText, 
              { color: EdenColors[theme].textSecondary }
            ]}
          >
            Déconnexion
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    maxWidth: 380,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 70,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  menuItems: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'relative',
    flexWrap: 'nowrap',
  },
  activeMenuItem: {
    // Style pour l'élément actif
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    flex: 1,
    flexShrink: 1,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    marginLeft: 16,
    fontSize: 16,
  },
});