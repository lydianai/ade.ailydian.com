import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export class ChatMessage {
  @ApiProperty({ enum: MessageRole })
  @IsEnum(MessageRole)
  role: MessageRole;

  @ApiProperty({ description: 'Message content' })
  @IsString()
  content: string;
}

export class ChatRequestDto {
  @ApiProperty({ description: 'User message' })
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Conversation history', type: [ChatMessage] })
  @IsOptional()
  @IsArray()
  history?: ChatMessage[];

  @ApiPropertyOptional({ description: 'User context for personalized responses' })
  @IsOptional()
  context?: {
    userRole?: string;
    businessName?: string;
    taxOffice?: string;
    recentInvoices?: any[];
    pendingTasks?: any[];
  };
}

export class ChatResponseDto {
  @ApiProperty({ description: 'AI assistant response' })
  response: string;

  @ApiProperty({ description: 'Detected intent' })
  intent?: string;

  @ApiProperty({ description: 'Suggested actions' })
  suggestions?: string[];

  @ApiProperty({ description: 'Model used' })
  model: string;

  @ApiProperty({ description: 'Response timestamp' })
  timestamp: Date;
}

export class VoiceChatRequestDto {
  @ApiProperty({ description: 'Base64 encoded audio data' })
  @IsString()
  audio: string;

  @ApiPropertyOptional({ description: 'Audio format (wav, mp3, webm)' })
  @IsOptional()
  @IsString()
  format?: string;

  @ApiPropertyOptional({ description: 'Conversation history', type: [ChatMessage] })
  @IsOptional()
  @IsArray()
  history?: ChatMessage[];
}

export class VoiceChatResponseDto {
  @ApiProperty({ description: 'Transcribed text from user' })
  transcription: string;

  @ApiProperty({ description: 'AI assistant response text' })
  responseText: string;

  @ApiProperty({ description: 'Base64 encoded audio response' })
  audioResponse: string;

  @ApiProperty({ description: 'Detected intent' })
  intent?: string;

  @ApiProperty({ description: 'Response timestamp' })
  timestamp: Date;
}
