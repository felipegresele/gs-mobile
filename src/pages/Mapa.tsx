import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/routes";
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {getAbrigos, getAlertas, getIncendios} from "../types/mockData"

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

  const abrigos = getAbrigos(location.latitude, location.longitude);
  const alertas = getAlertas(location.latitude, location.longitude);
  const incendios = getIncendios(location.latitude, location.longitude);

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Incêndio +</Text>  
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.button, styles.dashboardButton]}
            onPress={() => navigation.navigate("Dashboard")}
        >
            <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
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
                title={`Incêndio: ${incendio.tipo}`}
                description={`${incendio.descricao} - Status: ${incendio.status} - Fase: ${incendio.fase}`}
                pinColor="#FF6B00"
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
  topButtons: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  dashboardButton: {
    backgroundColor: "#0066CC",
  },
  
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Mapa;
