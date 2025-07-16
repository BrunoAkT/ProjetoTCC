import { ActivityIndicator, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from "react";

const SUA_CHAVE_GEMINI = ''

function Exercise(params) {

    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [visible, setVisible] = useState(true);
    const onClose = () => {
        setVisible(false);
    };

    async function gerarExplicacaoIA() {
        setCarregando(true);
        try {
            const prompt = `Explique de forma clara e breve o que é a atividade "${params.nome}" e quais são seus benefícios para reduzir estresse e ansiedade.`;

            const respostaAPI = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${SUA_CHAVE_GEMINI}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );

            const data = await respostaAPI.json();
            const textoGerado = data.candidates?.[0]?.content?.parts?.[0]?.text;
            setVisible(true);
            setResposta(textoGerado || 'Nenhuma resposta gerada.');
        } catch (err) {
            console.error('Erro ao gerar explicação:', err);
            setResposta('Erro ao gerar explicação.');
        }
        setCarregando(false);
    }

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.text}>{params.nome}</Text>
                <View style={styles.buttonplay}>
                    <Ionicons name="caret-forward-sharp" size={30} />
                    <Text style={styles.textbutton}>{params.duracao} min</Text>
                </View>
            </View>
            <View style={styles.image}>

            </View>
            <TouchableOpacity style={styles.information} onPress={gerarExplicacaoIA}>
                <Ionicons name="help-circle-outline" size={40} />

            </TouchableOpacity>

            {carregando && <ActivityIndicator/>}

            {resposta !== '' && (
                <Modal
                    transparent
                    visible={visible}
                    animationType="fade"
                    onRequestClose={onClose}
                >
                    <View style={styles.overlay}>
                        <View style={styles.content}>
                            <TouchableOpacity style={styles.close} onPress={onClose}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                            <ScrollView>
                                <Text style={styles.textAnwser}>{resposta}</Text>
                            </ScrollView>
                        </View>
                    </View>

                </Modal>
            )
            }
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        backgroundColor: Colors.green,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        marginBottom: 30,
    },
    text: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.xl,
        flexWrap: 'wrap',
    },
    buttonplay: {
        backgroundColor: Colors.gray,
        elevation: 10,
        width: 120,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textbutton: {
        fontFamily: Fonts_Styles.PoppinsSemiBold,
        fontSize: Fonts_Size.lg,
        lineHeight: Fonts_Size.lg
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 1,
        right: 15,
    },
    information: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    containerText: {
        marginRight: 10,
        width: '60%',
    },
    answerContainer: {
        backgroundColor: Colors.gray,
        padding: 10,
        width: 300,
        position: 'absolute',
        zIndex: 999,
    },
    textAnwser: {
        fontFamily: Fonts_Styles.PoppinsRegular,
        fontSize: Fonts_Size.md,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: '90%',
        height: '90%',
    },
    close:{
        alignItems: 'flex-end',
    }
})

export default Exercise