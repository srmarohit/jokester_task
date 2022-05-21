import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../../components/AddUser";
import Profile from "../../components/profile";
import { width } from "../../const/unit";
import { fetchUsers } from "../../redux/actions";

export default function UserList({ navigation }) {
  const [showModal, setShowModal] = useState(false);

  const { user, users } = useSelector((state) => state?.userReducer);

  const [usersList, setUsersList] = useState([]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    navigation.navigate("Auth");
  };

  useEffect(() => {
    const loadUsers = async () => {
      console.log(user._id);
      const config = {
        method: "GET",
        url: "http://192.168.43.113:5500/api/user/",
        headers: {
          authorization: `Bearer ${user.access_token}`,
        },
      };

      try {
        const res = await axios(config);
        console.log(res.data);
        dispatch(fetchUsers(res.data));
        setUsersList(res.data || []);
      } catch (e) {
        console.log(e);
      }
    };

    loadUsers();
  }, [users]);

  // useEffect(() => {
  //   setUsersList(users);
  // }, [users.length]);

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Text style={styles.logout} onPress={handleLogout}>
          Logout
        </Text>
        <Text style={styles.addUser} onPress={() => setShowModal(true)}>
          Add User
        </Text>
      </View>
      <ScrollView style={{ marginTop: 100 }}>
        {usersList?.map((user) => (
          <Profile
            key={user._id}
            admin={user.isAdmin}
            navigation={navigation}
            data={user}
          />
        ))}
      </ScrollView>

      <AddUser setShowModal={setShowModal} showModal={showModal} />
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

  btnContainer: {
    position: "absolute",
    top: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  logout: {
    backgroundColor: "brown",
    color: "white",
    borderRadius: 7,
    fontSize: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginEnd: 12,
  },

  addUser: {
    backgroundColor: "blue",
    color: "white",
    borderRadius: 7,
    fontSize: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginEnd: 12,
  },
});
