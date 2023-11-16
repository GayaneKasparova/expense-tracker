import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

    return (
        <View style={GlobalStyles.screen}>
            <ExpensesOutput expensesPeriod={'Last 7 days'} expenses={recentExpenses}/>
        </View>
    )
}

export default RecentExpenses