import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'col',
		backgroundColor: 'white',
		paddingHorizontal: '32px',
		paddingVertical: '26px',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	},
	header: {
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	numfactura: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		fontSize: 13,
		paddingHorizontal: 8,
		paddingVertical: 8,
		marginBottom: '10px',
		borderWidth: 1.3,
		borderColor: 'grey',
		opacity: 0.7
	},
	flexrow: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		fontSize: 11,
		paddingBottom: '40px',
	},
	proCus : {
		flexDirection: 'row',
		fontSize: 12,
		paddingBottom: 56,
	},
	text: {
		opacity: 0.55,
		fontSize: 11.5,
		paddingVertical: 1.8,
	},
	table: { 
    display: 'table', 
    width: 'auto', 
    borderStyle: 'solid', 
		borderColor: 'grey',
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: 'auto', 
    flexDirection: 'row' 
  }, 
  tableCol25: { 
		width: '13.33%',
    borderStyle: 'solid', 
    borderWidth: 1, 
		borderColor: 'grey',
    borderLeftWidth: 0, 
    borderTopWidth: 0,
		textAlign: 'right'
  },
	tableCol60: { 
		width: '60%',
    borderStyle: 'solid', 
    borderWidth: 1, 
		borderColor: 'grey',
    borderLeftWidth: 0, 
    borderTopWidth: 0,
		textAlign: 'left'
  },
  tableCell: { 
		paddingHorizontal: 8,
    fontSize: 10,
		paddingVertical: 4,
		opacity: 0.6
  },
	tableCellHead: { 
		paddingHorizontal: 8,
    fontSize: 9.5,
		backgroundColor: '#E4E4E4',
		paddingVertical: 7,
		opacity: 0.6,
		fontFamily: 'Helvetica-Bold'
  },
	w25: {
		width: '25%',
	},
	subtotal: {
		width: '33%', 
		borderWidth: 1, 
		borderColor: 'grey',
		marginTop: 30,
		fontSize: 10,
	},
	subtotalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		opacity: 0.6,
		paddingHorizontal: 8,
		paddingVertical: 3
	},
	subtotalRowTotal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		opacity: 0.6,
		marginTop: 2,
		paddingVertical: 3,
		paddingHorizontal: 8,
		backgroundColor: '#E4E4E4',
	}
});

// Create Document Component
const MyDocument = (props) => (
	<Document>
		<Page size='A4' style={styles.page}>
			<View style={styles.header}>
				<View style={styles.numfactura}>
					<Text style={{ fontFamily: 'Helvetica-Bold' }}>FACTURA Nº: </Text>
					<Text style={{ fontFamily: 'Helvetica-Bold', paddingLeft: 3 }}>{ props.data.num }</Text>
				</View>
				<View style={styles.flexrow}>
					<Text style={{ fontWeigth: 100, opacity: 0.55 }}>Fecha: </Text>
					<Text style={{ opacity: 0.65, fontFamily: 'Helvetica-Bold' }}>{ props.data.date }</Text>
				</View>
			</View>
			<View style={styles.proCus}>
				<View style={{ width: '50%', paddingTop: 16.5 }}>
				  <Text style={{ paddingBottom: '10px', opacity: 0.6, fontFamily: 'Helvetica-Bold' }}>{ props.data.pro.name }</Text>
				  <Text style={ styles.text }>CIF/NIF: { props.data.pro.dni }</Text>
				  <Text style={ styles.text }>{ props.data.pro.address }</Text>
				  <Text style={ styles.text }>{ props.data.pro.cp } - { props.data.pro.city } ({ props.data.pro.province })</Text>
				</View>
				<View style={{ width: '50%' }}>
					<Text style={{ opacity: 0.55, fontSize: 11.5, paddingBottom: 4 }}>Datos del cliente:</Text>
				  <Text style={{ paddingBottom: '10px', opacity: 0.6, fontFamily: 'Helvetica-Bold' }}>{ props.data.cus.name }</Text>
				  <Text style={ styles.text }>CIF/NIF: { props.data.cus.dni }</Text>
				  <Text style={ styles.text }>{ props.data.cus.address }</Text>
				  <Text style={ styles.text }>{ props.data.cus.cp } - { props.data.cus.city } ({ props.data.cus.province })</Text>
				</View>
			</View>
			<View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol25}> 
            <Text style={styles.tableCellHead}>CANTIDAD</Text> 
          </View> 
          <View style={styles.tableCol60}> 
            <Text style={styles.tableCellHead}>CONCEPTO</Text> 
          </View> 
          <View style={styles.tableCol25}> 
            <Text style={styles.tableCellHead}>BASE UNIT.</Text> 
          </View> 
          <View style={styles.tableCol25}> 
            <Text style={styles.tableCellHead}>TOTAL €</Text> 
          </View> 
        </View>
				{props.data.products.map((e, i) => (
					<View key={i} style={styles.tableRow}> 
						<View style={styles.tableCol25}> 
							<Text style={styles.tableCell}>{e.amount}</Text> 
						</View> 
						<View style={styles.tableCol60}> 
							<Text style={styles.tableCell}>{e.name}</Text> 
						</View> 
						<View style={styles.tableCol25}>
							<Text style={styles.tableCell}>{ parseFloat(e.price).toFixed(2) }</Text> 
						</View>
						<View style={styles.tableCol25}> 
							<Text style={styles.tableCell}>{(e.price * e.amount).toFixed(2)} €</Text> 
						</View> 
					</View> 
				))}
      </View>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end', fontSize: '12' }}>
				<View style={ styles.subtotal }>
					<View style={ styles.subtotalRow }>
						<Text style={{ fontFamily: 'Helvetica-Bold' }}>Base imponible:</Text>
						<Text>{ props.data.base } €</Text>
					</View>
					<View style={ styles.subtotalRow }>
						<Text style={{ fontFamily: 'Helvetica-Bold' }}>IVA ({ props.data.iva * 100 }%):</Text>
						<Text>{ (props.data.iva * props.data.base).toFixed(2) } €</Text>
					</View>
					<View style={ styles.subtotalRowTotal }>
						<Text style={{ fontFamily: 'Helvetica-Bold' }}>Total:</Text>
						<Text>{ (parseFloat(props.data.iva * props.data.base) + parseFloat(props.data.base)).toFixed(2) } €</Text>
					</View>
				</View>
			</View>
		</Page>
	</Document>
);

export default MyDocument