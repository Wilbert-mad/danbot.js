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

    public posting: boolean;
    public autoPost(Time?: number): Promise<void>

    on(event: string, listener: Function): this;
    on(event: 'post', listener: () => void): this;
    on(event: 'autoPosting', listener: () => void): this;
    on(event: 'stop', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'REQUEST', listener: (response: Response) => void): this;
  }

  export class Host extends Base {
    public constructor(client: Client, key: string)

    public posting: boolean;
    public autoPost(Time?: number): Promise<void>

    on(event: string, listener: Function): this;
    on(event: 'post', listener: () => void): this;
    on(event: 'autoPosting', listener: () => void): this;
    on(event: 'stop', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'REQUEST', listener: (response: Response) => void): this;
  }

  export class Utils {
    public static request(method: methods, endpoint: string, data?: Object): Promise<void>
    public static shardingGetGuild(data: Base): number;
    public static shardingGetUsers(data: Base): number;
    public static getGuilds(data: Base): Collection<Snowflake, Guild>;
    public static getUsers(data: Base): Collection<Snowflake, User>;
    public static getUser(data: Base): ClientUser;
    public static getUserID(data: Base): Snowflake;
  }

  export interface Response {
    raw: string,
    body: { 
      error: boolean, 
      message: string
    },
    headers: {
      date: string,
      server: string,
      etag: string,
      connection: string,
      'x-dns-prefetch-control': string,
      'strict-transport-security': string,
      'x-download-options': string,
      'x-content-type-options': string,
      'x-xss-protection': string,
      'access-control-allow-origin': string,
      'access-control-allow-methods': string,
      'content-type': string,
      'content-length': string,
    }
    status: number,
    ok: boolean,
    statusText: string
  }

  export const Version: string;  

  export type methods = 
  | 'get' 
  | 'post' 
  | 'put' 
  | 'patch' 
  | 'delete';

  export interface ServerInfo {
    id: Snowflake,
    servers: string,
    users: string,
    owner: string,
    client: ClientUser, 
    deleted: boolean,
    added: number
  }
}