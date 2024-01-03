import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MediaResponseDto, MediaResponseSwaggerSchema } from './response/media.response';
@Controller('api/media')
@ApiTags('Front Office - Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ type: MediaResponseSwaggerSchema })
  async uploadMedia(@UploadedFile() file: Express.Multer.File) {
    try {
      const bucket = 'educonnect-2'; // You can also get the bucket dynamically based on your logic
      const response = await this.mediaService.uploadFile(bucket, file);
      return new MediaResponseDto(response);
    } catch (error) {
      throw new Error(`Failed to upload media: ${error.message}`);
    }
  }
}
