// components/ConfirmationModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, ImageSourcePropType } from 'react-native';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  icon?: ImageSourcePropType;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose, title, message, icon }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {icon && <Image source={icon} style={styles.successIcon} />}
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          {message && <Text style={styles.modalMessage}>{message}</Text>}
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successIcon: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F0147',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#0F0147',
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#0F0147',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
