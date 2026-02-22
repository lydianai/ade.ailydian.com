import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
// import { VoiceAssistantController } from './voice-assistant.controller'; // Temporarily disabled
// import { VoiceAssistantService } from './voice-assistant.service'; // Temporarily disabled

/**
 * AI Module
 * Provides AI assistant capabilities with intelligent analysis engine
 * Voice Assistant with STT (Whisper) + TTS (OpenAI) + Personalized Responses
 */
@Module({
  imports: [ConfigModule],
  controllers: [AiController], // VoiceAssistantController temporarily disabled
  providers: [AiService], // VoiceAssistantService temporarily disabled
  exports: [AiService],
})
export class AiModule {}
