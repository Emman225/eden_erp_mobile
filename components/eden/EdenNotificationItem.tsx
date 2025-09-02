import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type NotificationType = 'info' | 'event' | 'media' | 'alert';

type EdenNotificationItemProps = {
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
  onPress: () => void;
  onMarkAsRead: () => void;
  isDarkMode: boolean;
};

export function EdenNotificationItem({
  title,
  message,
  time,
  type,
  read,
  onPress,
  onMarkAsRead,
  isDarkMode,
}: EdenNotificationItemProps) {
  const theme = isDarkMode ? 'dark' : 'light';

  // Détermine l'icône et la couleur en fonction du type de notification
  const getNotificationInfo = () => {
    switch (type) {
      case 'info':
        return {
          icon: 'info.circle.fill',
          color: EdenColors[theme].tertiary,
        };
      case 'event':
        return {
          icon: 'calendar',
          color: EdenColors[theme].primary,
        };
      case 'media':
        return {
          icon: 'play.fill',
          color: EdenColors[theme].accent,
        };
      case 'alert':
        return {
          icon: 'exclamationmark.triangle.fill',
          color: EdenColors[theme].error,
        };
      default:
        return {
          icon: 'bell.fill',
          color: EdenColors[theme].textSecondary,
        };
    }
  };

  const notificationInfo = getNotificationInfo();

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: read ? 'transparent' : EdenColors[theme].primary + '10' },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Indicateur de non-lu */}
      {!read && <View style={[styles.unreadIndicator, { backgroundColor: EdenColors[theme].primary }]} />}
      
      {/* Icône de notification */}
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: notificationInfo.color + '20' } // Couleur avec opacité
        ]}
      >
        <IconSymbol 
          name={notificationInfo.icon} 
          size={20} 
          color={notificationInfo.color} 
        />
      </View>
      
      {/* Contenu de la notification */}
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text 
            style={[
              EdenTheme.typography.bodySemiBold, 
              { color: EdenColors[theme].text, flex: 1 }
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text 
            style={[
              EdenTheme.typography.caption, 
              { color: EdenColors[theme].textSecondary }
            ]}
          >
            {time}
          </Text>
        </View>
        
        <Text 
          style={[
            EdenTheme.typography.bodySmall, 
            { color: EdenColors[theme].textSecondary }
          ]}
          numberOfLines={2}
        >
          {message}
        </Text>
        
        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onMarkAsRead}
          >
            <IconSymbol 
              name={read ? 'envelope.open.fill' : 'envelope.fill'} 
              size={14} 
              color={EdenColors[theme].primary} 
            />
            <Text 
              style={[
                styles.actionText, 
                { color: EdenColors[theme].primary }
              ]}
            >
              {read ? 'Marquer comme non lu' : 'Marquer comme lu'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
    borderRadius: 12,
    marginBottom: 8,
  },
  unreadIndicator: {
    position: 'absolute',
    left: 6,
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    transform: [{ translateY: -3 }],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    marginLeft: 4,
  },
});