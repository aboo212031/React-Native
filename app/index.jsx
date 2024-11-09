import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts } from "expo-font";

import "../global.css";


export default function App() {
  return (
    <View className= "flex-1 items-center justify-center" >
      <Text className= "text-3xl font-pblack" >Aora !!</Text>
      <StatusBar style="auto" />
      <Link href="/home" > Go To Home </Link>
    </View>
  );
}
