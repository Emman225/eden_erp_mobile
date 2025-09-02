import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenPresenceStatus } from '@/components/eden/EdenPresenceStatus';
import { EdenCard } from '@/components/eden/EdenCard';
import { IconSymbol } from '@/components/ui/IconSymbol';

type PresenceEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'unknown';
  location?: string;
  type?: string;
};

type TimelineMonth = {
  month: string;
  year: string;
  events: PresenceEvent[];
  presenceRate: number;
};

export default function PresenceScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats'>('timeline');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const timelineData: TimelineMonth[] = [
    {
      month: 'Mai',
      year: '2024',
      presenceRate: 0.75,
      events: [
        {
          id: '1',
          title: 'Culte du dimanche',
          date: '5 mai 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '2',
          title: 'Étude biblique',
          date: '8 mai 2024',
          time: '19:00',
          status: 'absent',
          location: 'Salle 2',
          type: 'Étude',
        },
        {
          id: '3',
          title: 'Réunion de prière',
          date: '12 mai 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Prière',
        },
        {
          id: '4',
          title: 'Culte du dimanche',
          date: '19 mai 2024',
          time: '10:00',
          status: 'late',
          location: 'Grande salle',
          type: 'Culte',
        },
      ],
    },
    {
      month: 'Avril',
      year: '2024',
      presenceRate: 0.85,
      events: [
        {
          id: '5',
          title: 'Culte du dimanche',
          date: '7 avril 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '6',
          title: 'Étude biblique',
          date: '10 avril 2024',
          time: '19:00',
          status: 'present',
          location: 'Salle 2',
          type: 'Étude',
        },
        {
          id: '7',
          title: 'Culte du dimanche',
          date: '14 avril 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '8',
          title: 'Réunion de prière',
          date: '17 avril 2024',
          time: '19:00',
          status: 'absent',
          location: 'Salle 3',
          type: 'Prière',
        },
        {
          id: '9',
          title: 'Culte du dimanche',
          date: '21 avril 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '10',
          title: 'Culte du dimanche',
          date: '28 avril 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
      ],
    },
    {
      month: 'Mars',
      year: '2024',
      presenceRate: 0.6,
      events: [
        {
          id: '11',
          title: 'Culte du dimanche',
          date: '3 mars 2024',
          time: '10:00',
          status: 'absent',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '12',
          title: 'Étude biblique',
          date: '6 mars 2024',
          time: '19:00',
          status: 'present',
          location: 'Salle 2',
          type: 'Étude',
        },
        {
          id: '13',
          title: 'Culte du dimanche',
          date: '10 mars 2024',
          time: '10:00',
          status: 'present',
          location: 'Grande salle',
          type: 'Culte',
        },
        {
          id: '14',
          title: 'Réunion de prière',
          date: '13 mars 2024',
          time: '19:00',
          status: 'absent',
          location: 'Salle 3',
          type: 'Prière',
        },
        {
          id: '15',
          title: 'Culte du dimanche',
          date: '17 mars 2024',
          time: '10:00',
          status: 'late',
          location: 'Grande salle',
          type: 'Culte',
        },
      ],
    },
  ];
  
  const displayedData = selectedMonth 
    ? timelineData.find(month => month.month === selectedMonth)
    : timelineData[0];
  
  const totalEvents = timelineData.reduce((sum, month) => sum + month.events.length, 0);
  const presentEvents = timelineData.reduce(
    (sum, month) => sum + month.events.filter(event => event.status === 'present').length, 
    0
  );
  const lateEvents = timelineData.reduce(
    (sum, month) => sum + month.events.filter(event => event.status === 'late').length, 
    0
  );
  const absentEvents = timelineData.reduce(
    (sum, month) => sum + month.events.filter(event => event.status === 'absent').length, 
    0
  );
  
  const overallPresenceRate = ((presentEvents + lateEvents) / totalEvents) * 100;
  
  const renderMonthSelector = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.monthsScrollContent}
    >
      {timelineData.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={[
            styles.monthItem,
            (selectedMonth === item.month || (!selectedMonth && index === 0)) && {
              backgroundColor: EdenColors[theme].primary + '20',
              borderColor: EdenColors[theme].primary,
            }
          ]}
          onPress={() => setSelectedMonth(item.month)}
        >
          <Text 
            style={[
              styles.monthName,
              { 
                color: (selectedMonth === item.month || (!selectedMonth && index === 0)) 
                  ? EdenColors[theme].primary 
                  : EdenColors[theme].text 
              }
            ]}
          >
            {item.month}
          </Text>
          <Text 
            style={[
              styles.monthYear,
              { 
                color: (selectedMonth === item.month || (!selectedMonth && index === 0)) 
                  ? EdenColors[theme].primary 
                  : EdenColors[theme].textSecondary 
              }
            ]}
          >
            {item.year}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  
  const renderTimelineEvent = (event: PresenceEvent) => {
    const statusColor = {
      present: EdenColors[theme].primary,
      absent: EdenColors[theme].error,
      late: EdenColors[theme].error,
      unknown: EdenColors[theme].textSecondary,
    };
    
    return (
      <View style={styles.timelineEventContainer}>
        <View 
          style={[
            styles.timelineLine,
            { backgroundColor: EdenColors[theme].divider }
          ]}
        />
        
        <View 
          style={[
            styles.timelineDot,
            { backgroundColor: statusColor[event.status] }
          ]}
        />
        
        <EdenCard 
          elevation="small"
          style={styles.eventCard}
        >
          <View style={styles.eventCardHeader}>
            <View>
              <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
                {event.title}
              </Text>
              <View style={styles.eventDateRow}>
                <IconSymbol name="calendar" size={14} color={EdenColors[theme].textSecondary} />
                <Text 
                  style={[
                    styles.eventDateText,
                    { color: EdenColors[theme].textSecondary }
                  ]}
                >
                  {event.date} à {event.time}
                </Text>
              </View>
              {event.location && (
                <View style={styles.eventLocationRow}>
                  <IconSymbol name="mappin" size={14} color={EdenColors[theme].textSecondary} />
                  <Text 
                    style={[
                      styles.eventLocationText,
                      { color: EdenColors[theme].textSecondary }
                    ]}
                  >
                    {event.location}
                  </Text>
                </View>
              )}
            </View>
            
            <EdenPresenceStatus 
              status={event.status}
              eventTime={event.time}
              isDarkMode={isDarkMode}
              
            />
          </View>
        </EdenCard>
      </View>
    );
  };
  
  const renderStatCard = (title: string, value: number, total: number, color: string) => {
    const percentage = Math.round((value / total) * 100);
    
    return (
      <EdenCard elevation="small" style={styles.statCard}>
        <Text style={[styles.statTitle, { color: EdenColors[theme].textSecondary }]}>
          {title}
        </Text>
        <Text style={[styles.statValue, { color }]}>
          {value}
        </Text>
        <View style={styles.statProgressContainer}>
          <View 
            style={[
              styles.statProgressBar,
              { 
                backgroundColor: color + '30',
                width: `${percentage}%`,
              }
            ]}
          />
        </View>
        <Text style={[styles.statPercentage, { color: EdenColors[theme].textSecondary }]}>
          {percentage}%
        </Text>
      </EdenCard>
    );
  };
  
  return (
    <>
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Présence & Participation
        </Text>
        
        <TouchableOpacity style={styles.optionsButton}>
          <IconSymbol name="ellipsis" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'timeline' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('timeline')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'timeline' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Timeline
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'stats' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('stats')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'stats' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Statistiques
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Sélecteur de mois */}
      {renderMonthSelector()}
      
      {activeTab === 'timeline' ? (
        <ScrollView 
          style={styles.timelineContainer}
          contentContainerStyle={styles.timelineContent}
          showsVerticalScrollIndicator={false}
        >
          {displayedData?.events.map(event => (
            <View key={event.id}>
              {renderTimelineEvent(event)}
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView 
          style={styles.statsContainer}
          contentContainerStyle={styles.statsContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Carte de présence globale */}
          <EdenCard elevation="medium" style={styles.overallCard}>
            <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text }]}>
              Taux de présence global
            </Text>
            
            <View style={styles.overallRateContainer}>
              <View 
                style={[
                  styles.overallRateCircle,
                  { 
                    borderColor: EdenColors[theme].primary,
                    backgroundColor: EdenColors[theme].primary + '10',
                  }
                ]}
              >
                <Text style={[styles.overallRateText, { color: EdenColors[theme].primary }]}>
                  {Math.round(overallPresenceRate)}%
                </Text>
              </View>
            </View>
            
            <View style={styles.overallStatsRow}>
              <View style={styles.overallStatItem}>
                <View 
                  style={[
                    styles.statIndicator,
                    { backgroundColor: EdenColors[theme].primary }
                  ]}
                />
                <Text style={[styles.statLabel, { color: EdenColors[theme].textSecondary }]}>
                  Présent: {presentEvents}
                </Text>
              </View>
              
              <View style={styles.overallStatItem}>
                <View 
                  style={[
                    styles.statIndicator,
                    { backgroundColor: EdenColors[theme].error }
                  ]}
                />
                <Text style={[styles.statLabel, { color: EdenColors[theme].textSecondary }]}>
                  En retard: {lateEvents}
                </Text>
              </View>
              
              <View style={styles.overallStatItem}>
                <View 
                  style={[
                    styles.statIndicator,
                    { backgroundColor: EdenColors[theme].error }
                  ]}
                />
                <Text style={[styles.statLabel, { color: EdenColors[theme].textSecondary }]}>
                  Absent: {absentEvents}
                </Text>
              </View>
            </View>
          </EdenCard>
          
          {/* Statistiques par type d'événement */}
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text, marginTop: 24, marginBottom: 16 }]}>
            Par type d'événement
          </Text>
          
          <View style={styles.statCardsContainer}>
            {renderStatCard('Cultes', 8, 10, EdenColors[theme].primary)}
            {renderStatCard('Études', 3, 4, EdenColors[theme].accent)}
            {renderStatCard('Prières', 2, 4, EdenColors[theme].secondary)}
          </View>
          
          {/* Statistiques par mois */}
          <Text style={[EdenTheme.typography.h3, { color: EdenColors[theme].text, marginTop: 24, marginBottom: 16 }]}>
            Évolution mensuelle
          </Text>
          
          <View style={styles.monthlyStatsContainer}>
            {timelineData.map((month, index) => (
              <View 
                key={index}
                style={[
                  styles.monthlyStatItem,
                  { borderBottomColor: EdenColors[theme].divider }
                ]}
              >
                <View>
                  <Text style={[styles.monthlyStatMonth, { color: EdenColors[theme].text }]}>
                    {month.month} {month.year}
                  </Text>
                  <Text style={[styles.monthlyStatEvents, { color: EdenColors[theme].textSecondary }]}>
                    {month.events.length} événements
                  </Text>
                </View>
                
                <View style={styles.monthlyRateContainer}>
                  <View style={styles.monthlyProgressContainer}>
                    <View 
                      style={[
                        styles.monthlyProgressBar,
                        { 
                          backgroundColor: EdenColors[theme].primary,
                          width: `${month.presenceRate * 100}%`,
                        }
                      ]}
                    />
                  </View>
                  <Text style={[styles.monthlyRateText, { color: EdenColors[theme].primary }]}>
                    {Math.round(month.presenceRate * 100)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  monthsScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  monthItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginRight: 8,
    alignItems: 'center',
  },
  monthName: {
    fontSize: 16,
    fontWeight: '600',
  },
  monthYear: {
    fontSize: 12,
  },
  timelineContainer: {
    flex: 1,
  },
  timelineContent: {
    padding: 16,
    paddingBottom: 32,
  },
  timelineEventContainer: {
    position: 'relative',
    paddingLeft: 24,
    marginBottom: 16,
  },
  timelineLine: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    width: 2,
  },
  timelineDot: {
    position: 'absolute',
    left: 6,
    top: 16,
    width: 14,
    height: 14,
    borderRadius: 7,
    zIndex: 1,
  },
  eventCard: {
    padding: 16,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventDateText: {
    fontSize: 14,
    marginLeft: 6,
  },
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventLocationText: {
    fontSize: 14,
    marginLeft: 6,
  },
  statsContainer: {
    flex: 1,
  },
  statsContent: {
    padding: 16,
    paddingBottom: 32,
  },
  overallCard: {
    padding: 16,
  },
  overallRateContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  overallRateCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overallRateText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  overallStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  overallStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  statLabel: {
    fontSize: 14,
  },
  statCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statProgressContainer: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    marginVertical: 8,
  },
  statProgressBar: {
    height: 6,
    borderRadius: 3,
  },
  statPercentage: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  monthlyStatsContainer: {
    marginBottom: 16,
  },
  monthlyStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  monthlyStatMonth: {
    fontSize: 16,
    fontWeight: '500',
  },
  monthlyStatEvents: {
    fontSize: 12,
    marginTop: 2,
  },
  monthlyRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthlyProgressContainer: {
    width: 100,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    marginRight: 8,
  },
  monthlyProgressBar: {
    height: 6,
    borderRadius: 3,
  },
  monthlyRateText: {
    fontSize: 14,
    fontWeight: '500',
    width: 40,
    textAlign: 'right',
  },
});