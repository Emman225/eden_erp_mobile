import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type SupportCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  date: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category?: string;
  responses?: {
    id: string;
    from: string;
    message: string;
    date: string;
    isStaff?: boolean;
  }[];
};

export default function SupportScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'help' | 'tickets'>('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newTicketMode, setNewTicketMode] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('');
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const supportCategories: SupportCategory[] = [
    {
      id: '1',
      title: 'Compte',
      icon: 'person.circle',
      description: 'Problèmes de connexion, profil, mot de passe',
    },
    {
      id: '2',
      title: 'Application',
      icon: 'app.badge',
      description: 'Bugs, fonctionnalités, suggestions',
    },
    {
      id: '3',
      title: 'Événements',
      icon: 'calendar',
      description: 'Inscriptions, annulations, informations',
    },
    {
      id: '4',
      title: 'Dons',
      icon: 'heart.fill',
      description: 'Problèmes de paiement, reçus fiscaux',
    },
    {
      id: '5',
      title: 'Autre',
      icon: 'questionmark.circle',
      description: 'Toute autre demande',
    },
  ];
  
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Comment réinitialiser mon mot de passe ?',
      answer: 'Pour réinitialiser votre mot de passe, cliquez sur "Mot de passe oublié" sur l\'écran de connexion. Vous recevrez un email avec les instructions pour créer un nouveau mot de passe.',
      category: 'Compte',
    },
    {
      id: '2',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Vous pouvez modifier vos informations personnelles en accédant à votre profil. Appuyez sur l\'icône de profil, puis sur "Modifier le profil". Vous pourrez y mettre à jour vos coordonnées et préférences.',
      category: 'Compte',
    },
    {
      id: '3',
      question: 'Comment s\'inscrire à un événement ?',
      answer: 'Pour vous inscrire à un événement, accédez à la section "Événements", sélectionnez l\'événement qui vous intéresse, puis appuyez sur le bouton "S\'inscrire". Suivez les instructions pour confirmer votre participation.',
      category: 'Événements',
    },
    {
      id: '4',
      question: 'Comment faire un don ?',
      answer: 'Pour faire un don, accédez à la section "Dons & Offrandes", choisissez le projet que vous souhaitez soutenir ou faites un don libre, puis suivez les instructions de paiement sécurisé.',
      category: 'Dons',
    },
    {
      id: '5',
      question: 'Comment obtenir mon reçu fiscal ?',
      answer: 'Les reçus fiscaux sont disponibles dans la section "Dons & Offrandes" sous l\'onglet "Historique". Vous pouvez y télécharger vos reçus fiscaux pour votre déclaration d\'impôts.',
      category: 'Dons',
    },
    {
      id: '6',
      question: 'L\'application est lente ou se bloque, que faire ?',
      answer: 'Si l\'application est lente ou se bloque, essayez de la fermer complètement et de la rouvrir. Si le problème persiste, vous pouvez essayer de vider le cache de l\'application ou de la réinstaller. Si cela ne résout pas le problème, contactez notre support technique.',
      category: 'Application',
    },
  ];
  
  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      subject: 'Problème de connexion',
      message: 'Je n\'arrive pas à me connecter à mon compte malgré plusieurs tentatives. J\'ai vérifié mon mot de passe et mon email, mais ça ne fonctionne toujours pas.',
      date: '15/09/2023',
      status: 'resolved',
      category: 'Compte',
      responses: [
        {
          id: '1',
          from: 'Support Eden',
          message: 'Bonjour, nous avons réinitialisé votre compte. Veuillez essayer de vous connecter à nouveau avec votre email et le mot de passe temporaire que nous vous avons envoyé par email.',
          date: '16/09/2023',
          isStaff: true,
        },
        {
          id: '2',
          from: 'Vous',
          message: 'Merci beaucoup, j\'ai réussi à me connecter et à changer mon mot de passe !',
          date: '16/09/2023',
        },
      ],
    },
    {
      id: '2',
      subject: 'Question sur l\'événement du 25 septembre',
      message: 'Bonjour, je voudrais savoir si l\'événement du 25 septembre est ouvert aux non-membres et si je peux inviter des amis.',
      date: '18/09/2023',
      status: 'open',
      category: 'Événements',
    },
    {
      id: '3',
      subject: 'Suggestion de fonctionnalité',
      message: 'J\'aimerais suggérer l\'ajout d\'une fonctionnalité de partage de notes pendant les cultes. Ce serait très utile pour notre groupe d\'étude biblique.',
      date: '10/09/2023',
      status: 'in_progress',
      category: 'Application',
      responses: [
        {
          id: '1',
          from: 'Support Eden',
          message: 'Merci pour votre suggestion ! Nous l\'avons transmise à notre équipe de développement qui étudie actuellement la faisabilité de cette fonctionnalité. Nous vous tiendrons informé de l\'avancement.',
          date: '12/09/2023',
          isStaff: true,
        },
      ],
    },
  ];
  
  const getFilteredFAQs = () => {
    let filteredFAQs = [...faqs];
    
    // Filtrer par catégorie
    if (selectedCategory) {
      filteredFAQs = filteredFAQs.filter(faq => faq.category === selectedCategory);
    }
    
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredFAQs = filteredFAQs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }
    
    return filteredFAQs;
  };
  
  const getFilteredTickets = () => {
    return [...supportTickets].sort((a, b) => {
      // Trier par statut (ouverts en premier)
      if (a.status === 'open' && b.status !== 'open') return -1;
      if (a.status !== 'open' && b.status === 'open') return 1;
      
      // Puis par date (plus récents en premier)
      return new Date(b.date.split('/').reverse().join('-')).getTime() - 
             new Date(a.date.split('/').reverse().join('-')).getTime();
    });
  };
  
  const handleCategoryPress = (categoryId: string) => {
    const category = supportCategories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(prevCategory => 
        prevCategory === category.title ? null : category.title
      );
    }
  };
  
  const handleFAQPress = (faqId: string) => {
    setExpandedFAQ(prevFAQ => prevFAQ === faqId ? null : faqId);
  };
  
  const handleTicketPress = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };
  
  const handleCreateTicket = () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim() || !newTicketCategory) {
      // Afficher une erreur
      return;
    }
    
    // Logique pour créer un nouveau ticket
    setNewTicketMode(false);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setNewTicketCategory('');
  };
  
  const getStatusColor = (status: 'open' | 'in_progress' | 'resolved' | 'closed') => {
    switch (status) {
      case 'open':
        return EdenColors[theme].error;
      case 'in_progress':
        return EdenColors[theme].primary;
      case 'resolved':
        return EdenColors[theme].primary;
      case 'closed':
        return EdenColors[theme].textSecondary;
      default:
        return EdenColors[theme].textSecondary;
    }
  };
  
  const getStatusLabel = (status: 'open' | 'in_progress' | 'resolved' | 'closed') => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En traitement';
      case 'resolved':
        return 'Résolu';
      case 'closed':
        return 'Fermé';
      default:
        return 'Ouvert';
    }
  };
  
  const renderSupportCategory = (category: SupportCategory) => {
    const isSelected = selectedCategory === category.title;
    
    return (
      <TouchableOpacity 
        style={[
          styles.categoryCard,
          { 
            backgroundColor: isSelected ? 
              EdenColors[theme].primary + '20' : 
              EdenColors[theme].card,
            borderColor: isSelected ? 
              EdenColors[theme].primary : 
              'transparent',
          }
        ]}
        onPress={() => handleCategoryPress(category.id)}
      >
        <View 
          style={[
            styles.categoryIconContainer,
            { 
              backgroundColor: isSelected ? 
                EdenColors[theme].primary : 
                EdenColors[theme].background 
            }
          ]}
        >
          <IconSymbol 
            name={category.icon} 
            size={24} 
            color={isSelected ? EdenColors[theme].pastelSecondary : EdenColors[theme].primary} 
          />
        </View>
        
        <Text 
          style={[
            styles.categoryTitle,
            { 
              color: isSelected ? 
                EdenColors[theme].primary : 
                EdenColors[theme].text 
            }
          ]}
        >
          {category.title}
        </Text>
        
        <Text 
          style={[
            styles.categoryDescription,
            { color: EdenColors[theme].textSecondary }
          ]}
          numberOfLines={2}
        >
          {category.description}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderFAQ = (faq: FAQ) => {
    const isExpanded = expandedFAQ === faq.id;
    
    return (
      <EdenCard 
        elevation="small"
        style={[
          styles.faqCard,
          isExpanded && { borderColor: EdenColors[theme].primary }
        ]}
      >
        <TouchableOpacity 
          style={styles.faqHeader}
          onPress={() => handleFAQPress(faq.id)}
        >
          <Text 
            style={[
              styles.faqQuestion,
              { color: EdenColors[theme].text }
            ]}
          >
            {faq.question}
          </Text>
          
          <IconSymbol 
            name={isExpanded ? "chevron.up" : "chevron.down"} 
            size={20} 
            color={EdenColors[theme].textSecondary} 
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={[styles.faqAnswerText, { color: EdenColors[theme].textSecondary }]}>
              {faq.answer}
            </Text>
            
            <View style={styles.faqActions}>
              <Text style={[styles.faqHelpful, { color: EdenColors[theme].textSecondary }]}>
                Cette réponse vous a-t-elle été utile ?
              </Text>
              
              <View style={styles.faqActionButtons}>
                <TouchableOpacity 
                  style={[
                    styles.faqActionButton,
                    { backgroundColor: EdenColors[theme].pastelPrimary + '20' }
                  ]}
                >
                  <IconSymbol name="hand.thumbsup.fill" size={16} color={EdenColors[theme].pastelPrimary} />
                  <Text style={[styles.faqActionButtonText, { color: EdenColors[theme].pastelPrimary }]}>
                    Oui
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.faqActionButton,
                    { backgroundColor: EdenColors[theme].error + '20' }
                  ]}
                >
                  <IconSymbol name="hand.thumbsdown.fill" size={16} color={EdenColors[theme].error} />
                  <Text style={[styles.faqActionButtonText, { color: EdenColors[theme].error }]}>
                    Non
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </EdenCard>
    );
  };
  
  const renderTicket = (ticket: SupportTicket) => {
    const statusColor = getStatusColor(ticket.status);
    
    return (
      <TouchableOpacity onPress={() => handleTicketPress(ticket.id)}>
        <EdenCard 
          elevation="small"
          style={styles.ticketCard}
        >
          <View style={styles.ticketHeader}>
            <Text style={[styles.ticketSubject, { color: EdenColors[theme].text }]}>
              {ticket.subject}
            </Text>
            
            <View 
              style={[
                styles.ticketStatus,
                { backgroundColor: statusColor + '20' }
              ]}
            >
              <Text style={[styles.ticketStatusText, { color: statusColor }]}>
                {getStatusLabel(ticket.status)}
              </Text>
            </View>
          </View>
          
          <Text 
            style={[styles.ticketPreview, { color: EdenColors[theme].textSecondary }]}
            numberOfLines={2}
          >
            {ticket.message}
          </Text>
          
          <View style={styles.ticketFooter}>
            <View style={styles.ticketInfo}>
              <Text style={[styles.ticketDate, { color: EdenColors[theme].textSecondary }]}>
                {ticket.date}
              </Text>
              
              {ticket.category && (
                <View style={styles.ticketCategory}>
                  <Text style={[styles.ticketCategoryText, { color: EdenColors[theme].textSecondary }]}>
                    {ticket.category}
                  </Text>
                </View>
              )}
            </View>
            
            {ticket.responses && (
              <View style={styles.ticketResponseCount}>
                <IconSymbol name="chat.bubble.text.fill" size={14} color={EdenColors[theme].textSecondary} />
                <Text style={[styles.ticketResponseCountText, { color: EdenColors[theme].textSecondary }]}>
                  {ticket.responses.length}
                </Text>
              </View>
            )}
          </View>
        </EdenCard>
      </TouchableOpacity>
    );
  };
  
  const renderTicketDetail = () => {
    if (!selectedTicket) return null;

    const ticket = supportTickets.find(t => t.id === selectedTicket);
    if (!ticket) return null;

    const statusColor = getStatusColor(ticket.status);

    return (
      <>
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
              Détails du ticket
            </Text>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setSelectedTicket(null)}
            >
              <IconSymbol name="xmark" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.ticketDetailHeader}>
              <Text style={[styles.ticketDetailSubject, { color: EdenColors[theme].text }]}>
                {ticket.subject}
              </Text>
              
              <View style={styles.ticketDetailInfo}>
                <Text style={[styles.ticketDetailDate, { color: EdenColors[theme].textSecondary }]}>
                  {ticket.date}
                </Text>
                
                {ticket.category && (
                  <Text style={[styles.ticketDetailCategory, { color: EdenColors[theme].textSecondary }]}>
                    {ticket.category}
                  </Text>
                )}
                
                <View 
                  style={[
                    styles.ticketDetailStatus,
                    { backgroundColor: statusColor + '20' }
                  ]}
                >
                  <Text style={[styles.ticketDetailStatusText, { color: statusColor }]}>
                    {getStatusLabel(ticket.status)}
                  </Text>
                </View>
              </View>
            </View>
            
            <View 
              style={[
                styles.ticketMessage,
                { backgroundColor: EdenColors[theme].background }
              ]}
            >
              <Text style={[styles.ticketMessageText, { color: EdenColors[theme].text }]}>
                {ticket.message}
              </Text>
            </View>
            
            {ticket.responses && ticket.responses.length > 0 && (
              <View style={styles.ticketResponses}>
                <Text style={[styles.ticketResponsesTitle, { color: EdenColors[theme].text }]}>
                  Réponses
                </Text>
                
                {ticket.responses.map((response) => (
                  <View 
                    key={response.id}
                    style={[
                      styles.ticketResponse,
                      { 
                        backgroundColor: response.isStaff ? 
                          EdenColors[theme].primary + '10' : 
                          EdenColors[theme].background 
                      }
                    ]}
                  >
                    <View style={styles.ticketResponseHeader}>
                      <Text 
                        style={[
                          styles.ticketResponseFrom,
                          { 
                            color: response.isStaff ? 
                              EdenColors[theme].primary : 
                              EdenColors[theme].text 
                          }
                        ]}
                      >
                        {response.from}
                      </Text>
                      
                      <Text style={[styles.ticketResponseDate, { color: EdenColors[theme].textSecondary }]}>
                        {response.date}
                      </Text>
                    </View>
                    
                    <Text style={[styles.ticketResponseMessage, { color: EdenColors[theme].text }]}>
                      {response.message}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            
            {ticket.status !== 'closed' && (
              <View style={styles.replyContainer}>
                <Text style={[styles.replyTitle, { color: EdenColors[theme].text }]}>
                  Répondre
                </Text>
                
                <TextInput
                  style={[
                    styles.replyInput,
                    { 
                      color: EdenColors[theme].text,
                      backgroundColor: EdenColors[theme].tertiary,
                    }
                  ]}
                  placeholder="Écrivez votre réponse ici..."
                  placeholderTextColor={EdenColors[theme].textSecondary}
                  multiline
                />
                
                <EdenButton
                  variant="primary"
                  title="Envoyer"
                  onPress={() => {}}
                  style={styles.replyButton}
                />
              </View>
            )}
          </ScrollView>
          
          {ticket.status !== 'closed' && (
            <View style={styles.ticketActions}>
              <EdenButton
                variant="secondary"
                title="Marquer comme résolu"
                onPress={() => {}}
                style={styles.resolveButton}
              />
              
              <EdenButton
                variant="secondary"
                title="Fermer le ticket"
                onPress={() => {}}
                style={styles.closeButton}
              />
            </View>
          )}
        </EdenCard>
      </View>
      </>
    );
  };
  
  const renderNewTicketForm = () => {
    if (!newTicketMode) return null;
    
  return (
    <>
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
              Nouveau ticket
            </Text>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setNewTicketMode(false)}
            >
              <IconSymbol name="xmark" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: EdenColors[theme].text }]}>
                Catégorie *
              </Text>
              
              <View style={styles.categorySelector}>
                {supportCategories.map((category) => (
                  <TouchableOpacity 
                    key={category.id}
                    style={[
                      styles.categorySelectorItem,
                      { 
                        backgroundColor: newTicketCategory === category.title ? 
                          EdenColors[theme].primary : 
                          EdenColors[theme].background,
                      }
                    ]}
                    onPress={() => setNewTicketCategory(category.title)}
                  >
                    <IconSymbol 
                      name={category.icon} 
                      size={20} 
                      color={newTicketCategory === category.title ? 
                        EdenColors[theme].secondary : 
                        EdenColors[theme].textSecondary} 
                    />
                    <Text 
                      style={[
                        styles.categorySelectorText,
                        { 
                          color: newTicketCategory === category.title ? 
                            EdenColors[theme].secondary : 
                            EdenColors[theme].text 
                        }
                      ]}
                    >
                      {category.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: EdenColors[theme].text }]}>
                Sujet *
              </Text>
              
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    color: EdenColors[theme].text,
                    backgroundColor: EdenColors[theme].pastelSecondary,
                  }
                ]}
                placeholder="Entrez le sujet de votre demande"
                placeholderTextColor={EdenColors[theme].textSecondary}
                value={newTicketSubject}
                onChangeText={setNewTicketSubject}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: EdenColors[theme].text }]}>
                Message *
              </Text>
              
              <TextInput
                style={[
                  styles.formTextarea,
                  { 
                    color: EdenColors[theme].text,
                    backgroundColor: EdenColors[theme].textSecondary,
                  }
                ]}
                placeholder="Décrivez votre problème ou votre question en détail"
                placeholderTextColor={EdenColors[theme].textSecondary}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={newTicketMessage}
                onChangeText={setNewTicketMessage}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: EdenColors[theme].text }]}>
                Pièces jointes (optionnel)
              </Text>
              
              <TouchableOpacity 
                style={[
                  styles.attachmentButton,
                  { 
                    borderColor: EdenColors[theme].pastelPrimary,
                    backgroundColor: EdenColors[theme].background,
                  }
                ]}
              >
                <IconSymbol name="paperclip" size={20} color={EdenColors[theme].primary} />
                <Text style={[styles.attachmentButtonText, { color: EdenColors[theme].primary }]}>
                  Ajouter un fichier
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          <View style={styles.formActions}>
            <Text style={[styles.requiredFieldsNote, { color: EdenColors[theme].textSecondary }]}>
              * Champs obligatoires
            </Text>
            
            <EdenButton
              variant="primary"
              title="Envoyer"
              onPress={handleCreateTicket}
              disabled={!newTicketSubject.trim() || !newTicketMessage.trim() || !newTicketCategory}
            />
          </View>
        </EdenCard>
      </View>
      </>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].card }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Support
        </Text>
        
        <View style={styles.headerRight}>
          {activeTab === 'tickets' && (
            <TouchableOpacity 
              style={styles.newTicketButton}
              onPress={() => setNewTicketMode(true)}
            >
              <IconSymbol name="plus" size={24} color={EdenColors[theme].text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'help' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('help')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'help' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Aide & FAQ
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'tickets' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('tickets')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'tickets' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Mes tickets
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'help' ? (
        <>
          {/* Recherche */}
          <View style={[styles.searchContainer, { backgroundColor: EdenColors[theme].card }]}>
            <View 
              style={[
                styles.searchInputContainer, 
                { backgroundColor: EdenColors[theme].accent }
              ]}
            >
              <IconSymbol name="magnifyingglass" size={20} color={EdenColors[theme].textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: EdenColors[theme].text }]}
                placeholder="Search in FAQ..."
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
            {supportCategories.map((category) => renderSupportCategory(category))}
          </ScrollView>
          
          {/* FAQ */}
          <FlatList
            data={getFilteredFAQs()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderFAQ(item)}
            contentContainerStyle={styles.faqList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <IconSymbol name="questionmark.circle" size={48} color={EdenColors[theme].textSecondary} />
                <Text style={[styles.emptyText, { color: EdenColors[theme].textSecondary }]}>
                  Aucune FAQ trouvée
                </Text>
              </View>
            }
            ListFooterComponent={
              <View style={styles.contactSupport}>
                <Text style={[styles.contactSupportTitle, { color: EdenColors[theme].text }]}>
                  Vous n'avez pas trouvé de réponse ?
                </Text>
                
                <Text style={[styles.contactSupportText, { color: EdenColors[theme].textSecondary }]}>
                  Contactez notre équipe de support pour obtenir de l'aide personnalisée.
                </Text>
                
                <EdenButton
                  variant="primary"
                  title="Contacter le support"
                  onPress={() => {
                    setActiveTab('tickets');
                    setNewTicketMode(true);
                  }}
                  style={styles.contactSupportButton}
                />
              </View>
            }
          />
        </>
      ) : (
        <>
          {/* Liste des tickets */}
          <FlatList
            data={getFilteredTickets()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderTicket(item)}
            contentContainerStyle={styles.ticketsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <IconSymbol name="ticket" size={48} color={EdenColors[theme].textSecondary} />
                <Text style={[styles.emptyText, { color: EdenColors[theme].textSecondary }]}>
                  Vous n'avez pas encore de tickets
                </Text>
                
                <EdenButton
                  variant="primary"
                  title="Créer un ticket"
                  onPress={() => setNewTicketMode(true)}
                  style={styles.createTicketButton}
                />
              </View>
            }
          />
          
          {/* Bouton d'ajout */}
          <TouchableOpacity 
            style={[
              styles.addButton,
              { backgroundColor: EdenColors[theme].primary }
            ]}
            onPress={() => setNewTicketMode(true)}
          >
            <IconSymbol name="plus" size={24} color={EdenColors[theme].pastelPrimary} />
          </TouchableOpacity>
        </>
      )}
      
      {/* Modal de détail de ticket */}
      {selectedTicket && renderTicketDetail()}
      
      {/* Modal de création de ticket */}
      {newTicketMode && renderNewTicketForm()}
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
  headerRight: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newTicketButton: {
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
    maxHeight: 140,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
  },
  faqList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  faqCard: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  faqAnswerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  faqActions: {
    marginTop: 16,
  },
  faqHelpful: {
    fontSize: 12,
    marginBottom: 8,
  },
  faqActionButtons: {
    flexDirection: 'row',
  },
  faqActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  faqActionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  contactSupport: {
    marginTop: 24,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  contactSupportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactSupportText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  contactSupportButton: {
    minWidth: 200,
  },
  ticketsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  ticketCard: {
    marginBottom: 12,
    padding: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  ticketStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ticketStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  ticketPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: 12,
    marginRight: 8,
  },
  ticketCategory: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  ticketCategoryText: {
    fontSize: 10,
  },
  ticketResponseCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketResponseCountText: {
    fontSize: 12,
    marginLeft: 4,
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
    marginBottom: 24,
  },
  createTicketButton: {
    minWidth: 200,
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
  ticketDetailHeader: {
    marginBottom: 16,
  },
  ticketDetailSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ticketDetailInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ticketDetailDate: {
    fontSize: 12,
    marginRight: 8,
  },
  ticketDetailCategory: {
    fontSize: 12,
    marginRight: 8,
  },
  ticketDetailStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ticketDetailStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  ticketMessage: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  ticketMessageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  ticketResponses: {
    marginBottom: 24,
  },
  ticketResponsesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ticketResponse: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  ticketResponseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketResponseFrom: {
    fontSize: 14,
    fontWeight: '600',
  },
  ticketResponseDate: {
    fontSize: 12,
  },
  ticketResponseMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  replyContainer: {
    marginBottom: 24,
  },
  replyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  replyInput: {
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  replyButton: {
    alignSelf: 'flex-end',
  },
  ticketActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 0,
  },
  resolveButton: {
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    flex: 1,
    marginLeft: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  formInput: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  formTextarea: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categorySelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categorySelectorText: {
    fontSize: 14,
    marginLeft: 4,
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  attachmentButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  formActions: {
    padding: 24,
    paddingTop: 0,
  },
  requiredFieldsNote: {
    fontSize: 12,
    marginBottom: 12,
  },
});