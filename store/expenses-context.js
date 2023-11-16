import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'coffee',
        amount: 3.25,
        date: new Date('2022-1-1')
    },
    {
        id: 'e3',
        description: 'bananas',
        amount: 6.00,
        date: new Date('2021-1-1')
    },
    {
        id: 'e4',
        description: 'pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e5',
        description: 'coffee',
        amount: 3.25,
        date: new Date('2022-1-1')
    },
    {
        id: 'e6',
        description: 'bananas',
        amount: 6.00,
        date: new Date('2021-1-1')
    },
    {
        id: 'e7',
        description: 'pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e8',
        description: 'coffee',
        amount: 3.25,
        date: new Date('2022-1-1')
    },
    {
        id: 'e9',
        description: 'bananas',
        amount: 6.00,
        date: new Date('2021-1-1')
    },
    {
        id: 'e10',
        description: 'pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e11',
        description: 'coffee',
        amount: 3.25,
        date: new Date('2022-1-1')
    },
    {
        id: 'e12',
        description: 'bananas',
        amount: 6.00,
        date: new Date('2021-1-1')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id, {description, amount, date}) => {},
    deleteExpense: (id) => {}
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id }, ...state];
        case 'UPDATE':
            const targetIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const expenseToUpdate = state[targetIndex];
            const updatedItem = {...expenseToUpdate, ...action.payload.expenseData};
            const updatedExpenses = [...state];
            updatedExpenses[targetIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id);
        default: return state;
    }
}
const ExpensesContextProvider = ({children}) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;



