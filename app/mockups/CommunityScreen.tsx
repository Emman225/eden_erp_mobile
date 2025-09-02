import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { EdenCommonStyles } from '@/constants/EdenCommonStyles';
import { EdenCard } from '@/components/eden/EdenCard';
import { EdenButton } from '@/components/eden/EdenButton';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Post = {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  date: string;
  isLiked?: boolean;
};

type CommunityMember = {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  isOnline?: boolean;
};

export default function CommunityScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'members'>('feed');
  const [postContent, setPostContent] = useState('');
  
  const theme = isDarkMode ? 'dark' : 'light';
  
  // Données fictives pour la démo
  const posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Pasteur Thomas',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        role: 'Pasteur',
      },
      content: 'Chers membres de la communauté Eden, nous sommes heureux de vous annoncer que notre prochain culte spécial aura lieu ce dimanche. Venez nombreux pour célébrer ensemble !',
      likes: 24,
      comments: 5,
      date: 'Il y a 2 heures',
      isLiked: true,
    },
    {
      id: '2',
      author: {
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        role: 'Leader',
      },
      content: 'Merci à tous ceux qui ont participé à l\'organisation de la retraite spirituelle du weekend dernier. Ce fut un moment béni pour tous !',
      images: [
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
        'https://images.unsplash.com/photo-1519750783826-e2420f4d687f',
      ],
      likes: 18,
      comments: 7,
      date: 'Hier',
    },
    {
      id: '3',
      author: {
        name: 'Jean Dubois',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      },
      content: 'Je cherche des volontaires pour aider à l\'organisation du prochain événement jeunesse. Si vous êtes intéressés, merci de me contacter !',
      likes: 12,
      comments: 15,
      date: 'Il y a 2 jours',
    },
  ];
  
  const members: CommunityMember[] = [
    {
      id: '1',
      name: 'Pasteur Thomas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      role: 'Pasteur',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Marie Dupont',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Leader',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Jean Dubois',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'Membre',
      isOnline: false,
    },
    {
      id: '4',
      name: 'Sophie Leclerc',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Leader',
      isOnline: true,
    },
    {
      id: '5',
      name: 'Michel Martin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      role: 'Diacre',
      isOnline: false,
    },
    {
      id: '6',
      name: 'Claire Moreau',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      role: 'Membre',
      isOnline: false,
    },
    {
      id: '7',
      name: 'Paul Bernard',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      role: 'Membre',
      isOnline: true,
    },
  ];
  
  const handleLikePost = (postId: string) => {
    // Logique pour aimer un post
  };
  
  const handleSubmitPost = () => {
    if (postContent.trim() === '') return;
    // Logique pour soumettre un nouveau post
    setPostContent('');
  };
  
  const renderPost = (post: Post) => (
    <EdenCard 
      elevation="small"
      style={styles.postCard}
    >
      <View style={styles.postHeader}>
        <View style={styles.authorContainer}>
          {post.author.avatar ? (
            <Image 
              source={{ uri: post.author.avatar }} 
              style={styles.authorAvatar} 
              resizeMode="cover"
            />
          ) : (
            <View 
              style={[
                styles.authorAvatarPlaceholder,
                { backgroundColor: EdenColors[theme].primary + '40' }
              ]}
            >
              <Text 
                style={[
                  styles.authorAvatarPlaceholderText,
                  { color: EdenColors[theme].primary }
                ]}
              >
                {post.author.name.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          )}
          
          <View style={styles.authorInfo}>
            <Text style={[styles.authorName, { color: EdenColors[theme].text }]}>
              {post.author.name}
            </Text>
            
            {post.author.role && (
              <View 
                style={[
                  styles.roleBadge,
                  { backgroundColor: EdenColors[theme].accent + '30' }
                ]}
              >
                <Text 
                  style={[
                    styles.roleBadgeText,
                    { color: EdenColors[theme].accent }
                  ]}
                >
                  {post.author.role}
                </Text>
              </View>
            )}
            
            <Text style={[styles.postDate, { color: EdenColors[theme].textSecondary }]}>
              {post.date}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.postOptionsButton}>
          <IconSymbol name="ellipsis" size={20} color={EdenColors[theme].textSecondary} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.postContent, { color: EdenColors[theme].text }]}>
        {post.content}
      </Text>
      
      {post.images && post.images.length > 0 && (
        <View style={styles.postImagesContainer}>
          {post.images.map((image, index) => (
            <Image 
              key={index}
              source={{ uri: image }} 
              style={[
                styles.postImage,
                post.images && post.images.length === 1 ? styles.postImageSingle : null
              ]} 
              resizeMode="cover"
            />
          ))}
        </View>
      )}
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={styles.postActionButton}
          onPress={() => handleLikePost(post.id)}
        >
          <IconSymbol 
            name={post.isLiked ? "heart.fill" : "heart"} 
            size={20} 
            color={post.isLiked ? EdenColors[theme].error : EdenColors[theme].textSecondary} 
          />
          <Text 
            style={[
              styles.postActionText,
              { 
                color: post.isLiked ? 
                  EdenColors[theme].error : 
                  EdenColors[theme].textSecondary 
              }
            ]}
          >
            {post.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.postActionButton}>
          <IconSymbol name="chat.bubble" size={20} color={EdenColors[theme].textSecondary} />
          <Text style={[styles.postActionText, { color: EdenColors[theme].textSecondary }]}>
            {post.comments}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.postActionButton}>
          <IconSymbol name="square.and.arrow.up" size={20} color={EdenColors[theme].textSecondary} />
          <Text style={[styles.postActionText, { color: EdenColors[theme].textSecondary }]}>
            Partager
          </Text>
        </TouchableOpacity>
      </View>
    </EdenCard>
  );
  
  const renderMember = (member: CommunityMember) => (
    <TouchableOpacity style={styles.memberItem}>
      <View style={styles.memberAvatarContainer}>
        {member.avatar ? (
          <Image 
            source={{ uri: member.avatar }} 
            style={styles.memberAvatar} 
            resizeMode="cover"
          />
        ) : (
          <View 
            style={[
              styles.memberAvatarPlaceholder,
              { backgroundColor: EdenColors[theme].primary + '40' }
            ]}
          >
            <Text 
              style={[
                styles.memberAvatarPlaceholderText,
                { color: EdenColors[theme].primary }
              ]}
            >
              {member.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        )}
        
        {member.isOnline && (
          <View 
            style={[
              styles.onlineIndicator,
              { backgroundColor: EdenColors[theme].accent }
            ]}
          />
        )}
      </View>
      
      <View style={styles.memberInfo}>
        <Text style={[styles.memberName, { color: EdenColors[theme].text }]}>
          {member.name}
        </Text>
        
        {member.role && (
          <Text style={[styles.memberRole, { color: EdenColors[theme].textSecondary }]}>
            {member.role}
          </Text>
        )}
      </View>
      
      <TouchableOpacity 
        style={[
          styles.messageButton,
          { backgroundColor: EdenColors[theme].primary + '20' }
        ]}
      >
        <IconSymbol name="chat.bubble.fill" size={16} color={EdenColors[theme].primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  return (
    <>
    <View style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={[EdenCommonStyles.navigationHeader, { backgroundColor: EdenColors[theme].accent }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
        
        <Text style={[EdenTheme.typography.h2, { color: EdenColors[theme].text }]}>
          Communauté
        </Text>
        
        <TouchableOpacity style={styles.optionsButton}>
          <IconSymbol name="bell" size={24} color={EdenColors[theme].text} />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'feed' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('feed')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'feed' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Fil d'actualité
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'members' && { 
              borderBottomColor: EdenColors[theme].primary,
              borderBottomWidth: 2,
            }
          ]}
          onPress={() => setActiveTab('members')}
        >
          <Text 
            style={[
              styles.tabText,
              { color: activeTab === 'members' ? EdenColors[theme].primary : EdenColors[theme].textSecondary }
            ]}
          >
            Membres
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'feed' ? (
        <>
          {/* Créer un post */}
          <EdenCard 
            elevation="small"
            style={styles.createPostCard}
          >
            <View style={styles.createPostHeader}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }} 
                style={styles.currentUserAvatar} 
                resizeMode="cover"
              />
              
              <TextInput
                style={[
                  styles.postInput,
                  { 
                    color: EdenColors[theme].text,
                    backgroundColor: EdenColors[theme].accent,
                  }
                ]}
                placeholder="Partagez quelque chose avec la communauté..."
                placeholderTextColor={EdenColors[theme].textSecondary}
                multiline
                value={postContent}
                onChangeText={setPostContent}
              />
            </View>
            
            <View style={styles.createPostActions}>
              <View style={styles.createPostButtons}>
                <TouchableOpacity style={styles.createPostButton}>
                  <IconSymbol name="photo" size={20} color={EdenColors[theme].primary} />
                  <Text style={[styles.createPostButtonText, { color: EdenColors[theme].primary }]}>
                    Photo
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.createPostButton}>
                  <IconSymbol name="video" size={20} color={EdenColors[theme].primary} />
                  <Text style={[styles.createPostButtonText, { color: EdenColors[theme].primary }]}>
                    Vidéo
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.createPostButton}>
                  <IconSymbol name="calendar" size={20} color={EdenColors[theme].primary} />
                  <Text style={[styles.createPostButtonText, { color: EdenColors[theme].primary }]}>
                    Événement
                  </Text>
                </TouchableOpacity>
              </View>
              
              <EdenButton
                variant="primary"
                title="Publier"
                onPress={handleSubmitPost}
                disabled={postContent.trim() === ''}
              />
            </View>
          </EdenCard>
          
          {/* Liste des posts */}
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderPost(item)}
            contentContainerStyle={styles.postsList}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          {/* Recherche de membres */}
          <View style={[styles.searchContainer, { backgroundColor: EdenColors[theme].accent }]}>
            <View 
              style={[
                styles.searchInputContainer, 
                { backgroundColor: EdenColors[theme].accent }
              ]}
            >
              <IconSymbol name="magnifyingglass" size={20} color={EdenColors[theme].textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: EdenColors[theme].text }]}
                placeholder="Rechercher un membre..."
                placeholderTextColor={EdenColors[theme].textSecondary}
              />
            </View>
          </View>
          
          {/* Liste des membres */}
          <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderMember(item)}
            contentContainerStyle={styles.membersList}
            showsVerticalScrollIndicator={false}
          />
        </>
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
  createPostCard: {
    margin: 16,
    padding: 16,
  },
  createPostHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInput: {
    flex: 1,
    minHeight: 80,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  createPostButtons: {
    flexDirection: 'row',
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  createPostButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  postsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postCard: {
    marginBottom: 16,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorAvatarPlaceholderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorInfo: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 8,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
  },
  postOptionsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 16,
  },
  postImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  postImage: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    marginRight: '2%',
    marginBottom: 8,
  },
  postImageSingle: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  postActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  postActionText: {
    marginLeft: 6,
    fontSize: 14,
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
  membersList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  memberAvatarContainer: {
    position: 'relative',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 16,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
  },
  memberRole: {
    fontSize: 14,
    marginTop: 2,
  },
  messageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});