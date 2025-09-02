import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { EdenCard } from './EdenCard';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type MediaType = 'audio' | 'video' | 'pdf' | 'song';

type EdenMediaCardProps = {
  title: string;
  speaker?: string;
  thumbnail?: string;
  duration?: string;
  type: MediaType;
  date: string;
  onPress: () => void;
  isDarkMode: boolean;
};

export function EdenMediaCard({
  title,
  speaker,
  thumbnail,
  duration,
  type,
  date,
  onPress,
  isDarkMode,
}: EdenMediaCardProps) {
  const theme = isDarkMode ? 'dark' : 'light';

  // Détermine l'icône et la couleur en fonction du type de média
  const getMediaTypeInfo = () => {
    switch (type) {
      case 'audio':
        return {
          icon: 'headphones',
          color: EdenColors[theme].accent,
          label: 'Audio',
        };
      case 'video':
        return {
          icon: 'play.rectangle.fill',
          color: EdenColors[theme].primary,
          label: 'Vidéo',
        };
      case 'pdf':
        return {
          icon: 'doc.fill',
          color: EdenColors[theme].error,
          label: 'Document',
        };
      case 'song':
        return {
          icon: 'music.note',
          color: EdenColors[theme].tertiary,
          label: 'Chant',
        };
      default:
        return {
          icon: 'play.fill',
          color: EdenColors[theme].primary,
          label: 'Média',
        };
    }
  };

  const mediaTypeInfo = getMediaTypeInfo();

  return (
    <EdenCard onPress={onPress} style={styles.card}>
      <View style={styles.contentContainer}>
        {/* Miniature avec overlay de lecture */}
        <View style={styles.thumbnailContainer}>
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
          ) : (
            <View 
              style={[
                styles.thumbnailPlaceholder, 
                { backgroundColor: mediaTypeInfo.color + '30' } // Couleur avec opacité
              ]}
            >
              <IconSymbol 
                name={mediaTypeInfo.icon} 
                size={24} 
                color={mediaTypeInfo.color} 
              />
            </View>
          )}
          
          {/* Badge de type de média */}
          <View 
            style={[
              styles.typeBadge, 
              { backgroundColor: mediaTypeInfo.color }
            ]}
          >
            <Text style={styles.typeBadgeText}>{mediaTypeInfo.label}</Text>
          </View>
          
          {/* Durée (si présente) */}
          {duration && (
            <View style={styles.durationBadge}>
              <IconSymbol 
                name="clock.fill" 
                size={10} 
                color="#FFFFFF" 
              />
              <Text style={styles.durationText}>{duration}</Text>
            </View>
          )}
          
          {/* Bouton de lecture */}
          <TouchableOpacity 
            style={styles.playButton}
            onPress={onPress}
          >
            <IconSymbol 
              name="play.fill" 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
        
        {/* Informations sur le média */}
        <View style={styles.infoContainer}>
          {/* Titre */}
          <Text 
            style={[
              EdenTheme.typography.bodySemiBold, 
              { color: EdenColors[theme].text }
            ]}
            numberOfLines={2}
          >
            {title}
          </Text>
          
          {/* Intervenant (si présent) */}
          {speaker && (
            <Text 
              style={[
                EdenTheme.typography.caption, 
                { color: EdenColors[theme].textSecondary, marginTop: 2 }
              ]}
              numberOfLines={1}
            >
              {speaker}
            </Text>
          )}
          
          {/* Date */}
          <Text 
            style={[
              EdenTheme.typography.caption, 
              { color: EdenColors[theme].textSecondary, marginTop: 4 }
            ]}
          >
            {date}
          </Text>
        </View>
      </View>
    </EdenCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginRight: 12,
    width: 220,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  thumbnailContainer: {
    height: 120,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    marginLeft: 2,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  infoContainer: {
    padding: 12,
  },
});