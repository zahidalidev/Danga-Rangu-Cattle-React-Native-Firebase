import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AppTextInput from "../components/common/AppTextInput"
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import { Restart } from "fiction-expo-restart"

// components
import { GetAllBlogs } from "../services/BlogServices";
import Card from '../components/Card';

// images
import logo from "../../assets/images/logo.png"

// config
import Colors from "../config/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/common/LoadingModal';

const width = Dimensions.get('window').width

function HomeScreen(props) {

    let [allPosts, setAllPosts] = useState([])
    let [activityIndic, setActivityIndic] = useState()
    let [searchValue, setSearchValue] = useState()

    const getPosts = async () => {
        try {
            setActivityIndic(true)
            const data = await GetAllBlogs()
            setAllPosts(data)
            setActivityIndic(false)
        } catch (error) {
            console.log("Getting posts error")
        }
        setActivityIndic(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    const handleSearch = () => {
        props.navigation.navigate('SearchPostsScreen', { filterProducts: allPosts })
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            Restart()
        } catch (error) {

        }
    }

    return (
        <ScrollView style={{ flex: 1, width: "100%", backgroundColor: Colors.white }} >
            <LoadingModal show={activityIndic} />
            <View style={{ width: "100%", height: RFPercentage(26), backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }} >
                <LinearGradient colors={[Colors.primaryLight, Colors.primary]} start={[0.1, 0.7]} end={[1, 0.2]}  >
                    <StatusBar style="light" barStyle="light-content"
                        translucent={true}
                        backgroundColor="transparent" />
                </LinearGradient>

                <LinearGradient colors={[Colors.primaryLight, Colors.primary]} start={[0.1, 1.2]} end={[1.2, 0.9]} style={{ width: width, flex: 1, borderBottomLeftRadius: RFPercentage(5), borderBottomRightRadius: RFPercentage(5), flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }} >
                    <TouchableOpacity onPress={() => handleLogout()} style={{ position: "absolute", top: RFPercentage(4), left: RFPercentage(2.5) }} >
                        <MaterialIcons name="logout" style={{ transform: [{ scaleX: -1 }] }} size={RFPercentage(3)} color={Colors.white} />
                    </TouchableOpacity>

                    <Image source={logo} width={RFPercentage(10)} height={RFPercentage(10)} style={{ marginBottom: RFPercentage(-2), width: RFPercentage(16), height: RFPercentage(10) }} />

                    <View style={{ width: "90%", justifyContent: 'flex-start', alignItems: 'center', marginBottom: RFPercentage(-1), }} >
                        <AppTextInput
                            placeHolder="Search"
                            width="96%"
                            value={searchValue}
                            onChange={(text) => handleSearch()}
                            rightIcon="magnify"
                            rightFunction={() => handleSearch()}
                            elevation={6}
                            height={RFPercentage(5.7)}
                            backgroundColor={Colors.white}
                            startEdit={() => handleSearch()}
                        />
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.container}>
                {/* Bottom Contaienr */}
                <View style={{ marginBottom: RFPercentage(4), flexDirection: 'column', backgroundColor: Colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                    {allPosts.map((item, index) => (
                        <Card props={props} item={item} key={index} index={index} />
                    ))}
                </View>
            </View>
            <View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default HomeScreen;
