import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../config/Colors';

function Card({ props, index, item }) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('CattleDetailsScreen', { 'item': item })} activeOpacity={0.9} key={index} style={{ elevation: 2, flexDirection: "row", backgroundColor: Colors.white, width: "90%", height: RFPercentage(14), borderRadius: RFPercentage(1), marginBottom: RFPercentage(1), marginTop: index == 0 ? RFPercentage(2) : RFPercentage(1) }} >
            <View style={{ width: "40%" }} >
                <Image resizeMode="cover" style={{ borderRadius: 10, width: "100%", height: "100%" }} source={{ uri: item.imgUri }} />
            </View>
            <View style={{ justifyContent: "space-between", alignItems: "flex-start", width: "60%", flexDirection: "column", padding: RFPercentage(1.5) }} >
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "25%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Name</Text>
                    <View style={{ width: "60%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.name}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "25%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Breed</Text>
                    <View style={{ width: "60%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.breed}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "25%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Horn</Text>
                    <View style={{ width: "60%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.horn}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "25%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >Sex</Text>
                    <View style={{ width: "60%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.sex}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Card;