import { View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <View style={GlobalStyles.screen}>
            <ExpensesOutput expensesPeriod={'Total'} expenses={expensesCtx.expenses}/>
        </View>
    )
}

export default AllExpenses