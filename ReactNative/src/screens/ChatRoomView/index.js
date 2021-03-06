import React from 'react';
import {Image, View, TouchableOpacity, Alert, Text, TextInput, Platform} from 'react-native';
import styles from './style';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {themes} from "../../constants/colors";
import {withTheme} from "../../theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ID_MESSAGE_LENGTH = 24;

class ChatRoomView extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        navigation: PropTypes.object,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        let room = props.route.params.room;
        this.state = {
            loading: true,
            messages: [],
            showDropdown: false,
            inputText: '',
            room: room
        }
        this.setHeader();
        this.init(room.id);
    }
    componentDidMount() {
        this.setState({
            messages: [],
        });
    }

    async componentWillUnmount() {
        // const { room } = this.state;
        // const { user } = this.props;
        //
        // try{
        //     await FirebaseStore.userLeftRoom(user.uid, room.id);
        // } catch (e) {
        //     console.log('leftRoom Error', e);
        // }
    }

    init = async (rid) => {
        // const { navigation } = this.props;
        // // Room Subscribe
        // let room = await firestore().collection('rooms').doc(rid);
        // room.onSnapshot((querySnapShot) => {
        //     let subRoom = querySnapShot.data();
        //     if(subRoom === undefined ){
        //         showToast('Room is deleted!');
        //         navigation.pop();
        //         return;
        //     }
        //     console.log('room', subRoom);
        //     this.setState({ room: subRoom });
        // });
        //
        // // Message Subscribe
        // let messages = await firestore().collection('messages').where('rid', '==', rid);
        // messages.onSnapshot((querySnapShot) => {
        //     let list = [];
        //     querySnapShot.forEach(doc => {
        //         let message = doc.data();
        //         list.push({ ...message, createdAt: new Date(message.createdAt.seconds * 1000)});
        //     });
        //     list.sort((a, b) => a.createdAt < b.createdAt);
        //     console.log('messages', list);
        //     this.setState({messages: list, loading: false});
        // })
    }

    setHeader = () => {
        const { navigation } = this.props;
        const { room } = this.state;
        navigation.setOptions({
            title: room.name,
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 4 }} onPress={this.toggleDropdown}>
                    <MaterialCommunityIcons name={'dots-vertical'} size={24} style={{ marginRight: 8 }} color={'white'}/>
                </TouchableOpacity>
            ),
        });
    }

    onChangeAction = async (key, value) => {
        // const  { actions, room } = this.state;
        // const { user } = this.props;
        //
        // let roomData = {};
        // try{
        //     switch(key){
        //         case 'block':
        //         {
        //             let block = room.block??[];
        //             console.log('action', block);
        //             if(value){
        //                 roomData['block'] = [...block, user.uid];
        //             } else {
        //                 roomData['block'] = block.filter(id => id !== user.uid);
        //             }
        //             break;
        //         }
        //     }
        //     console.log('action', roomData);
        //     await FirebaseStore.setRoomAction(room.id, roomData);
        // } catch(e){
        //     console.log('error', e);
        // }
        //
        // let newActions = actions.map(item => {
        //     if(item.key === key){
        //         return {
        //             ...item,
        //             value: value
        //         }
        //     }
        //     return item;
        // });
        // this.setState({ actions: newActions });
    }

    deleteChatter = () => {
        // Alert.alert(
        //     'Alert',
        //     'Are you sure deleting room?',
        //     [
        //         {
        //             text: 'Cancel',
        //             style: 'cancel'
        //         },
        //         {
        //             text: 'Delete',
        //             style: 'destructive',
        //             onPress: async() => {
        //                 const { room } = this.state;
        //                 try{
        //                     await FirebaseStore.deleteRoom(room.id );
        //                 } catch (e) {}
        //             }
        //         }
        //     ],
        //     { cancelable: false }
        // )
    }

    toggleDropdown = () => {
        const { showDropdown } = this.state;
        console.log('show', showDropdown);
        this.setState({ showDropdown: !showDropdown });
    }

    onPressSend = async() => {
        // const { room, inputText } = this.state;
        // const { user, navigation } = this.props;
        // let message = inputText;
        // this.setState({inputText: ''});
        // try{
        //     let messages = [
        //         {
        //             _id: generateId(ID_MESSAGE_LENGTH),
        //             text: message,
        //             createdAt: new Date(),
        //             user: {
        //                 _id: user.uid,
        //                 name: user.profile.displayName,
        //                 avatar: user.profile.photoURL??''
        //             }
        //         }
        //     ]
        //     let result = await FirebaseStore.saveMessages(room.id, messages);
        //     if(result.success){
        //         console.log('messages', messages);
        //     } else {
        //         Alert.alert('Error', result.errorMsg);
        //         if(result.errorType === ERROR_ROOM_BLOCK){
        //             let newRoom = await FirebaseStore.getRoomById(room.id);
        //             this.setState({room: newRoom});
        //         } else if(result.errorType === ERROR_ROOM_REMOVE){
        //             navigation.pop();
        //         }
        //     }
        // } catch (e) {
        //     Alert.alert('Error', 'Sending Message Failed!');
        // }
    }

    renderInput = () => {
        const { room, inputText } = this.state;
        const { theme } = this.props;
        return (
            <View style={{ ...styles.inputContainer, backgroundColor: themes[theme].backgroundColor }}>
                <TouchableOpacity style={styles.actionBtn} onPress={this.onPressSend}>
                    <MaterialIcons name={'add-photo-alternate'} size={28} color={'blue'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={this.onPressSend}>
                    <MaterialCommunityIcons name={'home-plus'} size={28} color={'blue'}/>
                </TouchableOpacity>
                <TextInput
                    ref={(r) => this.input = r}
                    value={inputText}
                    multiline
                    keyboardType='twitter'
                    placeholder='Input Message ...'
                    onChangeText={val => this.setState({inputText: val})}
                    style={{ ...styles.input, backgroundColor: themes[theme].auxiliaryBackground }}
                />
                { inputText.length > 0 ?
                    <TouchableOpacity style={styles.sendBtn} onPress={this.onPressSend}>
                    <FontAwesome name={'send'} size={20} color={'blue'}/>
                </TouchableOpacity>
                :
                null
                }
            </View>
        )
    }

    render() {
        const { navigation, user, theme } = this.props;
        const { showDropdown, actions } = this.state;
        return(
            <View style={{ ...styles.mainContainer, backgroundColor: themes[theme].auxiliaryBackground }}>
               <GiftedChat
                   messages={this.state.messages}
                   onPressAvatar={() => navigation.navigate('UserProfileStack', { screen: 'UserProfileScreen'})}
                   user={{
                       _id: user.id,
                       name: user.username,
                       avatar: user.avatar??''
                   }}
                   bottomOffset={(Platform.OS === 'ios' && 33) || null}
                   infiniteScroll
                   wrapInSafeArea
                   isCustomViewBottom
                   renderInputToolbar={() => this.renderInput()}
               />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user : state.login.user
});

export default connect(mapStateToProps, null)(withTheme(ChatRoomView));

