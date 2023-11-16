import { FlatList, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({expenses}) => (
     <View>
        <FlatList
            data={expenses}
            renderItem={({item}) => <ExpenseItem {...item}/>}
            keyExtractor={(item) => item.id}
        />
    </View>
)

export default ExpensesList