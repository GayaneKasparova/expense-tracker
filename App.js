import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenses from "./screens/ManageExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

export default function App() {
    const Stack = createNativeStackNavigator();
    const BottomTabs = createBottomTabNavigator();

    const ExpensesOverview = () => (
        <BottomTabs.Navigator screenOptions={({navigation}) => ({
            headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',
            tabBarStyle: {
                backgroundColor: GlobalStyles.colors.primary500
            },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarInactiveTintColor: 'white',
            headerRight: ({tintColor}) => <IconButton icon={'add'}
                                                      color={tintColor}
                                                      size={24} onPress={() => {
                navigation.navigate('ManageExpenses')
            }
            }/>
        })}>
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({color, size}) => <Ionicons name="hourglass-outline" size={size} color={color}/>
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All',
                    tabBarIcon: ({color, size}) => <Ionicons name="calendar-outline" size={size} color={color}/>
                }}
            />
        </BottomTabs.Navigator>
    )

    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                        headerTintColor: 'white'
                    }}>
                        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview}
                                      options={{headerShown: false}}/>
                        <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={({navigation}) => ({
                            presentation: "modal",
                            headerRight: ({tintColor}) => <IconButton icon={'close'}
                                                                      color={tintColor}
                                                                      size={24} onPress={() => {
                                navigation.goBack()
                            }}/>
                        })}/>

                    </Stack.Navigator>
                </NavigationContainer>
            </ExpensesContextProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
