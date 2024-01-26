import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MyModal = ({ setModalActive }) => {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <TouchableOpacity onPress={() => setModalActive(false)} style={styles.modalCancelIcon}>
                    <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MyModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: "absolute",
        width: "130%",
        height: "100%",
        zIndex: 1,
        padding: 50,
        justifyContent: "center",
        alignContent: "center"
    },
    modal: {
        backgroundColor: "#fff",
        height: "30%",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 20
    },
    modalCancelIcon: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }
})