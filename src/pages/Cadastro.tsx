import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Controller, useForm } from "react-hook-form"
import { Text, View } from "react-native"
import { RootStackParamList } from "../types/routes"
import { TextInput } from "react-native-gesture-handler"

export interface FormData {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
}

type Props= NativeStackScreenProps<RootStackParamList, "Cadastro">

function Cadastro({ navigation }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Dados do formulário: ", data);
    };

    const password = watch("password"); 

    return (
        <View style={{ padding: 20 }}>
            <Text>Bem-vindo(a)</Text>
            <View>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: "Usuário é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text>Usuário</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Digite seu usuário"
                                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                            />
                        </View>
                    )}
                />
                {errors?.username && <Text style={{ color: 'red' }}>{errors.username.message}</Text>}

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Senha é obrigatória",
                        maxLength: {
                            value: 10,
                            message: "A senha não pode ter mais de 10 caracteres",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text>Senha</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Digite sua senha"
                                secureTextEntry
                                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                            />
                        </View>
                    )}
                />
                {errors?.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: "Confirmação de senha é obrigatória",
                        validate: (value) =>
                            value === password || "As senhas não coincidem",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text>Confirmar Senha</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Confirme sua senha"
                                secureTextEntry
                                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                            />
                        </View>
                    )}
                />
                {errors?.confirmPassword && (
                    <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>
                )}

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email é obrigatório",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email inválido",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <Text>Email</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Digite seu email"
                                keyboardType="email-address"
                                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                            />
                        </View>
                    )}
                />
                {errors?.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

                <View style={{ marginTop: 20 }}>
                    <Text
                        onPress={handleSubmit(onSubmit)}
                        style={{
                            textAlign: "center",
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        Cadastrar
                    </Text>
                </View>
            </View>
        </View>
    );
}


export default Cadastro