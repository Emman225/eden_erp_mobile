import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenDrawerMenu } from '@/components/eden/EdenDrawerMenu';
import { EdenEventCard } from '@/components/eden/EdenEventCard';
import { EdenMediaCard } from '@/components/eden/EdenMediaCard';
import { EdenNotificationItem } from '@/components/eden/EdenNotificationItem';
import { EdenPresenceStatus } from '@/components/eden/EdenPresenceStatus';
import { IconSymbol } from '@/components/ui/IconSymbol';

/**
 * Ce composant DashboardScreen est le seul écran où
 * le drawer menu (EdenDrawerMenu) et le menu d'options sont affichés.
 * Ces menus ne doivent pas apparaître dans les autres écrans.
 */
export default function DashboardScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const user = {
    name: 'Marie Dupont',
    role: 'Membre',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };
  
  const upcomingEvents = [
    {
      id: '1',
      title: 'Culte du dimanche',
      date: '12 mai 2024',
      time: '10:00',
      location: 'Salle principale',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Étude biblique',
      date: '15 mai 2024',
      time: '19:00',
      location: 'Salle d\'étude',
      speaker: 'Pasteur Thomas',
      status: 'registered',
    },
    {
      id: '3',
      title: 'Réunion de prière',
      date: '18 mai 2024',
      time: '18:30',
      location: 'Salle de prière',
      status: 'upcoming',
    },
  ];
  
  const recentMedia = [
    {
      id: '1',
      title: 'La puissance de la prière',
      speaker: 'Pasteur Thomas',
      thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334',
      duration: '45:22',
      type: 'audio',
      date: '10 mai 2024',
    },
    {
      id: '2',
      title: 'Culte de Pâques 2024',
      speaker: 'Équipe de louange',
      thumbnail: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0',
      duration: '1:12:05',
      type: 'video',
      date: '7 mai 2024',
    },
    {
      id: '3',
      title: 'Étude sur les Psaumes',
      speaker: 'Diacre Michel',
      thumbnail: '',
      duration: '32:15',
      type: 'pdf',
      date: '5 mai 2024',
    },
  ];
  
  const notifications = [
    {
      id: '1',
      title: 'Nouvel événement',
      message: 'Culte spécial de louange ce samedi à 18h00.',
      time: 'Il y a 2h',
      type: 'event',
      read: false,
    },
    {
      id: '2',
      title: 'Nouveau média',
      message: 'Le message du dimanche dernier est maintenant disponible.',
      time: 'Il y a 1j',
      type: 'media',
      read: true,
    },
  ];
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'FR' ? 'EN' : 'FR');
  };
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <IconSymbol name="line.3.horizontal" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].primary }]}>Eden</Text>
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>ERP</Text>
        </View>
        
        <View style={styles.headerRightContainer}>
          <TouchableOpacity style={styles.optionsButton} onPress={() => setOptionsMenuVisible(true)}>
            <IconSymbol name="ellipsis.vertical" size={24} color={EdenColors[theme].text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Menu latéral */}
      {isDrawerOpen && (
        <>
          <TouchableOpacity 
            style={styles.overlay} 
            activeOpacity={1} 
            onPress={toggleDrawer}
          />
          <View style={styles.drawerContainer}>
            <EdenDrawerMenu 
              activeItemId="home"
              onItemPress={(item) => {
                // Naviguer vers l'écran correspondant
                // Utiliser une approche compatible avec les types d'expo-router
                if (item.screen === 'Dashboard') {
                  router.push('/mockups/DashboardScreen');
                } else if (item.screen === 'Events') {
                  router.push('/mockups/EventsScreen');
                } else if (item.screen === 'MediaLibrary') {
                  router.push('/mockups/MediaLibraryScreen');
                } else if (item.screen === 'Groups') {
                  router.push('/mockups/GroupsScreen');
                } else if (item.screen === 'Community') {
                  router.push('/mockups/CommunityScreen');
                } else if (item.screen === 'Donations') {
                  router.push('/mockups/DonationsScreen');
                } else if (item.screen === 'Tasks') {
                  router.push('/mockups/TasksScreen');
                } else if (item.screen === 'Support') {
                  router.push('/mockups/SupportScreen');
                }
                // Fermer le drawer après la navigation
                toggleDrawer();
              }}
              onCloseDrawer={toggleDrawer}
              userName={user.name}
              userRole={user.role}
              userAvatar={user.avatar}
              isDarkMode={isDarkMode}
            />
          </View>
        </>
      )}
      
      {/* Menu d'options */}
      <Modal
        visible={optionsMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOptionsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setOptionsMenuVisible(false)}
        >
          <View 
            style={[
              styles.optionsMenu, 
              { backgroundColor: EdenColors[theme].card },
              { top: 210, right: 16 }
            ]}
          >
            <TouchableOpacity 
              style={styles.optionItem} 
              onPress={() => {
                router.push('/mockups/ProfileScreen');
                setOptionsMenuVisible(false);
              }}
            >
              <IconSymbol name="person.fill" size={20} color={EdenColors[theme].text} />
              <Text style={[styles.optionText, { color: EdenColors[theme].text }]}>
                Profil utilisateur
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem} 
              onPress={() => {
                router.replace('/LoginScreen');
                setOptionsMenuVisible(false);
              }}
            >
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color={EdenColors[theme].text} />
              <Text style={[styles.optionText, { color: EdenColors[theme].text }]}>
                Déconnexion
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem} 
              onPress={() => {
                // Rafraîchir la page en rechargeant l'écran actuel
                router.replace('/mockups/DashboardScreen');
                setOptionsMenuVisible(false);
              }}
            >
              <IconSymbol name="arrow.clockwise" size={20} color={EdenColors[theme].text} />
              <Text style={[styles.optionText, { color: EdenColors[theme].text }]}>
                Rafraîchir
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem} 
              onPress={() => {
                toggleLanguage();
                setOptionsMenuVisible(false);
              }}
            >
              <IconSymbol name="globe" size={20} color={EdenColors[theme].text} />
              <Text style={[styles.optionText, { color: EdenColors[theme].text }]}>
                {language === 'FR' ? 'Switch to English' : 'Passer en Français'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionItem} 
              onPress={() => {
                toggleTheme();
                setOptionsMenuVisible(false);
              }}
            >
              <IconSymbol name={isDarkMode ? "sun.max.fill" : "moon.fill"} size={20} color={EdenColors[theme].text} />
              <Text style={[styles.optionText, { color: EdenColors[theme].text }]}>
                {isDarkMode ? 'Mode clair' : 'Mode sombre'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Contenu principal */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Statut de présence */}
        <EdenPresenceStatus 
          status="unknown"
          eventName="Culte du dimanche"
          eventTime="12 mai, 10:00"
          onUpdateStatus={() => {}}
          isDarkMode={isDarkMode}
        />
        
        {/* Section des événements à venir */}
        <View style={styles.sectionContainer}>
          <View style={[EdenCommonStyles.sectionHeader, { backgroundColor: EdenColors[theme].card }]}>
            <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
              Événements à venir
            </Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.eventsContainer}
          >
            {upcomingEvents.map((event) => (
              <EdenEventCard 
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                speaker={event.speaker}
                status={event.status as any}
                onPress={() => {}}
                isDarkMode={isDarkMode}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Section des médias récents */}
        <View style={styles.sectionContainer}>
          <View style={[EdenCommonStyles.sectionHeader, { backgroundColor: EdenColors[theme].card }]}>
            <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
              Médias récents
            </Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mediaContainer}
          >
            {recentMedia.map((media) => (
              <EdenMediaCard 
                key={media.id}
                title={media.title}
                speaker={media.speaker}
                thumbnail={media.thumbnail}
                duration={media.duration}
                type={media.type as any}
                date={media.date}
                onPress={() => {}}
                isDarkMode={isDarkMode}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Section des notifications */}
        <View style={styles.sectionContainer}>
          <View style={[EdenCommonStyles.sectionHeader, { backgroundColor: EdenColors[theme].card }]}>
            <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
              Notifications
            </Text>
          </View>
          
          <View style={styles.notificationsContainer}>
            {notifications.map((notification) => (
              <EdenNotificationItem 
                key={notification.id}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                type={notification.type as any}
                read={notification.read}
                onPress={() => {}}
                onMarkAsRead={() => {}}
                isDarkMode={isDarkMode}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    zIndex: 1000,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 999,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 8,
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsMenu: {
    position: 'absolute',
    width: 220,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },

  eventsContainer: {
    paddingRight: 16,
  },
  mediaContainer: {
    paddingRight: 16,
  },
  notificationsContainer: {
    marginTop: 8,
  },
});