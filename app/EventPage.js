import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const EventPage = () => {
    return (
        <SafeAreaView>
            <Text>EventPage</Text>
            <Link href = "https://www.naver.com/">
                <Text>링크 테스트</Text>
            </Link>
        </SafeAreaView>
    )
}

export default EventPage;