import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const FoodList = ({navigation}) => {

    const [food1,setFood] = useState()

    useEffect(() => {
        if(!food1) {
            firebase
                .database()
                .ref('/Food')
                .on('value', snapshot => {
                    setFood(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!food1) {
        return <Text>Nothing to show</Text>;
    }

    const handleSelectFood = id => {
        /*Her søger vi direkte i vores array af food og finder food objektet som matcher idet vi har tilsendt*/
        const food = Object.entries(food1).find( food => food[0] === id /*id*/)
        navigation.navigate('Food Details', { food });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores food objekt, og bruger som array til listen
    const foodArray = Object.values(food1);
    const foodKeys = Object.keys(food1);

    return (
        <FlatList
            data={foodArray}
            // Vi bruger foodKeys til at finde ID på den aktuelle food og returnerer dette som key, og giver det med som ID til FoodListItem
            keyExtractor={(item, index) => foodKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectFood(foodKeys[index])}>
                        <Text>
                            {item.ingredient1} {item.ingredient2}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default FoodList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});