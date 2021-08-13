import React, { useEffect } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, View, Dimensions, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { AntDesign } from "@expo/vector-icons"

// components
import AppTextButton from '../components/common/AppTextButton';

// confgi
import Colors from '../config/Colors';
import { removeCattle } from '../services/CattleServices';

const height = Dimensions.get('window').height;

function CattleDetailsScreen(props) {
    const [cattleDetail, setCattleDetail] = useState({})

    const deleteCattle = async () => {
        try {
            await removeCattle(cattleDetail.docId);
            alert("Cattle Deleted")
            props.navigation.navigate('HomeScreen')
        } catch (error) {
            alert(`Something went wrong`)
            console.log("Cattle Deleted Error: ", error)
        }
    }

    const getCattleDetail = async () => {
        try {
            if (props.route.params != undefined) {
                const cattleResponce = props.route.params.item;
                setCattleDetail(cattleResponce)
            }
        } catch (error) {
            console.log("product details: ", error)
        }
    }

    useEffect(() => {
        getCattleDetail();
    }, [props.route.params])

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <Image resizeMode="cover" style={{ width: "100%", height: (height / 2) - RFPercentage(5) }} source={{ uri: cattleDetail.imgUri }} />

            <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')} style={{ position: "absolute", top: RFPercentage(5), right: RFPercentage(3) }} >
                <AntDesign name="close" size={RFPercentage(4)} color={Colors.white} />
            </TouchableOpacity>

            <View style={{ marginTop: RFPercentage(-6), borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7), flex: 1, width: "100%", backgroundColor: Colors.white }} >
                <ScrollView style={{ width: "100%" }} >
                    <View style={{ marginTop: RFPercentage(3), flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center" }} >
                        <Text style={{ color: Colors.black, fontSize: RFPercentage(6), fontWeight: Platform.OS === 'android' ? "bold" : '300' }} >
                            {cattleDetail.name}
                        </Text>

                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(2.7) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Breed
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.breed}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Breed Comment
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.breedComment}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Cattle Colour
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.cattleColour}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Conception
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.conception}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Horn
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.horn}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Raised
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.raised}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Sex
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.sex}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Status
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.status}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Stud
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.stud}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "flex-start", marginLeft: RFPercentage(2.7), alignItems: "center", width: "80%", flexDirection: "row", marginTop: RFPercentage(1) }} >
                            <Text style={{ width: "50%", color: Colors.black, fontSize: RFPercentage(2.7), fontWeight: "bold" }} >
                                Birth Date
                            </Text>
                            <Text style={{ justifyContent: "flex-start", alignItems: "flex-start", color: Colors.grey, fontSize: RFPercentage(2.7) }} >
                                {cattleDetail.birthDate}
                            </Text>
                        </View>


                    </View>
                    <View style={{ marginBottom: RFPercentage(4), marginTop: RFPercentage(3), width: "100%", alignItems: "center" }} >
                        <AppTextButton
                            width="40%"
                            name="Delete Cattle"
                            borderRadius={RFPercentage(1.3)}
                            backgroundColor={Colors.danger}
                            onSubmit={() => deleteCattle()}
                        />
                    </View>
                </ScrollView>


            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%"
    },
})

export default CattleDetailsScreen;