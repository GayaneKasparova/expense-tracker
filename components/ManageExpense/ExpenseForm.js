import {StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../util/date";
import { useState } from "react";
import Button from "../UI/Button";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({defaultValues, onConfirm, onCancel}) => {
    const today = new Date();

    const [inputs, setInputs] = useState({
        amount: {
            value: `${defaultValues?.amount?.toFixed(2) || ''}`,
            isValid: true
        },
        date: {
            value: defaultValues?.date ? getFormattedDate(defaultValues.date) : getFormattedDate(today),
            isValid: true
        },
        description: {
            value: defaultValues?.description || '',
            isValid: true
        }
    });

    const inputChange = (inputIdentifier, enteredValue) => {
        setInputs((curInputValues) => ({
                ...curInputValues,
                [inputIdentifier]: {
                    value: enteredValue,
                    isValid: true
                }
            })
        );
    }

    const onSubmit = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !!isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData?.description?.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: {
                        value: curInputs.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: curInputs.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: curInputs.description,
                        isValid: descriptionIsValid
                    }
                }
            })
            return;
        }
        onConfirm(inputs)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View>
            <View style={styles.form}>
                <View style={styles.inputsRow}>
                    <Input label={"Amount"}
                           invalid={!inputs.amount.isValid}
                           textInputConfig={{
                               keyboardType: 'decimal-pad',
                               onChangeText: (enteredValue) => inputChange('amount', enteredValue),
                               defaultValue: defaultValues?.amount?.toFixed(2) || '',
                               value: inputs.amount.value,
                               autoFocus: !defaultValues
                           }}
                           style={{flex: 1}}
                    />
                    {!inputs.amount.isValid}
                    <Input label={"Date"}
                           invalid={!inputs.date.isValid}
                           textInputConfig={{
                               placeholder: 'YYYY-DD-MM',
                               onChangeText: (enteredValue) => inputChange('date', enteredValue),
                               maxLength: 10,
                               defaultValue: defaultValues?.date ? getFormattedDate(defaultValues?.date) : getFormattedDate(today),
                               value: inputs.date.value
                           }}
                           style={{flex: 1}}
                    />
                </View>

                <Input label={"Description"}
                       invalid={!inputs.description.isValid}
                       textInputConfig={{
                           multiline: true,
                           onChangeText: (enteredValue) => inputChange('description', enteredValue),
                           defaultValue: defaultValues.description,
                           value: inputs.description.value,
                       }}
                />
            </View>

            {
                formIsInvalid && <View style={styles.errContainer}>
                    <Text style={styles.errText}>Invalid</Text>
                </View>
            }

            <View style={styles.actionButtons}>
                <Button mode={"flat"} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={onSubmit} style={styles.button}>{defaultValues ? 'Update' : 'Add'}</Button>
            </View>

        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 80
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    actionButtons: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errContainer: {
        margin: 4,
        padding: 10,
        borderRadius: 6,
        backgroundColor: GlobalStyles.colors.error50,
    },
    errText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500
    }

})