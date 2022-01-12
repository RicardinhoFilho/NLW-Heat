import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    height:48,
    width:'100%',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',

  },

  icon:{
    marginRight:14,
  },

  title:{

    fontSize:14,
    fontFamily:FONTS.BOLD

  },

  
});