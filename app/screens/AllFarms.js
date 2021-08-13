import React, { useEffect, useState } from 'react';
import { RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// components
import FarmCard from '../components/FarmCard';
import LoadingModal from '../components/common/LoadingModal';

// config
import Colors from '../config/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFarmById, getFarmRef, removeFarm } from '../services/FarmServices';
import { getCattleByFarm } from '../services/CattleServices';

function AllFarms(props) {
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [allFarms, setAllFarms] = useState([]);

    const getFarms = async () => {
        try {
            let user = await AsyncStorage.getItem("user");
            user = JSON.parse(user);

            const farmRef = getFarmRef();
            farmRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {

                    let res = await getFarmById(user.id);

                    if (res.length === 0) {
                        alert("Please Add The Farm First")
                        setAllFarms([])
                        props.navigation.navigate("CreateFarm")
                        return;
                    }

                    setAllFarms(res)
                })
            })

        } catch (error) {

        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFarms()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        onRefresh()
    }, [props.route.params])


    const deleteFarm = async (id) => {
        try {
            setActivityIndic(true)
            await removeFarm(id);
            alert("Farm Deleted")
            setActivityIndic(false)
        } catch (error) {
            alert(`Something went wrong`)
            console.log("Farm Deleted Error: ", error)
        }
        setActivityIndic(false)
    }

    const getFarmCattle = async (farmId) => {
        try {
            let user = await AsyncStorage.getItem("user");
            user = JSON.parse(user);
            let res = await getCattleByFarm(user.id, farmId)
            if (!res) {
                alert("No Cattle found!")
                return;
            }
            props.navigation.navigate('SearchPostsScreen', { filterProducts: res })
        } catch (error) {
            console.log("farm Cattles getting Error: ",)
        }
    }

    return (
        <>
            <StatusBar style="light" backgroundColor={Colors.primary} />
            <Appbar.Header style={{ backgroundColor: Colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={Colors.white} onPress={() => props.navigation.navigate('HomeScreen')} />
                <Appbar.Content color={Colors.white} title="My Farms" />
                {/* <Appbar.Action color={Colors.white} icon="account-circle" onPress={() => { }} /> */}
            </Appbar.Header>

            <LoadingModal show={activityIndic} />

            <ScrollView style={{ backgroundColor: Colors.white }} >
                <View style={styles.container}>
                    {/* Bottom Contaienr */}
                    <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: Colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                        {/* Products */}
                        <View style={{ marginBottom: RFPercentage(4), flexDirection: 'column', backgroundColor: Colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                            {allFarms.map((item, index) => (
                                <FarmCard handleFarmCattle={(id) => getFarmCattle(id)} handleDeleteFarm={(id) => deleteFarm(id)} item={item} key={index} index={index} />
                            ))}
                        </View>
                    </View>

                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
})

export default AllFarms;