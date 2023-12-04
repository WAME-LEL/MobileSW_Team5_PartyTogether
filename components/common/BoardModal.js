import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon_Close from '../../assets/icons/Icon_Close.png';

const BoardModal = ({ items, visible, onClose }) => {
  

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // 안드로이드에서 물리적 뒤로 가기 버튼을 눌렀을 때의 처리
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{items.title}</Text>
          <Text style={styles.modalText}>{items.nickname}</Text>
          <Text style={styles.modalText}>{items.content}</Text>
          <Text style={styles.modalText}>{items.processedTime}</Text>
          <Text style={styles.modalText}>{items.openChat}</Text>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
            >
              <Image source = {Icon_Close} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={() => console.log(items)}>
              <Text>채팅 버튼 추가</Text>
            </TouchableOpacity>
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
  },
  inView: {
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '94%',
    height: 'auto',
    padding: '3%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default BoardModal;
