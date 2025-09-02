import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

// Define a mapping of custom icon names to valid SF Symbols
const SF_SYMBOL_MAPPING: Record<string, string> = {
  'calendar': 'calendar',
  'play.fill': 'play.fill',
  'person.3.fill': 'person.3.fill',
  'bubble.left.and.bubble.right.fill': 'bubble.left.and.bubble.right.fill',
  'heart.fill': 'heart.fill',
  'checklist': 'checklist',
  'questionmark.circle.fill': 'questionmark.circle.fill',
  'xmark': 'xmark',
  'ellipsis.vertical': 'ellipsis',
  'line.3.horizontal': 'line.horizontal.3',
  'person.fill': 'person.fill',
  'rectangle.portrait.and.arrow.right': 'rectangle.portrait.and.arrow.right',
  'arrow.clockwise': 'arrow.clockwise',
  'globe': 'globe',
  'sun.max.fill': 'sun.max.fill',
  'moon.fill': 'moon.fill',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // Use the mapped SF Symbol if available, or fallback to a default
  const symbolName = SF_SYMBOL_MAPPING[name] || name;
  
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={symbolName as any} // Type assertion to bypass type checking
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
