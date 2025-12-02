import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        userId: number;
        email: string;
        username: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        userId: number;
        email: string;
        username: string;
    }>;
}
