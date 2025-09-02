import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type MediaType = 'audio' | 'video';

type EdenMediaPlayerProps = {
  title: string;
  speaker?: string;
  thumbnail?: string;
  duration: string;
  currentTime: string;
  progress: number; // 0 to 1
  type: MediaType;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (position: number) => void;
  onClose?: () => void;
  isDarkMode: boolean;
};

export function EdenMediaPlayer({
  title,
  speaker,
  thumbnail,
  duration,
  currentTime,
  progress,
  type,
  isPlaying,
  onPlay,
  onPause,
  onSeek,
  onClose,
  isDarkMode,
}: EdenMediaPlayerProps) {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(progress);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };
  
  const handleSeekStart = () => {
    setIsSeeking(true);
    setSeekPosition(progress);
  };
  
  const handleSeekMove = (position: number) => {
    setSeekPosition(position);
  };
  
  const handleSeekEnd = () => {
    setIsSeeking(false);
    onSeek(seekPosition);
  };
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: EdenColors[theme].accent }
      ]}
    >
      {/* Header avec titre et bouton de fermeture */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text 
            style={[
              EdenTheme.typography.bodySemiBold, 
              { color: EdenColors[theme].text }
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {speaker && (
            <Text 
              style={[
                EdenTheme.typography.caption, 
                { color: EdenColors[theme].textSecondary }
              ]}
              numberOfLines={1}
            >
              {speaker}
            </Text>
          )}
        </View>
        
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconSymbol name="xmark" size={20} color={EdenColors[theme].text} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Contenu du lecteur */}
      <View style={styles.playerContent}>
        {/* Miniature ou visualisation */}
        <View style={styles.mediaVisual}>
          {type === 'video' ? (
            thumbnail ? (
              <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
            ) : (
              <View 
                style={[
                  styles.thumbnailPlaceholder, 
                  { backgroundColor: EdenColors[theme].primary + '20' }
                ]}
              >
                <IconSymbol 
                  name="play.rectangle.fill" 
                  size={48} 
                  color={EdenColors[theme].primary} 
                />
              </View>
            )
          ) : (
            <View 
              style={[
                styles.audioVisualizer, 
                { backgroundColor: EdenColors[theme].primary + '10' }
              ]}
            >
              <View style={styles.waveformContainer}>
                {/* Visualisation audio simplifiée */}
                {Array.from({ length: 20 }).map((_, index) => {
                  const height = 10 + Math.random() * 30;
                  return (
                    <View 
                      key={index} 
                      style={[
                        styles.waveformBar,
                        { 
                          height, 
                          backgroundColor: isPlaying 
                            ? EdenColors[theme].primary 
                            : EdenColors[theme].primary + '50'
                        }
                      ]} 
                    />
                  );
                })}
              </View>
              <IconSymbol 
                name="headphones" 
                size={32} 
                color={EdenColors[theme].primary} 
              />
            </View>
          )}
        </View>
        
        {/* Contrôles de lecture */}
        <View style={styles.controls}>
          {/* Barre de progression */}
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBackground, 
                { backgroundColor: EdenColors[theme].accent }
              ]}
            />
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: EdenColors[theme].primary,
                  width: `${(isSeeking ? seekPosition : progress) * 100}%`
                }
              ]}
            />
            <TouchableOpacity
              style={[
                styles.progressHandle,
                { 
                  left: `${(isSeeking ? seekPosition : progress) * 100}%`,
                  backgroundColor: EdenColors[theme].primary,
                  transform: [{ translateX: -8 }]
                }
              ]}
              onPressIn={handleSeekStart}
              onPress={handleSeekEnd}
            />
          </View>
          
          {/* Temps */}
          <View style={styles.timeContainer}>
            <Text style={[styles.timeText, { color: EdenColors[theme].textSecondary }]}>
              {currentTime}
            </Text>
            <Text style={[styles.timeText, { color: EdenColors[theme].textSecondary }]}>
              {duration}
            </Text>
          </View>
          
          {/* Boutons de contrôle */}
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <IconSymbol name="backward.fill" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.playPauseButton, 
                { backgroundColor: EdenColors[theme].primary }
              ]}
              onPress={handlePlayPause}
            >
              <IconSymbol 
                name={isPlaying ? 'pause.fill' : 'play.fill'} 
                size={24} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <IconSymbol name="forward.fill" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContent: {
    alignItems: 'center',
  },
  mediaVisual: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioVisualizer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '50%',
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
    marginHorizontal: 2,
  },
  controls: {
    width: '100%',
  },
  progressContainer: {
    height: 16,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  progressBackground: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    position: 'absolute',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  progressHandle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
});