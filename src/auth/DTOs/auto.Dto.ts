import {IsString, IsNotEmpty} from 'class-validator';

export class AutoDto {
  @IsString()
  @IsNotEmpty()
  readonly Username!: string;

  @IsString()
  @IsNotEmpty()
  readonly Password!: string;

}