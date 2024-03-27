import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}
  private readonly client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  async handleUploadFile(file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_PUBLIC_BUCKET_NAME'),
      Key: file.originalname,
      Body: file.buffer,
      ContentType: 'image/jpeg',
    });
    try {
      const response = await this.client.send(command);
      return {
        status: response.$metadata.httpStatusCode,
        data: 'Upload successfully',
      };
    } catch (err) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: 'Upload Error',
      };
    }
  }
  async handleGetFile(filename: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_PUBLIC_BUCKET_NAME'),
      Key: filename,
    });
    const str = await getSignedUrl(this.client, command, { expiresIn: 3600 });
    if (str) {
      return str;
    } else {
      return 'file khong ton tai';
    }
  }
}
