import ApiError from "../exceptions/api-error";
import * as canvas from 'canvas';
import { Canvas as NodeCanvas, Image as NodeImage, ImageData as NodeImageData } from 'canvas';
import * as faceapi from 'face-api.js';

interface Canvas {
    new (): NodeCanvas;
    prototype: NodeCanvas;
}

interface Image {
    new (): NodeImage;
    prototype: NodeImage;
}

interface ImageData {
    new (): NodeImageData;
    prototype: NodeImageData;
}
declare module 'face-api.js' {
    namespace faceapi {
        function monkeyPatch(env: {
            Canvas: Canvas;
            Image: Image;
            ImageData: ImageData;
        }): void;
    }
}

faceapi.env.monkeyPatch({ Canvas: NodeCanvas as any, Image: NodeImage as any, ImageData: NodeImageData as any });


export async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights');
    await faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights');
}

class ImageService {
    async checkImage(image_path: string, selfie_path: string): Promise<any> {
        await loadModels();
        console.log(`Checking images: ${image_path}, ${selfie_path}`);

        const selfieImage = await canvas.loadImage(selfie_path) as unknown as HTMLImageElement;
        const uploadedImage = await canvas.loadImage(image_path) as unknown as HTMLImageElement;

        const selfieDetection = await faceapi.detectSingleFace(selfieImage).withFaceLandmarks().withFaceDescriptor();
        const uploadedDetection = await faceapi.detectSingleFace(uploadedImage).withFaceLandmarks().withFaceDescriptor();

        if (selfieDetection && uploadedDetection) {
            const distance = faceapi.euclideanDistance(selfieDetection.descriptor, uploadedDetection.descriptor);
            const SIMILARITY_THRESHOLD = 0.6;
            return distance < SIMILARITY_THRESHOLD;
        }

        return false;
    }
}

export default new ImageService();
