import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({periodName, expensesTotal}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.total}>${expensesTotal?.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
        fontWeight: 'bold'
    },
    total: {
        fontSize: 16,
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
})