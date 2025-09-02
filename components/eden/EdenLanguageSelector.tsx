import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { useColorScheme } from '@/hooks/useColorScheme';

type Language = 'fr' | 'en';

type EdenLanguageSelectorProps = {
  currentLanguage: Language;
  onChangeLanguage: (language: Language) => void;
  compact?: boolean;
};

export function EdenLanguageSelector({
  currentLanguage,
  onChangeLanguage,
  compact = false,
}: EdenLanguageSelectorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colorScheme as 'light' | 'dark';
  
  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            compact && styles.compactButton,
            language.code === currentLanguage && styles.activeButton,
            language.code === currentLanguage && { backgroundColor: EdenColors[theme].primary },
          ]}
          onPress={() => onChangeLanguage(language.code)}
        >
          <Text
            style={[
              styles.languageText,
              compact && styles.compactText,
              language.code === currentLanguage && styles.activeText,
              { color: language.code === currentLanguage ? '#FFFFFF' : EdenColors[theme].textSecondary },
            ]}
          >
            {language.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  compactContainer: {
    borderRadius: 8,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  activeButton: {
    backgroundColor: EdenColors.light.primary,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  compactText: {
    fontSize: 12,
  },
  activeText: {
    color: '#FFFFFF',
  },
});