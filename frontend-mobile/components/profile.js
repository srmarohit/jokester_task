import React, { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { width } from "../const/unit";
import EditProfile from "./EditProfile";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile({ data, navigation }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState({});
  const [imgURI, setImgURI] = useState("");

  const { access_token } = useSelector((state) => state.userReducer?.user);

  const options = {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };

  const uploadImg = async () => {
    const imageRes = await launchImageLibrary(options);
    console.log(imageRes?.assets[0]?.uri);
    setImgURI(imageRes?.assets[0].url);
  };

  const delUser = async () => {
    const config = {
      method: "DELETE",
      url: "http://192.168.43.113:5500/api/user/" + user._id,
      headers: {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios(config);
      console.log(res.data);
      Alert.alert("Deleted !", "User Deleted Successfully", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      navigation.navigate("UserList");
    } catch (e) {
      console.log(e);
      Alert.alert("Error !", "Only Admin member can delete !", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  useEffect(() => {
    setUser(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>Name : </Text>
        <Text style={styles.val}>{user?.name}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Email : </Text>
        <Text style={styles.val}>{user?.email}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Password : </Text>
        <Text style={styles.val}>{user?.password}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.val}>{user?.role}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Profile Pic : </Text>
        <View>
          <Image
            source={{ uri: imgURI || "https://joeschmoe.io/api/v1/jess" }}
            style={styles.image}
          />
          <Button title="upload" onPress={uploadImg} />
        </View>
        {/**require("../assets/icon.png") */}
      </View>

      <View style={styles.action}>
        <Text style={styles.edit} onPress={() => setShowEditModal(true)}>
          Edit
        </Text>
        <Text style={styles.del} onPress={delUser}>
          Delete
        </Text>
      </View>

      <EditProfile
        setShowEditModal={setShowEditModal}
        showEditModal={showEditModal}
        user={user}
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 25,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: width / 1.25,
  },

  info: {
    display: "flex",
    alignItems: "flex-start",
    //justifyContent: "center",
    padding: 5,
  },

  label: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 0,
    color: "#ccc",
  },

  val: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },

  image: {
    marginVertical: 10,
    width: 70,
    height: 50,
    borderRadius: 50,
  },

  action: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },

  edit: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "green",
    color: "white",
    fontSize: 15,
    width: width / 3,
    textAlign: "center",
    borderRadius: 7,
    marginEnd: 7,
  },

  del: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "red",
    color: "white",
    fontSize: 15,
    width: width / 3,
    textAlign: "center",
    borderRadius: 7,
    marginEnd: 7,
  },
});
