import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Icon_Close from '../../assets/icons/Icon_Close.png';
import Icon_Chatting from '../../assets/icons/Icon_Chatting.png';

const {width, height} = Dimensions.get('window');

const BoardModal = ({ items, visible, onClose, handleChat }) => {

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.secondView}>
            <View style = {styles.lineContainer}>
              <Text style={styles.titleText}>글제목 :</Text>
              <Text style={styles.modalText}>{items.title}</Text>
            </View>
            <View style = {[styles.lineContainer, {flexDirection: 'row'}]}>
              <Text style={styles.titleText}>닉네임 :</Text>
              <Text style={{marginRight: 10, fontSize: 16}}>{items.nickname}</Text>
              <TouchableOpacity style={styles.button}
                onPress={() => handleChat()}
              >
                <Image source = {Icon_Chatting} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
            </TouchableOpacity>
            </View>
            <View style = {styles.lineContainer}>
              <Text style={styles.titleText}>글내용 :</Text>
              <Text style={styles.modalText}>{items.content}</Text>
            </View>
            <View style = {styles.lineContainer}>
              <Text style={styles.titleText}>오픈톡 :</Text>
              <Text style={styles.modalText}>{items.opentalk}</Text>
            </View>
            <View style = {{alignItems: 'center', marginVertical: '3%'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={onClose}
              >
                <Image source = {Icon_Close} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
              </TouchableOpacity>
            </View> 
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경 추가
  },
  lineContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '2.5%',
    borderBottomWidth: 2,
    borderBottomEndRadius: 2,
    borderBottomColor: '#EEEEEE',
  },  
  modalView: {
    margin: width * 0.05,
    backgroundColor: '#EEEEEE',
    borderRadius: 10, // 둥근 모서리 조정
    width: width * 0.9, // 너비 조정
    padding: width * 0.03, // 패딩 조정
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  secondView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: width * 0.02,
    alignItems: 'center',
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10, // 더 둥글게
    justifyContent: 'center', // 센터 정렬
    alignItems: 'center', // 센터 정렬
  },
  modalText: {
    fontSize: 16, // 폰트 크기 조정
    width: width * 0.65,
  },
  titleText: { // 제목 텍스트 스타일 추가
    marginLeft: '2%',
    width: width * 0.15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BoardModal;
