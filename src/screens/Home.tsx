import React from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import useAuth from "../hooks/useAuth";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

const HomePage: React.FC = () => {

  const { signOut } = useAuth()

  const getDate = (date: Date) => {

    let dia = date.getDate().toString();
    let diaF = dia.length === 1 ? "0" + dia : dia;
    let mes = (date.getMonth() + 1).toString();
    let mesF = mes.length === 1 ? "0" + mes : mes;
    let anoF = date.getFullYear();

    return diaF + " / " + mesF + " / " + anoF;
  };

  return (
    <SafeAreaView style={styles.homePage}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gastos totais</Text>
        <Text style={styles.headerValue}>R$ 100</Text>
        <View style={styles.statusContainer}>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>Pagos</Text>
            <Text style={styles.statusValue}>R$ 100</Text>
          </View>
          <View style={styles.status}>
            <Text style={styles.statusTitle}>A pagar</Text>
            <Text style={styles.statusValue}>R$ 100</Text>
          </View>
        </View>
      </View>
      <View style={styles.Lists}>
        <ScrollView>
          <View style={styles.categoriesList}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Categorias</Text>
            </View>
          </View>
          <View style={styles.vencimentsList}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Próximos a vencer</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <RectButton style={styles.addCategoryButton} onPress={signOut}>
          <Text style={styles.buttonText}>Adicionar{"\n"}Categoria</Text>
        </RectButton>
        <RectButton style={styles.removeCategoryButton}>
          <Text style={styles.buttonText}>Remover{"\n"}Categoria</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paidLabel: {
    marginRight: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_dark,
  },
  checkBoxContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  warning: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  warningText: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
    textAlign: "center",
  },
  homePage: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  listHeader: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    height: 30,
    paddingHorizontal: "13%",
    justifyContent: "space-between",
  },
  listHeaderTitle: {
    color: colors.body_dark,
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  header: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 30,
    color: colors.body_dark,
    fontFamily: fonts.heading,
  },
  headerValue: {
    fontSize: 20,
    color: colors.body_dark,
    fontFamily: fonts.complement,
  },
  addCategoryButton: {
    width: "35%",
    padding: 5,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.green,
    textAlign: "center",
  },
  removeCategoryButton: {
    width: "35%",
    padding: 5,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.red,
    textAlign: "center",
  },
  buttons: {
    margin: 10,
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  categoriesList: {
    width: "100%",
  },
  vencimentsList: {
    width: "100%",
    marginTop: 20,
  },
  Lists: {
    width: "100%",
    height: "50%",
  },
  buttonText: {
    color: colors.green_light,
    fontFamily: fonts.heading,
    fontSize: 16,
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    fontSize: 24,
    color: colors.body_dark,
    fontFamily: fonts.heading,
  },
  statusValue: {
    fontSize: 16,
    color: colors.body_dark,
    fontFamily: fonts.complement,
  },
});

export default HomePage;
