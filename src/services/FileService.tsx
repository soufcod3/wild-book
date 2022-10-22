import axios from "axios";

interface UploadFileResponse {
    success: boolean,
    message: string
}

class FileService
{
    private file: File;

    constructor(file: File) {
        this.file = file;
    }

    private getFormData(): FormData {
        const formData = new FormData();
        formData.append('file', this.file);
        return formData;
    }

    async uploadAvatar(wilderId: number): Promise<UploadFileResponse> {
        await axios.post(`http://localhost:8080/avatar/${wilderId}`, this.getFormData());

        return {
            success: true,
            message: ""
        };
    }

    async getAvatar(wilderId: number) {
        await axios.get(`http://localhost:8080/avatar/${wilderId}`).then(
            (result) => {
                console.log("Avatar reçu :");
                console.log(result);
            }
        )
    }
}

export default FileService;