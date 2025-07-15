import { Image, Text, View, ScrollView, FlatList } from 'react-native'
import { styles } from './exercises.styles'
import { exercises } from '../../constants/dataTest'
import icon from '../../constants/icon'
import Category from '../../components/Category'
import Exercise from '../../components/Exercise'
import { useState } from 'react'

function Exercises() {
    


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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollCategory}>
                    <View style={styles.categoryItens}>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                    </View>
                </ScrollView>
            </View>
            <View>
                <Text style={styles.text}>Metodos</Text>
                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Exercise
                            nome={item.nome}
                            descricao={item.descricao}
                            icone={item.icone}
                            duracao={item.duracao}
                            rota={item.rota}
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