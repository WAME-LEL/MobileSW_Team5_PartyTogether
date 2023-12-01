import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { UserContext } from '../components'

const MyPage = () => {
    const { uid } = useContext(UserContext);

    return (
        <SafeAreaView>
            <Text>My Page</Text>
        </SafeAreaView>
    )
}

export default MyPage