import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

const QuickAdds = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize:22, fontFamily:'Sora-ExtraBold' , color: '#fff' , marginTop: 30}} >Quick Adds</Text>
      <View style={styles.btncontainer}>
    <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  )
}

export default QuickAdds

const styles = StyleSheet.create({
    container: {
        marginTop:0,
        marginLeft: 20,
    },
})