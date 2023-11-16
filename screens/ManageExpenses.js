import { StyleSheet, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

const ManageExpenses = ({navigation, route}) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const expensesCtx = useContext(ExpensesContext);
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit expense' : 'Add an expense'
        })
    }, [navigation, isEditing]);

    const onDelete = async () => {
        await deleteExpense(expenseId);
        expensesCtx.deleteExpense(expenseId);
        navigation.goBack();
    }

    const onCancel = () => {
        navigation.goBack();
    }

    const onConfirm = async (inputValues) => {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }
        if (isEditing) {
            expensesCtx.updateExpense(expenseId, expenseData);
            updateExpense(expenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id});
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm defaultValues={isEditing && selectedExpense} isEditing={isEditing} onConfirm={onConfirm} onCancel={onCancel}/>
            {
                isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton icon={"trash"} size={36} color={GlobalStyles.colors.error500} onPress={onDelete}/>
                </View>
            }
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        backgroundColor: GlobalStyles.colors.primary800,
        justifyContent: 'space-between'
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});