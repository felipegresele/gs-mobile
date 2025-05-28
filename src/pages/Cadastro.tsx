import { useForm } from "react-hook-form"
import { Text, View } from "react-native"

export interface FormData {
    username: string,

    
}

function Cadastro() {
    const {reset, register, handleSubmit, setValue, formState: { errors }} = useForm()

    return(
        <View>
            <Text>Bem-vindo</Text>

        </View>
    )
}

export default Cadastro