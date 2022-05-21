import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import pt, { width } from "../const/unit";
import { fetchUsers, login } from "../redux/actions";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log("dd");

    try {
      const res = await axios.post(
        "http://192.168.43.113:5500/api/auth/login",
        { email, password }
      );

      Alert.alert("Login Successfull", "", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      const { isAdmin } = res.data;
      dispatch(login({ ...res.data }));

      if (isAdmin) {
        dispatch(fetchUsers());
        navigation.navigate("UserList");
      } else {
        navigation.navigate("User");
      }

      setEmail("");
      setPassword("");
    } catch (e) {
      Alert.alert("Login Unsuccessfull", e?.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputgrp}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputgrp}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <Button
          variant="contained"
          size="lg"
          title="Login"
          fullWidth
          onPress={handleSubmit}
        />
      </TouchableOpacity>
    </View>
  );
}

export function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Error", "Please fill the required fields .", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    const config = {
      method: "POST",
      url: "http://192.168.43.113:5500/api/auth/register",
      data: { name, email, password },
    };

    try {
      const res = await axios(config);
      Alert.alert("Registeration Successfully", "Please Login now", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
          title="Signup"
          fullWidth
          onPress={handleSubmit}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  inputgrp: {
    paddingHorizontal: 10,
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
    color: "black",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
});
