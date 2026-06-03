-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'owner',
    "subscription_tier" TEXT NOT NULL DEFAULT 'free',
    "subscription_expires_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "server_groups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "region" TEXT,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "server_groups_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "servers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "group_id" TEXT,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "query_port" INTEGER NOT NULL DEFAULT 27165,
    "rcon_port" INTEGER NOT NULL DEFAULT 21114,
    "rcon_password" TEXT NOT NULL,
    "log_dir" TEXT,
    "max_players" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "current_map" TEXT,
    "current_players" INTEGER NOT NULL DEFAULT 0,
    "current_layer" TEXT,
    "game_mode" TEXT,
    "version" TEXT,
    "last_seen_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "servers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "server_groups" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "servers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "steam_id" TEXT NOT NULL,
    "eos_id" TEXT,
    "username" TEXT,
    "first_seen_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" DATETIME,
    "play_time_minutes" INTEGER NOT NULL DEFAULT 0,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "teamkills" INTEGER NOT NULL DEFAULT 0,
    "wounds" INTEGER NOT NULL DEFAULT 0,
    "revived" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "bans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "player_id" TEXT,
    "steam_id" TEXT NOT NULL,
    "eos_id" TEXT,
    "username" TEXT,
    "reason" TEXT,
    "banned_by" TEXT,
    "banned_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_global" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "bans_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bans_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bans_banned_by_fkey" FOREIGN KEY ("banned_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vip_members" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "player_id" TEXT NOT NULL,
    "server_id" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'vip',
    "expires_at" DATETIME NOT NULL,
    "created_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vip_members_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "vip_members_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "vip_members_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "server_id" TEXT,
    "action" TEXT NOT NULL,
    "target_type" TEXT,
    "target_id" TEXT,
    "details" TEXT,
    "ip_address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "audit_logs_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "server_metrics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player_count" INTEGER NOT NULL DEFAULT 0,
    "fps" REAL,
    "tick_rate" REAL,
    "memory_usage_mb" INTEGER,
    "cpu_usage_percent" REAL,
    CONSTRAINT "server_metrics_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "steam_id" TEXT NOT NULL,
    "username" TEXT,
    "team_id" INTEGER,
    "squad_id" INTEGER,
    "joined_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "left_at" DATETIME,
    "play_time_minutes" INTEGER,
    CONSTRAINT "player_sessions_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "player_sessions_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "player_id" TEXT,
    "steam_id" TEXT,
    "username" TEXT,
    "chat_type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "chat_logs_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chat_logs_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cdk_codes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "max_uses" INTEGER NOT NULL DEFAULT 1,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "expires_at" DATETIME,
    "created_by" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cdk_codes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cdk_redeems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cdk_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "steam_id" TEXT NOT NULL,
    "redeemed_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cdk_redeems_cdk_id_fkey" FOREIGN KEY ("cdk_id") REFERENCES "cdk_codes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cdk_redeems_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "players_steam_id_key" ON "players"("steam_id");

-- CreateIndex
CREATE INDEX "bans_steam_id_idx" ON "bans"("steam_id");

-- CreateIndex
CREATE INDEX "bans_is_active_idx" ON "bans"("is_active");

-- CreateIndex
CREATE INDEX "vip_members_player_id_idx" ON "vip_members"("player_id");

-- CreateIndex
CREATE INDEX "vip_members_server_id_idx" ON "vip_members"("server_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_server_id_idx" ON "audit_logs"("server_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE INDEX "server_metrics_server_id_timestamp_idx" ON "server_metrics"("server_id", "timestamp");

-- CreateIndex
CREATE INDEX "player_sessions_server_id_idx" ON "player_sessions"("server_id");

-- CreateIndex
CREATE INDEX "player_sessions_player_id_idx" ON "player_sessions"("player_id");

-- CreateIndex
CREATE INDEX "chat_logs_server_id_created_at_idx" ON "chat_logs"("server_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "cdk_codes_code_key" ON "cdk_codes"("code");
