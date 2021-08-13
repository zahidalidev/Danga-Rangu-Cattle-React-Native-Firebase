import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReactNativeCrossPicker from "react-native-cross-picker"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';

// components
import AppTextInput from "../components/common/AppTextInput"
import AppTextButton from "../components/common/AppTextButton"
import LoadingModal from "../components/common/LoadingModal"
import MyAppBar from "../components/common/MyAppBar";

// services
import { getFarmById, getFarmRef } from '../services/FarmServices';
import { PostCattle } from '../services/CattleServices';

// config
import Colors from '../config/Colors';

function AddCattle(props) {
    const [indicator, showIndicator] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [name, setName] = useState('');
    const [stud, setStud] = useState('');
    const [sex, setSex] = useState('');
    const [status, setStatus] = useState('');
    const [breed, setBreed] = useState('');
    const [breedComment, setBreedComment] = useState('');
    const [cattleColour, setCattleColour] = useState('');
    const [horn, setHorn] = useState('');
    const [conception, setConception] = useState('');
    const [raised, setRaised] = useState('');
    const [farm, setFarm] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cattleImage, setCattleImage] = useState('');

    const studs = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
    ];

    const sexs = [
        { label: "Male", value: "Male" },
        { label: "FeMale", value: "Female" }
    ];

    const statuses = [
        { label: "Active", value: "Active" },
        { label: "Sold", value: "Sold" },
        { label: "Dead", value: "Dead" },
        { label: "Reference", value: "Reference" }
    ];

    const breeds = [
        { label: "Boran Angus", value: "Boran Angus" },
        { label: "Dexter", value: "Dexter" },
        { label: "Hereford", value: "Hereford" },
        { label: "Red Poll", value: "Red Poll" },
        { label: "Beef Shorthorn", value: "Beef Shorthorn" },
        { label: "South Devon", value: "South Devon" },
        { label: "Sussex", value: "Sussex" },
        { label: "Charolais", value: "Charolais" },
        { label: "Simmentaler", value: "Simmentaler" },
        { label: "Afrikaner", value: "Afrikaner" },
        { label: "Ankole", value: "Ankole" },
        { label: "Drakensberger", value: "Drakensberger" },
        { label: "Nguni", value: "Nguni" },
        { label: "Tuli", value: "Tuli" },
        { label: "Beefmaster", value: "Beefmaster" },
        { label: "Brahman", value: "Brahman" },
        { label: "Mashona", value: "Mashona" },
        { label: "Cross", value: "Cross" },
    ];

    const horns = [
        { label: "Horned", value: "Horned" },
        { label: "Polled", value: "Polled" },
        { label: "Very Short Horns", value: "Very Short Horns" },
        { label: "De Horned", value: "De Horned" },
    ];

    const conceptions = [
        { label: "Natural", value: "Natural" },
        { label: "Artificial", value: "Artificial" },
        { label: "Embryo", value: "Embryo" },
    ];

    const raiseds = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
    ];

    const [farms, setAllFarms] = useState([]);

    const handleConfirm = (date) => {
        let dat = new Date(date)
        dat = dat.toDateString()
        setBirthDate(dat);
        setDatePickerVisibility(false)
    };

    const iconComponent = () => {
        return <MaterialCommunityIcons
            name={"chevron-down"}
            size={20}
            color={"grey"}
        />
    }



    const getFarms = async () => {
        try {
            let user = await AsyncStorage.getItem("user");
            user = JSON.parse(user);

            const farmRef = getFarmRef();
            farmRef.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(async (change) => {

                    let res = await getFarmById(user.id);
                    let allFarms = [];
                    for (let i = 0; i < res.length; i++) {
                        let tempObj = { label: res[i].farmName, value: res[i].farmName };
                        allFarms.push(tempObj);
                    }
                    setAllFarms(allFarms)
                })
            })

        } catch (error) {

        }
    }

    useEffect(() => {
        getFarms();
    }, [])

    const handleSubmit = async () => {

        const body = {
            name,
            stud,
            sex,
            status,
            breed,
            breedComment,
            cattleColour,
            horn,
            conception,
            raised,
            farm,
            birthDate,
        }
        console.log(body)

        if (name === "" ||
            stud === "" ||
            sex === "" ||
            status === "" ||
            breed === "" ||
            breedComment === "" ||
            cattleColour === "" ||
            horn === "" ||
            conception === "" ||
            raised === "" ||
            farm === "" ||
            birthDate === "") {
            alert("Please Fill all the feilds!");
            return;
        }

        try {
            showIndicator(true)

            const res = await PostCattle(body, cattleImage);
            if (!res) {
                showIndicator(false)
                alert("Something Wen Wrong!")
                return;
            }
            showIndicator(false)

            alert("Cattle Added!")
            // props.navigation.navigate('LoginScreen')

        } catch (error) {
            console.log("Farm Adding Error: ", error);
            showIndicator(false)
            alert("Farm Adding Error!")
        }
    }


    const uploadImages = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 0.6
            });

            const { uri } = pickerResult;

            setCattleImage(uri)

        } catch (error) {
            console.log("Image selection error: ", error);
            alert("Image not selected");
        }
    }

    return (
        <View style={{ flex: 1, width: "100%" }} >
            <MyAppBar onNavigation={props.navigation} menu={false} backAction={true} title="Add Cattle" navigation="HomeScreen" />
            <LoadingModal show={indicator} />

            <ScrollView style={{ width: "100%" }}>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />

                <View style={styles.container}>
                    <Text style={{ fontSize: RFPercentage(4), fontWeight: "bold", color: Colors.primary }} >Cattle Details</Text>
                    {/* feilds */}
                    <View style={{ marginTop: RFPercentage(5), width: "85%" }} >
                        <Text style={{ marginBottom: RFPercentage(2) }} >Enter Cattle Name</Text>
                        <AppTextInput
                            placeHolder="Cattle Name"
                            width="100%"
                            value={name}
                            onChange={(text) => setName(text)}
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Stud Y/N</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={studs}
                            setItem={setStud}
                            selectedItem={stud}
                            placeholder="Select Stud"
                            modalMarginTop={"50%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Sex F/M</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={sexs}
                            setItem={setSex}
                            selectedItem={sex}
                            placeholder="Select Sex"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Status</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={statuses}
                            setItem={setStatus}
                            selectedItem={status}
                            placeholder="Select Status"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Birth Date</Text>
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{
                            backgroundColor: Colors.lightGrey, borderRadius: RFPercentage(1.2),
                            width: "100%", alignItems: 'flex-start', justifyContent: 'center',
                            height: RFPercentage(6)
                        }}>
                            <Text style={{ marginLeft: RFPercentage(1.5), fontSize: RFPercentage(2), color: Colors.grey }} >{birthDate === "" ? "Select Birth Date" : birthDate}</Text>
                        </TouchableOpacity>

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Breed</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={breeds}
                            setItem={setBreed}
                            selectedItem={breed}
                            placeholder="Select Breed"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Breed Comment</Text>
                        <AppTextInput
                            placeHolder="Breed Comment"
                            width="100%"
                            value={breedComment}
                            onChange={(text) => setBreedComment(text)}
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Cattle Colour</Text>
                        <AppTextInput
                            placeHolder="Cattle Colour"
                            width="100%"
                            value={cattleColour}
                            onChange={(text) => setCattleColour(text)}
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Horn Type</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={horns}
                            setItem={setHorn}
                            selectedItem={horn}
                            placeholder="Select Horn Type"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Conception</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={conceptions}
                            setItem={setConception}
                            selectedItem={conception}
                            placeholder="Select Conception"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Raised Y/N</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={raiseds}
                            setItem={setRaised}
                            selectedItem={raised}
                            placeholder="Select Raised"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <Text style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }} >Select Farm</Text>
                        <ReactNativeCrossPicker
                            modalTextStyle={{ color: Colors.primary }}
                            mainComponentStyle={{ height: RFPercentage(6.5), backgroundColor: Colors.lightGrey, borderColor: "rgba(0, 74, 173, 0)" }}
                            iconComponent={iconComponent}
                            items={farms}
                            setItem={setFarm}
                            selectedItem={farm}
                            placeholder="Select Farm"
                            modalMarginTop={"80%"} // popup model margin from the top 
                        />

                        <View style={{ marginTop: RFPercentage(3), justifyContent: 'center', width: "100%", alignItems: "center" }} >
                            <TouchableOpacity onPress={() => uploadImages('cnicBack')} activeOpacity={0.6} style={{ padding: RFPercentage(2), justifyContent: "center", alignItems: 'center', width: RFPercentage(33), height: RFPercentage(22), borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10 }} >
                                {cattleImage ?
                                    <Image resizeMode="contain" width={RFPercentage(20)} height={RFPercentage(20)} style={{ width: RFPercentage(33), height: RFPercentage(20), borderRadius: 10 }} source={{ uri: cattleImage }} /> :
                                    <Text style={{ fontSize: RFPercentage(2.6), color: Colors.grey }} >Upload Cattle Picture</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Login button */}
                    <View style={{ marginBottom: RFPercentage(4), width: "90%", marginTop: RFPercentage(5), justifyContent: 'center', alignItems: 'center' }} >
                        <AppTextButton
                            name="Add Farm"
                            onSubmit={() => handleSubmit()}
                            backgroundColor={Colors.primary}
                            width="80%"
                        />
                    </View>
                </View>
            </ScrollView>
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

export default AddCattle;