import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { Repository, Connection, getRepository, Like } from 'typeorm';
import { FileEntity } from 'module/fileUpload/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor( @InjectRepository(FileEntity) private readonly filesRepository: Repository<FileEntity> ){}

  async getList(quest) {
    const user = await this.filesRepository.findAndCount({
      take: 10,
      skip: 0
    });
    return user;
  }
}
