import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({label, textInputConfig, invalid, style}) => {
    let inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    return (
    <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid ? styles.invalidLabel : '']}>{label}</Text>
        <TextInput {...textInputConfig} style={[inputStyles, invalid ? styles.invalidInput : '']}/>
    </View>
)}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 10
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        fontSize: 18,
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary500,
        padding: 6,
        borderRadius: 6
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error100
    },
    invalidInput: {
        borderColor: GlobalStyles.colors.error100,
        borderWidth: 2,
        borderRadius: 6
    }
})