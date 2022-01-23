/* eslint-disable func-names, @typescript-eslint/no-unused-vars */
import CitrusError from "../../util/CitrusError.ts";
import type Category from "../../util/Category.ts";
import type CitrusClient from "../CitrusClient.ts";
import CitrusModule, { CitrusModuleOptions } from "../CitrusModule.ts";
import type TaskHandler from "./TaskHandler.ts";

/**
 * Represents a task.
 */
export default abstract class Task extends CitrusModule {
	/**
	 * The category of this task.
	 */
	public declare category: Category<string, Task>;

	/**
	 * The Citrus client.
	 */
	public declare client: CitrusClient;

	/**
	 * The time in milliseconds between each time the task is run.
	 */
	public declare delay?: number;

	/**
	 * The filepath.
	 */
	public declare filepath: string;

	/**
	 * The handler.
	 */
	public declare handler: TaskHandler;

	/**
	 * Whether or not to run the task on start.
	 */
	public declare runOnStart: boolean;

	/**
	 * @param id - Task ID.
	 * @param options - Options for the task.
	 */
	public constructor(id: string, options: TaskOptions = {}) {
		const { category, delay, runOnStart = false } = options;

		if (delay !== undefined && typeof delay !== "number") throw new TypeError("options.delay must be a number.");
		if (typeof runOnStart !== "boolean") throw new TypeError("options.runOnStart must be a boolean.");

		super(id, { category });
		this.delay = delay;
		this.runOnStart = runOnStart;
	}

	/**
	 * Executes the task.
	 * @param args - Arguments.
	 */
	public exec(...args: any[]): any {
		throw new CitrusError("NOT_IMPLEMENTED", this.constructor.name, "exec");
	}
}

export default interface Task extends CitrusModule {
	/**
	 * Reloads the task.
	 */
	reload(): Promise<Task>;

	/**
	 * Removes the task.
	 */
	remove(): Task;

	/**
	 * Returns the ID.
	 */
	toString(): string;
}

/**
 * Options to use for task execution behavior.
 */
export interface TaskOptions extends CitrusModuleOptions {
	/**
	 * The amount of time between the task being executed.
	 */
	delay?: number;

	/**
	 * Whether or not the task runs on start.
	 * @default false
	 */
	runOnStart?: boolean;
}