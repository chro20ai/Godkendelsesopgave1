import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const AddEditFood = ({navigation,route}) => {

    const initialState = {
        ingredient1: '',
        ingredient2: '',
        ingredient3: '',
        ingredient4: ''
    }

    const [newFood,setNewFood] = useState(initialState);

    /*Returnere true, hvis vi er på edit food*/
    const isEditFood = route.name === "Edit Food";

    useEffect(() => {
        if(isEditFood){
            const food = route.params.food[1];
            setNewFood(food)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewFood(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewFood({...newFood, [name]: event});
    }

    const handleSave = () => {

        const { ingredient1, ingredient2, ingredient3, ingredient4 } = newFood;

        if(ingredient1.length === 0 || ingredient2.length === 0 || ingredient3.length === 0 || ingredient4.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditFood){
            const id = route.params.food[0];
            try {
                firebase
                    .database()
                    .ref(`/Food/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ ingredient1, ingredient2, ingredient3, ingredient4 });
                // Når food er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const food = [id,newFood]
                navigation.navigate("Food Details",{food});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Food/')
                    .push({ ingredient1, ingredient2, ingredient3, ingredient4 });
                Alert.alert(`Saved`);
                setNewFood(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newFood[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit food, vis save changes i stedet for add food*/}
                <Button title={ isEditFood ? "Save changes" : "Add food"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddEditFood;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});