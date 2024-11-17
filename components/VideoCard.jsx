import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateLikePosts } from "../lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    liked,
    creator: { username, avatar },
  },
  user,
}) => {
  const [play, setPlay] = useState(false);
  const [heart, setHeart] = useState(liked);

  const likeVideo = async () => {
    await updateLikePosts(!heart, user.$id, $id);
    setHeart(!heart);
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className=" flex-row gap-3 items-start">
        <View className="flex-1 flex-row justify-center items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg "
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2 ">
          <TouchableOpacity onPress={likeVideo}>
            <AntDesign
              name={heart ? "heart" : "hearto"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View className="pt-2 ">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.STRETCH}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-lg mt-3 justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },
});
