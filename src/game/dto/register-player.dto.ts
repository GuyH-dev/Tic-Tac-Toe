import { IsIn } from 'class-validator';

export class RegisterPlayerDto {
  @IsIn(['X', 'O'], { message: 'Symbol must be X or O' })
  symbol: 'X' | 'O';
}
