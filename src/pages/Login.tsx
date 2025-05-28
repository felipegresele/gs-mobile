import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Alert, Text, View } from "react-native"

export interface FormData {
        username: string,
        email: string,
        password: string,
    }
function Login() {
    const [form, setForm] = useState<FormData[]>([])
    const {reset, register, handleSubmit, formState: {errors}, getValues } = useForm<FormData>({})

        async function handleSign() {
        try {
            const response = await fetch("http://localhost/8080/api/usuario", {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }, 
                
                //body: JSON.stringify(data)
            })
            const data = await response.json()
            setForm(data)
        } catch(error) {
            console.error("Erro ao fazer a requisição", error)
            Alert.alert("Erro ao fazer a requisição!")
        }
    }
    
    useEffect(() => {
        handleSign()
    }, [])

    return(
        <View>
            <Text>Login</Text>
            <View>
                {form.map((item, index) => (
                    <View>
                        <Text>{item.username}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default Login