import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constants/theme';

interface InstructionModalProps {
  visible: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Como Medir Corretamente</Text>
          <Text style={styles.modalSubtitle}>
            Para uma medição precisa, siga os passos abaixo:
          </Text>

          <View style={styles.instructionRow}>
            <Icon name="fingerprint" size={30} color={Colors.primary} style={styles.icon} />
            <Text style={styles.instructionText}>
              Cubra <Text style={styles.bold}>toda a câmera traseira e o flash</Text> com a ponta do seu dedo indicador.
            </Text>
          </View>

          <View style={styles.instructionRow}>
            <Icon name="hand-paper" size={30} color={Colors.primary} style={styles.icon} />
            <Text style={styles.instructionText}>
              Permaneça <Text style={styles.bold}>parado e em silêncio</Text> durante os 15 segundos da medição.
            </Text>
          </View>

          <View style={styles.instructionRow}>
            <Icon name="compress-arrows-alt" size={30} color={Colors.primary} style={styles.icon} />
            <Text style={styles.instructionText}>
              Não pressione o dedo com <Text style={styles.bold}>muita força nem muito levemente</Text> contra a câmera.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 15,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.dark_gray,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default InstructionModal;