import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type DonationProject = {
  id: string;
  title: string;
  description: string;
  image?: string;
  goal: number;
  current: number;
  endDate?: string;
  supporters: number;
};

type DonationHistory = {
  id: string;
  amount: number;
  project: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export default function DonationsScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'history'>('projects');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const donationProjects: DonationProject[] = [
    {
      id: '1',
      title: 'Rénovation du lieu de culte',
      description: 'Aidez-nous à rénover notre lieu de culte pour accueillir plus de fidèles dans de meilleures conditions.',
      image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b',
      goal: 25000,
      current: 18750,
      endDate: '31/12/2023',
      supporters: 124,
    },
    {
      id: '2',
      title: 'Mission humanitaire en Afrique',
      description: 'Soutenez notre équipe missionnaire qui apporte aide spirituelle et matérielle aux communautés défavorisées.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
      goal: 10000,
      current: 4200,
      endDate: '15/11/2023',
      supporters: 78,
    },
    {
      id: '3',
      title: 'Équipement audiovisuel',
      description: 'Pour améliorer la qualité de nos diffusions en ligne et l\'expérience des cultes en présentiel.',
      image: 'https://images.unsplash.com/photo-1568179576330-61e6bd4f8a52',
      goal: 7500,
      current: 6300,
      endDate: '30/09/2023',
      supporters: 92,
    },
    {
      id: '4',
      title: 'Soutien aux familles dans le besoin',
      description: 'Un fonds d\'aide pour les familles de notre communauté traversant des difficultés financières.',
      goal: 5000,
      current: 2100,
      supporters: 45,
    },
  ];
  
  const donationHistory: DonationHistory[] = [
    {
      id: '1',
      amount: 100,
      project: 'Rénovation du lieu de culte',
      date: '15/08/2023',
      status: 'completed',
    },
    {
      id: '2',
      amount: 50,
      project: 'Mission humanitaire en Afrique',
      date: '02/07/2023',
      status: 'completed',
    },
    {
      id: '3',
      amount: 75,
      project: 'Équipement audiovisuel',
      date: '18/06/2023',
      status: 'completed',
    },
    {
      id: '4',
      amount: 25,
      project: 'Dîme mensuelle',
      date: '01/08/2023',
      status: 'pending',
    },
  ];
  
  const handleDonate = (projectId: string) => {
    setSelectedProject(projectId);
    // Ouvrir le modal de don ou naviguer vers l'écran de don
  };
  
  const handleSubmitDonation = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0 || !selectedProject) return;
    // Logique pour soumettre un don
    setDonationAmount('');
    setSelectedProject(null);
  };
  
  const getProgressPercentage = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };
  
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };
  
  const renderDonationProject = (project: DonationProject) => {
    const progressPercentage = getProgressPercentage(project.current, project.goal);
    
    return (
      <EdenCard 
        elevation="small"
        style={styles.projectCard}
      >
        {project.image && (
          <Image 
            source={{ uri: project.image }} 
            style={styles.projectImage} 
            resizeMode="cover"
          />
        )}
        
        <View style={styles.projectContent}>
          <Text style={[styles.projectTitle, { color: EdenColors[theme].text }]}>
            {project.title}
          </Text>
          
          <Text 
            style={[styles.projectDescription, { color: EdenColors[theme].textSecondary }]}
            numberOfLines={3}
          >
            {project.description}
          </Text>
          
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar,
                { backgroundColor: EdenColors[theme].accent }
              ]}
            >
              <View 
                style={[
                  styles.progressFill,
                  { 
                    backgroundColor: EdenColors[theme].primary,
                    width: `${progressPercentage}%` 
                  }
                ]}
              />
            </View>
            
            <View style={styles.progressStats}>
              <Text style={[styles.progressText, { color: EdenColors[theme].text }]}>
                {formatCurrency(project.current)} / {formatCurrency(project.goal)}
              </Text>
              
              <Text style={[styles.progressPercentage, { color: EdenColors[theme].primary }]}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
          </View>
          
          <View style={styles.projectFooter}>
            <View style={styles.projectStats}>
              <View style={styles.projectStat}>
                <IconSymbol name="person.2.fill" size={16} color={EdenColors[theme].textSecondary} />
                <Text style={[styles.projectStatText, { color: EdenColors[theme].textSecondary }]}>
                  {project.supporters} donateurs
                </Text>
              </View>
              
              {project.endDate && (
                <View style={styles.projectStat}>
                  <IconSymbol name="calendar" size={16} color={EdenColors[theme].textSecondary} />
                  <Text style={[styles.projectStatText, { color: EdenColors[theme].textSecondary }]}>
                    Jusqu'au {project.endDate}
                  </Text>
                </View>
              )}
            </View>
            
            <EdenButton
              variant="primary"
              title="Faire un don"
              onPress={() => handleDonate(project.id)}
              style={styles.smallButtonAlt}
            />
          </View>
        </View>
      </EdenCard>
    );
  };
  
  const renderDonationHistoryItem = (item: DonationHistory) => {
    let statusColor = EdenColors[theme].primary;
    let statusIcon = 'checkmark.circle.fill';
    
    if (item.status === 'pending') {
      statusColor = EdenColors[theme].error;
      statusIcon = 'clock.fill';
    } else if (item.status === 'failed') {
      statusColor = EdenColors[theme].error;
      statusIcon = 'xmark.circle.fill';
    }
    
    return (
      <View 
        style={[
          styles.historyItem,
          { borderBottomColor: EdenColors[theme].accent}
        ]}
      >
        <View style={styles.historyItemLeft}>
          <View 
            style={[
              styles.historyItemIcon,
              { backgroundColor: statusColor + '20' }
            ]}
          >
            <IconSymbol name={statusIcon} size={20} color={statusColor} />
          </View>
          
          <View style={styles.historyItemInfo}>
            <Text style={[styles.historyItemProject, { color: EdenColors[theme].text }]}>
              {item.project}
            </Text>
            
            <Text style={[styles.historyItemDate, { color: EdenColors[theme].textSecondary }]}>
              {item.date}
            </Text>
          </View>
        </View>
        
        <Text 
          style={[
            styles.historyItemAmount,
            { color: EdenColors[theme].text }
          ]}
        >
          {formatCurrency(item.amount)}
        </Text>
      </View>
    );
  };
  
  const renderDonationModal = () => {
    if (!selectedProject) return null;
    
    const project = donationProjects.find(p => p.id === selectedProject);
    if (!project) return null;
    
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
            { backgroundColor: EdenColors[theme].background }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: EdenColors[theme].text }]}>
              Faire un don
            </Text>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setSelectedProject(null)}
            >
              <IconSymbol name="xmark" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.modalProjectTitle, { color: EdenColors[theme].primary }]}>
            {project.title}
          </Text>
          
          <View style={styles.amountInputContainer}>
            <Text style={[styles.currencySymbol, { color: EdenColors[theme].text }]}>
              €
            </Text>
            
            <TextInput
              style={[
                styles.amountInput,
                { color: EdenColors[theme].text }
              ]}
              placeholder="0.00"
              placeholderTextColor={EdenColors[theme].textSecondary}
              keyboardType="numeric"
              value={donationAmount}
              onChangeText={setDonationAmount}
            />
          </View>
          
          <View style={styles.quickAmounts}>
            {[10, 25, 50, 100].map((amount) => (
              <TouchableOpacity 
                key={amount}
                style={[
                  styles.quickAmountButton,
                  { 
                    backgroundColor: donationAmount === amount.toString() ? 
                      EdenColors[theme].primary : 
                      EdenColors[theme].background 
                  }
                ]}
                onPress={() => setDonationAmount(amount.toString())}
              >
                <Text 
                  style={[
                    styles.quickAmountText,
                    { 
                      color: donationAmount === amount.toString() ? 
                        EdenColors[theme].pastelPrimary : 
                        EdenColors[theme].text 
                    }
                  ]}
                >
                  {formatCurrency(amount)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.paymentOptions}>
            <Text style={[styles.paymentTitle, { color: EdenColors[theme].text }]}>
              Mode de paiement
            </Text>
            
            <View style={styles.paymentMethods}>
              <TouchableOpacity 
                style={[
                  styles.paymentMethod,
                  { 
                    borderColor: EdenColors[theme].primary,
                    backgroundColor: EdenColors[theme].background,
                  }
                ]}
              >
                <IconSymbol name="creditcard.fill" size={24} color={EdenColors[theme].primary} />
                <Text style={[styles.paymentMethodText, { color: EdenColors[theme].text }]}>
                  Carte bancaire
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.paymentMethod,
                  { 
                    borderColor: EdenColors[theme].accent,
                    backgroundColor: EdenColors[theme].background,
                  }
                ]}
              >
                <IconSymbol name="arrow.right.arrow.left" size={24} color={EdenColors[theme].textSecondary} />
                <Text style={[styles.paymentMethodText, { color: EdenColors[theme].textSecondary }]}>
                  Virement
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <EdenButton
            variant="primary"
            title="Confirmer le don"
            onPress={handleSubmitDonation}
            disabled={!donationAmount || parseFloat(donationAmount) <= 0}
            style={styles.confirmButton}
          />
          
          <Text style={[styles.securePaymentText, { color: EdenColors[theme].textSecondary }]}>
            <IconSymbol name="lock.fill" size={12} color={EdenColors[theme].textSecondary} />
            {' '}Paiement sécurisé - Vos données sont protégées
          </Text>
        </EdenCard>
      </View>
    );
  };
  
  return (
    <>
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text, flex: 1, textAlign: 'center' }]}>
          Dons & Offrandes
        </Text>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'projects' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('projects')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'projects' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Projets
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'history' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'history' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'projects' ? (
        <>
          {/* Banner */}
          <EdenCard 
            elevation="small"
            style={styles.bannerCard}
          >
            <View style={styles.bannerContent}>
              <Text style={[styles.bannerTitle, { color: EdenColors[theme].text }]}>
                Soutenez notre mission
              </Text>
              
              <Text style={[styles.bannerText, { color: EdenColors[theme].textSecondary }]}>
                Votre générosité permet de faire avancer l'œuvre de Dieu et de soutenir notre communauté.
              </Text>
              
              <EdenButton
                variant="secondary"
                title="Faire un don libre"
                onPress={() => handleDonate('general')}
                style={styles.bannerButton}
              />
            </View>
            
            <View style={styles.bannerImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6' }} 
                style={styles.bannerImage} 
                resizeMode="cover"
              />
            </View>
          </EdenCard>
          
          {/* Liste des projets */}
          <FlatList
            data={donationProjects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderDonationProject(item)}
            contentContainerStyle={styles.projectsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          {/* Statistiques */}
          <View style={styles.statsContainer}>
            <EdenCard 
              elevation="small"
              style={styles.statCard}
            >
              <Text style={[styles.statValue, { color: EdenColors[theme].primary }]}>
                {formatCurrency(250)}
              </Text>
              
              <Text style={[styles.statLabel, { color: EdenColors[theme].textSecondary }]}>
                Ce mois-ci
              </Text>
            </EdenCard>
            
            <EdenCard 
              elevation="small"
              style={styles.statCard}
            >
              <Text style={[styles.statValue, { color: EdenColors[theme].primary }]}>
                {formatCurrency(1250)}
              </Text>
              
              <Text style={[styles.statLabel, { color: EdenColors[theme].textSecondary }]}>
                Cette année
              </Text>
            </EdenCard>
          </View>
          
          {/* Historique des dons */}
          <View style={styles.historyContainer}>
            <Text style={[styles.historyTitle, { color: EdenColors[theme].text }]}>
              Vos dons récents
            </Text>
            
            <FlatList
              data={donationHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderDonationHistoryItem(item)}
              contentContainerStyle={styles.historyList}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity 
              style={[
                styles.viewAllButton,
                { borderColor: EdenColors[theme].accent }
              ]}
            >
              <Text style={[styles.viewAllText, { color: EdenColors[theme].primary }]}>
                Voir tout l'historique
              </Text>
              <IconSymbol name="chevron.right" size={16} color={EdenColors[theme].primary} />
            </TouchableOpacity>
          </View>
          
          {/* Télécharger reçus fiscaux */}
          <EdenCard 
            elevation="small"
            style={styles.taxReceiptCard}
          >
            <View style={styles.taxReceiptContent}>
              <IconSymbol name="doc.text.fill" size={24} color={EdenColors[theme].primary} />
              
              <View style={styles.taxReceiptInfo}>
                <Text style={[styles.taxReceiptTitle, { color: EdenColors[theme].text }]}>
                  Reçus fiscaux
                </Text>
                
                <Text style={[styles.taxReceiptText, { color: EdenColors[theme].textSecondary }]}>
                  Téléchargez vos reçus fiscaux pour votre déclaration d'impôts
                </Text>
              </View>
            </View>
            
            <TouchableOpacity>
              <IconSymbol name="arrow.down.circle.fill" size={24} color={EdenColors[theme].primary} />
            </TouchableOpacity>
          </EdenCard>
        </>
      )}
      
      {/* Modal de don */}
      {selectedProject && renderDonationModal()}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 36,
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
  bannerCard: {
    margin: 16,
    padding: 16,
    flexDirection: 'row',
  },
  bannerContent: {
    flex: 1,
    paddingRight: 12,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  bannerButton: {
    alignSelf: 'flex-start',
  },
  bannerImageContainer: {
    width: 100,
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  projectsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  projectCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 150,
  },
  projectContent: {
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  projectStats: {
    flexDirection: 'column',
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectStatText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  historyList: {
    paddingBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyItemInfo: {
    flex: 1,
  },
  historyItemProject: {
    fontSize: 16,
    fontWeight: '500',
  },
  historyItemDate: {
    fontSize: 12,
    marginTop: 2,
  },
  historyItemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  taxReceiptCard: {
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taxReceiptContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taxReceiptInfo: {
    marginLeft: 12,
  },
  taxReceiptTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taxReceiptText: {
    fontSize: 12,
    marginTop: 2,
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
    padding: 24,
    borderRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  modalProjectTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 120,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAmountButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '500',
  },
  paymentOptions: {
    marginBottom: 24,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    borderRadius: 8,
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  confirmButton: {
    marginBottom: 16,
  },
  securePaymentText: {
    fontSize: 12,
    textAlign: 'center',
  },
  smallButtonAlt: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 36,
  },
});