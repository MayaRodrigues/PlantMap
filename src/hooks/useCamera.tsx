import { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export type CapturedPhoto = {
  uri: string;
  base64?: string;
  width: number;
  height: number;
};

export function useCamera() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<CapturedPhoto | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  function toggleFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    if (!cameraRef.current || isCapturing) {
      return;
    }

    try {
      setIsCapturing(true);
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      if (result) {
        setPhoto({
          uri: result.uri,
          base64: result.base64,
          width: result.width,
          height: result.height,
        });
      }
    } catch (error) {
      console.log('Erro ao tirar foto:', error);
    } finally {
      setIsCapturing(false);
    }
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto({
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        width: asset.width,
        height: asset.height,
      });
    }
  }

  function retake() {
    setPhoto(null);
  }

  return {
    cameraRef,
    permission,
    requestPermission,
    facing,
    toggleFacing,
    photo,
    isCapturing,
    takePhoto,
    pickFromGallery,
    retake,
  };
}
