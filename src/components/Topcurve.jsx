import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function Topcurve() {
    return (
        <View>
            <View style={styles.topcurve}>
                <Svg
                    height={300}
                    width="100%"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <Path
                        d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
                        fill="#D9D9D9" // ou a cor que desejar
                    />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topcurve: {
        position: 'absolute',
        top: 0,
        left: -250,
        right: 0,
        width: 700,
        height: 120,
    },
});
export default Topcurve;