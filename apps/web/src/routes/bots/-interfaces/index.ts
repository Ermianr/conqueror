export interface DiscordApiResponse {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot: boolean;
  banner: string;
  accent_color: string;
  global_name: string;
  avatar_decoration_data: string;
  collectibles: string;
  display_name_styles: string;
  banner_color: string;
  clan: string;
  primary_guild: string;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
  bio: string;
}

export interface DiscordCheckTokenResponse {
  valid: boolean;
  botDiscordId?: string;
  username?: string;
}
