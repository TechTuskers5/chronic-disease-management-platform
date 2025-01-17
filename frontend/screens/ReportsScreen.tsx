import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';

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

  const handleDownload = async (report: { id: number; name: string; date: string; type: string }) => {
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

  const renderReportItem = ({ item, index }: { item: typeof reports[0]; index: number }) => (
    <Card style={styles.reportItem} index={index}>
      <View style={styles.reportInfo}>
        <View style={[styles.reportIconContainer, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons 
            name={item.type === 'pdf' ? 'document-text' : 'image'} 
            size={24} 
            color={colors.primary} 
          />
        </View>
        <View style={styles.reportDetails}>
          <Text style={[styles.reportName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.reportDate, { color: colors.textSecondary }]}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDownload(item)} style={styles.downloadButton}>
        <Ionicons name="download" size={24} color={colors.primary} />
      </TouchableOpacity>
    </Card>
  );

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Reports</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.primary }]} onPress={handleUpload}>
          <Ionicons name="cloud-upload" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload New Report</Text>
        </TouchableOpacity>
        <FlatList
          data={reports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.reportsContainer}
        />
      </View>
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
    color: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reportDetails: {
    flex: 1,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 14,
    marginTop: 5,
  },
  downloadButton: {
    padding: 10,
  },
});

export default ReportsScreen;
