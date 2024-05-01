import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePickerScreen = () => {
  const [selectedImage, setSelectedImage] = useState(
    'https://cdn.motor1.com/images/mgl/BbKZZ/s3/2019-aston-martin-dbs-superleggera.jpg',
  );
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
    });
  };

  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectedImage(image.path);
    });
  };

  return (
    <View style={styles.container}>
      <Text>ImagePickerScreen</Text>
      <Image source={{uri: selectedImage}} style={{width: 200, height: 200}} />
      <Button title="Take photo" onPress={takePhotoFromCamera} />
      <Button title="Choose photo" onPress={choosePhotoFromGallery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagePickerScreen;
