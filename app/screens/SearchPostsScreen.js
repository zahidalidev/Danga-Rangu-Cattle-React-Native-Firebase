import React, { useEffect, useState } from 'react';
import { RefreshControl, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Appbar } from 'react-native-paper';

// config
import Colors from '../config/Colors';
import Card from '../components/Card';
import AppTextInput from '../components/common/AppTextInput';


function SearchPostsScreen(props) {
    const [searchValue, setSearchValue] = useState('');
    const [oldProducts, setOldProducts] = useState([]);
    const [activityIndic, setActivityIndic] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);

    const getFilteredProducts = async () => {
        try {
            if (props.route.params.filterProducts) {
                setProducts(props.route.params.filterProducts)
                setOldProducts(props.route.params.filterProducts)
            }
        } catch (error) {

        }
    }

    const handleSearch = () => {
        const tempProducts = [...oldProducts];
        const searhedProducts = tempProducts.filter(item => item.name.toLowerCase().search(searchValue.toLowerCase()) >= 0)
        setProducts(searhedProducts)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFilteredProducts()
        setRefreshing(false);
    }, []);

    useEffect(() => {
        onRefresh()
    }, [props.route.params])

    return (
        <>
            <StatusBar style="light" backgroundColor={Colors.primary} />
            <Appbar.Header style={{ backgroundColor: Colors.primary, width: "100%", justifyContent: "space-between" }} >
                <Appbar.BackAction color={Colors.white} onPress={() => props.navigation.navigate('HomeScreen')} />
                <Appbar.Content color={Colors.white} title="Search for Posts" />
                {/* <Appbar.Action color={Colors.white} icon="account-circle" onPress={() => { }} /> */}
            </Appbar.Header>

            <ScrollView style={{ backgroundColor: Colors.white }} >
                <View style={styles.container}>
                    {activityIndic
                        ? <View style={{ flexDirection: 'column', marginTop: -RFPercentage(7), borderTopLeftRadius: RFPercentage(8), backgroundColor: Colors.lightGrey, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                            <ActivityIndicator color={Colors.primary} size={RFPercentage(6)} />
                        </View>
                        : <>
                            {/* Bottom Contaienr */}
                            <View style={{ flexDirection: 'column', marginTop: RFPercentage(2), borderTopLeftRadius: RFPercentage(8), backgroundColor: Colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >

                                {/* Search feilds */}
                                <View style={{ flexDirection: 'column', marginTop: RFPercentage(1), marginBottom: RFPercentage(2) }} >
                                    <View style={{ width: "100%" }} >
                                        <AppTextInput
                                            autoFocus={true}
                                            width="75%"
                                            value={searchValue}
                                            onChange={(text) => setSearchValue(text)}
                                            rightIcon="magnify"
                                            rightFunction={() => handleSearch()}
                                            borderWidth={0.4}
                                            placeHolder="Search"
                                            elevation={2}
                                            height={RFPercentage(5.7)}
                                            backgroundColor={Colors.white}
                                        />
                                    </View>
                                </View>

                                {/* Products */}
                                <View style={{ marginBottom: RFPercentage(4), flexDirection: 'column', backgroundColor: Colors.white, width: "100%", flex: 1.8, alignItems: 'center', justifyContent: 'center' }} >
                                    {products.map((item, index) => (
                                        <Card props={props} item={item} key={index} index={index} />
                                    ))}
                                </View>

                            </View>

                        </>
                    }
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

export default SearchPostsScreen;