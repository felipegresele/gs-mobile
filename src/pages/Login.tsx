import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Text, TouchableOpacity, View } from "react-native"
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
    const {reset, register, handleSubmit, formState: {errors}, getValues, control } = useForm<FormData>({})

        async function handleSign(data: FormData) {
        try {
            const response = await fetch("http://localhost/8080/api/usuario", {
                method: "JSON",
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
        <View>
            <Text>Login:</Text>
            <View>
                <Text>Usuário:</Text>
                <Controller 
                    name="username"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite seu usuário:"
                        onChangeText={onChange}
                        value={value}
                        />
                    )}
                />
                {errors?.username && <Text>Usuário é obrigatório</Text>}
                <Text>Senha:</Text>
                <Controller 
                    name="password"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite a senha:"
                        onChangeText={onChange}
                        value={value}
                        />
                    )}
                />
                {errors?.username && <Text>Senha é obrigatório</Text>}
                <Text>Email:</Text>
                <Controller 
                    name="email"
                    control={control}
                    rules={{required: true}}
                    render={({field: {onChange, value} }) => (
                        <TextInput 
                        placeholder="Digite o email:"
                        onChangeText={onChange}
                        value={value}
                        />
                    )}
                />
                {errors?.username && <Text>Email é obrigatório</Text>}
                <TouchableOpacity onPress={() => navigation}>
                    <Text>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login