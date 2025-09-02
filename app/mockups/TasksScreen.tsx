import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed';
  category?: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdBy?: {
    id: string;
    name: string;
  };
};

type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export default function TasksScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'assigned' | 'created' | 'all'>('assigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const taskCategories: TaskCategory[] = [
    { id: '1', name: 'Culte', color: '#FF6B6B' },
    { id: '2', name: 'Événements', color: '#4ECDC4' },
    { id: '3', name: 'Administration', color: '#FFD166' },
    { id: '4', name: 'Jeunesse', color: '#6A0572' },
    { id: '5', name: 'Musique', color: '#1A535C' },
  ];
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Préparer la présentation pour le culte de dimanche',
      description: 'Créer les slides pour les annonces et les chants du prochain culte',
      dueDate: '24/09/2023',
      priority: 'high',
      status: 'in_progress',
      category: 'Culte',
      assignedTo: {
        id: '1',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      createdBy: {
        id: '2',
        name: 'Pasteur Thomas',
      },
    },
    {
      id: '2',
      title: 'Contacter les musiciens pour la répétition',
      dueDate: '22/09/2023',
      priority: 'medium',
      status: 'todo',
      category: 'Musique',
      assignedTo: {
        id: '1',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      createdBy: {
        id: '2',
        name: 'Pasteur Thomas',
      },
    },
    {
      id: '3',
      title: 'Mettre à jour le site web avec les nouveaux événements',
      description: 'Ajouter les informations sur la retraite spirituelle et la conférence jeunesse',
      dueDate: '25/09/2023',
      priority: 'low',
      status: 'todo',
      category: 'Administration',
      assignedTo: {
        id: '1',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      createdBy: {
        id: '3',
        name: 'Jean Dubois',
      },
    },
    {
      id: '4',
      title: 'Organiser la réunion de planification trimestrielle',
      description: 'Réserver la salle, préparer l\'ordre du jour et inviter tous les responsables',
      dueDate: '30/09/2023',
      priority: 'high',
      status: 'todo',
      category: 'Administration',
      assignedTo: {
        id: '3',
        name: 'Jean Dubois',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      },
      createdBy: {
        id: '1',
        name: 'Marie Dupont',
      },
    },
    {
      id: '5',
      title: 'Acheter le matériel pour l\'activité jeunesse',
      dueDate: '23/09/2023',
      priority: 'medium',
      status: 'completed',
      category: 'Jeunesse',
      assignedTo: {
        id: '1',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      createdBy: {
        id: '2',
        name: 'Pasteur Thomas',
      },
    },
  ];
  
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    
    // Filtrer par onglet
    if (activeTab === 'assigned') {
      filteredTasks = filteredTasks.filter(task => task.assignedTo?.id === '1'); // ID de l'utilisateur actuel
    } else if (activeTab === 'created') {
      filteredTasks = filteredTasks.filter(task => task.createdBy?.id === '1'); // ID de l'utilisateur actuel
    }
    
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description?.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
      );
    }
    
    // Filtrer par catégorie
    if (selectedCategory) {
      filteredTasks = filteredTasks.filter(task => task.category === selectedCategory);
    }
    
    return filteredTasks;
  };
  
  const handleTaskPress = (taskId: string) => {
    setSelectedTask(taskId);
    // Ouvrir le modal de détail de tâche ou naviguer vers l'écran de détail
  };
  
  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'in_progress' | 'completed') => {
    // Logique pour changer le statut d'une tâche
  };
  
  const getCategoryColor = (categoryName?: string) => {
    if (!categoryName) return '#CCCCCC';
    const category = taskCategories.find(cat => cat.name === categoryName);
    return category ? category.color : '#CCCCCC';
  };
  
  const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'exclamationmark.triangle.fill';
      case 'medium':
        return 'equal.circle.fill';
      case 'low':
        return 'arrow.down.circle.fill';
      default:
        return 'equal.circle.fill';
    }
  };
  
  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return EdenColors[theme].error;
      case 'medium':
        return EdenColors[theme].accent;
      case 'low':
        return EdenColors[theme].primary;
      default:
        return EdenColors[theme].textSecondary;
    }
  };
  
  const getStatusColor = (status: 'todo' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'todo':
        return EdenColors[theme].textSecondary;
      case 'in_progress':
        return EdenColors[theme].primary;
      case 'completed':
        return EdenColors[theme].primary;
      default:
        return EdenColors[theme].textSecondary;
    }
  };
  
  const getStatusLabel = (status: 'todo' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'todo':
        return 'À faire';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      default:
        return 'À faire';
    }
  };
  
  const renderCategoryChip = (category: TaskCategory) => {
    const isSelected = selectedCategory === category.name;
    
    return (
      <TouchableOpacity 
        style={[
          styles.categoryChip,
          { 
            backgroundColor: isSelected ? 
              category.color : 
              EdenColors[theme].background,
            borderColor: category.color,
          }
        ]}
        onPress={() => setSelectedCategory(isSelected ? null : category.name)}
      >
        <Text 
          style={[
            styles.categoryChipText,
            { color: isSelected ? '#FFFFFF' : category.color }
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderTask = (task: Task) => {
    const categoryColor = getCategoryColor(task.category);
    const priorityIcon = getPriorityIcon(task.priority);
    const priorityColor = getPriorityColor(task.priority);
    const statusColor = getStatusColor(task.status);
    
    return (
      <TouchableOpacity onPress={() => handleTaskPress(task.id)}>
        <EdenCard 
          elevation="small"
          style={styles.taskCard}
        >
          <View style={styles.taskHeader}>
            {task.category && (
              <View 
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColor + '30' }
                ]}
              >
                <Text 
                  style={[
                    styles.categoryBadgeText,
                    { color: categoryColor }
                  ]}
                >
                  {task.category}
                </Text>
              </View>
            )}
            
            <View 
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityColor + '20' }
              ]}
            >
              <IconSymbol name={priorityIcon} size={12} color={priorityColor} />
              <Text 
                style={[
                  styles.priorityBadgeText,
                  { color: priorityColor }
                ]}
              >
                {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.taskTitle, { color: EdenColors[theme].text }]}>
            {task.title}
          </Text>
          
          {task.description && (
            <Text 
              style={[styles.taskDescription, { color: EdenColors[theme].textSecondary }]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          )}
          
          <View style={styles.taskFooter}>
            <View style={styles.taskInfo}>
              {task.dueDate && (
                <View style={styles.taskInfoItem}>
                  <IconSymbol name="calendar" size={14} color={EdenColors[theme].textSecondary} />
                  <Text style={[styles.taskInfoText, { color: EdenColors[theme].textSecondary }]}>
                    {task.dueDate}
                  </Text>
                </View>
              )}
              
              {task.assignedTo && (
                <View style={styles.taskInfoItem}>
                  <IconSymbol name="person.fill" size={14} color={EdenColors[theme].textSecondary} />
                  <Text style={[styles.taskInfoText, { color: EdenColors[theme].textSecondary }]}>
                    {task.assignedTo.name}
                  </Text>
                </View>
              )}
            </View>
            
            <View 
              style={[
                styles.statusBadge,
                { backgroundColor: statusColor + '20' }
              ]}
            >
              <Text 
                style={[
                  styles.statusBadgeText,
                  { color: statusColor }
                ]}
              >
                {getStatusLabel(task.status)}
              </Text>
            </View>
          </View>
        </EdenCard>
      </TouchableOpacity>
    );
  };
  
  const renderTaskDetail = () => {
    if (!selectedTask) return null;
    
    const task = tasks.find(t => t.id === selectedTask);
    if (!task) return null;
    
    const categoryColor = getCategoryColor(task.category);
    const priorityColor = getPriorityColor(task.priority);
    const statusColor = getStatusColor(task.status);
    
    return (
      <View 
        style={[
          styles.modalOverlay,
          { backgroundColor: 'rgba(0,0,0,0.5)' }
        ]}
      >
        <EdenCard
          elevation="medium"
          style={[
            styles.modalCard,
            { backgroundColor: EdenColors[theme].card }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: EdenColors[theme].text }]}>
              Détails de la tâche
            </Text>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setSelectedTask(null)}
            >
              <IconSymbol name="xmark" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.taskDetailTitle, { color: EdenColors[theme].text }]}>
              {task.title}
            </Text>
            
            <View style={styles.taskDetailBadges}>
              {task.category && (
                <View 
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: categoryColor + '30' }
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryBadgeText,
                      { color: categoryColor }
                    ]}
                  >
                    {task.category}
                  </Text>
                </View>
              )}
              
              <View 
                style={[
                  styles.priorityBadge,
                  { backgroundColor: priorityColor + '20' }
                ]}
              >
                <IconSymbol 
                  name={getPriorityIcon(task.priority)} 
                  size={12} 
                  color={priorityColor} 
                />
                <Text 
                  style={[
                    styles.priorityBadgeText,
                    { color: priorityColor }
                  ]}
                >
                  {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                </Text>
              </View>
              
              <View 
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColor + '20' }
                ]}
              >
                <Text 
                  style={[
                    styles.statusBadgeText,
                    { color: statusColor }
                  ]}
                >
                  {getStatusLabel(task.status)}
                </Text>
              </View>
            </View>
            
            {task.description && (
              <View style={styles.taskDetailSection}>
                <Text style={[styles.taskDetailSectionTitle, { color: EdenColors[theme].text }]}>
                  Description
                </Text>
                <Text style={[styles.taskDetailDescription, { color: EdenColors[theme].textSecondary }]}>
                  {task.description}
                </Text>
              </View>
            )}
            
            <View style={styles.taskDetailSection}>
              <Text style={[styles.taskDetailSectionTitle, { color: EdenColors[theme].text }]}>
                Informations
              </Text>
              
              <View style={styles.taskDetailInfo}>
                {task.dueDate && (
                  <View style={styles.taskDetailInfoItem}>
                    <Text style={[styles.taskDetailInfoLabel, { color: EdenColors[theme].textSecondary }]}>
                      Date d'échéance:
                    </Text>
                    <Text style={[styles.taskDetailInfoValue, { color: EdenColors[theme].text }]}>
                      {task.dueDate}
                    </Text>
                  </View>
                )}
                
                {task.assignedTo && (
                  <View style={styles.taskDetailInfoItem}>
                    <Text style={[styles.taskDetailInfoLabel, { color: EdenColors[theme].textSecondary }]}>
                      Assigné à:
                    </Text>
                    <Text style={[styles.taskDetailInfoValue, { color: EdenColors[theme].text }]}>
                      {task.assignedTo.name}
                    </Text>
                  </View>
                )}
                
                {task.createdBy && (
                  <View style={styles.taskDetailInfoItem}>
                    <Text style={[styles.taskDetailInfoLabel, { color: EdenColors[theme].textSecondary }]}>
                      Créé par:
                    </Text>
                    <Text style={[styles.taskDetailInfoValue, { color: EdenColors[theme].text }]}>
                      {task.createdBy.name}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalActions}>
            <View style={styles.statusButtons}>
              <TouchableOpacity 
                style={[
                  styles.statusButton,
                  { 
                    backgroundColor: task.status === 'todo' ? 
                      EdenColors[theme].textSecondary : 
                      EdenColors[theme].textSecondary + '20' 
                  }
                ]}
                onPress={() => handleStatusChange(task.id, 'todo')}
              >
                <Text 
                  style={[
                    styles.statusButtonText,
                    {
                      color: task.status === 'todo' ?
                        '#FFFFFF' :
                        EdenColors[theme].textSecondary
                    }
                  ]}
                >
                  À faire
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton,
                  { 
                    backgroundColor: task.status === 'in_progress' ? 
                      EdenColors[theme].primary : 
                      EdenColors[theme].primary + '20' 
                  }
                ]}
                onPress={() => handleStatusChange(task.id, 'in_progress')}
              >
                <Text 
                  style={[
                    styles.statusButtonText,
                    {
                      color: task.status === 'in_progress' ?
                        '#FFFFFF' :
                        EdenColors[theme].primary
                    }
                  ]}
                >
                  En cours
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.statusButton,
                  {
                    backgroundColor: task.status === 'completed' ?
                      EdenColors[theme].primary :
                      EdenColors[theme].primary + '20'
                  }
                ]}
                onPress={() => handleStatusChange(task.id, 'completed')}
              >
                <Text 
                  style={[
                    styles.statusButtonText,
                    {
                      color: task.status === 'completed' ?
                        '#FFFFFF' :
                        EdenColors[theme].primary
                    }
                  ]}
                >
                  Terminé
                </Text>
              </TouchableOpacity>
            </View>
            
            <EdenButton
              variant="primary"
              title="Modifier la tâche"
              onPress={() => {}}
              style={styles.editButton}
            />
          </View>
        </EdenCard>
      </View>
    );
  };
  
  return (
    <React.Fragment>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Tâches
        </Text>
        
        <TouchableOpacity style={styles.optionsButton}>
          <IconSymbol name="plus" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'assigned' ? {
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            } : {}
          ]}
          onPress={() => setActiveTab('assigned')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'assigned' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Mes tâches
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'created' ? {
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            } : {}
          ]}
          onPress={() => setActiveTab('created')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'created' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Créées par moi
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'all' ? {
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            } : {}
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'all' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Toutes
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Recherche */}
      <View style={[styles.searchContainer, { backgroundColor: EdenColors[theme].card }]}>
        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: EdenColors[theme].card }
          ]}
        >
          <IconSymbol name="magnifyingglass" size={20} color={EdenColors[theme].textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: EdenColors[theme].text }]}
            placeholder="Rechercher une tâche..."
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
      
      {/* Catégories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {taskCategories.map((category) => renderCategoryChip(category))}
      </ScrollView>
      
      {/* Liste des tâches */}
      <FlatList
        data={getFilteredTasks()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderTask(item)}
        contentContainerStyle={styles.tasksList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="checkmark.circle" size={48} color={EdenColors[theme].textSecondary} />
            <Text style={[styles.emptyText, { color: EdenColors[theme].textSecondary }]}>
              Aucune tâche trouvée
            </Text>
          </View>
        }
      />
      
      {/* Bouton d'ajout */}
      <TouchableOpacity 
        style={[
          styles.addButton,
          { backgroundColor: EdenColors[theme].primary }
        ]}
      >
        <IconSymbol name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      {/* Modal de détail de tâche */}
      {selectedTask && renderTaskDetail()}
      </View>
    </React.Fragment>
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
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tasksList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  taskCard: {
    marginBottom: 12,
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  taskInfoText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    paddingHorizontal: 24,
    maxHeight: 400,
  },
  taskDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskDetailBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  taskDetailSection: {
    marginBottom: 24,
  },
  taskDetailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  taskDetailDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  taskDetailInfo: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  taskDetailInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskDetailInfoLabel: {
    fontSize: 14,
  },
  taskDetailInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalActions: {
    padding: 24,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    marginTop: 8,
  },
});