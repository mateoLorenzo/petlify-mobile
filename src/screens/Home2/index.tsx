import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const imageURL =
  'https://editorial.pxcrush.net/carsales/general/editorial/aston-martin-dbs-superleggera-volante-1-wylt.jpg?width=1024&height=682';

const HomeScreen2 = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={{...styles.screenContainer, paddingTop: top}}>
      <View style={styles.header}>
        <Image source={{uri: imageURL}} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>Mateo Lorenzo</Text>
          <TouchableOpacity style={styles.locationSection} activeOpacity={0.3}>
            <Text style={styles.locationText}>San miguel del Monte</Text>
            <Icon name="chevron-down-sharp" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
        <View style={styles.shadow}>
          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.bellIconContainer}>
            <Icon name="notifications-sharp" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.pricesBanner}>
        <Image
          source={require('../../../assets/images/stylish-dog.jpg')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Nuestras Tarifas</Text>
          <Text style={styles.bannerDescription}>
            Precios bajos con excelentes paseadores y cuidadores para mejorar la
            vida de tu mascota
          </Text>
          <View style={styles.spacer} />
          <TouchableOpacity activeOpacity={0.3} style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Ver precios</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Nuestros Servicios</Text>
        <View style={styles.servicesRow}>
          <TouchableOpacity style={styles.serviceCard} activeOpacity={0.3}>
            <Text style={{fontFamily: 'Poppins-Regular'}}>Paseo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceCard} activeOpacity={0.3}>
            <Text style={{fontFamily: 'Poppins-Regular'}}>Cuidado</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text style={styles.soonTitle}>Proximamente</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.soonServicesRow}>
        <TouchableOpacity style={styles.soonServiceCard} activeOpacity={0.3}>
          <Text style={{fontFamily: 'Poppins-Regular'}}>Adoptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soonServiceCard} activeOpacity={0.3}>
          <Text style={{fontFamily: 'Poppins-Regular'}}>PetShops</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.soonServicesRow}>
        <TouchableOpacity style={styles.soonServiceCard} activeOpacity={0.3}>
          <Text style={{fontFamily: 'Poppins-Regular'}}>Veterinarias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soonServiceCard} activeOpacity={0.3}>
          <Text style={{fontFamily: 'Poppins-Regular'}}>Servicios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
  bannerButton: {
    backgroundColor: '#1E96FF',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  bannerButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFF',
  },
  shadow: {
    shadowColor: '#AFAFAF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 50,
  },
  bellIconContainer: {
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pricesBanner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  bannerImage: {
    width: '40%',
    height: '100%',
    backgroundColor: 'red',
  },
  bannerTextContainer: {
    alignItems: 'center',
    width: '60%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bannerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  bannerDescription: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 5,
  },
  servicesSection: {
    width: '100%',
    marginTop: 20,
  },
  servicesTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#000',
  },
  servicesRow: {
    flexDirection: 'row',
    height: 100,
    gap: 10,
    marginTop: 10,
  },
  serviceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    backgroundColor: '#000',
    height: 2,
    borderRadius: 10,
  },
  soonTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
  },
  soonServicesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    width: '100%',
    height: 100,
  },
  soonServiceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen2;
