import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({expensesPeriod, expenses}) => {

    if (expenses?.length) {
        const expensesTotal = expenses.reduce((sum, expenses) => {
            return sum + expenses.amount
        }, 0);

        return <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expensesTotal={expensesTotal}/>
            <ExpensesList expenses={expenses}/>
        </View>
    } else
        return <View style={[GlobalStyles.screen, styles.noDataContainer]}><Text style={styles.noDataText}>No Data available</Text></View>
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    noDataText: {
        color: GlobalStyles.colors.primary100,
        fontSize: 24,
        textAlign: 'center'
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary700,
    }
});