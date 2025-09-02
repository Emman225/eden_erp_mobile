import React from 'react';
import { StyleSheet, View, ViewProps, TouchableOpacity } from 'react-native';
import { EdenTheme } from '@/constants/EdenTheme';
import { useColorScheme } from '@/hooks/useColorScheme';

type EdenCardProps = ViewProps & {
  onPress?: () => void;
  elevation?: 'small' | 'medium' | 'large';
};

export function EdenCard({
  children,
  style,
  onPress,
  elevation = 'medium',
  ...otherProps
}: EdenCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colorScheme as 'light' | 'dark';
  
  // Obtenir le style d'ombre en fonction de l'élévation
  const getShadowStyle = () => {
    return EdenTheme.shadows[theme][elevation];
  };
  
  // Style de base de la carte
  const cardStyle = [
    EdenTheme.components.card(theme),
    getShadowStyle(),
    style,
  ];
  
  // Rendre la carte comme un bouton si onPress est fourni
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.9}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  // Sinon, rendre comme une vue simple
  return (
    <View style={cardStyle} {...otherProps}>
      {children}
    </View>
  );
}