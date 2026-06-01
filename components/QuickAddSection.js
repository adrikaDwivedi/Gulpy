import { StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'
import QuickAdds from './QuickAdds'


const QuickAddSection = () => {

    const [selectedAmount , setSelectedAmount] = useState();

    const quickOptions = [
        {
            id:1,
            amount: 180,
            icon: '🥤',
        }, 
        {
            id:2,
            amount:250,
            icon: '🧃',
        },
        {
            id:3,
            amount:500,
            icon: '🍼',
        },
        {
            id:4,
            amount:750,
            icon: '🍶',
        },
    ];

    return (
    <View style={styles.container}>
          <Text style={styles.title} >Quick Adds</Text>

          <View style={styles.row}>
            {quickOptions.map(item => (
                <QuickAdds 
                key={item.id}
                amount={item.amount}
                icon={item.icon}
                selected={
                    selectedAmount === item.amount
                }
                onPress={() => {setSelectedAmount(item.amount)}}
                />
            ))}
          </View>
    </View>
  )
}

export default QuickAddSection

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginLeft: 10,
    },
    title: {
        fontSize:22,
        fontFamily:'Sora-ExtraBold',
         color: '#fff',
         marginTop:20
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})