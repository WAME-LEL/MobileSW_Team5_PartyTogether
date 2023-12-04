import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const DropDownModal = ({ items, visible, onClose, onSelectItem }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelectItem(value); // 이 함수를 통해 선택된 값을 부모 컴포넌트에 전달
    onClose(); // 모달 창 닫기
  };

  return (
    <Modal
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <View style={styles.backdrop}>
            <View style={styles.modalView}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSelect(item.value)}
                >
                    <Text style={styles.text}>{item.label}</Text>
                    <View style={styles.radioButton}>
                    {selectedValue === item.value && (
                        <View style={styles.selectedRadioButton} />
                    )}
                    </View>
                </TouchableOpacity>
                )}
            />
            </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalView: {
      margin: 20,
      backgroundColor: '#666666', // 배경색 변경
      justifyContent: 'center',
      borderRadius: 10,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5, // 그림자 투명도 조정
      shadowRadius: 6, // 그림자 반경 조정
      elevation: 10, // 그림자 높이 조정
    },
    item: {
      flexDirection: 'row',
      marginBottom: 5, // 아이템 간격 조정
      padding: 10, // 아이템 패딩 추가
      backgroundColor: 'white', // 아이템 배경색 변경
      borderRadius: 10, // 테두리 둥글게
      width: '100%', // 아이템 너비 조정
    },
    text: {
      marginRight: 10,
      fontSize: 16, // 폰트 크기 조정
      fontWeight: '500', // 폰트 가중치 조정
      color: '#333', // 폰트 색상 조정
      flex: 1, // 텍스트 영역 너비 조정
    },
    radioButton: {
      height: 24, // 라디오 버튼 크기 조정
      width: 24, // 라디오 버튼 크기 조정
      borderRadius: 12, // 라디오 버튼 둥글게
      borderWidth: 2, // 라디오 버튼 테두리 두께 조정
      borderColor: '#007bff', // 라디오 버튼 색상 변경
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRadioButton: {
      height: 14,
      width: 14,
      borderRadius: 7,
      backgroundColor: '#007bff', // 선택된 라디오 버튼 색상 변경
    },
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    },
  });
  
export default DropDownModal;