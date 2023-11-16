import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => {},
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id, {description, amount, date}) => {},
    deleteExpense: (id) => {}
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload.reverse();
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            const targetIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const expenseToUpdate = state[targetIndex];
            const updatedItem = {...expenseToUpdate, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[targetIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default: return state;
    }
}
const ExpensesContextProvider = ({children}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const setExpenses = (expenses) => {
        dispatch({ type: 'SET', payload: expenses })
    }

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }
    const updateExpense = (id, expenseData) => {
        dispatch({ type: 'UPDATE', payload: {id: id, expenseData: expenseData} });
    }
    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE', payload: id });
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;



