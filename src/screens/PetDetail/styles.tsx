import {Dimensions, Platform, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 20,
    width: '100%',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPetTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  registerPetSubtitle: {
    fontSize: 16,
    fontWeight: '100',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  petCardContainer: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#AEAEAE',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  petCardTopSection: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 10,
  },
  petCardImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  petInfoContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  petName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  petTopDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#626364',
  },
  petBottomDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#626364',
  },
  petsListContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  petsList: {
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
  editButton: {
    backgroundColor: '#1E96FF',
    padding: 10,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  serviceStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  totalWalks: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginRight: 20,
  },
  totalCares: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  registerButtonContainer: {
    marginBottom: 10,
    width: width - 40,
  },
  registerButton: {
    height: 55,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
