import { View, Text, ScrollView, Image, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButtom from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please Fill In All Fields");
    }
    setIsSubmitting(true);
    try {
      const results = createUser(form.email, form.password, form.username);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[135px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log into Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) =>
              setForm({ ...form, username: e.nativeEvent.text })
            }
            otherStyles="mt-10 "
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({ ...form, email: e.nativeEvent.text })
            }
            otherStyles="mt-7 "
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({ ...form, password: e.nativeEvent.text })
            }
            otherStyles="mt-7 "
          />
          <CustomButtom
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an Account ?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
