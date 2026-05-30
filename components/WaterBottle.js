import { StyleSheet, Text, View, Image} from 'react-native'

const WaterBottle = () => {
  return (
    <View style={styles.container}>
        <View style={[styles.rings , styles.ring1]}/>
        <View style={[styles.rings , styles.ring2]}/>
      <Image source={require('../assets//bottle_transparent.png')} style={styles.bottleImg} />
    </View>
  )
}

export default WaterBottle

const styles = StyleSheet.create({
    // container:{
    // alignItems: "center",
    //  justifyContent: "center",
    //  top: 0,
    // },
    bottleImg: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: -25,
    elevation:0,
    },
    rings: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "rgba(0,180,255,0.15)",
    borderRadius: 999,
   
  },
    ring1: {
    width: 160,
    height: 160,
    marginLeft:70,
    marginTop: 60,
    
  },

  ring2: {
    width: 220,
    height: 220,
    marginLeft: 38,
    marginTop: 33,
  },
})