import React, { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { EdenButton } from '@/components/eden/EdenButton';
import { EdenInput } from '@/components/eden/EdenInput';
import { EdenLanguageSelector } from '@/components/eden/EdenLanguageSelector';
import { EdenThemeToggle } from '@/components/eden/EdenThemeToggle';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

type Language = 'fr' | 'en';

export default function LoginScreen() {
  // États pour gérer les entrées utilisateur et les préférences
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoading, setIsLoading] = useState(false);

  // Détermine le thème actuel
  const theme = isDarkMode ? 'dark' : 'light';

  // Fonction de connexion
  const handleLogin = () => {
    setIsLoading(true);
    // Simuler une connexion
    setTimeout(() => {
      setIsLoading(false);
      // Navigation vers le dashboard sans afficher le chemin
      router.replace({pathname: '/mockups/DashboardScreen', params: {}});
    }, 1500);
  };

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fonction pour changer la langue
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Textes traduits
  const translations = {
    fr: {
      welcome: 'Bienvenue',
      subtitle: 'Connectez-vous pour continuer',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Se connecter',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas encore de compte ?',
      register: 'Créer un compte',
    },
    en: {
      welcome: 'Welcome',
      subtitle: 'Sign in to continue',
      email: 'Email',
      password: 'Password',
      login: 'Sign In',
      forgotPassword: 'Forgot password?',
      noAccount: 'Don\'t have an account?',
      register: 'Create an account',
    },
  };

  // Textes dans la langue actuelle
  const t = translations[language];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: EdenColors[theme].background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* En-tête avec sélecteur de langue et thème */}
      <View style={styles.header}>
        <EdenLanguageSelector 
          currentLanguage={language} 
          onChangeLanguage={changeLanguage} 
        />
        <EdenThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        {/* Titre */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: EdenColors[theme].text }]}>{t.welcome}</Text>
          <Text style={[styles.subtitle, { color: EdenColors[theme].textSecondary }]}>
            {t.subtitle}
          </Text>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
          <EdenInput
            label={t.email}
            value={email}
            onChangeText={setEmail}
            placeholder="example@eden.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="envelope"
          />
          
          <EdenInput
            label={t.password}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            leftIcon="lock"
          />
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: EdenColors[theme].primary }]}>
              {t.forgotPassword}
            </Text>
          </TouchableOpacity>
          
          <EdenButton 
            title={t.login} 
            onPress={handleLogin} 
            loading={isLoading}
            style={styles.loginButton}
          />
        </View>

        {/* Lien d'inscription */}
        <View style={styles.registerContainer}>
          <Text style={[styles.noAccountText, { color: EdenColors[theme].textSecondary }]}>
            {t.noAccount}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.registerText, { color: EdenColors[theme].primary }]}>
              {t.register}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    marginTop: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  noAccountText: {
    marginRight: 5,
  },
  registerText: {
    fontWeight: 'bold',
  },
});