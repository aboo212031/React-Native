import { View, FlatList, Image, Text } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";

import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { getLikedPostsByUserOnly } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useFocusEffect } from "expo-router";
import { images } from "../../constants";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { data: likedPosts, reFetch } = useAppwrite(() =>
    getLikedPostsByUserOnly(user.$id)
  );

  const searchHandler = async (query) => {
    let result = posts.filter((o) => o.title.includes(query));
    setFilteredPosts(result);
  };

  useFocusEffect(
    useCallback(() => {
      reFetch();
    }, [])
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredPosts.length ? filteredPosts : likedPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} user={user} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="mt-6 mb-8">
              <SearchInput searchHandler={searchHandler} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center px-4 h-[50vh]">
            <Image
              source={images.empty}
              className="w-[270px] h-[215px]"
              resizeMode="contain"
            />
            <Text className="text-xl font-psemibold text-white text-center mt-2">
              No Videos Found
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
              No Vidoes Liked By User
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
