import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBackground from '@/components/GradientBackground';
import Card from '@/components/Card';
import ElegantButton from '@/components/ElegantButton';

const samplePdfs = [
  { id: 1, name: 'Sample Report 1', date: '01/01/2023', type: 'pdf', uri: FileSystem.documentDirectory + 'sample1.pdf' },
  { id: 2, name: 'Sample Report 2', date: '02/01/2023', type: 'pdf', uri: FileSystem.documentDirectory + 'sample2.pdf' },
];

const ReportsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [reports, setReports] = useState<Array<{ id: number; name: string; date: string; type: string; uri?: string }>>([]);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [newReportName, setNewReportName] = useState('');
  const [tempReportUri, setTempReportUri] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const storedReports = await AsyncStorage.getItem('reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    } else {
      setReports(samplePdfs);
      await saveReports(samplePdfs);
    }
  };

  const saveReports = async (updatedReports: typeof reports) => {
    await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0].uri) {
        setTempReportUri(result.assets[0].uri);
        setNewReportName(result.assets[0].name);
        setIsRenameModalVisible(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload report');
    }
  };

  const confirmUpload = async () => {
    if (newReportName && tempReportUri) {
      const newReport = {
        id: reports.length + 1,
        name: newReportName,
        date: new Date().toLocaleDateString(),
        type: 'pdf',
        uri: tempReportUri,
      };
      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      await saveReports(updatedReports);
      setIsRenameModalVisible(false);
      setTempReportUri('');
      setNewReportName('');
      Alert.alert('Success', 'Report uploaded successfully');
    }
  };

  const handleDownload = async (report: { id: number; name: string; date: string; type: string; uri?: string }) => {
    if (!report.uri) {
      Alert.alert('Error', 'File URI is missing');
      return;
    }

    try {
      const fileUri = `${FileSystem.documentDirectory}${report.name}`;
      await FileSystem.copyAsync({ from: report.uri, to: fileUri });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      Alert.alert('Error', 'Failed to download report');
    }
  };

  const handleRemove = async (reportId: number) => {
    const updatedReports = reports.filter((report) => report.id !== reportId);
    setReports(updatedReports);
    await saveReports(updatedReports);
    Alert.alert('Success', 'Report removed successfully');
  };

  const renderReportItem = ({ item, index }: { item: typeof reports[0]; index: number }) => (
    <Card style={[styles.reportItem, { backgroundColor: colors.surface }]} index={index}>
      <View style={styles.reportInfo}>
        <View style={[styles.reportIconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons 
            name={item.type === 'pdf' ? 'document-text' : 'image'} 
            size={24} 
            color={colors.primary} 
          />
        </View>
        <View>
          <Text style={[styles.reportName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.reportDate, { color: colors.textSecondary }]}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleDownload(item)} style={[styles.actionButton, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(item.id)} style={[styles.actionButton, { backgroundColor: colors.error }]}>
          <Text style={[styles.actionButtonText, { color: colors.buttonText }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Medical Reports</Text>
      </View>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <ElegantButton
          title="Upload New Report"
          onPress={handleUpload}
          color="primary"
          style={styles.uploadButton}
        />
        <FlatList
          data={reports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.reportsContainer}
        />
      </View>

      {/* Rename Modal */}
      <Modal
        visible={isRenameModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsRenameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Rename Report</Text>
            <TextInput
              style={[styles.renameInput, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={newReportName}
              onChangeText={setNewReportName}
              placeholder="Enter new name"
              placeholderTextColor={colors.textSecondary}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setIsRenameModalVisible(false)} style={[styles.modalButton, { backgroundColor: colors.error }]}>
                <Text style={[styles.modalButtonText, { color: colors.buttonText }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmUpload} style={[styles.modalButton, { backgroundColor: colors.primary }]}>
                <Text style={[styles.modalButtonText, { color: colors.buttonText }]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  uploadButton: {
    marginBottom: 20,
  },
  reportsContainer: {
    paddingBottom: 20,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  renameInput: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;