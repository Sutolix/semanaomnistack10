import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout }  from 'react-native-maps';
    //pede permissão de acesso       pega a localização
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';


function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    //Responsavel por carregar a posição inicial
    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }

        }

        loadInitialPosition();
    }, []);

    //Responsavel por monitorar a variavel devs e disparar a função subscribeToNewDevs quando ela mudar
    useEffect(() => {
                                        //copia os existentes e adiciona o novo dev
        subscribeToNewDevs(dev =>setDevs([...devs, dev]));
    }, [devs]);

    //Responsavel pela exibição de novos devs no mapa em tempo real
    function setupWebsocket(){
        //Pra desconectar a conexão anterior para não ficar com conexões execessivas
        disconnect();

        const { latitude, longitude } = currentRegion;
        
        connect(
            latitude,
            longitude,
            techs,
        );
    }

    //Responsavel pela pesquisa dos devs
    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
    
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

     setDevs(response.data.devs);
     setupWebsocket();
    }

    //Preenche o estado toda vez que o usuário mexer na tela
    function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    //Se o usuário não permitir o uso do gps o mapa não aparece
    if(!currentRegion) {
        return null;
    }

    
    
    //Responsavel pela exibição do mapa
    //Callout -> O que aparece quando clica no dev
    return (
        <>
        <MapView
            onRegionChangeComplete={handleRegionChange}
            initialRegion={currentRegion} 
            style={style.map}
        >

            {devs.map(dev => (
                <Marker
                    key={dev.id}
                    coordinate={{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1],
                }}>
                    <Image
                        style={StyleSheet.avatar}
                        source={{ uri: dev.avatar_url }}
                    />

                    <Callout onPress={() => {
                         //navegação
                        navigation.navigate('Profile', { github_username: dev.github_username });
                    }}>
                    <View style={StyleSheet.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>

                    </Callout>
                </Marker>
            ))}

        </MapView>
    
        <View style={styles.searchForm}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words" //primeira letra em caixa alta
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />

            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>

        </View>    
        </>
    );
}

//Estilização
const style = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRdius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }


})

export default Main;