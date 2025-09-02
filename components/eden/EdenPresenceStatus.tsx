import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type PresenceStatus = 'present' | 'absent' | 'late' | 'unknown';

type EdenPresenceStatusProps = {
  status: PresenceStatus;
  eventName?: string;
  eventTime?: string;
  onUpdateStatus?: () => void;
  isDarkMode: boolean;
};

export function EdenPresenceStatus({
  status,
  eventName,
  eventTime,
  onUpdateStatus,
  isDarkMode,
}: EdenPresenceStatusProps) {
  const theme = isDarkMode ? 'dark' : 'light';

  // Détermine l'icône, la couleur et le texte en fonction du statut de présence
  const getStatusInfo = () => {
    switch (status) {
      case 'present':
        return {
          icon: 'checkmark.circle.fill',
          color: EdenColors[theme].accent,
          text: 'Présent',
          message: eventName ? `Vous êtes présent à ${eventName}` : 'Vous êtes présent',
        };
      case 'absent':
        return {
          icon: 'xmark.circle.fill',
          color: EdenColors[theme].error,
          text: 'Absent',
          message: eventName ? `Vous êtes absent à ${eventName}` : 'Vous êtes absent',
        };
      case 'late':
        return {
          icon: 'clock.fill',
          color: EdenColors[theme].accent,
          text: 'En retard',
          message: eventName ? `Vous êtes en retard à ${eventName}` : 'Vous êtes en retard',
        };
      case 'unknown':
      default:
        return {
          icon: 'questionmark.circle.fill',
          color: EdenColors[theme].textSecondary,
          text: 'Non confirmé',
          message: eventName ? `Confirmez votre présence à ${eventName}` : 'Confirmez votre présence',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: EdenColors[theme].background }
      ]}
    >
      <View style={styles.contentContainer}>
        {/* Icône et statut */}
        <View style={styles.statusContainer}>
          <IconSymbol 
            name={statusInfo.icon} 
            size={24} 
            color={statusInfo.color} 
          />
          <View style={styles.statusTextContainer}>
            <Text 
              style={[
                EdenTheme.typography.bodySemiBold, 
                { color: statusInfo.color }
              ]}
            >
              {statusInfo.text}
            </Text>
            <Text 
              style={[
                EdenTheme.typography.bodySmall, 
                { color: EdenColors[theme].textSecondary }
              ]}
              numberOfLines={1}
            >
              {statusInfo.message}
            </Text>
          </View>
        </View>
        
        {/* Heure de l'événement (si présente) */}
        {eventTime && (
          <View style={styles.timeContainer}>
            <IconSymbol 
              name="clock.fill" 
              size={14} 
              color={EdenColors[theme].textSecondary} 
            />
            <Text 
              style={[
                styles.timeText, 
                { color: EdenColors[theme].textSecondary }
              ]}
            >
              {eventTime}
            </Text>
          </View>
        )}
      </View>
      
      {/* Bouton de mise à jour du statut */}
      {onUpdateStatus && (
        <TouchableOpacity 
          style={[
            styles.updateButton, 
            { backgroundColor: EdenColors[theme].primary + '20' }
          ]}
          onPress={onUpdateStatus}
        >
          <Text 
            style={[
              EdenTheme.typography.bodySmall, 
              { color: EdenColors[theme].primary }
            ]}
          >
            Mettre à jour
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  updateButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});