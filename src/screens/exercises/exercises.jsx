import { Image, Text, View, ScrollView } from 'react-native'
import { styles } from './exercises.styles'
import icon from '../../constants/icon'
import Category from '../../components/Category'
import Exercise from '../../components/Exercise'

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
                <ScrollView style={styles.scrollExercicies}>
                    <Exercise></Exercise>
                    <Exercise></Exercise>
                    <Exercise></Exercise>
                    <Exercise></Exercise>
                </ScrollView>
            </View>
        </View>
    )
}

export default Exercises