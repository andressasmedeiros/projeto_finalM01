import { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import MapView, { Marker, Polyline } from 'react-native-maps'
import { RouteProp, useRoute } from '@react-navigation/native';
import { Filial } from '../../types';
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";


type TelaMapaNavigationProp = StackNavigationProp<RootStackParamList, 'TelaMapa'>;

const TelaMapa = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'TelaMapa'>>();
    const [origem, setOrigem] = useState<Filial | null>(null);
    const [destino, setDestino] = useState<Filial | null>(null);
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [rota, setRota] = useState([])

    const getCoordinates = () => {
        if (!origem || !destino) {
            return []
        }
        return [
            origem, destino
        ]
    }

    useEffect(() => {
        if (route.params) {
            setOrigem(route.params?.origem);
            setDestino(route.params?.destino);
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <MapView style={styles.map}
                initialRegion={
                    {
                        latitude: origem ? origem.latitude : -7.5529504, 
                        longitude: origem ? origem.longitude : -48.8832875, 
                        latitudeDelta: 15,
                        longitudeDelta: 15
                    }
                }>
                {origem ? (
                    <Marker
                        key={origem.nome}
                        coordinate={{
                            latitude: origem.latitude,
                            longitude: origem.longitude
                        }}
                        title={origem.nome}
                        description={origem.nome}
                    />
                ) : null}
                {destino ? (
                    <Marker
                        key={destino.nome}
                        coordinate={{
                            latitude: destino.latitude,
                            longitude: destino.longitude
                        }}
                        title={destino.nome}
                        description={destino.nome}
                    />
                ) : null}
                <Polyline
                    coordinates={getCoordinates()}
                    strokeColor="#000"
                    strokeColors={['#7F0000']}
                    strokeWidth={6}
                />
            </MapView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default TelaMapa;