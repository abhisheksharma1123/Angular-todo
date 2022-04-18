import { ApiProperty } from "@nestjs/swagger";

export class todoDto{
    @ApiProperty({required:true})
    title: string;

    @ApiProperty({required:true})
    description: string;
    
    @ApiProperty({default:false})
    status: boolean;

    @ApiProperty({required:true})
    created_at: Date;
}