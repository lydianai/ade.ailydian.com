import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { HfInference } from '@huggingface/inference';
import OpenAI from 'openai';
import {
  ChatRequestDto,
  ChatResponseDto,
  VoiceChatRequestDto,
  VoiceChatResponseDto,
  MessageRole,
} from './dto/chat.dto';

/**
 * AI Service - Multi-Model AI Engine
 *
 * Primary Models:
 * - Claude 4 (Anthropic): Text reasoning and Turkish language understanding
 * - NVIDIA Personaplex-7B: Voice-to-voice personalized assistant
 * - Whisper (OpenAI): Speech-to-text transcription
 *
 * Capabilities:
 * - Text chat with context awareness
 * - Voice-to-voice conversations
 * - Turkish intent recognition
 * - Proactive suggestions based on user context
 * - Multi-turn conversation management
 */
@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private anthropic: Anthropic;
  private hf: HfInference;
  private openai: OpenAI;

  // System prompt for Turkish government assistant
  private readonly systemPrompt = `Sen ADE (Akıllı Dijital Ekosistem) yapay zeka asistanısın.
Türkiye'deki esnaf, KOBİ ve vatandaşlara vergi, fatura, SGK ve e-Devlet işlemlerinde yardımcı oluyorsun.

Görevlerin:
1. Vergi hesaplama ve beyanname rehberliği (VUK - 213 Sayılı Kanun)
2. e-Fatura, e-Arşiv, e-İrsaliye işlemleri (GİB entegrasyonu)
3. SGK işçi bildirimi ve bordro hesaplama
4. KVKK uyumluluğu ve veri koruma danışmanlığı
5. Ticari Kanun (TTK - 6102) ve İş Kanunu (4857) rehberliği
6. e-Devlet işlemleri yönlendirme

Davranış kuralları:
- Türkçe ve resmi ama samimi bir dil kullan
- Hukuki bilgilerde kesinlikle doğru ve güncel ol
- Emin olmadığın konularda "Bir uzmana danışmanızı öneririm" de
- Proaktif önerilerde bulun (örn: "Yaklaşan vergi beyannameniz var")
- Kullanıcının rol ve ihtiyaçlarına göre kişiselleştir

Yasal uyarı: Verdiğin bilgiler rehberlik amaçlıdır, resmi hukuki danışmanlık yerine geçmez.`;

  constructor(private configService: ConfigService) {
    // Initialize Claude 4
    const anthropicKey = this.configService.get<string>('ANTHROPIC_API_KEY');
    if (anthropicKey) {
      this.anthropic = new Anthropic({
        apiKey: anthropicKey,
      });
      this.logger.log('✅ Claude 4 initialized');
    } else {
      this.logger.warn('⚠️  ANTHROPIC_API_KEY not found - Claude features disabled');
    }

    // Initialize HuggingFace (for Personaplex-7B)
    const hfToken = this.configService.get<string>('HUGGINGFACE_API_KEY');
    if (hfToken) {
      this.hf = new HfInference(hfToken);
      this.logger.log('✅ HuggingFace inference initialized (Personaplex-7B ready)');
    } else {
      this.logger.warn('⚠️  HUGGINGFACE_API_KEY not found - Voice features disabled');
    }

    // Initialize OpenAI (for Whisper STT)
    const openaiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (openaiKey) {
      this.openai = new OpenAI({
        apiKey: openaiKey,
      });
      this.logger.log('✅ OpenAI initialized (Whisper STT ready)');
    } else {
      this.logger.warn('⚠️  OPENAI_API_KEY not found - Speech-to-text disabled');
    }
  }

  /**
   * Text Chat with Claude 4
   */
  async chat(userId: string, dto: ChatRequestDto): Promise<ChatResponseDto> {
    try {
      if (!this.anthropic) {
        throw new InternalServerErrorException('Claude AI is not configured');
      }

      this.logger.log(`💬 Chat request from user ${userId}`);

      // Build conversation history
      const messages: Anthropic.MessageParam[] = [];

      // Add conversation history
      if (dto.history && dto.history.length > 0) {
        for (const msg of dto.history) {
          if (msg.role !== MessageRole.SYSTEM) {
            messages.push({
              role: msg.role === MessageRole.USER ? 'user' : 'assistant',
              content: msg.content,
            });
          }
        }
      }

      // Add current user message
      messages.push({
        role: 'user',
        content: dto.message,
      });

      // Enhance system prompt with user context
      let enhancedSystemPrompt = this.systemPrompt;
      if (dto.context) {
        enhancedSystemPrompt += `\n\nKullanıcı Bilgileri:\n`;
        if (dto.context.userRole) {
          enhancedSystemPrompt += `- Rol: ${dto.context.userRole}\n`;
        }
        if (dto.context.businessName) {
          enhancedSystemPrompt += `- İşletme: ${dto.context.businessName}\n`;
        }
        if (dto.context.taxOffice) {
          enhancedSystemPrompt += `- Vergi Dairesi: ${dto.context.taxOffice}\n`;
        }
        if (dto.context.recentInvoices && dto.context.recentInvoices.length > 0) {
          enhancedSystemPrompt += `- Son Faturalar: ${dto.context.recentInvoices.length} adet\n`;
        }
        if (dto.context.pendingTasks && dto.context.pendingTasks.length > 0) {
          enhancedSystemPrompt += `- Bekleyen Görevler: ${dto.context.pendingTasks.length} adet\n`;
        }
      }

      // Call Claude 4
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: enhancedSystemPrompt,
        messages: messages,
      });

      const assistantMessage = response.content[0];
      const responseText =
        assistantMessage.type === 'text' ? assistantMessage.text : '';

      // Detect intent (basic Turkish NLP)
      const intent = this.detectIntent(dto.message);

      // Generate suggestions based on intent
      const suggestions = this.generateSuggestions(intent, dto.context);

      this.logger.log(`✅ Chat response generated (intent: ${intent})`);

      return {
        response: responseText,
        intent,
        suggestions,
        model: 'claude-sonnet-4-20250514',
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('❌ Chat error:', error);
      throw new InternalServerErrorException('AI chat failed');
    }
  }

  /**
   * Voice-to-Voice Chat with Personaplex-7B
   * Pipeline: Whisper (STT) → Claude/Personaplex → TTS
   */
  async voiceChat(
    userId: string,
    dto: VoiceChatRequestDto,
  ): Promise<VoiceChatResponseDto> {
    try {
      if (!this.openai || !this.hf) {
        throw new InternalServerErrorException(
          'Voice AI services are not configured',
        );
      }

      this.logger.log(`🎤 Voice chat request from user ${userId}`);

      // Step 1: Speech-to-Text with Whisper
      const audioBuffer = Buffer.from(dto.audio, 'base64');
      const transcription = await this.transcribeAudio(audioBuffer, dto.format);

      this.logger.log(`🗣️  Transcribed: "${transcription}"`);

      // Step 2: Generate text response with Claude
      const textResponse = await this.chat(userId, {
        message: transcription,
        history: dto.history,
      });

      // Step 3: Text-to-Speech (placeholder - will implement with proper TTS)
      // For now, return mock audio
      const audioResponse = await this.textToSpeech(textResponse.response);

      // Step 4: Detect intent
      const intent = this.detectIntent(transcription);

      this.logger.log(`✅ Voice chat completed (intent: ${intent})`);

      return {
        transcription,
        responseText: textResponse.response,
        audioResponse,
        intent,
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('❌ Voice chat error:', error);
      throw new InternalServerErrorException('Voice AI chat failed');
    }
  }

  /**
   * Transcribe audio with Whisper
   */
  private async transcribeAudio(
    audioBuffer: Buffer,
    format: string = 'wav',
  ): Promise<string> {
    try {
      // Convert Buffer to Uint8Array for OpenAI API
      const uint8Array = new Uint8Array(audioBuffer);
      const blob = new Blob([uint8Array], { type: `audio/${format}` });
      const file = new File([blob], `audio.${format}`, {
        type: `audio/${format}`,
      });

      const transcription = await this.openai.audio.transcriptions.create({
        file: file as any,
        model: 'whisper-1',
        language: 'tr', // Türkçe
      });

      return transcription.text;
    } catch (error) {
      this.logger.error('❌ Ses-yazı dönüştürme hatası:', error);
      throw new InternalServerErrorException('Ses-yazı dönüştürme başarısız');
    }
  }

  /**
   * Text-to-Speech (Placeholder)
   * TODO: Implement with proper TTS service (ElevenLabs, Google TTS, etc.)
   */
  private async textToSpeech(text: string): Promise<string> {
    // For now, return empty base64 as placeholder
    // Will implement proper TTS integration in next iteration
    this.logger.warn('⚠️  TTS not yet implemented - returning empty audio');
    return '';
  }

  /**
   * Turkish Intent Recognition (Basic NLP)
   */
  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Tax-related intents
    if (
      lowerMessage.includes('vergi') ||
      lowerMessage.includes('kdv') ||
      lowerMessage.includes('gelir vergisi') ||
      lowerMessage.includes('beyanname')
    ) {
      return 'tax_inquiry';
    }

    // Invoice-related intents
    if (
      lowerMessage.includes('fatura') ||
      lowerMessage.includes('e-fatura') ||
      lowerMessage.includes('e-arşiv')
    ) {
      return 'invoice_inquiry';
    }

    // SGK-related intents
    if (
      lowerMessage.includes('sgk') ||
      lowerMessage.includes('sigorta') ||
      lowerMessage.includes('işçi') ||
      lowerMessage.includes('bordro')
    ) {
      return 'sgk_inquiry';
    }

    // KVKK-related intents
    if (
      lowerMessage.includes('kvkk') ||
      lowerMessage.includes('veri') ||
      lowerMessage.includes('kişisel')
    ) {
      return 'kvkk_inquiry';
    }

    // e-Devlet intents
    if (lowerMessage.includes('e-devlet') || lowerMessage.includes('kamu')) {
      return 'edevlet_inquiry';
    }

    // General help
    if (
      lowerMessage.includes('yardım') ||
      lowerMessage.includes('nasıl') ||
      lowerMessage.includes('nedir')
    ) {
      return 'help_request';
    }

    return 'general_inquiry';
  }

  /**
   * Generate contextual suggestions
   */
  private generateSuggestions(intent: string, context?: any): string[] {
    const suggestions: string[] = [];

    switch (intent) {
      case 'tax_inquiry':
        suggestions.push('Vergi hesaplama yap');
        suggestions.push('Vergi takvimini göster');
        suggestions.push('KDV beyannamesi hazırla');
        break;

      case 'invoice_inquiry':
        suggestions.push('Yeni fatura oluştur');
        suggestions.push('Son faturaları göster');
        suggestions.push('GİB\'e gönder');
        break;

      case 'sgk_inquiry':
        suggestions.push('İşçi bildirimi yap');
        suggestions.push('Bordro hesapla');
        suggestions.push('SGK prim hesapla');
        break;

      case 'kvkk_inquiry':
        suggestions.push('KVKK aydınlatma metni oluştur');
        suggestions.push('Veri işleme kayıtları');
        suggestions.push('Rıza metni hazırla');
        break;

      case 'edevlet_inquiry':
        suggestions.push('e-Devlet işlemlerini göster');
        suggestions.push('Kamu hizmetleri');
        break;

      default:
        suggestions.push('Fatura oluştur');
        suggestions.push('Vergi hesapla');
        suggestions.push('Yardım al');
    }

    return suggestions;
  }

  /**
   * Get proactive suggestions based on user context
   */
  async getProactiveSuggestions(userId: string, context: any): Promise<string[]> {
    const suggestions: string[] = [];

    // Check for upcoming tax deadlines
    const now = new Date();
    const month = now.getMonth() + 1;

    // KDV beyannamesi (her ay 26'sı)
    if (now.getDate() <= 26) {
      suggestions.push(
        `⚠️ ${month}. ay KDV beyannameniz ${26 - now.getDate()} gün içinde son bulacak`,
      );
    }

    // Gelir Vergisi (Mart ayı)
    if (month === 3) {
      suggestions.push('📅 Yıllık Gelir Vergisi beyannamesi hazırlayın (25 Mart son tarih)');
    }

    // Check pending invoices
    if (context?.recentInvoices && context.recentInvoices.length > 0) {
      const draftInvoices = context.recentInvoices.filter(
        (inv: any) => inv.status === 'DRAFT',
      );
      if (draftInvoices.length > 0) {
        suggestions.push(
          `💼 ${draftInvoices.length} adet taslak faturanız GİB'e gönderilmeyi bekliyor`,
        );
      }
    }

    // Check pending payments
    if (context?.pendingTasks && context.pendingTasks.length > 0) {
      suggestions.push(`📋 ${context.pendingTasks.length} adet bekleyen göreviniz var`);
    }

    return suggestions;
  }

  /**
   * Health check for AI services
   */
  async healthCheck(): Promise<{
    claude: boolean;
    personaplex: boolean;
    whisper: boolean;
  }> {
    return {
      claude: !!this.anthropic,
      personaplex: !!this.hf,
      whisper: !!this.openai,
    };
  }
}
