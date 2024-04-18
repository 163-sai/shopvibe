import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    minHeight: 30, // Set a minimum height for rows to prevent text overflow
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    padding: 8,
    flex: 1,
    wordWrap: 'break-word', // Enable word wrapping in headers
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    flex: 1,
    wordWrap: 'break-word', // Enable word wrapping in cells
  },
});

const PDFReport = ({ data }) => (
  <PDFViewer width="100%" height="600px">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Sales Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader]}>ID</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>User ID</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Product ID</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Product Name</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Price</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Purchase Date</Text>
            </View>
            {data.map(insight => (
              <View key={insight.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{insight.id}</Text>
                <Text style={styles.tableCell}>{insight.user_id}</Text>
                <Text style={styles.tableCell}>{insight.product_id}</Text>
                <Text style={styles.tableCell}>{insight.product_name}</Text>
                <Text style={styles.tableCell}>{insight.quantity}</Text>
                <Text style={styles.tableCell}>{insight.price}</Text>
                <Text style={styles.tableCell}>{new Date(insight.purchase_datetime).toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default PDFReport;
        