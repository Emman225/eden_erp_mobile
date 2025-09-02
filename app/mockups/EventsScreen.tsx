import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenCalendar } from '@/components/eden/EdenCalendar';
import { EdenEventCard } from '@/components/eden/EdenEventCard';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type ViewMode = 'calendar' | 'list';
type EventStatus = 'upcoming' | 'ongoing' | 'registered' | 'past';

type Event = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  speaker?: string;
  description?: string;
  status: EventStatus;
};

export default function EventsScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const events: Event[] = [
    {
      id: '1',
      title: 'Culte du dimanche',
      date: new Date(2024, 4, 12), // 12 mai 2024
      time: '10:00',
      location: 'Salle principale',
      description: 'Culte hebdomadaire avec louange et prédication.',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Étude biblique',
      date: new Date(2024, 4, 15), // 15 mai 2024
      time: '19:00',
      location: 'Salle d\'étude',
      speaker: 'Pasteur Thomas',
      description: 'Étude approfondie sur le livre des Psaumes.',
      status: 'registered',
    },
    {
      id: '3',
      title: 'Réunion de prière',
      date: new Date(2024, 4, 18), // 18 mai 2024
      time: '18:30',
      location: 'Salle de prière',
      description: 'Temps de prière communautaire pour les besoins de l\'église et des membres.',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Formation des leaders',
      date: new Date(2024, 4, 20), // 20 mai 2024
      time: '19:00',
      location: 'Salle de conférence',
      speaker: 'Pasteur Michel',
      description: 'Formation mensuelle pour tous les responsables de ministères.',
      status: 'upcoming',
    },
    {
      id: '5',
      title: 'Soirée jeunesse',
      date: new Date(2024, 4, 22), // 22 mai 2024
      time: '20:00',
      location: 'Salle polyvalente',
      description: 'Soirée spéciale pour les jeunes avec louange, jeux et enseignement.',
      status: 'upcoming',
    },
    {
      id: '6',
      title: 'Culte du dimanche',
      date: new Date(2024, 4, 5), // 5 mai 2024 (passé)
      time: '10:00',
      location: 'Salle principale',
      description: 'Culte hebdomadaire avec louange et prédication.',
      status: 'past',
    },
  ];
  
  // Filtrer les événements pour la vue calendrier
  const calendarEvents = events.map(event => ({
    id: event.id,
    date: event.date,
    title: event.title,
    type: event.status === 'registered' ? 'important' : 'normal',
  }));
  
  // Filtrer les événements pour la vue liste
  const listEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Filtrer les événements pour la date sélectionnée
  const selectedDateEvents = events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleEventPress = (eventId: string) => {
    // Navigation vers les détails de l'événement
    console.log(`Naviguer vers l'événement ${eventId}`);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'calendar' ? 'list' : 'calendar');
  };
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  const renderEventItem = ({ item }: { item: Event }) => (
    <EdenEventCard
      title={item.title}
      date={formatDate(item.date)}
      time={item.time}
      location={item.location}
      speaker={item.speaker}
      status={item.status}
      onPress={() => handleEventPress(item.id)}
      isDarkMode={isDarkMode}
    />
  );
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].card }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Événements
        </Text>
        
        <TouchableOpacity style={styles.viewModeButton} onPress={toggleViewMode}>
          <IconSymbol 
            name={viewMode === 'calendar' ? 'list.bullet' : 'calendar'} 
            size={24} 
            color={EdenColors[theme].text} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Contenu principal */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Vue calendrier */}
        {viewMode === 'calendar' && (
          <View style={styles.calendarContainer}>
            <EdenCalendar
              initialDate={new Date()}
              events={calendarEvents}
              onDateSelect={handleDateSelect}
              onEventPress={handleEventPress}
              isDarkMode={isDarkMode}
            />
            
            {/* Événements pour la date sélectionnée */}
            <View style={styles.selectedDateEventsContainer}>
              <View style={[EdenCommonStyles.sectionHeader, { backgroundColor: EdenColors[theme].card }]}>
                <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
                  Événements du {formatDate(selectedDate)}
                </Text>
              </View>
              
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <EdenEventCard
                    key={event.id}
                    title={event.title}
                    date={formatDate(event.date)}
                    time={event.time}
                    location={event.location}
                    speaker={event.speaker}
                    status={event.status}
                    onPress={() => handleEventPress(event.id)}
                    isDarkMode={isDarkMode}
                  />
                ))
              ) : (
                <View style={[styles.noEventsContainer, { backgroundColor: EdenColors[theme].card }]}>
                  <IconSymbol 
                    name="calendar.badge.exclamationmark" 
                    size={32} 
                    color={EdenColors[theme].textSecondary} 
                  />
                  <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].textSecondary, marginTop: 8 }]}>
                    Aucun événement prévu pour cette date
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        
        {/* Vue liste */}
        {viewMode === 'list' && (
          <View style={styles.listContainer}>
            <View style={styles.filterContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScrollContent}
              >
                <TouchableOpacity 
                  style={[
                    styles.filterButton, 
                    { backgroundColor: EdenColors[theme].primary }
                  ]}
                >
                  <Text style={styles.filterButtonText}>Tous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.filterButton, 
                    { backgroundColor: EdenColors[theme].card }
                  ]}
                >
                  <Text style={{ color: EdenColors[theme].text }}>À venir</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.filterButton, 
                    { backgroundColor: EdenColors[theme].card }
                  ]}
                >
                  <Text style={{ color: EdenColors[theme].text }}>Inscrits</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.filterButton, 
                    { backgroundColor: EdenColors[theme].card }
                  ]}
                >
                  <Text style={{ color: EdenColors[theme].text }}>Passés</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            
            <FlatList
              data={listEvents}
              keyExtractor={(item) => item.id}
              renderItem={renderEventItem}
              contentContainerStyle={styles.eventsList}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          </View>
        )}
      </ScrollView>
      
      {/* Bouton flottant pour ajouter un événement (visible uniquement pour les administrateurs) */}
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
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80, // Espace pour le bouton flottant
  },
  calendarContainer: {
    marginBottom: 24,
  },
  selectedDateEventsContainer: {
    marginTop: 24,
  },

  noEventsContainer: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filtersScrollContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  eventsList: {
    paddingBottom: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});