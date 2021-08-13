import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../config/Colors';

function UserCard({ index, item, handleDeleteFarm, handleFarmCattle }) {
    return (
        <TouchableOpacity onPress={() => handleFarmCattle(item.docId)} activeOpacity={0.9} key={index} style={{ elevation: 2, flexDirection: "row", backgroundColor: Colors.white, width: "80%", height: RFPercentage(15), borderRadius: RFPercentage(1), marginBottom: RFPercentage(1), marginTop: index == 0 ? RFPercentage(2) : RFPercentage(1) }} >

            <View style={{ justifyContent: "space-between", alignItems: "flex-start", width: "100%", flexDirection: "column", padding: RFPercentage(2) }} >
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "33%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >User Name</Text>
                    <View style={{ width: "68%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.name}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "33%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Email</Text>
                    <View style={{ width: "68%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={2} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.email}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "33%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Contact</Text>
                    <View style={{ width: "68%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.phoneNumber}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "33%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Address</Text>
                    <View style={{ width: "68%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={2} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.address}</Text>
                    </View>
                </View>
            </View>
            <View style={{ position: "absolute", top: RFPercentage(1), right: RFPercentage(1), justifyContent: "center", alignItems: "center" }} >
                <TouchableOpacity onPress={() => handleDeleteFarm(item.docId)} >
                    <MaterialCommunityIcons name="delete" color={Colors.danger} size={RFPercentage(2.7)} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default UserCard;