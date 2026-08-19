import React, { useEffect, useRef } from 'react';
import { Animated, type ViewProps } from 'react-native';

interface EntradaProps extends ViewProps {
  retraso?: number;
}

export default function Entrada({
  retraso = 0,
  style,
  children,
  ...rest
}: EntradaProps) {
  const opacidad = useRef(new Animated.Value(0)).current;
  const traslacion = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    const animacion = Animated.parallel([
      Animated.timing(opacidad, {
        toValue: 1,
        duration: 350,
        delay: retraso,
        useNativeDriver: true,
      }),
      Animated.timing(traslacion, {
        toValue: 0,
        duration: 350,
        delay: retraso,
        useNativeDriver: true,
      }),
    ]);
    animacion.start();
    return () => animacion.stop();
  }, [opacidad, traslacion, retraso]);

  return (
    <Animated.View
      style={[
        { opacity: opacidad, transform: [{ translateY: traslacion }] },
        style,
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}