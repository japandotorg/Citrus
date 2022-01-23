<h1 align="center">
    discord-citrus
</h1>

<div align="center">
    <p>
        <a href="https://npmjs.com/package/discord-citrus"><img src="https://img.shields.io/npm/v/discord-citrus?color=pink&style=flat-square"></a>
        <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/npm/types/discord-citrus?color=pink&style=flat-square"></a>
        <a href="https://opensource.org/licenses/ISC"><img src="https://img.shields.io/npm/l/discord-citrus?color=pink&style=flat-square"></a>
    </p>
    <p>
        <a href="https://discord.gg/danklovers"><img src="https://discordapp.com/api/guilds/772708529744248842/widget.png?style=shield" alt="Discord Server"></a>
    </p>
</div>

<div align="center">
    <p>
        <a href="https://npmjs.com/package/discord-citrus"><img src="https://nodeico.herokuapp.com/discord-citrus.svg"></a>
    </p>
</div>

<p align="center">
  <a href="#installation">Installation</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#license">License</a>
  •
  <a href="https://www.npmjs.com/package/discord-citrus">npmjs</a>
</p>

## Installation

Requires Node 16.6.0+ and Discord.js v13.

 - *discord citrus* <br />
` - ` `npm i discord-citrus`

 - *discord.js* <br />
` - ` `npm install discord.js`

 - *sqlite (optional)* <br />
` - ` `npm install sqlite`

 - *sequelize (optional)* <br />
` - ` `npm install sequelize`

## Features

### Completely modular commands, inhibitors, and listeners

  - Reading files recursively from directories.
  - Adding, removing, and reloading modules.
  - Creating your own handlers and module types.

### Flexible command handling and creation.

  - Command aliases.
  - Command throttling and cooldowns.
  - Client and user permission checks.
  - Running commands on edits and editing previous responses.
  - Multiple prefixes and mention prefixes.
  - Regular expression and conditional triggers.

### Complex and highly customizable arguments.

  - Support for quoted arguments.
  - Arguments based on previous arguments.
  - Several ways to match arguments, such as flag arguments.
  - Casting input into certain types.
    - Simple types such as string, integer, float, url, date, etc.
    - Discord-related types such as user, member, message, etc.
    - Types that you can add yourself.
    - Asynchronous type casting.
  - Prompting for input for arguments.
    - Customizable prompts with embeds, files, etc.
    - Easily include dynamic data such as the incorrect input.
    - Infinite argument prompting.

### Blocking and monitoring messages with inhibitors.

  - Run at various stages of command handling.
    - On all messages.
    - On messages that are from valid users.
    - On messages before commands.

### Helpful events and modular listeners.

  - Events for handlers, such as loading modules.
  - Events for various stages of command handling.
  - Reloadable listeners to easily separate your event handling.

### Useful utilities and database providers.

  - Resolvers for members, users, and others that can filter by name.
  - Shortcut methods for making embeds and collections.
  - Simple to use database providers.
    - Built-in support for `sqlite` and `sequelize`.
    - Works on entire table or single JSON column.
    - Caching data from databases.

## License

Released under the [ISC](https://www.isc.org/licenses/) license.

Citrus (adj.) is derived from the Modern Latin genus name, from Latin *citrus* ["citron tree"](https://en.wikipedia.org/wiki/Citron), the name of an African tree with aromatic wood and lemon-like fruit (and generally bc my name is [Lemon](https://japandotorg.me))