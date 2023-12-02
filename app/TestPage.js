import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Network from 'expo-network';

export default function App() {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const ipInfo = await Network.getIpAddressAsync();
        setIpAddress(ipInfo);
      } catch (e) {
        console.log(e);
      }
    };

    fetchIPAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your IP Address is: {ipAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

// import { PROVIDER_GOOGLE } from 'react-native-maps';
// import MapView from 'react-native-maps';
// import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native'
// import { loadTestData } from '../components'

// const TestPage = () => {
//   let data;

//   const handlePress = async () => {
//     data = await loadTestData();
//     console.log(data);
//   }
//   return(
//   <SafeAreaView style={styles.screen}>
//     <Button onPress = {handlePress}>확인</Button>
//   	  <MapView // 현재 앱에서만 돌아감, 웹 상에서는 이 페이지 주석 풀면 다 오류남
// 		style={styles.map}
// 		initialRegion={{
//             latitude: 36.7958936,
//             longitude: 127.0716485 ,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         provider={PROVIDER_GOOGLE}
// 		> 
    	
    
//       </MapView>
//   </SafeAreaView>
//   )
  
// }

// export default TestPage

// const styles = StyleSheet.create({
// 	screen:{
//       flex:1
//     },
//   	map:{
// 	  width: "100%",
//   	  height : "100%"
// 	}
// })