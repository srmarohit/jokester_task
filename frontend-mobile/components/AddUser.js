import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { height, width } from "../const/unit";
import { login } from "../redux/actions";

export default function AddUser({ setShowModal, showModal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const config = {
      method: "POST",
      url: "http://192.168.43.113:5500/api/auth/register",
      data: { name, email, password },
    };

    const res = await axios(config);

    if (res.data) {
      console.log(res.data);
      setName("");
      setEmail("");
      setPassword(" ");
      setShowModal(false);
      Alert.alert("User Created !", "User  is created Successfully", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      console.log(e?.message);
      Alert.alert("Error!", e?.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!showModal);
      }}
    >
      <View style={styles.container}>
        <View style={styles.inputgrp}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputgrp}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputgrp}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity>
          <Button
            variant="contained"
            size="lg"
            title="Add User"
            style={{ width: width / 1.3, marginTop: 50 }}
            fullWidth
            onPress={handleSubmit}
          />
        </TouchableOpacity>
        <Text style={styles.cancel} onPress={() => setShowModal(false)}>
          X
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // position: "fixed",
    // left: -25,
    backgroundColor: "#000",
    width: width,
    height: height,
  },

  inputgrp: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },

  label: {
    fontSize: 12,
    fontWeight: "400",
    margin: 5,
    color: "#ccc",
    marginBottom: 7,
  },

  input: {
    width: "100%",
    height: 50,
    paddingVertical: 7,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "white",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },

  cancel: {
    position: "absolute",
    top: 50,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
