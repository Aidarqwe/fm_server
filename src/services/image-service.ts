import ApiError from "../exceptions/api-error";

class ImageService {
    async checkImage(image_path: string, selfie_path: string){
        try {
            return true;
        } catch (error) {
            throw ApiError.ImageValidationError('Ошибка при проверке фотографий', [(error as Error).message]);
        }
    }
}

export default new ImageService();