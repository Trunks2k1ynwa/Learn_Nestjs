import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { FileService } from './file.service';

@Controller('api/v1/files')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fieldNameSize: 20,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.handleUploadFile(file);
  }
  @Post('file-validate')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fieldNameSize: 20,
      },
    }),
  )
  // @UsePipes(new FileSizeValidationPipe())
  uploadFileAndPassValidation(
    @Body() body: FileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
      // new ParseFilePipeBuilder()
      //   .addFileTypeValidator({
      //     fileType:/(jpg|jpeg|png|gif)$/,
      //   })
      //   .addMaxSizeValidator({
      //     maxSize: 1000 * 1024,
      //   })
      //   .build({
      //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      //   }),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
  //Multiple files
  @Post('files-validate')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadFiles(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    return files;
  }

  @Get('get-file/:filename')
  handleGetFile(@Param('filename') filename: string) {
    return this.fileService.handleGetFile(filename);
  }
}
