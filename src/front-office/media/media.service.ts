import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class MediaService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: 'https://s3.us-east-005.backblazeb2.com',
      accessKeyId: '005153c6f68e9380000000007',
      secretAccessKey: 'K005TTX7ur5C5NIYTaaK7el7EC5QHdA',
    });
  }

  async uploadFile(bucket: string, file: Express.Multer.File) {
    try {
      const mimeType = file.mimetype;

      const params: AWS.S3.Types.PutObjectRequest = {
        Bucket: bucket,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: mimeType,
      };

      const response = await this.s3.upload(params).promise();
      return {
        size:file.size,
        mimeType:mimeType,
        url:response.Location,
        path:response.Key
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
