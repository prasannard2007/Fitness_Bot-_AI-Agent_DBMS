import { query } from '../config/db.js';
import { encodeSecret, maskSecret } from '../utils/crypto.js';

export async function getIntegrationSettings(userId) {
  const result = await query('SELECT * FROM integration_settings WHERE user_id = $1', [userId]);
  if (!result.rowCount) {
    return {
      openaiApiKey: '',
      anthropicApiKey: '',
      geminiApiKey: '',
      webhookUrl: ''
    };
  }
  const row = result.rows[0];
  return {
    openaiApiKey: maskSecret(row.openai_api_key_encrypted ? Buffer.from(row.openai_api_key_encrypted, 'base64').toString('utf8') : ''),
    anthropicApiKey: maskSecret(row.anthropic_api_key_encrypted ? Buffer.from(row.anthropic_api_key_encrypted, 'base64').toString('utf8') : ''),
    geminiApiKey: maskSecret(row.gemini_api_key_encrypted ? Buffer.from(row.gemini_api_key_encrypted, 'base64').toString('utf8') : ''),
    webhookUrl: row.webhook_url || ''
  };
}

export async function upsertIntegrationSettings(userId, payload) {
  const { openaiApiKey, anthropicApiKey, geminiApiKey, webhookUrl } = payload;
  const result = await query(
    `INSERT INTO integration_settings (user_id, openai_api_key_encrypted, anthropic_api_key_encrypted, gemini_api_key_encrypted, webhook_url)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id)
     DO UPDATE SET
      openai_api_key_encrypted = COALESCE(EXCLUDED.openai_api_key_encrypted, integration_settings.openai_api_key_encrypted),
      anthropic_api_key_encrypted = COALESCE(EXCLUDED.anthropic_api_key_encrypted, integration_settings.anthropic_api_key_encrypted),
      gemini_api_key_encrypted = COALESCE(EXCLUDED.gemini_api_key_encrypted, integration_settings.gemini_api_key_encrypted),
      webhook_url = COALESCE(EXCLUDED.webhook_url, integration_settings.webhook_url),
      updated_at = NOW()
    RETURNING user_id, webhook_url, updated_at`,
    [userId, encodeSecret(openaiApiKey), encodeSecret(anthropicApiKey), encodeSecret(geminiApiKey), webhookUrl || null]
  );
  return result.rows[0];
}

export async function createRequirement(userId, payload) {
  const { title, details, priority = 'medium' } = payload;
  const result = await query(
    'INSERT INTO user_requirements (user_id, title, details, priority) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, title, details, priority]
  );
  return result.rows[0];
}

export async function listRequirements(userId) {
  const result = await query(
    'SELECT id, title, details, priority, status, created_at FROM user_requirements WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}
