declare module 'danbot.js' {
  import { Client, ClientUser, Collection, Guild, ShardingManager, Snowflake, User } from 'discord.js';
  import { EventEmitter } from 'events';

  export class Base extends EventEmitter {
    public constructor(Bot: Client | ShardingManager, ApiKey: string)

    private Bot: Client | ShardingManager;
    private _V12: boolean;
    public key: string;

    public post(): Promise<void>
    public info(): Promise<ServerInfo>
  }

  export class HostClient extends Base {
    public constructor(client: Client, key: string)

    public autoPost(Time: number): Promise<void>

    on(event: string, listener: Function): this;
    on(event: 'post', listener: () => void): this;
    on(event: 'autoPosting', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
  }

  export class Host extends Base {
    public constructor(client: Client, key: string)

    public autoPost(Time: number): Promise<void>

    on(event: string, listener: Function): this;
    on(event: 'post', listener: () => void): this;
    on(event: 'autoPosting', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
  }

  export class Utils {
    public static request(method: methods, endpoint: string, data: Object): Promise<void>
    public static shardingGetGuild(data: Base): number;
    public static shardingGetUsers(data: Base): number;
    public static getGuilds(data: Base): Collection<Snowflake, Guild>;
    public static getUsers(data: Base): Collection<Snowflake, User>;
    public static getUser(data: Base): ClientUser;
    public static getUserID(data: Base): Snowflake;
  }

  export const Version: string;  

  type methods = 
  | 'get' 
  | 'post' 
  | 'put' 
  | 'patch' 
  | 'delete';

  type ServerInfo = {
    id: Snowflake,
    servers: string,
    users: string,
    owner: string,
    deleted: boolean,
    added: number
  }
}