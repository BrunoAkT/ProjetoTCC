import { Image, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { styles } from './exercises.styles'
import icon from '../../constants/icon'
import Category from '../../components/Category'
import Exercise from '../../components/Exercise'
import api from '../../constants/api'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

function Exercises() {

    const { user } = useContext(AuthContext)
    const [dataExercises, setDataExercises] = useState([])
    const [dataTypes, setDataTypes] = useState([])

    const [filterOn, setFilterOn] = useState(null)


    async function FetchData() {

        const exercisesConfig = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        exercisesConfig.params = { id: user.id };
        if (filterOn) {
            exercisesConfig.params = { type: filterOn, id: user.id };
        }

        const response = await api.get(`/exercises`, exercisesConfig);

        const responseTypes = await api.get('/types', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        if (response && responseTypes) {
            setDataExercises(response.data)
            setDataTypes(responseTypes.data)
        }
    }
    useEffect(() => {
        FetchData()
    }, [filterOn])

    function Press(id) {
        setFilterOn(id)
        if (filterOn === id) {
            setFilterOn(null)
        }
        FetchData()
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headersubText}>Vamos com calma</Text>
                        <Text style={styles.headerText}>Bem Vindo</Text>
                    </View>
                    <Image source={icon.logo} style={styles.logo}></Image>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Categorias</Text>
                <FlatList
                    data={dataTypes}
                    keyExtractor={(item) => item.id_tipo.toString()}
                    renderItem={({ item }) => (
                        <Category
                            nome={item.nome_tipo}
                            icon={item.icon}
                            id={item.id_tipo}
                            onPressCategory={() => Press(item.id_tipo)}
                            filterOn={filterOn === item.id_tipo}
                        />
                    )}
                    horizontal={true}
                    style={styles.scrollCategory}
                />
            </View>
            <View>
                <Text style={styles.text}>Metodos</Text>
                <FlatList
                    data={dataExercises}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Exercise
                            nome={item.nome}
                            descricao={item.descricao}
                            duracao={item.tempo}
                            img={item.image}
                            video={item.video}
                            audio={item.audio}
                        />
                    )}
                    style={styles.scrollExercicies}
                >
                </FlatList>
            </View>
        </View >
    )
}

export default Exercises