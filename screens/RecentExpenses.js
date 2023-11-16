import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect } from "react"
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

    useEffect(() => {
            const getExpenses = async () => {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            }
            getExpenses();
    }, []);


    return (
        <View style={GlobalStyles.screen}>
            <ExpensesOutput expensesPeriod={'Last 7 days'} expenses={recentExpenses}/>
        </View>
    )
}

export default RecentExpenses