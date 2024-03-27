import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000 * 1024;
    if (metadata.type !== 'body' || metadata.metatype !== Object) {
      return value.size < oneKb;
    } else {
      return !!value;
    }
  }
}
