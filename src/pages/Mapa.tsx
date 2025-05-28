import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type Props = NativeStackScreenProps<RootStackParamList, "Mapa">;

function Mapa({ navigation }: Props) {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão negada para acessar a localização");
        Alert.alert("Permissão negada", "Ative a localização para usar o app");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(loc.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  const usarRegiao = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const abrigos = [
    {
      id: "abrigo1",
      nome: "Abrigo Escola A",
      latitude: location.latitude + 0.01,
      longitude: location.longitude - 0.01,
    },
    {
      id: "abrigo2",
      nome: "Centro Comunitário",
      latitude: location.latitude - 0.015,
      longitude: location.longitude + 0.012,
    },
    {
        id: "abrigo3",
        nome: "Igreja São João",
        latitude: location.latitude - 0.07,
        longitude: location.longitude + 0.05,
    },
    {
        id: "abrigo4",
        nome: "Clube Recreativo",
        latitude: location.latitude - 0.02,
        longitude: location.longitude + 0.03,
    },
  ];

  const alertas = [
    {
      id: "alerta1",
      descricao: "Foco de incêndio na mata",
      latitude: location.latitude + 0.012,
      longitude: location.longitude + 0.004,
    },
    {
      id: "alerta2",
      descricao: "Forte fumaça em um edifício",
      latitude: location.latitude + 0.07,
      longitude: location.latitude + 0.04,
    }
  ];

  const incendios = [
    {
        id: "incendio1",
        descricao: "Incêndio em edifício",
        status: "Forte",
        nivel: 3,
        precisaResgaste: true,
        pessoasAfetadas: 3,
        tipo: "Urbano",
        registradoPor: "usuario123",
        dataHora: new Date().toISOString(),
        fase: "Em andamento",
        latitude: -23.5505,
        longitude: -46.6333,
    },
    {
        id: "incendio2",
        descricao: "Fogo em área de vegetação",
        status: "Moderado",
        nivel: 2,
        precisaResgaste: false,
        pessoasAfetadas: 0,
        tipo: "Florestal",
        registradoPor: "usuario456",
        dataHora: new Date().toISOString(),
        fase: "Sob controle",
        latitude: -23.5520,
        longitude: -46.6300,
    },
    {
        id: "incendio3",
        descricao: "Explosão em galpão industrial",
        status: "Crítico",
        nivel: 5,
        precisaResgaste: true,
        pessoasAfetadas: 12,
        tipo: "Industrial",
        registradoPor: "equipe_bombeiros",
        dataHora: new Date().toISOString(),
        fase: "Não iniciado",
        latitude: -23.5490,
        longitude: -46.6360,
    },
    {
        id: "incendio4",
        descricao: "Incêndio em residência",
        status: "Leve",
        nivel: 1,
        precisaResgaste: false,
        pessoasAfetadas: 1,
        tipo: "Residencial",
        registradoPor: "usuario789",
        dataHora: new Date().toISOString(),
        fase: "Extinto",
        latitude: -23.5535,
        longitude: -46.6380,
    }
  ]

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={usarRegiao} showsUserLocation={true}>
        {abrigos.map((abrigo) => (
          <Marker
            key={abrigo.id}
            coordinate={{
              latitude: abrigo.latitude,
              longitude: abrigo.longitude,
            }}
            title={abrigo.nome}
            description="Abrigo disponível"
            pinColor="green"
          />
        ))}

        {alertas.map((alerta) => (
          <Marker
            key={alerta.id}
            coordinate={{
              latitude: alerta.latitude,
              longitude: alerta.longitude,
            }}
            title="Alerta de incêndio"
            description={alerta.descricao}
            pinColor="red"
          />
        ))}

        {incendios.map((incendio) => (
            <Marker 
             key={incendio.id}
             coordinate={{
                latitude: incendio.latitude,
                longitude: incendio.longitude,
             }}
            />
             
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Mapa;
