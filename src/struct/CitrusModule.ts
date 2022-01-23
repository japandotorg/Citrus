import type Category from "../util/Category.ts";
import type CitrusClient from "./CitrusClient.ts";
import type CitrusHandler from "./CitrusHandler.ts";

/**
 * Base class for a module.
 */
export default abstract class CitrusModule {
	/**
	 * Category this belongs to.
	 */
	public declare category: Category<string, CitrusModule>;

	/**
	 * ID of the category this belongs to.
	 */
	public declare categoryID: string;

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
	public declare handler: CitrusHandler;

	/**
	 * ID of the module.
	 */
	public declare id: string;

	/**
	 * @param id - ID of module.
	 * @param options - Options.
	 */
	public constructor(id: string, options?: CitrusModuleOptions) {
		const { category = "default" } = options ?? {};

		if (typeof category !== "string") throw new TypeError("options.category must be a string.");

		this.id = id;
		this.categoryID = category;
		this.category = null!;
		this.filepath = null!;
		this.client = null!;
		this.handler = null!;
	}

	/**
	 * Reloads the module.
	 */
	public reload(): Promise<CitrusModule> {
		return this.handler?.reload(this.id) as Promise<this>;
	}

	/**
	 * Removes the module.
	 */
	public remove(): CitrusModule {
		return this.handler?.remove(this.id) as this;
	}

	/**
	 * Returns the ID.
	 */
	public toString(): string {
		return this.id;
	}
}

export interface CitrusModuleOptions {
	/**
	 * Category ID for organization purposes.
	 * @default "default"
	 */
	category?: string;
}