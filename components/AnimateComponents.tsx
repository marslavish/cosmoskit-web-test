import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Text,
  TextProps
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const AnimateBox = motion<BoxProps>(Box);
export const AnimateFlex = motion<FlexProps>(Flex);
export const AnimateText = motion<TextProps>(Text);
export const AnimateButton = motion<ButtonProps>(Button);
