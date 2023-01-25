import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button, Text, View, TextInput, Switch, Image } from 'react-native';
import imgs from './img/thestocks.jpg';

export default function App() {
    const [isEnabled, setIsEnabled] = useState(null);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [edad, setEdad] = useState(null);
    const [correo, setCorreo] = useState("");
    const [texto, setText] = useState('');
    const [validanombre, setValidaNombre] = useState(true);
    const [validaapellido, setValidaApellidos] = useState(true);
    const [validaedad, setValidaEdad] = useState(true);
    const [validacorreo, setValidaCorreo] = useState(true);


    function validarNombre(nombre) {
        const reg = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if (reg.test(nombre)) {
            setValidaNombre(true);
        } else {
            setValidaNombre(false);
        }
        setNombre(nombre)
        if (nombre == "")
            setValidaNombre(true)
    }

    function validarApellidos(apellidos) {
        const reg = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if (reg.test(apellidos)) {
            setValidaApellidos(true);
        } else {
            setValidaApellidos(false);
        }
        setApellidos(apellidos)
        if (apellidos == "")
            setValidaApellidos(true)
    }

    function validarEdad(edad) {
        const reg = /^[0-9]+$/;
        if (reg.test(edad)) {
            setValidaEdad(true);
        } else {
            setValidaEdad(false);
        }
        setEdad(edad);
        if (edad == null)
            setValidaEdad(true)
    }

    function validarCorreo(correo) {
        const reg = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,40})+$/;
        if (reg.test(correo)) {
            setValidaCorreo(true);

        } else {
            setValidaCorreo(false);

        }
        setCorreo(correo);
        if (correo == "")
            setValidaCorreo(true)
    }

    const printText = () => {


        if (nombre != '' && correo != '' && edad != '' && apellidos != '' && validacorreo == true && validaedad == true && validanombre == true && validaapellido == true) {
            setText(`Mi nombre es ${nombre} ${apellidos} tengo ${edad} años, y mi correo es ${correo}. Sexo: ${isEnabled ? "Mujer" : "Hombre"}`)
            alert("El formulario se ha enviado correctamente.")
        } else {
            alert("Los campos estan incorrectos,rellene de nuevo")
        }
    }

    const reseTear = () => {
        setText("")
        setNombre("")
        setApellidos("")
        setEdad("")
        setCorreo("")
        setValidaNombre(true)
        setValidaApellidos(true)
        setValidaEdad(true)
        setValidaCorreo(true)
    }
    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Formulario</Text>
            <Separator />
            <View style={styles.campos}>
                <Text style={styles.texto}>Nombre</Text>
                <TextInput
                    style={validanombre ? (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'black' }
                    ) : (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'red' }
                    )
                    }
                    placeholder="Nombre"
                    keyboardType="name-phone-pad"
                    onChangeText={nombre => validarNombre(nombre)}
                    value={nombre}
                />
            </View>
            <View style={styles.campos}>
                <Text style={styles.texto}>Apellidos</Text>
                <TextInput
                    style={validaapellido ? (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'black' }
                    ) : (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'red' }
                    )
                    }
                    placeholder="Apellidos"
                    keyboardType="default"
                    onChangeText={apellidos => validarApellidos(apellidos)}
                    value={apellidos}
                />
            </View>
            <View style={styles.campos}>
                <Text style={styles.texto}>Edad</Text>
                <TextInput
                    style={validaedad ? (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'black' }
                    ) : (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'red' }
                    )
                    }
                    placeholder="Edad"
                    keyboardType="numeric"
                    onChangeText={edad => validarEdad(edad)}
                    value={edad}
                />
            </View>
            <View style={styles.campos}>
                <Text style={styles.texto}>Correo</Text>
                <TextInput
                    style={validacorreo ? (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'black' }
                    ) : (
                        { borderWidth: 2, height: 35, width: 210, borderColor: 'red' }
                    )
                    }
                    placeholder="correo"
                    keyboardType="email-address"
                    onChangeText={correo => validarCorreo(correo)}
                    value={correo}
                />
            </View>
            <View style={styles.campos}>
                <Text style={styles.textoSexo}>Hombre</Text>
                <Switch
                    trackColor={{ false: 'red', true: 'blue' }}
                    thumbColor={isEnabled ? 'blue' : 'red'}
                    onValueChange={() => setIsEnabled((previousState) => !previousState)}
                    value={isEnabled}
                />
                <Text style={styles.textoSexo}>Mujer</Text>
            </View>
            <Separator />
            <View style={styles.fixToText}>
                <Button
                    onPress={printText}
                    title={"Enviar"}
                />
                <Button
                    onPress={reseTear}
                    title={"Reset formulario"}
                />
            </View>
            <View>
                <Text>{texto}</Text>
                {texto === '' ? null : <Image style={styles.imagen} source={imgs} />}
            </View>
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 30,
        marginRight: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    texto: {
        color: 'black',
        fontSize: 20,
        width: 100,
       
        
    },
    textoSexo: {
        color: 'black',
        fontSize: 20,
        width: 100,
        textAlign: "center",
        marginLeft: 15
       
        
    },
    campos: {
        flexDirection: 'row',
        marginVertical: 10,
        marginLeft:1
       
    },
    title: {
        color: 'black',
        fontSize: 50,
        width: 300,
        marginRight: 20,
        backgroundColor: 'blue',
        textAlign: "center",

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20
    },
    textoNombre: {
        color: 'blue',
        fontSize: 20,
        paddingTop: 50
    },

    textoschitch: {
        color: 'black',
        fontSize: 20,
        width: 100,
        textAlign: "center",
    },
    imagen: {

        width: "100%",
        height: 200
    },
    input: {
        height: 35,
        width: 210,
        borderWidth: 1,
        padding: 0,
    }
})