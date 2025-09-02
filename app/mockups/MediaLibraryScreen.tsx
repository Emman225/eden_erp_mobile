import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenMediaCard } from '@/components/eden/EdenMediaCard';
import { EdenMediaPlayer } from '@/components/eden/EdenMediaPlayer';
import { IconSymbol } from '@/components/ui/IconSymbol';

type MediaType = 'all' | 'audio' | 'video' | 'pdf' | 'song';
type MediaItem = {
  id: string;
  title: string;
  speaker?: string;
  thumbnail?: string;
  duration?: string;
  type: 'audio' | 'video' | 'pdf' | 'song';
  date: string;
  category?: string;
};

function MediaLibraryScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MediaType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      title: 'La puissance de la prière',
      speaker: 'Pasteur Thomas',
      thumbnail: 'https://images.unsplash.com/photo-1507692049790-de58290a4334',
      duration: '45:22',
      type: 'audio',
      date: '10 mai 2024',
      category: 'Enseignement',
    },
    {
      id: '2',
      title: 'Culte de Pâques 2024',
      speaker: 'Équipe de louange',
      thumbnail: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0',
      duration: '1:12:05',
      type: 'video',
      date: '7 mai 2024',
      category: 'Culte',
    },
    {
      id: '3',
      title: 'Étude sur les Psaumes',
      speaker: 'Diacre Michel',
      thumbnail: '',
      duration: '32:15',
      type: 'pdf',
      date: '5 mai 2024',
      category: 'Étude biblique',
    },
    {
      id: '4',
      title: 'Comment prier efficacement',
      speaker: 'Pasteur Thomas',
      thumbnail: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891',
      duration: '38:45',
      type: 'audio',
      date: '2 mai 2024',
      category: 'Enseignement',
    },
    {
      id: '5',
      title: 'Saint, Saint, Saint',
      speaker: 'Chorale Eden',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      duration: '5:32',
      type: 'song',
      date: '28 avril 2024',
      category: 'Louange',
    },
    {
      id: '6',
      title: 'Témoignage de guérison',
      speaker: 'Marie Dupont',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
      duration: '15:20',
      type: 'video',
      date: '25 avril 2024',
      category: 'Témoignage',
    },
  ];
  
  // Filtrer les médias par type et recherche
  const filteredMedia = mediaItems.filter(item => {
    const matchesType = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.speaker && item.speaker.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });
  
  // Catégories uniques pour les filtres
  const categories = Array.from(new Set(mediaItems.map(item => item.category).filter(Boolean)));
  
  const handleMediaPress = (media: MediaItem) => {
    setSelectedMedia(media);
    setIsPlaying(true);
    setCurrentProgress(0);
  };
  
  const handleClosePlayer = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (position: number) => {
    setCurrentProgress(position);
  };
  
  const renderFilterButton = (type: MediaType, label: string, icon: string) => (
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
    <>
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].background }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>

        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text, flex: 1, textAlign: 'center' }]}>
          Médiathèque
        </Text>


      </View>
      
      {/* Barre de recherche */}
      <View style={[styles.searchContainer, { backgroundColor: EdenColors[theme].background }]}>
        <View 
          style={[
            styles.searchInputContainer, 
            { backgroundColor: EdenColors[theme].background }
          ]}
        >
          <IconSymbol name="magnifyingglass" size={20} color={EdenColors[theme].textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: EdenColors[theme].text }]}
            placeholder="Rechercher un média..."
            placeholderTextColor={EdenColors[theme].textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={EdenColors[theme].textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollContent}
        >
          {renderFilterButton('all', 'Tous', 'play.fill')}
          {renderFilterButton('audio', 'Audio', 'headphones')}
          {renderFilterButton('video', 'Vidéo', 'play.rectangle.fill')}
          {renderFilterButton('pdf', 'Documents', 'doc.fill')}
          {renderFilterButton('song', 'Chants', 'music.note')}
        </ScrollView>
      </View>
      
      {/* Filtres par catégorie */}
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.categoryChip,
                  { backgroundColor: EdenColors[theme].background }
                ]}
              >
                <Text style={{ color: EdenColors[theme].text }}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Liste des médias */}
      {filteredMedia.length > 0 ? (
        <FlatList
          data={filteredMedia}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.mediaGrid}
          renderItem={({ item }) => (
            <View style={styles.mediaCardContainer}>
              <EdenMediaCard
                title={item.title}
                speaker={item.speaker}
                thumbnail={item.thumbnail}
                duration={item.duration}
                type={item.type}
                date={item.date}
                onPress={() => handleMediaPress(item)}
                isDarkMode={isDarkMode}
              />
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol 
            name="magnifyingglass" 
            size={64} 
            color={EdenColors[theme].textSecondary + '50'} 
          />
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].textSecondary, marginTop: 16 }]}>
            Aucun résultat
          </Text>
          <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].textSecondary, marginTop: 8, textAlign: 'center' }]}>
            Aucun média ne correspond à votre recherche
          </Text>
        </View>
      )}
      
      {/* Lecteur de média */}
      {selectedMedia && (
        <View style={styles.playerContainer}>
          <EdenMediaPlayer
            title={selectedMedia.title}
            speaker={selectedMedia.speaker}
            thumbnail={selectedMedia.thumbnail}
            duration={selectedMedia.duration || '0:00'}
            currentTime={currentProgress === 0 ? '0:00' : '2:30'}
            progress={currentProgress}
            type={selectedMedia.type === 'video' ? 'video' : 'audio'}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onSeek={handleSeek}
            onClose={handleClosePlayer}
            isDarkMode={isDarkMode}
          />
        </View>
      )}
    </View>
    </>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 4,
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
  categoriesContainer: {
    paddingBottom: 12,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  mediaGrid: {
    padding: 8,
    paddingBottom: 16, // Valeur fixe au lieu de dépendre de selectedMedia
  },
  mediaCardContainer: {
    width: '50%',
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});

export default MediaLibraryScreen;