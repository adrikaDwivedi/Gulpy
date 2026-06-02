import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomLogs = ({item}) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{item.type}</Text>
      
      <Text style={styles.time}>{item.time}</Text>
      </View>

      <Text style={styles.amount}>+{item.amount}ml</Text>
    </View>
  )
}

export default CustomLogs

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#122040',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#23406E',
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  time: {
    color: '#8FB8FF',
    marginTop: 4,
  },

  amount: {
    color: '#18C9FF',
    fontSize: 18,
    fontWeight: '700',
  },
});