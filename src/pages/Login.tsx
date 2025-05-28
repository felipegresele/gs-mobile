import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { RootStackParamList } from "../types/routes"

export interface FormData {
        username: string,
        email: string,
        password: string,
    }

type Props = NativeStackScreenProps<RootStackParamList, "Login">

function Login( {navigation}: Props ) {
    const [form, setForm] = useState<FormData[]>([])
    const {reset, register, handleSubmit, formState: {errors}, getValues, control } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })

        async function handleSign(data: FormData) {
        try {
            const response = await fetch("http://localhost/8080/api/usuario", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }, 
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                throw new Error("Erro ao cadastrar");
            }
            const result = await response.json()
            Alert.alert("Usuário cadastrado com sucesso!")
            reset()
        } catch(error) {
            console.error("Erro ao fazer a requisição", error)
            Alert.alert("Erro ao fazer a requisição!")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <Text style={{fontSize: 20}}>Usuário:</Text>
                <Controller 
                    name="username"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite seu usuário:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.username && <Text>{errors.username.message || "Usuário é obrigatório"}</Text>}
                <Text style={{fontSize: 20}}>Senha:</Text>
                <Controller 
                    name="password"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite a senha:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.password && <Text>{errors.password.message || "Senha é obrigatório"} </Text>}
                <Text style={{fontSize: 20}}>Email:</Text>
                <Controller 
                    name="email"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite o email:"
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        />
                    )}
                />
                {errors?.email && <Text>{errors.email.message || "Email é obrigatório"}</Text>}
                <TouchableOpacity onPress={() => navigation} style={styles.btn}>
                    <Text style={styles.btnText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 30,
    },
    input: {
        width: 250,
        height: 50,
        backgroundColor: "#F6F2F2",
        marginBottom: 20,
        marginTop: 5,
    },
    btn: {
        marginTop: 20,
        width: 215,
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange",
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
})