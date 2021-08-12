import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../config/Colors';

function Card({ props, index, item }) {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('PostDetails', { 'post': item })} activeOpacity={0.9} key={index} style={{ elevation: 2, flexDirection: "row", backgroundColor: Colors.white, width: "90%", height: RFPercentage(14), borderRadius: RFPercentage(1), marginBottom: RFPercentage(1), marginTop: index == 0 ? RFPercentage(2) : RFPercentage(1) }} >
            <View style={{ width: "40%" }} >
                <Image resizeMode="cover" style={{ borderRadius: 10, width: "100%", height: "100%" }} source={{ uri: item.featuredImageSrc }} />
            </View>
            <View style={{ justifyContent: "space-between", alignItems: "flex-start", width: "60%", flexDirection: "column", padding: RFPercentage(1.5) }} >
                <Text numberOfLines={2} style={{ fontSize: RFPercentage(2.1), fontFamily: "sans-serif-medium" }} >{item.title}</Text>
                <Text numberOfLines={1} style={{ fontSize: RFPercentage(1.7), fontFamily: "sans-serif", color: Colors.grey }} >{item.excerpt}</Text>
                <View style={{ alignItems: "flex-start", flexDirection: "row", width: "100%", justifyContent: "flex-start" }} >
                    <Text numberOfLines={1} style={{ width: "25%", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium" }} >{item.authorName}</Text>
                    <View style={{ width: "60%", justifyContent: "flex-start" }} >
                        <Text numberOfLines={1} style={{ alignSelf: "flex-start", fontSize: RFPercentage(1.7), fontFamily: "sans-serif-medium", color: Colors.mediumGrey }} >{item.date}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Card;