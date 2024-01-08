import {Image, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../theme/theme';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const CommunityCard = ({title}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#D3CCE3', '#D3CCE3', '#E9E4F0']}
      style={styles.cardContent}>
      <View
        style={{
          height: '100%',
          width: '25%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={styles.cardProfileImage}
          source={require('../assets/profile/profile.jpeg')}
          accessibilityLabel="Profile Image"
        />
      </View>

      <View style={styles.cardmain}>
        <View style={{gap: 10}}>
          <View>
            <Text style={{color: COLORS.secondary, fontSize: 25}}>{title}</Text>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.secondary,
                fontSize: FONTSIZE.font_size_3,
                fontWeight: 100,
              }}>
              shaikhazrath:ai can do my work
            </Text>
          </View>
          <View>
            <Text style={{color: COLORS.secondary, fontSize: 10}}>Maintainers</Text>
            <View style={styles.container}>
              <Image
                style={styles.profileImage}
                source={require('../assets/profile/profile.jpeg')}
                accessibilityLabel="Profile Image"
              />
              <Image
                style={styles.profileImage}
                source={require('../assets/profile/profile.jpeg')}
                accessibilityLabel="Profile Image"
              />
              <Image
                style={styles.profileImage}
                source={require('../assets/profile/profile.jpeg')}
                accessibilityLabel="Profile Image"
              />
              <Image
                style={styles.profileImage}
                source={require('../assets/profile/profile.jpeg')}
                accessibilityLabel="Profile Image"
              />
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <IconIonicons
            name="notifications"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={{color: '#f05053'}}>+21</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CommunityCard;

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginBottom: 20,
    height: 150,
    elevation: 15,
    borderRadius: 10,
  },
  cardProfileImage: {
    height: 75,
    width: 75,
    borderRadius: 100,
  },
  cardmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
    margin: 2,
  },
});
