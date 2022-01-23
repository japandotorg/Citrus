import { Awaitable, Client, ClientOptions, Snowflake, UserResolvable } from "discord.js";
import type { CitrusClientEvents } from "../typings/events.ts";
import ClientUtil from "./ClientUtil.ts";

/**
 * The Citrus framework client.
 * Creates the handlers and sets them up
 */
export default class CitrusClient<Ready extends boolean = boolean> extends Client<Ready> {
    
    /**
     * The ID of the owner(s)
     */
    public declare ownerID: Snowflake | Snowflake[];

    /**
     * The ID of the superUser(s)
     */
    public declare superUserID: Snowflake | Snowflake[];

    /**
     * Utility methods
     */
    public declare util: ClientUtil;

    /**
     * @param {CitrusOptions} [options={}] - Options for the client.
     * @param {ClientOptions} [clientOptions] - Options for Discord JS client.
     * If not specified, the previous options parameter is used instead.
     */
    public constructor(options: CitrusOptions & ClientOptions);
    public constructor(options: CitrusOptions, clientOptions: ClientOptions);
    public constructor(options: (CitrusOptions & ClientOptions) | CitrusOptions, clientOptions?: ClientOptions) {
        const combinedOptions = { ...options, ...clientOptions };
        super(combinedOptions as CitrusOptions & ClientOptions);
        this.ownerID = combinedOptions.ownerID ?? [];
        this.superUserID = combinedOptions.superUserID ?? [];
        this.util = new ClientUtil(this);
    }

    /**
	 * Checks if a user is the owner of this bot.
	 * @param user - User to check.
	 */
	public isOwner(user: UserResolvable): boolean {
		const id = this.users.resolveId(user);
		if (!id) return false;
		return Array.isArray(this.ownerID) ? this.ownerID.includes(id) : id === this.ownerID;
	}

    /**
	 * Checks if a user is a super user of this bot.
	 * @param user - User to check.
	 */
	public isSuperUser(user: UserResolvable): boolean {
		const id = this.users.resolveId(user);
		if (!id) return false;
		return Array.isArray(this.superUserID)
			? this.superUserID.includes(id) || this.ownerID.includes(id)
			: id === this.superUserID || id === this.ownerID;
	}
}

type Event = CitrusClientEvents;

export default interface CitrusClient<Ready extends boolean = boolean> extends Client<Ready> {
	on<K extends keyof Event>(event: K, listener: (...args: Event[K]) => Awaitable<void>): this;
	on<S extends string | symbol>(event: Exclude<S, keyof Event>, listener: (...args: any[]) => Awaitable<void>): this;

	once<K extends keyof Event>(event: K, listener: (...args: Event[K]) => Awaitable<void>): this;
	once<S extends string | symbol>(event: Exclude<S, keyof Event>, listener: (...args: any[]) => Awaitable<void>): this;

	emit<K extends keyof Event>(event: K, ...args: Event[K]): boolean;
	emit<S extends string | symbol>(event: Exclude<S, keyof Event>, ...args: unknown[]): boolean;

	off<K extends keyof Event>(event: K, listener: (...args: Event[K]) => Awaitable<void>): this;
	off<S extends string | symbol>(event: Exclude<S, keyof Event>, listener: (...args: any[]) => Awaitable<void>): this;

	removeAllListeners<K extends keyof Event>(event?: K): this;
	removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof Event>): this;
}

/**
 * Options for the client.
 */
export interface CitrusOptions {
	/**
	 * Discord ID of the client owner(s).
	 * @default []
	 */
	ownerID?: Snowflake | Snowflake[];

	/**
	 * Discord ID of the client superUsers(s).
	 * @default []
	 */
	superUserID?: Snowflake | Snowflake[];
}