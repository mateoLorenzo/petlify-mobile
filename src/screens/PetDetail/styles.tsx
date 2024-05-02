import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
  },
  logo: {
    marginVertical: 20,
  },
  stepsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  stepBar: {
    height: 4,
    borderRadius: 1,
    backgroundColor: '#000',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    position: 'absolute',
    top: 0,
  },
  petBoxesContainer: {
    flexDirection: 'row',
    height: 250,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  kindSectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  petTypeContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 8,
    width: 170,
    height: 170,
  },
  customBorder: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1E96FF',
  },
  petTypeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 5,
    height: '100%',
  },
  petTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 10,
  },
  dogImage: {
    width: 90,
    height: 90,
  },
  catImage: {
    width: 75,
    height: 75,
  },
  sectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  raceSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  dropdownContainer: {
    height: 380,
    width: '90%',
    position: 'absolute',
    paddingTop: 80,
  },
  selectRaceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E96FF',
  },
  genderSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  ageSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 450,
  },
  ageContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  agePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ageNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 50,
    color: '#1E96FF',
  },
  ageText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#000',
  },
  nameSectionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nameInput: {
    fontSize: 40,
    fontFamily: 'Poppins-Medium',
    width: '100%',
    height: 50,
    textAlign: 'center',
    marginTop: 120,
  },
  photoSectionContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addImageContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    backgroundColor: 'white',
  },
  addImageShadow: {
    shadowColor: '#1E96FF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  addImageCircle: {
    height: '100%',
    borderWidth: 2,
    borderColor: '#1E96FF',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  addImageIcon: {
    width: 60,
    height: 60,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  addImageText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1E96FF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  spacer: {
    flex: 1,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 60,
  },
  continueButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  backButton: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#1E96FF',
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  backButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});