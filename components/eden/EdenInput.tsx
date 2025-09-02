import React from 'react';
import { StyleSheet, TextInput, View, Text, TextInputProps } from 'react-native';
import { EdenColors } from '@/constants/EdenColors';
import { EdenTheme } from '@/constants/EdenTheme';
import { useColorScheme } from '@/hooks/useColorScheme';

type EdenInputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function EdenInput({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  ...otherProps
}: EdenInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colorScheme as 'light' | 'dark';
  
  return (
    <View style={styles.container}>
      {label && (
        <Text 
          style={[
            EdenTheme.typography.bodySmall, 
            { color: EdenColors[theme].textSecondary, marginBottom: 4 }
          ]}
        >
          {label}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={[
            EdenTheme.components.input(theme),
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={EdenColors[theme].textSecondary}
          {...otherProps}
        />
        
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      
      {error && (
        <Text style={[EdenTheme.typography.caption, styles.errorText]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  inputWithLeftIcon: {
    paddingLeft: 44,
  },
  inputWithRightIcon: {
    paddingRight: 44,
  },
  inputError: {
    borderColor: EdenColors.light.error,
    borderWidth: 1,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  errorText: {
    color: EdenColors.light.error,
    marginTop: 4,
  },
});