import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { IconSymbol } from '@/components/ui/IconSymbol';

type EdenThemeToggleProps = {
  isDarkMode: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
};

export function EdenThemeToggle({
  isDarkMode,
  onToggle,
  size = 'medium',
}: EdenThemeToggleProps) {
  // Déterminer la taille du toggle en fonction du paramètre size
  const getSize = () => {
    switch (size) {
      case 'small':
        return { container: 48, icon: 16 };
      case 'large':
        return { container: 64, icon: 24 };
      case 'medium':
      default:
        return { container: 56, icon: 20 };
    }
  };

  const sizeValues = getSize();

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.container,
        { 
          width: sizeValues.container,
          height: sizeValues.container / 2,
          backgroundColor: isDarkMode ? EdenColors.dark.background : EdenColors.light.background,
          borderColor: isDarkMode ? EdenColors.dark.divider : EdenColors.light.divider,
        },
      ]}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.toggle,
          { 
            width: sizeValues.container / 2 - 4,
            height: sizeValues.container / 2 - 4,
            backgroundColor: isDarkMode ? EdenColors.dark.primary : EdenColors.light.primary,
            transform: [
              { translateX: isDarkMode ? sizeValues.container / 2 - 2 : 0 },
            ],
          },
        ]}
      >
        <IconSymbol
          name={isDarkMode ? 'moon.fill' : 'sun.max.fill'}
          size={sizeValues.icon}
          color="#FFFFFF"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 2,
  },
  toggle: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});