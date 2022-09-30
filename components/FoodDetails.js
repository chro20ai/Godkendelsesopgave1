import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const FoodDetails = ({route,navigation}) => {
    const [food,setFood] = useState({});

    useEffect(() => {
        /*Henter food values og sætter dem*/
        setFood(route.params.food[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setFood({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditFood skærmen og sender food videre med
        const food = route.params.food
        navigation.navigate('Edit Food', { food });
    };

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the food?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter den aktuelle food
    const  handleDelete = () => {
        const id = route.params.food[0];
        try {
            firebase
                .database()
                // Vi sætter food ID ind i stien
                .ref(`/Food/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!food) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(food).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores food keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores food values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default FoodDetails;


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});