import { boolean, pgTable, timestamp, text, pgEnum, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	token: text("token").notNull().unique(),
	expiresAt: timestamp("expires_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

// Chat and Message related enums
export const messageSenderEnum = pgEnum("message_sender", ["user", "assistant"]);
export const messageStatusEnum = pgEnum("message_status", ["sent", "delivered", "read", "failed"]);
export const reactionTypeEnum = pgEnum("reaction_type", ["like", "love", "laugh", "wow", "sad", "angry"]);

// Simplified chat table for single-user AI conversations
export const chat = pgTable("chat", {
	id: text("id").primaryKey(), // Unique chat ID
	title: text("title"), // Chat title (auto-generated or user-defined)
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), // Owner of the chat
	lastMessageId: text("last_message_id"), // Most recent message
	lastMessageAt: timestamp("last_message_at"), // When the last message was sent
	isArchived: boolean("is_archived").notNull().default(false), // Archive status
	isPinned: boolean("is_pinned").notNull().default(false), // Pin status
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

// Enhanced message table
export const message = pgTable("message", {
	id: text("id").primaryKey(), // Unique message ID
	chatId: text("chat_id").notNull().references(() => chat.id, { onDelete: "cascade" }), // Chat to which the message belongs
	senderId: text("sender_id").notNull().references(() => user.id, { onDelete: "cascade" }), // User who sent the message
	content: text("content").notNull(), // The actual message content
	messageType: messageSenderEnum("message_type").notNull(), // Identifies if the message is from user or assistant
	status: messageStatusEnum("status").notNull().default("sent"), // Message delivery status
	replyToId: text("reply_to_id"), // Reply to another message (will be managed via application logic)
	isEdited: boolean("is_edited").notNull().default(false), // Whether message was edited
	editedAt: timestamp("edited_at"), // When message was last edited
	isDeleted: boolean("is_deleted").notNull().default(false), // Soft delete flag
	deletedAt: timestamp("deleted_at"), // When message was deleted
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

// Message reactions
export const messageReaction = pgTable("message_reaction", {
	id: text("id").primaryKey(),
	messageId: text("message_id").notNull().references(() => message.id, { onDelete: "cascade" }),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	reactionType: reactionTypeEnum("reaction_type").notNull(),
	createdAt: timestamp("created_at").notNull(),
});

// File attachments for messages
export const messageAttachment = pgTable("message_attachment", {
	id: text("id").primaryKey(),
	messageId: text("message_id").notNull().references(() => message.id, { onDelete: "cascade" }),
	fileName: text("file_name").notNull(),
	fileUrl: text("file_url").notNull(),
	fileType: text("file_type").notNull(), // image, video, audio, document, etc.
	fileSize: integer("file_size"), // File size in bytes
	mimeType: text("mime_type"),
	createdAt: timestamp("created_at").notNull(),
});

// Message read receipts
export const messageReadReceipt = pgTable("message_read_receipt", {
	id: text("id").primaryKey(),
	messageId: text("message_id").notNull().references(() => message.id, { onDelete: "cascade" }),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	readAt: timestamp("read_at").notNull(),
	createdAt: timestamp("created_at").notNull(),
});

// Chat settings per user
export const chatSettings = pgTable("chat_settings", {
	id: text("id").primaryKey(),
	chatId: text("chat_id").notNull().references(() => chat.id, { onDelete: "cascade" }),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	isMuted: boolean("is_muted").notNull().default(false), // Mute notifications
	isPinned: boolean("is_pinned").notNull().default(false), // Pin chat for user
	lastReadAt: timestamp("last_read_at"), // Last time user read messages
	notificationSettings: text("notification_settings"), // JSON string for notification preferences
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});