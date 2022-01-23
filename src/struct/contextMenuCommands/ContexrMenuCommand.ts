/* eslint-disable func-names, @typescript-eslint/no-unused-vars */
import { ApplicationCommandType, type ContextMenuCommandInteraction, type Snowflake } from "discord.js";
import CitrusError from "../../util/CitrusError.ts";
import type Category from "../../util/Category.ts";
import Util from "../../util/Util.ts";
import type CitrusClient from "../CitrusClient.ts";
import CitrusModule, { CitrusModuleOptions } from "../CitrusModule.ts";
import type ContextMenuCommandHandler from "./ContextMenuCommandHandler.ts";

/**
 * Represents a context menu command.
 */
export default abstract class ContextMenuCommand extends CitrusModule {
	/**
	 * Assign context menu commands to Specific guilds. This option will make the commands not register globally, but only in the chosen servers.
	 */
	public declare guilds?: Snowflake[];

	/**
	 * The name of the context menu command.
	 */
	public declare name: string;

	/**
	 * Usable only by the client owner.
	 */
	public declare ownerOnly?: boolean;

	/**
	 * Whether or not to allow client superUsers(s) only.
	 */
	public declare superUserOnly?: boolean;

	/**
	 * The type of the context menu command.
	 */
	public declare type: ApplicationCommandType.User | ApplicationCommandType.Message;

	/**
	 * The category of this context menu command.
	 */
	public declare category: Category<string, ContextMenuCommand>;

	/**
	 * The Citrus client.
	 */
	public declare client: CitrusClient;

	/**
	 * The filepath.
	 */
	public declare filepath: string;

	/**
	 * The handler.
	 */
	public declare handler: ContextMenuCommandHandler;

	/**
	 * @param id - Listener ID.
	 * @param options - Options for the context menu command.
	 */
	public constructor(id: string, options: ContextMenuCommandOptions) {
		const { category, guilds, name, ownerOnly, superUserOnly, type } = options;

		if (category !== undefined && typeof category !== "string") throw new TypeError("options.category must be a string.");
		if (guilds !== undefined && !Util.isArrayOf(guilds, "string"))
			throw new TypeError("options.guilds must be an array of strings.");
		if (name !== undefined && typeof name !== "string") throw new TypeError("options.name must be a string.");
		if (ownerOnly !== undefined && typeof ownerOnly !== "boolean") throw new TypeError("options.ownerOnly must be a boolean");
		if (type !== ApplicationCommandType.User && type !== ApplicationCommandType.Message)
			throw new TypeError("options.type must be either ApplicationCommandType.User or ApplicationCommandType.Message.");

		super(id, { category });

		this.guilds = guilds;
		this.name = name;
		this.ownerOnly = ownerOnly;
		this.superUserOnly = superUserOnly;
		this.type = type;
	}

	/**
	 * Executes the context menu command.
	 * @param interaction - The context menu command interaction.
	 */
	public exec(interaction: ContextMenuCommandInteraction): any {
		throw new CitrusError("NOT_IMPLEMENTED", this.constructor.name, "exec");
	}
}

export default interface ContextMenuCommand extends CitrusModule {
	/**
	 * Reloads the context menu command.
	 */
	reload(): Promise<ContextMenuCommand>;

	/**
	 * Removes the context menu command.
	 */
	remove(): ContextMenuCommand;
}

/**
 * Options to use for context menu command execution behavior.
 */
export interface ContextMenuCommandOptions extends CitrusModuleOptions {
	/**
	 * Assign context menu commands to Specific guilds. This option will make the commands not register globally, but only in the chosen servers.
	 */
	guilds?: Snowflake[];

	/**
	 * The name of the context menu command.
	 */
	name: string;

	/**
	 * Usable only by the client owner.
	 */
	ownerOnly?: boolean;

	/**
	 * Whether or not to allow client superUsers(s) only.
	 */
	superUserOnly?: boolean;

	/**
	 * The type of the context menu command.
	 */
	type: ApplicationCommandType.User | ApplicationCommandType.Message;
}