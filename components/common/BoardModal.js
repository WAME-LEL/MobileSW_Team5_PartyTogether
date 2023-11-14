import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Touchable } from 'react-native';

const BoardModal = ({ data, visible, onClose }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // 안드로이드에서 물리적 뒤로 가기 버튼을 눌렀을 때의 처리
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>모달 창 내용</Text>
          <Text style={styles.modalText}>닉네임</Text>
          <Text style={styles.modalText}>내용</Text>
          <Text style={styles.modalText}>시간</Text>
          <Text style={styles.modalText}>오픈톡</Text>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
            >
              <Text>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 400,
    height: 300,
    padding: 35,
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
    backgroundColor: '#F194FF',
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
