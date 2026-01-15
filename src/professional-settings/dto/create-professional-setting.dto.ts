import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfessionalSettingDto {
    @IsInt()
    @IsNotEmpty()
    professional_id: number;

    @IsInt()
    @IsOptional()
    preferred_exchange_system_id?: number;
}
