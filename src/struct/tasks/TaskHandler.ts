import type { Awaitable, Collection } from "discord.js";
import type { TaskHandlerEvents } from "../../typings/events.ts";
import CitrusError from "../../util/CitrusError.ts";
import type Category from "../../util/Category.ts";
import type CitrusClient from "../CitrusClient.ts";
import CitrusHandler, { CitrusHandlerOptions, LoadPredicate } from "../CitrusHandler.ts";
import Task from "./Task.ts";

/**
 * Loads tasks.
 */
export default class TaskHandler extends CitrusHandler {
	/**
	 * Categories, mapped by ID to Category.
	 */
	public declare categories: Collection<string, Category<string, Task>>;

	/**
	 * Class to handle.
	 */
	public declare classToHandle: typeof Task;

	/**
	 * The Citrus client
	 */
	public declare client: CitrusClient;

	/**
	 * Directory to tasks.
	 */
	public declare directory: string;

	/**
	 * Tasks loaded, mapped by ID to task.
	 */
	public declare modules: Collection<string, Task>;

	/**
	 * @param client - The Citrus client.
	 * @param options - Options.
	 */
	public constructor(client: CitrusClient, options: CitrusHandlerOptions) {
		const { directory, classToHandle = Task, extensions = [".js", ".ts"], automateCategories, loadFilter } = options ?? {};

		if (!(classToHandle.prototype instanceof Task || classToHandle === Task)) {
			throw new CitrusError("INVALID_CLASS_TO_HANDLE", classToHandle.name, Task.name);
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
	 * Start all tasks.
	 */
	public startAll(): void {
		this.client.once("ready", () => {
			this.modules.forEach(module => {
				if (!(module instanceof Task)) return;
				if (module.runOnStart) module.exec();
				if (module.delay) {
					setInterval(() => {
						module.exec();
					}, Number(module.delay));
				}
			});
		});
	}
}

type Events = TaskHandlerEvents;

export default interface TaskHandler extends CitrusHandler {
	/**
	 * Deregisters a task.
	 * @param task - Task to use.
	 */
	deregister(task: Task): void;

	/**
	 * Finds a category by name.
	 * @param name - Name to find with.
	 */
	findCategory(name: string): Category<string, Task>;

	/**
	 * Loads a task.
	 * @param thing - Task or path to task.
	 */
	load(thing: string | Task, isReload?: boolean): Promise<Task>;

	/**
	 * Reads all tasks from the directory and loads them.
	 * @param directory - Directory to load from. Defaults to the directory passed in the constructor.
	 * @param filter - Filter for files, where true means it should be loaded.
	 */
	loadAll(directory?: string, filter?: LoadPredicate): Promise<TaskHandler>;

	/**
	 * Registers a task.
	 * @param task - Task to use.
	 * @param filepath - Filepath of task.
	 */
	register(task: Task, filepath?: string): void;

	/**
	 * Reloads a task.
	 * @param id - ID of the task.
	 */
	reload(id: string): Promise<Task>;

	/**
	 * Reloads all tasks.
	 */
	reloadAll(): Promise<TaskHandler>;

	/**
	 * Removes a task.
	 * @param id - ID of the task.
	 */
	remove(id: string): Task;

	/**
	 * Removes all tasks.
	 */
	removeAll(): TaskHandler;

	on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Awaitable<void>): this;
	once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => Awaitable<void>): this;
}