import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import AppTextInput from "../components/common/AppTextInput"
import AppTextButton from "../components/common/AppTextButton"
import LoadingModal from "../components/common/LoadingModal"
import MyAppBar from "../components/common/MyAppBar";

// services
import { AddFarm } from '../services/FarmServices';

// config
import Colors from '../config/Colors';

function CreateFarm(props) {
    const [indicator, showIndicator] = useState(false);

    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Enter Farm Name",
            value: '',
            secure: false,
            icon: "user",
            iconType: "Feather"
        },
        {
            id: 1,
            placeHolder: "Enter Farm Address",
            value: '',
            secure: false,
            icon: "email-outline",
            iconType: "MaterialCommunityIcons"
        },
        {
            id: 2,
            placeHolder: "Enter Contact Number",
            value: '',
            secure: false,
            icon: "phone",
            iconType: "Feather"
        }
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        const farmName = feilds[0].value.trim();
        const farmAddress = feilds[1].value.trim();
        const farmContactNumber = feilds[2].value.trim();
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);

        const body = {
            farmName,
            farmAddress,
            farmContactNumber,
            userId: user.id
        }

        try {
            showIndicator(true)

            const res = await AddFarm(body);
            if (!res) {
                showIndicator(false)
                alert("Farm with the same name already exist!")
                return;
            }
            showIndicator(false)

            alert("Farm Added!")
            // props.navigation.navigate('LoginScreen')

        } catch (error) {
            console.log("Farm Adding Error: ", error);
            showIndicator(false)
            alert("Farm Adding Error!")
        }
    }

    return (
        <View style={{ flex: 1, width: "100%" }} >
            <MyAppBar onNavigation={props.navigation} menu={false} backAction={true} title="Create Farm" navigation="HomeScreen" />
            <LoadingModal show={indicator} />

            <View style={styles.container}>
                <Text style={{ fontSize: RFPercentage(4), fontWeight: "bold", color: Colors.primary }} >Farm Details</Text>
                {/* Text feilds */}
                {feilds.map((item, i) =>
                    <View key={i} style={{ marginTop: i == 0 ? RFPercentage(7) : RFPercentage(3), width: "85%" }} >
                        <Text style={{ marginBottom: RFPercentage(2) }} >{item.placeHolder}</Text>
                        <AppTextInput
                            placeHolder={item.placeHolder}
                            width="100%"
                            value={item.value}
                            onChange={(text) => handleChange(text, item.id)}
                            secure={item.secure}
                            icon={item.icon}
                            iconType={item.iconType}
                        />
                    </View>
                )}

                {/* Login button */}
                <View style={{ marginBottom: RFPercentage(2), width: "90%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                    <AppTextButton
                        name="Add Farm"
                        onSubmit={() => handleSubmit()}
                        backgroundColor={Colors.primary}
                        width="80%"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginTop: RFPercentage(4),
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default CreateFarm;