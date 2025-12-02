import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    const existing = await this.userRepository.findOne({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    const user = this.userRepository.create({
      email,
      password,
      username,
    });

    const saved = await this.userRepository.save(user);

    return {
      userId: saved.userId,
      email: saved.email,
      username: saved.username,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return {
      userId: user.userId,
      email: user.email,
      username: user.username,
    };
  }
}


