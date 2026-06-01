import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

const QuickAdds = ({amount,icon,selected,onPress}) =>{
    
   
  return (
    <View style={styles.container}>
    
      <View style={styles.btncontainer}>
    <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
        styles.card , 
        selected && styles.selectedCard,
    ]}
    >
        <Text style={styles.icon}>{icon}</Text>

        <Text style={[styles.amount, 
            selected && styles.selectedAmount,
        ]}>{amount}ml</Text>
    </TouchableOpacity>
      </View>
    </View>
  )
}

export default QuickAdds

const styles = StyleSheet.create({
    card:{
        width:90,
        height:95,
        borderRadius:28,
        backgroundColor: '#14356A',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth:1,
        borderColor: '#1C4C8E',
        marginTop:10,
    },
    selectedCard:{
        borderWidth:1,
        borderColor: '#19BFFF',
        backgroundColor: '#102D61',
    },
    icon:{
        fontSize:30,
    },
    amount:{
        fontSize:22,
        fontWeight:'700',
        color:'#75B7FF',
    },
    selectedAmount: {
        color: '#19BFFF',
    },
})