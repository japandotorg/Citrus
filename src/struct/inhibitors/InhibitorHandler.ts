import type { Awaitable, Collection, Message } from "discord.js";
import type { InhibitorHandlerEvents } from "../../typings/events.ts";
import CitrusError from "../../util/CitrusError.ts";
import type CitrusMessage from "../../util/CitrusMessage.ts";
import type Category from "../../util/Category.ts";
import Util from "../../util/Util.ts";
import type CitrusClient from "../CitrusClient.ts";
import CitrusHandler, { CitrusHandlerOptions, LoadPredicate } from "../CitrusHandler.ts";
import type Command from "../commands/Command.ts";
import Inhibitor from "./Inhibitor.ts";

/**
 * Loads inhibitors and checks messages.
 */
export default class InhibitorHandler extends CitrusHandler {
    /**
     * Categories, mapped by ID to Category.
     */
    public declare categories: Collection<string, Category<string, Inhibitor>>;

    /**
     * Class to handle.
     */
    public declare classToHandle: typeof Inhibitor;

    /**
     * The Citrus client.
     */
    public declare client: CitrusClient;

    /**
     * Directory to inhibitors.
     */
    public declare directory: string;

    /**
     * Inhibitors loaded, mapped by ID to Inhibitor.
     */
    public declare modules: Collection<string, Inhibitor>;

    /**
     * @param client - The Citrus client.
     * @param options - Options.
     */
    public constructor(client: CitrusClient, options: CitrusHandlerOptions) {
        const { directory, classToHandle = Inhibitor, extensions = [".js", ".ts"], automateCategories, loadFilter } = options ?? {};

        if (!(classToHandle.prototype instanceof Inhibitor || classToHandle === Inhibitor)) {
            throw new CitrusError("INVALID_CLASS_TO_HANDLE", classToHandle.name, Inhibitor.name);
        }

        super(client, {
            directory,
            classToHandle,
            extensions,
            automateCategories,
            loadFilter
        });
    }

    /**
     * Tests inhibitors against the message.
     * Returns the reason if blocked.
     * @param type - Type of inhibitor, 'all', 'pre', or 'post'.
     * @param message - Message to test.
     * @param command - Command to use.
     */
    public async test(
        type: "all" | "pre" | "post",
        message: Message | CitrusMessage,
        command?: Command
    ): Promise<string | null | void> {
        if (!this.modules.size) return null;

        const inhibitors = this.modules.filter(i => i.type === type);
        if (!inhibitors.size) return null;

        const promises = [];

        for (const inhibitor of inhibitors.values()) {
            promises.push(
                (async () => {
                    let inhibited = inhibitor.exec(message, command);
                    if (Util.isPromise(inhibited)) inhibited = await inhibited;
                    if (inhibited) return inhibitor;
                    return null;
                })()
            );
        }

        const inhibitedInhibitors = (await Promise.all(promises)).filter(r => r) as Inhibitor[];
        if (!inhibitedInhibitors.length) return null;

        inhibitedInhibitors.sort((a, b) => b.priority - a.priority);
        return inhibitedInhibitors[0].reason;
    }
}

type Events = InhibitorHandlerEvents;

export default interface InhibitorHandler extends CitrusHandler {
    /**
     * Deregisters an inhibitor.
     * @param inhibitor - Inhibitor to use.
     */
    deregister(inhibitor: Inhibitor): void;

    /**
     * Finds a category by name.
     * @param name - Name to find with.
     */
    findCategory(name: string): Category<string, Inhibitor>;

    /**
     * Loads an inhibitor.
     * @param thing - Inhibitor or path to inhibitor.
     */
    load(thing: string | Inhibitor): Promise<Inhibitor>;

    /**
     * Reads all inhibitors from the directory and loads them.
     * @param directory - Directory to load from. Defaults to the directory passed in the constructor.
     * @param filter - Filter for files, where true means it should be loaded.
     */
    loadAll(directory?: string, filter?: LoadPredicate): Promise<InhibitorHandler>;

    /**
     * Registers an inhibitor.
     * @param inhibitor - Inhibitor to use.
     * @param filepath - Filepath of inhibitor.
     */
    register(inhibitor: Inhibitor, filepath?: string): void;

    /**
     * Reloads an inhibitor.
     * @param id - ID of the inhibitor.
     */
    reload(id: string): Promise<Inhibitor>;

    /**
     * Reloads all inhibitors.
     */
    reloadAll(): Promise<InhibitorHandler>;

    /**
     * Removes an inhibitor.
     * @param id - ID of the inhibitor.
     */
    remove(id: string): Inhibitor;

    /**
     * Removes all inhibitors.
     */
    removeAll(): InhibitorHandler;

    on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Awaitable<void>): this;
    once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Awaitable<void>): this;
}