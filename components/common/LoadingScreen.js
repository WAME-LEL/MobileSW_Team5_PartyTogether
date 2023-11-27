import React from 'react';
import { View, Modal, Image, StyleSheet } from 'react-native';

const LoadingScreen = ({ nowLoading }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={nowLoading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <Image
          source={require('../../assets/icons/Loading.gif')}
          style={styles.loadingImage}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  loadingImage: {
    width: 200,
    height: 200,
    opacity: 0.5,
  },
});

export default LoadingScreen;