import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({id, description, amount, date}) => {

    const navigation = useNavigation();

    const expensePressHandler = () => {
        navigation.navigate('ManageExpenses', {
            expenseId: id
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
            <View>
                <Text style={[styles.text, styles.description]}>{description}</Text>
                <Text style={[styles.text, styles.date]}>{getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={[styles.text, styles.amount]}>${amount.toFixed(2)}</Text>
            </View>
        </Pressable>
    )
}
export default ExpenseItem

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 6,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2
    },
    text: {
        color: 'white',

    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    amountContainer: {
        minWidth: 80,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75
    }

})