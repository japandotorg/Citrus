import "source-map-support/register";
import packageJSON from "../package.json";
import CitrusClient, { CitrusOptions } from "./struct/CitrusClient.ts";
import CitrusHandler, { CitrusHandlerOptions, LoadPredicate } from "./struct/CitrusHandler.ts";
import CitrusModule, { CitrusModuleOptions } from "./struct/CitrusModule.ts";
import ClientUtil from "./struct/ClientUtil.ts";
import Argument, {
	ArgumentMatch,
	ArgumentOptions,
	ArgumentPromptData,
	ArgumentPromptOptions,
	ArgumentType,
	ArgumentTypeCaster,
	BaseArgumentType,
	DefaultArgumentOptions,
	DefaultValueSupplier,
	FailureData,
	OtherwiseContentModifier,
	OtherwiseContentSupplier,
	ParsedValuePredicate,
	PromptContentModifier,
	PromptContentSupplier
} from "./struct/commands/arguments/Argument.ts";
import ArgumentRunner, { ArgumentRunnerState } from "./struct/commands/arguments/ArgumentRunner.ts";
import TypeResolver from "./struct/commands/arguments/TypeResolver.ts";
import Command, {
	CitrusApplicationCommandAutocompleteOption,
	CitrusApplicationCommandChannelOptionData,
	CitrusApplicationCommandChoicesData,
	CitrusApplicationCommandNonOptionsData,
	CitrusApplicationCommandNumericOptionData,
	CitrusApplicationCommandOptionData,
	CitrusApplicationCommandSubCommandData,
	CitrusApplicationCommandSubGroupData,
	ArgumentGenerator,
	BeforeAction,
	CommandOptions,
	ExecutionPredicate,
	KeySupplier,
	MissingPermissionSupplier,
	RegexSupplier,
	SlashOption,
	SlashPermissionsSupplier
} from "./struct/commands/Command.ts";
import CommandHandler, {
	CommandHandlerOptions,
	CooldownData,
	IgnoreCheckPredicate,
	MentionPrefixPredicate,
	ParsedComponentData,
	PrefixSupplier,
	RegisterInteractionCommandError,
	SlashResolveType
} from "./struct/commands/CommandHandler.ts";
import CommandUtil from "./struct/commands/CommandUtil.ts";
import ContentParser, {
	ContentParserOptions,
	ContentParserResult,
	ExtractedFlags,
	StringData
} from "./struct/commands/ContentParser.ts";
import Flag from "./struct/commands/Flag.ts";
import ContextMenuCommand, { ContextMenuCommandOptions } from "./struct/contextMenuCommands/ContexrMenuCommand.ts";
import ContextMenuCommandHandler from "./struct/contextMenuCommands/ContextMenuCommandHandler.ts";
import Inhibitor, { InhibitorOptions } from "./struct/inhibitors/Inhibitor.ts";
import InhibitorHandler from "./struct/inhibitors/InhibitorHandler.ts";
import Listener, { ListenerOptions, ListenerType } from "./struct/listeners/Listener.ts";
import ListenerHandler from "./struct/listeners/ListenerHandler.ts";
import Task, { TaskOptions } from "./struct/tasks/Task.ts";
import TaskHandler from "./struct/tasks/TaskHandler.ts";
import type {
	CitrusClientEvents,
	CitrusHandlerEvents,
	CommandHandlerEvents,
	ContextMenuCommandHandlerEvents,
	InhibitorHandlerEvents,
	ListenerHandlerEvents,
	TaskHandlerEvents
} from "./typings/events.ts";
import CitrusError from "./util/CitrusError.ts";
import CitrusMessage from "./util/CitrusMessage.ts";
import Category from "./util/Category.ts";
import * as Constants from "./util/Constants.ts";
import Util from "./util/Util.ts";

const version = packageJSON.version;

declare module "discord.js" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface Message<Cached extends boolean = boolean> extends Base {
		/**
		 * Extra properties applied to the Discord.js message object.
		 * Utilities for command responding.
		 * Available on all messages after 'all' inhibitors and built-in inhibitors (bot, client).
		 * Not all properties of the util are available, depending on the input.
		 * */
		util?: CommandUtil<Message>;
	}
}

export {
	CitrusClient,
	CitrusError,
	CitrusHandler,
	CitrusMessage,
	CitrusModule,
	Argument,
	ArgumentRunner,
	ArgumentRunnerState,
	Category,
	ClientUtil,
	Command,
	CommandHandler,
	CommandUtil,
	Constants,
	ContentParser,
	ContentParserResult,
	ContextMenuCommand,
	ContextMenuCommandHandler,
	Flag,
	Inhibitor,
	InhibitorHandler,
	Listener,
	ListenerHandler,
	PromptContentModifier,
	RegisterInteractionCommandError,
	Task,
	TaskHandler,
	TypeResolver,
	Util,
	version
};
export type {
	CitrusApplicationCommandAutocompleteOption,
	CitrusApplicationCommandChannelOptionData,
	CitrusApplicationCommandChoicesData,
	CitrusApplicationCommandNonOptionsData,
	CitrusApplicationCommandNumericOptionData,
	CitrusApplicationCommandOptionData,
	CitrusApplicationCommandSubCommandData,
	CitrusApplicationCommandSubGroupData,
	CitrusClientEvents,
	CitrusHandlerEvents,
	CitrusHandlerOptions,
	CitrusModuleOptions,
	CitrusOptions,
	ArgumentGenerator,
	ArgumentMatch,
	ArgumentOptions,
	ArgumentPromptData,
	ArgumentPromptOptions,
	ArgumentType,
	ArgumentTypeCaster,
	BaseArgumentType,
	BeforeAction,
	CommandHandlerEvents,
	CommandHandlerOptions,
	CommandOptions,
	ContentParserOptions,
	ContextMenuCommandHandlerEvents,
	ContextMenuCommandOptions,
	CooldownData,
	DefaultArgumentOptions,
	DefaultValueSupplier,
	ExecutionPredicate,
	ExtractedFlags,
	FailureData,
	IgnoreCheckPredicate,
	InhibitorHandlerEvents,
	InhibitorOptions,
	KeySupplier,
	ListenerHandlerEvents,
	ListenerOptions,
	ListenerType,
	LoadPredicate,
	MentionPrefixPredicate,
	MissingPermissionSupplier,
	OtherwiseContentModifier,
	OtherwiseContentSupplier,
	ParsedComponentData,
	ParsedValuePredicate,
	PrefixSupplier,
	PromptContentSupplier,
	RegexSupplier,
	SlashOption,
	SlashPermissionsSupplier,
	SlashResolveType as SlashResolveTypes,
	StringData,
	TaskHandlerEvents,
	TaskOptions
};