import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

const ReportsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [reports, setReports] = useState([
    { id: 1, name: 'Blood Test Results', date: '01/05/2023', type: 'pdf' },
    { id: 2, name: 'X-Ray Report', date: '15/04/2023', type: 'image' },
    { id: 3, name: 'MRI Scan Analysis', date: '30/03/2023', type: 'pdf' },
  ]);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const newReport = {
          id: reports.length + 1,
          name: result.assets[0].name,
          date: new Date().toLocaleDateString(),
          type: 'pdf',
        };
        setReports([newReport, ...reports]);
        Alert.alert('Success', 'Report uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Failed to upload report');
    }
  };

  const handleDownload = async (report: { id?: number; name: any; date?: string; type?: string; }) => {
    try {
      // In a real app, you would fetch the actual file content here
      const content = `This is the content of ${report.name}`;
      const fileName = `${report.name.replace(/\s+/g, '_')}.pdf`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(filePath, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      Alert.alert('Error', 'Failed to download report');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Medical Reports</Text>
      </View>

      <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.secondary }]} onPress={handleUpload}>
        <Ionicons name="cloud-upload" size={24} color="white" />
        <Text style={styles.uploadButtonText}>Upload New Report</Text>
      </TouchableOpacity>

      <View style={styles.reportsContainer}>
        {reports.map((report) => (
          <View key={report.id} style={[styles.reportItem, { backgroundColor: colors.surface }]}>
            <View style={styles.reportInfo}>
              <Ionicons 
                name={report.type === 'pdf' ? 'document-text' : 'image'} 
                size={24} 
                color={colors.primary} 
              />
              <View style={styles.reportDetails}>
                <Text style={[styles.reportName, { color: colors.text }]}>{report.name}</Text>
                <Text style={[styles.reportDate, { color: colors.textSecondary }]}>{report.date}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDownload(report)}>
              <Ionicons name="download" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reportsContainer: {
    padding: 20,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportDetails: {
    marginLeft: 15,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ReportsScreen;

