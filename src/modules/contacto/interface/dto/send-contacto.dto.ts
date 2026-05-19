import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendContactoDto {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
