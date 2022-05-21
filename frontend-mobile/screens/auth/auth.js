import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Login, Signup } from "../../components/auth";
import pt from "../../const/unit";

export default function Auth({ navigation }) {
  const [login, setLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={
            login
              ? {
                  ...styles.heading,
                  backgroundColor: "black",
                  color: "white",
                }
              : styles.heading
          }
          onPress={() => setLogin(true)}
        >
          Login
        </Text>
        <Text
          style={
            !login
              ? {
                  ...styles.heading,
                  backgroundColor: "black",
                  color: "white",
                }
              : styles.heading
          }
          onPress={() => setLogin(false)}
        >
          SignUp
        </Text>
      </View>
      <View>
        {login ? (
          <Login navigation={navigation} />
        ) : (
          <Signup navigation={navigation} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  heading: {
    backgroundColor: "#ccc",
    color: "white",
    borderRadius: 7,
    fontSize: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginEnd: 12,
  },
});
