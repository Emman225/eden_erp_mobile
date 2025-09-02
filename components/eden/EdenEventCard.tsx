import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EdenCard } from './EdenCard';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type EventStatus = 'upcoming' | 'ongoing' | 'registered' | 'past';

type EdenEventCardProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  speaker?: string;
  status: EventStatus;
  onPress: () => void;
  isDarkMode: boolean;
};

export function EdenEventCard({
  title,
  date,
  time,
  location,
  speaker,
  status,
  onPress,
  isDarkMode,
}: EdenEventCardProps) {
  const theme = isDarkMode ? 'dark' : 'light';

  // Détermine la couleur et le texte du badge de statut
  const getStatusInfo = () => {
    switch (status) {
      case 'upcoming':
        return {
          color: EdenColors[theme].accent,
          text: 'À venir',
          icon: 'calendar',
        };
      case 'ongoing':
        return {
          color: EdenColors[theme].error,
          text: 'En cours',
          icon: 'clock.fill',
        };
      case 'registered':
        return {
          color: EdenColors[theme].primary,
          text: 'Inscrit',
          icon: 'checkmark.circle.fill',
        };
      case 'past':
        return {
          color: EdenColors[theme].textSecondary,
          text: 'Passé',
          icon: 'calendar.badge.minus',
        };
      default:
        return {
          color: EdenColors[theme].textSecondary,
          text: 'À venir',
          icon: 'calendar',
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <EdenCard onPress={onPress} style={styles.card}>
      {/* Badge de statut */}
      <View 
        style={[
          styles.statusBadge, 
          { backgroundColor: statusInfo.color + '20' } // Couleur avec opacité
        ]}
      >
        <IconSymbol 
          name={statusInfo.icon} 
          size={14} 
          color={statusInfo.color} 
        />
        <Text 
          style={[
            styles.statusText, 
            { color: statusInfo.color }
          ]}
        >
          {statusInfo.text}
        </Text>
      </View>

      {/* Titre de l'événement */}
      <Text 
        style={[
          EdenTheme.typography.h3, 
          { color: EdenColors[theme].text, marginBottom: 8 }
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>

      {/* Informations sur l'événement */}
      <View style={styles.infoContainer}>
        {/* Date et heure */}
        <View style={styles.infoRow}>
          <IconSymbol 
            name="calendar" 
            size={16} 
            color={EdenColors[theme].primary} 
          />
          <Text 
            style={[
              styles.infoText, 
              { color: EdenColors[theme].text }
            ]}
          >
            {date} • {time}
          </Text>
        </View>

        {/* Lieu */}
        <View style={styles.infoRow}>
          <IconSymbol 
            name="mappin.and.ellipse" 
            size={16} 
            color={EdenColors[theme].primary} 
          />
          <Text 
            style={[
              styles.infoText, 
              { color: EdenColors[theme].text }
            ]}
            numberOfLines={1}
          >
            {location}
          </Text>
        </View>

        {/* Intervenant (si présent) */}
        {speaker && (
          <View style={styles.infoRow}>
            <IconSymbol 
              name="person.fill" 
              size={16} 
              color={EdenColors[theme].primary} 
            />
            <Text 
              style={[
                styles.infoText, 
                { color: EdenColors[theme].text }
              ]}
              numberOfLines={1}
            >
              {speaker}
            </Text>
          </View>
        )}
      </View>

      {/* Bouton d'action */}
      <TouchableOpacity 
        style={[
          styles.actionButton, 
          { backgroundColor: EdenColors[theme].primary }
        ]}
        onPress={onPress}
      >
        <Text style={styles.actionButtonText}>
          {status === 'registered' ? 'Voir les détails' : 'S\'inscrire'}
        </Text>
        <IconSymbol 
          name="chevron.right" 
          size={16} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
    </EdenCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});