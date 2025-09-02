import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenButton } from '@/components/eden/EdenButton';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenLanguageSelector } from '@/components/eden/EdenLanguageSelector';
import { EdenThemeToggle } from '@/components/eden/EdenThemeToggle';
import { IconSymbol } from '@/components/ui/IconSymbol';

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'FR' | 'EN'>('FR');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'push',
      title: 'Notifications push',
      description: 'Recevoir des notifications sur votre appareil',
      enabled: true,
    },
    {
      id: 'email',
      title: 'Notifications par email',
      description: 'Recevoir des notifications par email',
      enabled: true,
    },
    {
      id: 'sms',
      title: 'Notifications par SMS',
      description: 'Recevoir des notifications par SMS',
      enabled: false,
    },
    {
      id: 'events',
      title: 'Événements',
      description: 'Notifications pour les événements à venir',
      enabled: true,
    },
    {
      id: 'media',
      title: 'Nouveaux médias',
      description: 'Notifications pour les nouveaux médias',
      enabled: true,
    },
  ]);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives de l'utilisateur
  const user = {
    name: 'Marie Dupont',
    email: 'marie.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    role: 'Leader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    memberSince: '2022',
  };
  
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage.toUpperCase() as 'FR' | 'EN');
  };
  
  const handleNotificationToggle = (id: string) => {
    setNotificationSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Profil & Paramètres
        </Text>
        
        <TouchableOpacity style={styles.optionsButton}>
          <IconSymbol name="ellipsis" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profil utilisateur */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatar} 
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={[
                styles.editAvatarButton,
                { backgroundColor: EdenColors[theme].primary }
              ]}
            >
              <IconSymbol name="camera.fill" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text, marginTop: 16 }]}>
            {user.name}
          </Text>
          
          <View 
            style={[
              styles.roleBadge,
              { backgroundColor: EdenColors[theme].accent + '30' }
            ]}
          >
            <Text 
              style={[
                styles.roleBadgeText,
                { color: EdenColors[theme].accent }
              ]}
            >
              {user.role}
            </Text>
          </View>
          
          <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].textSecondary, marginTop: 8 }]}>
            Membre depuis {user.memberSince}
          </Text>
        </View>
        
        {/* Informations personnelles */}
        <EdenCard elevation="small" style={styles.sectionCard}>
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
            Informations personnelles
          </Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <IconSymbol name="envelope.fill" size={16} color={EdenColors[theme].primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: EdenColors[theme].textSecondary }]}>
                Email
              </Text>
              <Text style={[styles.infoValue, { color: EdenColors[theme].text }]}>
                {user.email}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <IconSymbol name="pencil" size={16} color={EdenColors[theme].primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <IconSymbol name="phone.fill" size={16} color={EdenColors[theme].primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: EdenColors[theme].textSecondary }]}>
                Téléphone
              </Text>
              <Text style={[styles.infoValue, { color: EdenColors[theme].text }]}>
                {user.phone}
              </Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <IconSymbol name="pencil" size={16} color={EdenColors[theme].primary} />
            </TouchableOpacity>
          </View>
          
          <EdenButton
            variant="secondary"
            title="Changer le mot de passe"
            icon="lock.fill"
            onPress={() => {}}
            style={styles.passwordButton}
          />
        </EdenCard>
        
        {/* Paramètres d'affichage */}
        <EdenCard elevation="small" style={styles.sectionCard}>
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
            Paramètres d'affichage
          </Text>
          
          <View style={styles.displaySettingRow}>
            <View style={styles.displaySettingLabelContainer}>
              <IconSymbol name="moon.fill" size={20} color={EdenColors[theme].primary} />
              <Text style={[styles.displaySettingLabel, { color: EdenColors[theme].text }]}>
                Mode sombre
              </Text>
            </View>
            <EdenThemeToggle 
              isDarkMode={isDarkMode} 
              onToggle={handleThemeToggle} 
              size="medium"
            />
          </View>
          
          <View style={styles.displaySettingRow}>
            <View style={styles.displaySettingLabelContainer}>
              <IconSymbol name="globe" size={20} color={EdenColors[theme].primary} />
              <Text style={[styles.displaySettingLabel, { color: EdenColors[theme].text }]}>
                Langue
              </Text>
            </View>
            <EdenLanguageSelector 
              currentLanguage={language.toLowerCase() as 'fr' | 'en'} 
              onChangeLanguage={handleLanguageChange} 
              compact
            />
          </View>
        </EdenCard>
        
        {/* Paramètres de notifications */}
        <EdenCard elevation="small" style={styles.sectionCard}>
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
            Paramètres de notifications
          </Text>
          
          {notificationSettings.map((setting) => (
            <View key={setting.id} style={styles.notificationSettingRow}>
              <View style={styles.notificationSettingInfo}>
                <Text style={[styles.notificationSettingTitle, { color: EdenColors[theme].text }]}>
                  {setting.title}
                </Text>
                <Text style={[styles.notificationSettingDescription, { color: EdenColors[theme].textSecondary }]}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => handleNotificationToggle(setting.id)}
                trackColor={{ 
                  false: EdenColors[theme].pastelPrimary, 
                  true: EdenColors[theme].primary + '80' 
                }}
                thumbColor={setting.enabled ? EdenColors[theme].primary : '#f4f3f4'}
              />
            </View>
          ))}
        </EdenCard>
        
        {/* Actions */}
        <View style={styles.actionsContainer}>
          <EdenButton
            variant="secondary"
            title="Déconnexion"
            icon="arrow.right.square.fill"
            onPress={() => {}}
            style={styles.logoutButton}
          />
          
          <TouchableOpacity style={styles.helpLink}>
            <IconSymbol name="questionmark.circle" size={16} color={EdenColors[theme].primary} />
            <Text style={[styles.helpLinkText, { color: EdenColors[theme].primary }]}>
              Aide et assistance
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionCard: {
    marginBottom: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordButton: {
    marginTop: 16,
  },
  displaySettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  displaySettingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displaySettingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  notificationSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  notificationSettingInfo: {
    flex: 1,
    paddingRight: 16,
  },
  notificationSettingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationSettingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  actionsContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 8,
  },
  helpLinkText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});