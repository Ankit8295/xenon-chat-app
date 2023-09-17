import Compressor from "compressorjs";

export default function compressImage(file: File | undefined) {
  if (!file) return null;

  return new Promise(
    (resolve, reject) =>
      new Compressor(file, {
        convertSize: 1000000,
        quality: 0.6,
        success: (result: any) => {
          resolve(result);
        },
        error(e: any) {
          reject(e);
        },
      })
  );
}
