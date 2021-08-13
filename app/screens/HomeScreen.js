import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AppTextInput from "../components/common/AppTextInput"
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from "@expo/vector-icons";
import { Restart } from "fiction-expo-restart"

// components
import Card from '../components/Card';

// images
import logo from "../../assets/images/logo.png"

// config
import Colors from "../config/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/common/LoadingModal';
import { getCattleById, getCattleRef } from '../services/CattleServices';

const width = Dimensions.get('window').width

function HomeScreen(props) {

    let [allCattles, setAllCattles] = useState([])
    let [activityIndic, setActivityIndic] = useState(false)
    let [searchValue, setSearchValue] = useState()


    const getCattles = async () => {
        try {
            let user = await AsyncStorage.getItem("user");
            user = JSON.parse(user);

            const farmRef = getCattleRef();
            farmRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {

                    let res = await getCattleById(user.id);
                    if (!res) {
                        setAllCattles([]);
                        return;
                    }
                    setAllCattles(res)
                })
            })

        } catch (error) {
            console.log("getting cattles error: ", error)
        }
    }

    useEffect(() => {
        getCattles()
    }, [])

    const handleSearch = () => {
        props.navigation.navigate('SearchPostsScreen', { filterProducts: allCattles })
    }

    return (
        <ScrollView style={{ flex: 1, width: "100%", backgroundColor: Colors.white }} >
            <LoadingModal show={activityIndic} />
            <View style={{ width: "100%", height: RFPercentage(26), backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }} >
                <LinearGradient colors={[Colors.primaryLight, Colors.primary]} start={[0.1, 1.2]} end={[1.2, 0.9]}  >
                    <StatusBar style="light" barStyle="light-content"
                        translucent={true}
                        backgroundColor="transparent" />
                </LinearGradient>

                <LinearGradient colors={[Colors.primaryLight, Colors.primary]} start={[0.1, 1.2]} end={[1.2, 0.9]} style={{ width: width, flex: 1, borderBottomLeftRadius: RFPercentage(5), borderBottomRightRadius: RFPercentage(5), flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }} >
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()} style={{ position: "absolute", top: RFPercentage(4), left: RFPercentage(2.5) }} >
                        <AntDesign name="menuunfold" style={{ transform: [{ scaleX: -1 }] }} size={RFPercentage(3)} color={Colors.white} />
                    </TouchableOpacity>

                    <Image source={logo} width={RFPercentage(15)} height={RFPercentage(10)} style={{ marginBottom: RFPercentage(-2), width: RFPercentage(20), height: RFPercentage(10) }} />

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
                    {allCattles.length === 0 ? <Text style={{ fontSize: RFPercentage(3), color: Colors.mediumGrey, marginTop: RFPercentage(5) }} >No Cattle Found!</Text> :
                        allCattles.map((item, index) => (
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
