import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenNotificationItem } from '@/components/eden/EdenNotificationItem';
import { IconSymbol } from '@/components/ui/IconSymbol';

type NotificationType = 'info' | 'event' | 'media' | 'alert' | 'all';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'event' | 'media' | 'alert';
  read: boolean;
};

export default function NotificationCenterScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvel événement',
      message: 'Culte spécial de louange ce samedi à 18h00. Venez nombreux pour ce moment de communion fraternelle.',
      time: 'Il y a 2h',
      type: 'event',
      read: false,
    },
    {
      id: '2',
      title: 'Nouveau média',
      message: 'Le message du dimanche dernier "La puissance de la prière" est maintenant disponible dans la médiathèque.',
      time: 'Il y a 1j',
      type: 'media',
      read: true,
    },
    {
      id: '3',
      title: 'Information importante',
      message: 'Rappel: La réunion des responsables est reportée au mardi 15 mai à 19h00.',
      time: 'Il y a 2j',
      type: 'info',
      read: true,
    },
    {
      id: '4',
      title: 'Alerte météo',
      message: 'En raison des conditions météorologiques, la sortie jeunesse de samedi est annulée.',
      time: 'Il y a 3j',
      type: 'alert',
      read: false,
    },
    {
      id: '5',
      title: 'Nouveau témoignage',
      message: 'Un nouveau témoignage vidéo de Sœur Marie a été ajouté à la médiathèque.',
      time: 'Il y a 4j',
      type: 'media',
      read: true,
    },
    {
      id: '6',
      title: 'Rappel d\'événement',
      message: 'N\'oubliez pas l\'étude biblique de ce soir à 19h00 sur le thème "Les Psaumes".',
      time: 'Il y a 5j',
      type: 'event',
      read: true,
    },
  ]);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeFilter);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
  };
  
  const renderFilterButton = (type: NotificationType, label: string, icon: string) => (
    <TouchableOpacity 
      style={[
        styles.filterButton, 
        activeFilter === type && { backgroundColor: EdenColors[theme].primary + '20' }
      ]}
      onPress={() => setActiveFilter(type)}
    >
      <IconSymbol 
        name={icon} 
        size={16} 
        color={activeFilter === type ? EdenColors[theme].primary : EdenColors[theme].textSecondary} 
      />
      <Text 
        style={[
          styles.filterText, 
          { color: activeFilter === type ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Notifications
        </Text>
        
        <TouchableOpacity style={styles.optionsButton}>
          <IconSymbol name="ellipsis" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {renderFilterButton('all', 'Toutes', 'bell.fill')}
          {renderFilterButton('info', 'Infos', 'info.circle.fill')}
          {renderFilterButton('event', 'Événements', 'calendar')}
          {renderFilterButton('media', 'Médias', 'play.fill')}
          {renderFilterButton('alert', 'Alertes', 'exclamationmark.triangle.fill')}
        </ScrollView>
      </View>
      
      {/* Actions */}
      <View style={[styles.actionsContainer, { borderBottomColor: EdenColors[theme].accent }]}>
        <Text style={[styles.notificationCount, { color: EdenColors[theme].textSecondary }]}>
          {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={[styles.actionText, { color: EdenColors[theme].primary }]}>
              Tout marquer comme lu
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDeleteAll}
          >
            <Text style={[styles.actionText, { color: EdenColors[theme].error }]}>
              Tout supprimer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Liste des notifications */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsContainer}
          renderItem={({ item }) => (
            <EdenNotificationItem
              title={item.title}
              message={item.message}
              time={item.time}
              type={item.type}
              read={item.read}
              onPress={() => {}}
              onMarkAsRead={() => handleMarkAsRead(item.id)}
              isDarkMode={isDarkMode}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol 
            name="bell.slash.fill" 
            size={64} 
            color={EdenColors[theme].textSecondary + '50'} 
          />
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].textSecondary, marginTop: 16 }]}>
            Aucune notification
          </Text>
          <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].textSecondary, marginTop: 8, textAlign: 'center' }]}>
            Vous n'avez aucune notification {activeFilter !== 'all' ? 'de ce type' : ''} pour le moment.
          </Text>
        </View>
      )}
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
  filtersContainer: {
    paddingVertical: 12,
  },
  filtersScrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  notificationCount: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  deleteButton: {
    marginLeft: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationsContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});