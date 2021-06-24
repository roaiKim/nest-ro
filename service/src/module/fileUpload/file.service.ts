import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { Repository, Connection, getRepository, Like } from 'typeorm';
import { FileEntity } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>
  ){}

  uploadSingImg(quest: any): void {
    this.filesRepository.insert(quest);
  }
}
