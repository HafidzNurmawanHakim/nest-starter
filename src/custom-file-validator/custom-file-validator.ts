import { FileValidator } from "@nestjs/common";
import * as fileType from 'file-type-mime'
import { buffer } from "stream/consumers";


export interface CustomFileValidatorOptions {
    fileType: string[]
}

export class CustomFileValidator extends FileValidator {
    private _allowedMimeTypes:  string[]

    constructor (protected readonly validationOptions: CustomFileValidatorOptions) {
        super(validationOptions)
        this._allowedMimeTypes = this.validationOptions.fileType
    }

    public isValid(file?: Express.Multer.File): boolean {
        console.log({file, fileBuffer: file.buffer})
        const response = fileType.parse(file.buffer)
        return this._allowedMimeTypes.includes(response.mime)
    }

    public buildErrorMessage(file: any): string {
        return `Upload not allowed. Upload only file of type: ${this._allowedMimeTypes.join(',')}`
    }
}
