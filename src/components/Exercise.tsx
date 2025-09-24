import { ActivityIndicator, Button, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors, Fonts_Size, Fonts_Styles } from "../constants/theme"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useRef, useState } from "react";
import api from "../constants/api";
import YoutubePlayer from "react-native-youtube-iframe";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";


// const SUA_CHAVE_GEMINI = 'AIzaSyDLF2dqusYqGGxF77HsMzgxaWjOjid4sC4'
const window = Dimensions.get('window');

function Exercise(params) {

    const [resposta, setResposta] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [visibleDescription, setVisibleDescription] = useState(true);
    const onCloseDescription = () => {
        setVisibleDescription(false);
    };
    const [handleVisible, setHandleVisible] = useState(false);
    const url = params.video;
    const [videoId, setVideoId] = useState(null);
    const [startSeconds, setStartSeconds] = useState(0);

    const preview = params.img ? `${api.defaults.baseURL}/uploads/${params.img || ""}` : null;
    const audio = params.audio ? `${api.defaults.baseURL}/uploads/${params.audio || ""}` : null;


    // async function gerarExplicacaoIA() {
    //     setCarregando(true);
    //     try {
    //         const prompt = `Explique de forma clara e breve o que é a atividade "${params.nome}" e quais são seus benefícios para reduzir estresse e ansiedade.`;

    //         const respostaAPI = await fetch(
    //             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${SUA_CHAVE_GEMINI}`,
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     contents: [{ parts: [{ text: prompt }] }],
    //                 }),
    //             }
    //         );

    //         const data = await respostaAPI.json();
    //         const textoGerado = data.candidates?.[0]?.content?.parts?.[0]?.text;
    //         setVisible(true);
    //         setResposta(textoGerado || 'Nenhuma resposta gerada.');
    //     } catch (err) {
    //         console.error('Erro ao gerar explicação:', err);
    //         setResposta('Erro ao gerar explicação.');
    //     }
    //     setCarregando(false);
    // }

    function extrairIdETempo(urlStr: string | URL) {
        try {
            const url = new URL(urlStr);

            let videoId = null;
            let seconds = null;

            // Primeiro, extrai o parâmetro 'v' se existir
            if (url.searchParams.has('v')) {
                videoId = url.searchParams.get('v');
            } else {
                // Caso URL seja do tipo /live/{id} ou /shorts/{id} ou youtu.be/{id}
                // Então podemos extrair do pathname
                const path = url.pathname; // ex: "/live/hplFqaANsFw" ou "/hplFqaANsFw"
                const parts = path.split('/');
                // filtrar partes vazias
                const candidates = parts.filter(p => p && p.length > 0);
                if (candidates.length > 0) {
                    videoId = candidates[candidates.length - 1];
                }
            }

            // Agora extrair tempo de início
            if (url.searchParams.has('t')) {
                seconds = url.searchParams.get('t');
            } else if (url.hash) {
                // Também pode vir algo como "#t=258s" ou "#t=1m30s"
                const hash = url.hash; // ex: "#t=258s"
                const match = hash.match(/t=(\d+)(s)?/);
                if (match) {
                    seconds = match[1];
                }
            }

            return {
                id: videoId,
                startSeconds: seconds ? parseInt(seconds, 10) : 0
            };
        } catch (err) {
            console.error("URL inválida:", err);
            return null;
        }
    }
    useEffect(() => {
        if (url) {
            const videoData = extrairIdETempo(url);
            setVideoId(videoData?.id);
            setStartSeconds(videoData?.startSeconds || 0);
        }
    }, [url])



    const [sound, setSound] = useState(null);
    const [status, setStatus] = useState({
        isPlaying: false,
        positionMillis: 0,
        durationMillis: 1,
    });

    useEffect(() => {
        loadAudio();

        return () => {
            if (sound) sound.unloadAsync();
        };
    }, [audio]);

    const loadAudio = async () => {
        const { sound: audioSound, status: audioStatus } = await Audio.Sound.createAsync(
            { uri: audio },
            { shouldPlay: false },
            onPlaybackStatusUpdate
        );
        setSound(audioSound);
        setStatus(audioStatus);
    };

    const onPlaybackStatusUpdate = (playbackStatus) => {
        if (!playbackStatus.isLoaded) return;
        setStatus({
            isPlaying: playbackStatus.isPlaying,
            positionMillis: playbackStatus.positionMillis,
            durationMillis: playbackStatus.durationMillis,
        });
    };

    const togglePlayPause = async () => {
        if (!sound) return;
        if (status.isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const formatTime = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const onSlide = async (value) => {
        if (!sound) return;
        await sound.setPositionAsync(value);
    };

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => setHandleVisible(true)}>

                <View style={styles.containerText}>
                    <Text style={styles.text}>{params.nome}</Text>
                    <View style={styles.buttonplay}>
                        <Ionicons name="caret-forward-sharp" size={30} />
                        <Text style={styles.textbutton}>{params.duracao} min</Text>
                    </View>
                </View>
                <View style={styles.image}>
                    {preview ? (
                        <Image
                            source={{ uri: preview }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <Text style={{ borderWidth: 1 }}>No Image Available</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.information} onPress={/*gerarExplicacaoIA*/ () => { setVisibleDescription(true); setResposta(params.descricao) }}>
                    <Ionicons name="help-circle-outline" size={40} />

                </TouchableOpacity>

                {carregando && <ActivityIndicator />}

                {resposta !== '' && (
                    <Modal
                        transparent
                        visible={visibleDescription}
                        animationType="fade"
                        onRequestClose={onCloseDescription}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.content}>
                                <TouchableOpacity style={styles.close} onPress={onCloseDescription}>
                                    <Ionicons name="close" size={24} />
                                </TouchableOpacity>
                                <ScrollView
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    showsVerticalScrollIndicator>
                                    <Text style={styles.textAnwser}>{resposta}</Text>
                                </ScrollView>
                            </View>
                        </View>

                    </Modal>
                )}
            </TouchableOpacity >
            <Modal
                transparent
                visible={handleVisible}
                animationType="fade"
                onRequestClose={() => setHandleVisible(false)}
            >
                <LinearGradient
                    colors={[Colors.white_blue, Colors.green]}
                    style={styles.overlay}
                >
                    <View style={styles.content}>
                        <TouchableOpacity
                            style={styles.close}
                            onPress={() => setHandleVisible(false)}
                        >
                            <Ionicons name="close" size={26} color="#444" />
                        </TouchableOpacity>

                        <View style={styles.header}>
                            <Ionicons name="leaf-outline" size={26} color="#4CAF50" />
                            <Text style={styles.title}>Exercício de Relaxamento</Text>
                        </View>
                        {audio ?
                            <View style={styles.audioContainer}>
                                <Text style={styles.title}>Relaxe e acompanhe o áudio:</Text>
                                <View style={styles.player}>
                                    <TouchableOpacity onPress={togglePlayPause}>
                                        <Ionicons
                                            name={status.isPlaying ? "pause-circle" : "play-circle"}
                                            size={70}
                                            color="#6AAFE6"
                                        />
                                    </TouchableOpacity>
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={0}
                                        maximumValue={status.durationMillis}
                                        value={status.positionMillis}
                                        onSlidingComplete={onSlide}
                                        minimumTrackTintColor="#6AAFE6"
                                        maximumTrackTintColor="#D3EAFD"
                                        thumbTintColor="#6AAFE6"
                                    />
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.timeText}>{formatTime(status.positionMillis)}</Text>
                                        <Text style={styles.timeText}>{formatTime(status.durationMillis - status.positionMillis)}</Text>
                                    </View>
                                </View>
                            </View>
                            : <Text></Text>}
                        {url ? <View>
                            <View style={styles.videoWrapper}>
                                <YoutubePlayer
                                    height={230}
                                    play={true}
                                    videoId={videoId}
                                    initialPlayerParams={{
                                        start: startSeconds,
                                    }}
                                />
                            </View>
                            <Text style={styles.message}>
                                Respire fundo, acompanhe o vídeo e aproveite este momento só para você.
                            </Text>
                        </View>
                            :
                            <Text style={styles.message}>
                                Vídeo indisponível no momento.
                            </Text>
                        }

                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={() => setHandleVisible(false)}
                            >
                                <Text style={styles.primaryText}>Concluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        </View>

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        margin: 20,
        width: Math.min(window.width - 40, 600),
        maxHeight: window.height * 0.8,
        elevation: 6,

    },
    close: {
        position: "absolute",
        top: 14,
        right: 14,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
        color: "#333",
        fontFamily: Fonts_Styles.PoppinsSemiBold,
    },
    videoWrapper: {
        borderRadius: 12,
        overflow: "hidden",
        marginVertical: 12,
    },
    message: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        fontFamily: Fonts_Styles.PoppinsSemiBold,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 25,
        marginLeft: 8,
        alignItems: "center",
    },
    primaryText: {
        color: "#fff",
        fontWeight: "600",
        fontFamily: Fonts_Styles.PoppinsSemiBold,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    audioContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: "#E6F0FA", // cor clara e suave
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    player: {
        alignItems: "center",
    },
    slider: {
        width: "90%",
        marginBottom: 10,
    },
    timeText: {
        color: "#3D5A80",
        fontWeight: "500",
    }
})

export default Exercise