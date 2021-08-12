import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StatusBar, Dimensions } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../config/Colors';
import Constants from 'expo-constants';

const hieght = Dimensions.get('window').height;

function PostDetails(props) {
    const [postDetails, setPostDetail] = useState({})
    const [source, setSource] = useState({
        html: ""
    });

    const getPost = () => {
        const post = props.route.params.post;

        setPostDetail({
            auther: post.authorName,
            title: post.title,
            date: post.date
        })
        // console.log(post.date)
        setSource({
            html: post.content.replace(/<a/ig, '<a target=\"_blank\"')
        })
    }

    useEffect(() => {
        getPost(props.route.params)
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <StatusBar backgroundColor={Colors.primary} />
            <Appbar style={{ backgroundColor: Colors.primary, marginTop: Constants.statusBarHeight }} >
                <Appbar.BackAction onPress={() => props.navigation.navigate('HomeScreen')} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontFamily: "sans-serif-medium", color: Colors.white, fontSize: RFPercentage(2.5), marginRight: RFPercentage(4) }} >IQCODEC</Text>
                </View>
            </Appbar>
            <View style={{ width: "90%", marginLeft: "5%", marginTop: RFPercentage(3) }} >
                <Text style={{ fontSize: RFPercentage(3), fontWeight: "bold" }} >{postDetails.title}</Text>
                <View style={{ flexDirection: "row", marginTop: RFPercentage(0.7) }} >
                    <Text>By</Text>
                    <Text style={{ fontWeight: "bold" }} > {postDetails.auther}</Text>
                    <Text>  -  {postDetails.date}</Text>
                </View>
            </View>

            <AutoHeightWebView style={{ width: "90%", marginTop: RFPercentage(2), marginLeft: "5%" }}
                // customScript={`document.body.style.background = 'lightyellow';`}
                customStyle={`
                    p {
                    font-size: 16px;
                    }
                    iframe {
                        width: 120%;
                        height: 200px;
                        margin-left: ${RFPercentage(-3.5)}px
                    }
                    img {
                        width: 120% ;
                        height: 200px;
                        margin-left: ${RFPercentage(-3.5)}px;
                        margin-bottom: 10px
                    }
                `}
                allowsFullscreenVideo={true}
                // onSizeUpdated={size => console.log(size.height)}
                files={[{
                    href: 'cssfileaddress',
                    type: 'text/css',
                    rel: 'stylesheet'
                }]}
                source={source}
                scalesPageToFit={true}
                viewportContent={'width=device-width, user-scalable=no'}
            />
        </View>
    );
}

export default PostDetails;