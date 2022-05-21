import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../components/profile";
import { width } from "../../const/unit";
import { logout } from "../../redux/actions";

export default function User({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userReducer?.user);
  //console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Auth");
  };

  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Profile data={user} />
      <View style={styles.logoutContiner}>
        <Text style={styles.logout} onPress={handleLogout}>
          Log Out
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },

  logoutContiner: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 0,
    // left: "30%",
    width: width,
  },

  logout: {
    backgroundColor: "brown",
    textAlign: "center",
    color: "white",
    borderRadius: 7,
    fontSize: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginEnd: 12,
  },
});
