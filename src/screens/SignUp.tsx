import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import colors from "../styles/colors";
import useAuth from "../hooks/useAuth";
import fonts from '../styles/fonts'

const SignUp = () => {
  const { signInWithGoogle, user } = useAuth();

  const onSignIn = async () => {
    if (!user) {
      await signInWithGoogle();
    }
  };

  return (
    <SafeAreaView style={styles.signUpScreen}>
      <View style={styles.titleContainer}>
        <Text style={styles.teamTitle}>Funds Manager</Text>
        <Text style={styles.descriptionText}>Controle seus gastos</Text>
      </View>
      <TouchableOpacity onPress={onSignIn} style={styles.googleButton}>
        <AntDesign name="google" size={24} color={colors.red} />
        <Text style={styles.buttonText}>Entrar com o Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'space-around',
    backgroundColor: colors.background,
  },
  titleContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
  },
  teamTitle: {
    fontFamily: fonts.heading,
    fontSize: 40,
    color: colors.heading,
  },
  descriptionText: {
    fontFamily: fonts.text,
    fontSize: 20,
    color: colors.heading,
  },
  googleButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%',
    backgroundColor: colors.shape,
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: fonts.text,
    fontSize: 20,
    color: colors.red
  }
});

export default SignUp;
