import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';
import {
  ChatRequestDto,
  ChatResponseDto,
  VoiceChatRequestDto,
  VoiceChatResponseDto,
} from './dto/chat.dto';

/**
 * AI Controller - AI Assistant API Endpoints
 * Secured with JWT authentication
 */
@ApiTags('AI Assistant')
@Controller('v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Text chat with AI assistant
   * POST /api/v1/ai/chat
   */
  @Post('chat')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Text chat with AI assistant',
    description:
      'Send a text message to the AI assistant and get a response with context awareness',
  })
  @ApiResponse({
    status: 200,
    description: 'Chat response generated successfully',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - AI service failed',
  })
  async chat(@Request() req: any, @Body() dto: ChatRequestDto): Promise<ChatResponseDto> {
    const userId = req.user.sub;
    return this.aiService.chat(userId, dto);
  }

  /**
   * Voice chat with AI assistant
   * POST /api/v1/ai/voice-chat
   */
  @Post('voice-chat')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Voice-to-voice chat with AI assistant',
    description:
      'Send audio to the AI assistant and get voice response (Whisper STT + Personaplex + TTS)',
  })
  @ApiResponse({
    status: 200,
    description: 'Voice chat response generated successfully',
    type: VoiceChatResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - Voice AI service failed',
  })
  async voiceChat(
    @Request() req: any,
    @Body() dto: VoiceChatRequestDto,
  ): Promise<VoiceChatResponseDto> {
    const userId = req.user.sub;
    return this.aiService.voiceChat(userId, dto);
  }

  /**
   * Get proactive suggestions
   * GET /api/v1/ai/suggestions
   */
  @Get('suggestions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get proactive AI suggestions',
    description:
      'Get personalized suggestions based on user context (upcoming deadlines, pending tasks)',
  })
  @ApiResponse({
    status: 200,
    description: 'Suggestions retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        suggestions: {
          type: 'array',
          items: { type: 'string' },
        },
        timestamp: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getSuggestions(@Request() req: any) {
    const userId = req.user.sub;

    // TODO: Fetch actual user context from database
    const context = {
      userRole: 'ESNAF',
      businessName: 'Test İşletmesi',
      recentInvoices: [],
      pendingTasks: [],
    };

    const suggestions = await this.aiService.getProactiveSuggestions(userId, context);

    return {
      suggestions,
      timestamp: new Date(),
    };
  }

  /**
   * Health check for AI services
   * GET /api/v1/ai/health
   */
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'AI services health check',
    description: 'Check if Claude, Personaplex, and Whisper services are available',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status retrieved',
    schema: {
      type: 'object',
      properties: {
        claude: { type: 'boolean' },
        personaplex: { type: 'boolean' },
        whisper: { type: 'boolean' },
      },
    },
  })
  async healthCheck() {
    return this.aiService.healthCheck();
  }
}
