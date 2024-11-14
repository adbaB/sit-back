import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  findById(id: number): Promise<Permission> {
    return this.permissionRepo.findOne({ where: { id } });
  }

  async findByIds(ids: number[]): Promise<Permission[]> {
    return this.permissionRepo.find({ where: { id: In(ids) } });
  }
}
