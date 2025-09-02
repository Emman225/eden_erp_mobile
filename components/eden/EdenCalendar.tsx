import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type EdenCalendarProps = {
  initialDate?: Date;
  events?: Array<{
    id: string;
    date: Date;
    title: string;
    type?: string;
  }>;
  onDateSelect?: (date: Date) => void;
  onEventPress?: (eventId: string) => void;
  isDarkMode: boolean;
};

export function EdenCalendar({
  initialDate = new Date(),
  events = [],
  onDateSelect,
  onEventPress,
  isDarkMode,
}: EdenCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  // Génère les jours du mois actuel
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Jours du mois précédent pour compléter la première semaine
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      days.push({
        day,
        month: month - 1,
        year,
        isCurrentMonth: false,
        date: new Date(year, month - 1, day),
      });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    
    // Jours du mois suivant pour compléter la dernière semaine
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          day: i,
          month: month + 1,
          year,
          isCurrentMonth: false,
          date: new Date(year, month + 1, i),
        });
      }
    }
    
    return days;
  };
  
  // Vérifie si une date a des événements
  const hasEvents = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Récupère les événements pour une date spécifique
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Vérifie si deux dates sont le même jour
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };
  
  // Vérifie si une date est aujourd'hui
  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };
  
  // Passe au mois précédent
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Passe au mois suivant
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Sélectionne une date
  const selectDate = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };
  
  // Gère l'appui sur un événement
  const handleEventPress = (eventId: string) => {
    if (onEventPress) {
      onEventPress(eventId);
    }
  };
  
  const days = generateDays();
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  return (
    <View style={styles.container}>
      {/* En-tête du calendrier */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navigationButton}>
          <IconSymbol name="chevron.left" size={20} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={goToNextMonth} style={styles.navigationButton}>
          <IconSymbol name="chevron.right" size={20} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      {/* Jours de la semaine */}
      <View style={styles.weekDaysContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text 
              style={[
                styles.weekDayText, 
                { color: EdenColors[theme].textSecondary }
              ]}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>
      
      {/* Grille des jours */}
      <View style={styles.daysGrid}>
        {days.map((day, index) => {
          const isSelected = isSameDay(day.date, selectedDate);
          const dayHasEvents = hasEvents(day.date);
          const dayIsToday = isToday(day.date);
          
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.dayCell,
                !day.isCurrentMonth && styles.notCurrentMonth,
                isSelected && [styles.selectedDay, { backgroundColor: EdenColors[theme].primary }],
                dayIsToday && !isSelected && [styles.todayCell, { borderColor: EdenColors[theme].primary }],
              ]}
              onPress={() => selectDate(day.date)}
            >
              <Text 
                style={[
                  styles.dayText,
                  !day.isCurrentMonth && { color: EdenColors[theme].textSecondary + '80' },
                  isSelected && styles.selectedDayText,
                  dayIsToday && !isSelected && { color: EdenColors[theme].primary },
                  { color: isSelected ? '#FFFFFF' : EdenColors[theme].text }
                ]}
              >
                {day.day}
              </Text>
              
              {dayHasEvents && (
                <View 
                  style={[
                    styles.eventDot,
                    { backgroundColor: isSelected ? '#FFFFFF' : EdenColors[theme].primary }
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Liste des événements pour la date sélectionnée */}
      <View style={styles.eventsContainer}>
        <Text style={[EdenTheme.typography.bodySemiBold, { color: EdenColors[theme].text, marginBottom: 8 }]}>
          Événements du {selectedDate.getDate()} {months[selectedDate.getMonth()]}
        </Text>
        
        {selectedDateEvents.length > 0 ? (
          <ScrollView style={styles.eventsList}>
            {selectedDateEvents.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={[
                  styles.eventItem,
                  { backgroundColor: EdenColors[theme].accent }
                ]}
                onPress={() => handleEventPress(event.id)}
              >
                <View 
                  style={[
                    styles.eventTypeIndicator,
                    { backgroundColor: event.type === 'important' ? EdenColors[theme].primary : EdenColors[theme].tertiary }
                  ]}
                />
                <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].text }]}>
                  {event.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={[EdenTheme.typography.body, { color: EdenColors[theme].textSecondary }]}>
              Aucun événement prévu pour cette date
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButton: {
    padding: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notCurrentMonth: {
    opacity: 0.5,
  },
  selectedDay: {
    borderRadius: 20,
  },
  todayCell: {
    borderWidth: 1,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: '20%',
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventsList: {
    maxHeight: 200,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTypeIndicator: {
    width: 4,
    height: '80%',
    borderRadius: 2,
    marginRight: 12,
  },
  noEventsContainer: {
    padding: 16,
    alignItems: 'center',
  },
});