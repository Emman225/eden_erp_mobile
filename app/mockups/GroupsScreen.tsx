import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Group = {
  id: string;
  name: string;
  leader: string;
  members: number;
  nextMeeting?: {
    date: string;
    time: string;
    location: string;
  };
  avatar?: string;
  description?: string;
  isUserLeader?: boolean;
};

export default function GroupsScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const myGroups: Group[] = [
    {
      id: '1',
      name: 'Groupe de prière',
      leader: 'Marie Dupont',
      members: 12,
      nextMeeting: {
        date: '15 mai 2024',
        time: '19:00',
        location: 'Salle 3',
      },
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      description: 'Groupe de prière hebdomadaire pour intercéder pour l\'église et ses membres.',
    },
    {
      id: '2',
      name: 'Étude biblique jeunes',
      leader: 'Thomas Martin',
      members: 8,
      nextMeeting: {
        date: '18 mai 2024',
        time: '18:30',
        location: 'Salle 2',
      },
      avatar: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
      description: 'Étude biblique pour les jeunes de 18 à 30 ans.',
      isUserLeader: true,
    },
  ];
  
  const allGroups: Group[] = [
    ...myGroups,
    {
      id: '3',
      name: 'Chorale Eden',
      leader: 'Sophie Leclerc',
      members: 15,
      nextMeeting: {
        date: '16 mai 2024',
        time: '20:00',
        location: 'Grande salle',
      },
      avatar: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3',
      description: 'Groupe de louange et chorale pour les services du dimanche.',
    },
    {
      id: '4',
      name: 'Cellule quartier nord',
      leader: 'Jean Dubois',
      members: 6,
      nextMeeting: {
        date: '20 mai 2024',
        time: '19:30',
        location: 'Chez Jean',
      },
      avatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
      description: 'Groupe de maison pour les membres habitant dans le quartier nord.',
    },
    {
      id: '5',
      name: 'Ministère d\'accueil',
      leader: 'Claire Moreau',
      members: 10,
      avatar: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
      description: 'Équipe responsable de l\'accueil des nouveaux venus et visiteurs.',
    },
  ];
  
  const displayedGroups = activeTab === 'my' ? myGroups : allGroups;
  
  const renderGroupCard = (group: Group) => (
    <EdenCard 
      elevation="medium"
      style={styles.groupCard}
      onPress={() => setSelectedGroup(group)}
    >
      <View style={styles.groupCardContent}>
        <View style={styles.groupCardHeader}>
          <View style={styles.groupAvatarContainer}>
            {group.avatar ? (
              <Image 
                source={{ uri: group.avatar }} 
                style={styles.groupAvatar} 
                resizeMode="cover"
              />
            ) : (
              <View 
                style={[
                  styles.groupAvatarPlaceholder,
                  { backgroundColor: EdenColors[theme].primary + '40' }
                ]}
              >
                <Text 
                  style={[
                    styles.groupAvatarPlaceholderText,
                    { color: EdenColors[theme].primary }
                  ]}
                >
                  {group.name.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.groupInfo}>
            <Text 
              style={[
                EdenTheme.typography.h3,
                { color: EdenColors[theme].text }
              ]}
              numberOfLines={1}
            >
              {group.name}
            </Text>
            
            <View style={styles.groupLeaderRow}>
              <Text 
                style={[
                  EdenTheme.typography.caption,
                  { color: EdenColors[theme].textSecondary }
                ]}
              >
                Responsable: {group.leader}
              </Text>
              
              {group.isUserLeader && (
                <View 
                  style={[
                    styles.leaderBadge,
                    { backgroundColor: EdenColors[theme].accent + '30' }
                  ]}
                >
                  <Text 
                    style={[
                      styles.leaderBadgeText,
                      { color: EdenColors[theme].accent }
                    ]}
                  >
                    Leader
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.groupMembersRow}>
              <IconSymbol 
                name="person.2.fill" 
                size={14} 
                color={EdenColors[theme].textSecondary} 
              />
              <Text 
                style={[
                  styles.groupMembersText,
                  { color: EdenColors[theme].textSecondary }
                ]}
              >
                {group.members} membres
              </Text>
            </View>
          </View>
        </View>
        
        {group.nextMeeting && (
          <View 
            style={[
              styles.nextMeetingContainer,
              { backgroundColor: EdenColors[theme].card + '80' }
            ]}
          >
            <View style={styles.nextMeetingHeader}>
              <IconSymbol 
                name="calendar" 
                size={16} 
                color={EdenColors[theme].primary} 
              />
              <Text 
                style={[
                  styles.nextMeetingTitle,
                  { color: EdenColors[theme].primary }
                ]}
              >
                Prochain rassemblement
              </Text>
            </View>
            
            <View style={styles.nextMeetingDetails}>
              <View style={styles.nextMeetingRow}>
                <IconSymbol 
                  name="clock.fill" 
                  size={14} 
                  color={EdenColors[theme].textSecondary} 
                />
                <Text 
                  style={[
                    styles.nextMeetingText,
                    { color: EdenColors[theme].text }
                  ]}
                >
                  {group.nextMeeting.date} à {group.nextMeeting.time}
                </Text>
              </View>
              
              <View style={styles.nextMeetingRow}>
                <IconSymbol 
                  name="mappin.and.ellipse" 
                  size={14} 
                  color={EdenColors[theme].textSecondary} 
                />
                <Text 
                  style={[
                    styles.nextMeetingText,
                    { color: EdenColors[theme].text }
                  ]}
                >
                  {group.nextMeeting.location}
                </Text>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.groupCardActions}>
          <EdenButton 
            variant="secondary"
            title="Contacter"
            icon="chat.bubble.fill"
            onPress={() => {}}
            style={{ flex: 1, marginRight: 8 }}
          />
          
          {group.nextMeeting && (
            <EdenButton 
              variant="primary"
              title="Je participe"
              icon="checkmark.circle.fill"
              onPress={() => {}}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </View>
    </EdenCard>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text, flex: 1, textAlign: 'center' }]}>
          Groupes & Cellules
        </Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'my' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('my')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'my' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Mes groupes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'all' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'all' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Tous les groupes
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Liste des groupes */}
      <FlatList
        data={displayedGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGroupCard(item)}
        contentContainerStyle={styles.groupsList}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Bouton flottant pour créer un groupe (visible uniquement pour les responsables) */}
      <TouchableOpacity 
        style={[
          styles.floatingButton,
          { backgroundColor: EdenColors[theme].primary }
        ]}
      >
        <IconSymbol name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  groupsList: {
    padding: 16,
    paddingBottom: 80,
  },
  groupCard: {
    marginBottom: 16,
  },
  groupCardContent: {
    padding: 16,
  },
  groupCardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  groupAvatarContainer: {
    marginRight: 12,
  },
  groupAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  groupAvatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupAvatarPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  groupLeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  leaderBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  leaderBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  groupMembersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  groupMembersText: {
    fontSize: 12,
    marginLeft: 4,
  },
  nextMeetingContainer: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  nextMeetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextMeetingTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  nextMeetingDetails: {
    marginLeft: 22,
  },
  nextMeetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nextMeetingText: {
    fontSize: 14,
    marginLeft: 6,
  },
  groupCardActions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});