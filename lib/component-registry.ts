import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/data/components/Navbar/Navbar';
import { EnhancedCodePreview } from '@/components/docs/CodePreview';
import { ThemeSwitcher } from '@/components/docs/ThemeSwitcher';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { ResponsiveComponentPreview } from '@/components/docs/ComponentsShowcase';
import SocialLinks from '@/data/components/social-share/SocialShare';
import AnimatedButton from '@/data/components/animated-button/AnimatedButton';
import { IconPlus, IconSettings } from '@tabler/icons-react';

// Define the registry of components that can be used in MDX
export const componentsRegistry = {
  // UI Components
  Button,
  Card,
  Navbar,
  SocialLinks,
  AnimatedButton, 
  // ... other components
  ThemeSwitcher,
  IconPlus,
  IconSettings,
  // Documentation components
  EnhancedCodePreview,
  ComponentPreview,
  ResponsiveComponentPreview
};

