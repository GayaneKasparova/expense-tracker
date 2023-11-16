import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({icon, size, color, onPress}) => (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>
)

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        marginHorizontal: 8,
        marginVertical: 2,
        padding: 6
    },
    pressed: {
        opacity: 0.75
    }
})