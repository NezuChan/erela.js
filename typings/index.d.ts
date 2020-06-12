// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../events
//   ../@discordjs/collection
//   ../ws

declare module 'erela.js' {
    export { Structure, Plugin, LoadType, State, Utils } from "erela.js/structures/Utils";
    export { Manager } from "erela.js/structures/Manager";
    export { Player } from "erela.js/structures/Player";
    export { Queue } from "erela.js/structures/Queue";
    export { Node } from "erela.js/structures/Node";
}

declare module 'erela.js/structures/Utils' {
    import { Track, Player } from "erela.js/structures/Player";
    import { Manager } from "erela.js/structures/Manager";
    import { Queue } from "erela.js/structures/Queue";
    import { Node } from "erela.js/structures/Node";
    /** @hidden */
    export function buildTrack(data: any, requester: any): Track;
    export class Utils {
            /**
                * Formats the given duration into human readable format.
                * @param {number} milliseconds The duration to format.
                * @param {boolean?} [minimal=false] Whether to use a minimal format.
                * @returns {string} The formatted duration.
                */
            static formatTime(milliseconds: number, minimal?: boolean): string;
            /**
                * Parses the given duration into milliseconds.
                * @param {string} time The duration to parse.
                * @returns {number} The formatted duration.
                */
            static parseTime(time: string): number | null;
    }
    /** The Structure class. */
    export class Structure {
            /**
                * Extends a class.
                * @param extender
                */
            static extend<K extends keyof Extendable, T extends Extendable[K]>(name: K, extender: (klass: Extendable[K]) => T): T;
            /**
                * Returns the structure.
                * @param structure
                */
            static get<K extends keyof Extendable>(structure: K): Extendable[K];
    }
    export class Plugin {
            load(manager: Manager): void;
    }
    export enum LoadType {
            TRACK_LOADED = "TRACK_LOADED",
            PLAYLIST_LOADED = "PLAYLIST_LOADED",
            SEARCH_RESULT = "SEARCH_RESULT",
            LOAD_FAILED = "LOAD_FAILED",
            NO_MATCHES = "NO_MATCHES"
    }
    export enum State {
            CONNECTED = "CONNECTED",
            CONNECTING = "CONNECTING",
            DISCONNECTED = "DISCONNECTED",
            DISCONNECTING = "DISCONNECTING",
            DESTROYING = "DESTROYING"
    }
    /** @hidden */
    export const structures: {
            Player: any;
            Queue: any;
            Node: any;
    };
    export interface Extendable {
            Player: typeof Player;
            Queue: typeof Queue;
            Node: typeof Node;
    }
}

declare module 'erela.js/structures/Manager' {
    import { LoadType, Plugin } from "erela.js/structures/Utils";
    import { Node, NodeOptions } from "erela.js/structures/Node";
    import { Player, Track, PlayerOptions } from "erela.js/structures/Player";
    import { EventEmitter } from "events";
    import Collection from "@discordjs/collection";
    /** The ManagerOptions interface. */
    export interface ManagerOptions {
            /** The array of nodes to connect to. */
            nodes?: NodeOptions[];
            /** The client ID to use. */
            clientId?: string;
            /** The shard count. */
            shards?: number;
            /** A array of plugins to use. */
            plugins?: Plugin[];
            /** Whether players should automatically play the next song. */
            autoPlay?: boolean;
            /**
                * Function to send data to the websocket.
                * @param {string} id The ID of the guild.
                * @param {*} payload The payload to send.
                */
            send(id: string, payload: any): void;
    }
    /** The IQuery interface. */
    export interface Query {
            /** The source to search from. */
            source?: "youtube" | "soundcloud";
            /** The query to search for. */
            query: string;
    }
    /** The SearchResult interface. */
    export interface SearchResult {
            /** The load type of the result. */
            loadType: LoadType;
            /** The array of tracks if the load type is SEARCH_RESULT or TRACK_LOADED. */
            tracks?: Track[];
            /** The playlist object if the load type is PLAYLIST_LOADED. */
            playlist?: {
                    /** The playlist info object. */
                    info: {
                            /** The playlist name. */
                            name: string;
                            /** The playlist selected track. */
                            selectedTrack?: Track;
                    };
                    /** The tracks in the playlist. */
                    tracks: Track[];
                    /** The duration of the playlist. */
                    length: number;
            };
            /** The exception when searching if one. */
            exception?: {
                    /** The message for the exception. */
                    message: string;
                    /** The severity of exception. */
                    severity: string;
            };
    }
    export interface Manager {
            /**
                * Emitted when a Node is created.
                * @event Manager#nodeCreate
                */
            on(event: "nodeCreate", listener: (node: Node) => void): this;
            /**
                * Emitted when a Node is destroyed.
                * @event Manager#nodeDestroy
                */
            on(event: "nodeDestroy", listener: (node: Node) => void): this;
            /**
                * Emitted when a Node connects.
                * @event Manager#nodeConnect
                */
            on(event: "nodeConnect", listener: (node: Node) => void): this;
            /**
                * Emitted when a Node reconnects.
                * @event Manager#nodeReconnect
                */
            on(event: "nodeReconnect", listener: (node: Node) => void): this;
            /**
                * Emitted when a Node disconnects.
                * @event Manager#nodeDisconnect
                */
            on(event: "nodeDisconnect", listener: (node: Node, reason: {
                    code: number;
                    reason: string;
            }) => void): this;
            /**
                * Emitted when a Node has an error.
                * @event Manager#nodeError
                */
            on(event: "nodeError", listener: (node: Node, error: Error) => void): this;
            /**
                * Emitted whenever any Lavalink event is received.
                * @event Manager#nodeRaw
                */
            on(event: "nodeRaw", listener: (payload: any) => void): this;
            /**
                * Emitted when a player is created.
                * @event Manager#playerCreate
                */
            on(event: "playerCreate", listener: (player: Player) => void): this;
            /**
                * Emitted when a player is destroyed.
                * @event Manager#playerDestroy
                */
            on(event: "playerDestroy", listener: (player: Player) => void): this;
            /**
                * Emitted when a player queue ends.
                * @event Manager#queueEnd
                */
            on(event: "queueEnd", listener: (player: Player) => void): this;
            /**
                * Emitted when a player is moved to a new voice channel.
                * @event Manager#playerMove
                */
            on(event: "playerMove", listener: (player: Player, oldChannel: any, newChannel: string) => void): this;
            /**
                * Emitted when a track starts.
                * @event Manager#trackStart
                */
            on(event: "trackStart", listener: (player: Player, track: Track, payload: any) => void): this;
            /**
                * Emitted when a track ends.
                * @event Manager#trackEnd
                */
            on(event: "trackEnd", listener: (player: Player, track: Track, payload: any) => void): this;
            /**
                * Emitted when a track gets stuck during playback.
                * @event Manager#trackStuck
                */
            on(event: "trackStuck", listener: (player: Player, track: Track, payload: any) => void): this;
            /**
                * Emitted when a track has an error during playback.
                * @event Manager#trackError
                */
            on(event: "trackError", listener: (player: Player, track: Track, payload: any) => void): this;
            /**
                * Emitted when a voice connect is closed.
                * @event Manager#socketClosed
                */
            on(event: "socketClosed", listener: (player: Player, payload: any) => void): this;
    }
    /**
        * The Manager class.
        * @noInheritDoc
        */
    export class Manager extends EventEmitter {
            /** The map of players. */
            readonly players: Collection<string, Player>;
            /** The map of nodes. */
            readonly nodes: Collection<string, Node>;
            /** The options that were set. */
            readonly options: ManagerOptions;
            protected readonly voiceStates: Map<string, any>;
            /**
                * Creates the Manager class.
                * @param {ManagerOptions} options The options to use.
                */
            constructor(options: ManagerOptions);
            /**
                * Initiates the manager (with a client ID if none provided in ManagerOptions).
                * @param {string} clientId The client ID to use.
                */
            init(clientId?: string): this;
            /**
                * Searches YouTube with the query.
                * @param {(string|Query)} query The query to search against.
                * @param {any} requester The user who requested the tracks.
                * @returns {Promise<SearchResult>} The search result.
                */
            search(query: string | Query, requester: any): Promise<SearchResult>;
            /**
                * Create method for an easier option to creating players.
                * @param {PlayerOptions} options The options to pass.
                */
            create(options: PlayerOptions): Player;
            /**
                * Sends voice data to the Lavalink server.
                * @param {*} data The data to send.
                */
            updateVoiceState(data: any): void;
    }
}

declare module 'erela.js/structures/Player' {
    import { State } from "erela.js/structures/Utils";
    import { Manager, Query, SearchResult } from "erela.js/structures/Manager";
    import { Queue } from "erela.js/structures/Queue";
    import { Node } from "erela.js/structures/Node";
    /** The PlayerOptions interface. */
    export interface PlayerOptions {
            /** The guild the Player belongs to. */
            guild: any;
            /** The text channel the Player belongs to. */
            textChannel: any;
            /** The voice channel the Player belongs to. */
            voiceChannel?: any;
            /** The node the Player uses. */
            node?: string;
            /** The initial volume the Player will use. */
            volume?: number;
            /** If the player should mute itself. */
            selfMute?: boolean;
            /** If the player should deafen itself. */
            selfDeafen?: boolean;
    }
    /** The Track interface. */
    export interface Track {
            /** The base64 encoded track. */
            readonly track: string;
            /** The title of the track. */
            readonly title: string;
            /** The identifier of the track. */
            readonly identifier: string;
            /** The author of the track. */
            readonly author: string;
            /** The length of the track. */
            readonly length: number;
            /** If the track is seekable. */
            readonly isSeekable: boolean;
            /** If the track is a stream.. */
            readonly isStream: boolean;
            /** The uri of the track. */
            readonly uri: string;
            /** The thumbnail of the track. */
            readonly thumbnail: string;
            /** The user that requested the track. */
            readonly requester: any;
            /** Displays the track thumbnail with a size in "0", "1", "2", "3", "default", "mqdefault", "hqdefault", "maxresdefault". Only for youtube as others require an API. */
            displayThumbnail(size?: "0" | "1" | "2" | "3" | "default" | "mqdefault" | "hqdefault" | "maxresdefault"): string;
    }
    /** The PlayOptions interface */
    export interface PlayOptions {
            /** The track to play. */
            readonly track?: Track;
            /** The position to start the track. */
            readonly startTime?: number;
            /** The position to end the track. */
            readonly endTime?: number;
            /** Whether to not replace the track if a play payload is sent. */
            readonly noReplace?: boolean;
    }
    /** The EqualizerBand interface. */
    export interface EqualizerBand {
            /** The band number being 0 to 14. */
            band: number;
            /** The gain amount being -0.25 to 1.00, 0.25 being double. */
            gain: number;
    }
    /** The Player class. */
    export class Player {
            options: PlayerOptions;
            /** The Manager instance. */
            static manager: Manager;
            /** The Queue for the Player. */
            readonly queue: Queue;
            /** The current track for the Player. */
            current?: Track;
            /** Whether the queue repeats the track. */
            trackRepeat: boolean;
            /** Whether the queue repeats the queue. */
            queueRepeat: boolean;
            /** The time the player is in the track. */
            position: number;
            /** Whether the player is playing. */
            playing: boolean;
            /** Whether the player is paused. */
            paused: boolean;
            /** Whether the player is playing. */
            volume: number;
            /** The Node for the Player. */
            node: Node;
            /** The guild the player. */
            guild: any;
            /** The voice channel for the player. */
            voiceChannel: any;
            /** The text channel for the player. */
            textChannel: any;
            /** The current state of the player. */
            state: State;
            /** The equalizer bands array. */
            bands: number[];
            /** Only for internal use. */
            static init(manager: Manager): void;
            /**
                * Creates a new player, returns one if it already exists.
                * @param {PlayerOptions} options The options to pass.
                */
            constructor(options: PlayerOptions);
            /**
                * Same as Manager#search() but a shortcut on the player itself.
                * @param {(string|Query)} query The query to search against.
                * @param {any} requester The user who requested the tracks.
                * @returns {Promise<SearchResult>} The search result.
                */
            search(query: string | Query, requester: any): Promise<SearchResult>;
            /**
                * Sets the players equalizer band. Passing nothing will clear it.
                * @param {EqualizerBand[]} bands The bands to set.
                */
            setEQ(...bands: EqualizerBand[]): this;
            /** Clears the equalizer. */
            clearEQ(): this;
            /** Connect to the voice channel. */
            connect(): this;
            /** Disconnect from the voice channel. */
            disconnect(): this;
            /** Destroys the player. */
            destroy(): void;
            /**
                * Sets the player voice channel.
                * @param {*} channel The channel to set.
                */
            setVoiceChannel(channel: any): this;
            /**
                * Sets the player text channel.
                * @param {*} channel The channel to set.
                */
            setTextChannel(channel: any): this;
            /**
                * Plays the next track or a specified track in the PlayOptions.
                * @param {PlayOptions} [options={}] The options to use.
                */
            play(options?: PlayOptions): this;
            /**
                * Sets the player volume.
                * @param {number} volume The volume to set.
                */
            setVolume(volume: number): this;
            /**
                * Sets the track repeat.
                * @param {boolean} repeat If track repeat should be enabled.
                */
            setTrackRepeat(repeat: boolean): this;
            /**
                * Sets the queue repeat.
                * @param {boolean} repeat If queue repeat should be enabled.
                */
            setQueueRepeat(repeat: boolean): this;
            /** Stops the current track. */
            stop(): this;
            /**
                * Pauses the current track.
                * @param {boolean} pause Whether to pause the current track.
                */
            pause(pause: boolean): this;
            /**
                * Seeks to the position in the current track.
                * @param {boolean} pause Whether to pause the current track.
                */
            seek(position: number): this;
    }
}

declare module 'erela.js/structures/Queue' {
    import { Track, Player } from "erela.js/structures/Player";
    /**
        * The Queue class.
        * @noInheritDoc
        */
    export class Queue extends Array<Track> {
            constructor(player: Player);
            /**
                * Adds a track to the queue.
                * @param {(Track|Track[])} track The track or tracks to add.
                * @param {number} [offset=null] The offset to add the track at.
                */
            add(track: Track | Track[], offset?: number): void;
            /**
                * Removes an amount of tracks using a start and end index.
                * @param {number} start The start to remove from.
                * @param {number} end The end to remove to.
                */
            removeFrom(start: number, end: number): Track[];
            /**
                * Removes a track from the queue. Defaults to the first track.
                * @param {number} [position=0] The track index to remove.
                * @returns {(Track|null)} The track that was removed, or null if the track does not exist.
                */
            remove(position?: number): Track | null;
            /** Clears the queue. */
            clear(): void;
            /** Shuffles the queue. */
            shuffle(): void;
    }
}

declare module 'erela.js/structures/Node' {
    import { Track, Player } from "erela.js/structures/Player";
    import { Manager } from "erela.js/structures/Manager";
    import WebSocket from "ws";
    /** The NodeOptions interface. */
    export interface NodeOptions {
            /** The host for the node. */
            readonly host: string;
            /** The port for the node. */
            readonly port: number;
            /** The password for the node. */
            readonly password: string;
            /** The identifier for the node. */
            readonly identifier?: string;
            /** The retryAmount for the node. */
            readonly retryAmount?: number;
            /** The retryDelay for the node. */
            readonly retryDelay?: number;
    }
    /** The NodeOptions interface. */
    export interface NodeStats {
            /** The amount of players on the node. */
            players: number;
            /** The amount of playing players on the node. */
            playingPlayers: number;
            /** The uptime for the node. */
            uptime: number;
            /** The memory stats for the node. */
            memory: {
                    /** The free memory of the allocated amount. */
                    free: number;
                    /** The used memory of the allocated amount. */
                    used: number;
                    /** The total allocated memory. */
                    allocated: number;
                    /** The reservable memory. */
                    reservable: number;
            };
            /** The cpu stats for the node. */
            cpu: {
                    /** The core amount the host machine has. */
                    cores: number;
                    /** The system load. */
                    systemLoad: number;
                    /** The lavalink load. */
                    lavalinkLoad: number;
            };
            /** The frame stats for the node. */
            frameStats: {
                    /** The amount of sent frames. */
                    sent?: number;
                    /** The amount of nulled frames. */
                    nulled?: number;
                    /** The amount of deficit frames. */
                    deficit?: number;
            };
    }
    /** The Node class. */
    export class Node {
            manager: Manager;
            options: NodeOptions;
            /** The socket for the node. */
            socket: WebSocket | null;
            /** The amount of rest calls the node has made. */
            calls: number;
            /** The stats for the node. */
            stats: NodeStats;
            /** Returns if connected to the Node. */
            get connected(): boolean;
            /**
                * Creates an instance of Node.
                * @param {Manager} manager The Manager.
                * @param {NodeOptions} options The NodeOptions to pass.
                */
            constructor(manager: Manager, options: NodeOptions);
            /** Connects to the Node. */
            connect(): void;
            /** Reconnects to the Node. */
            reconnect(): void;
            /** Destroys the Node. */
            destroy(): void;
            /**
                * Sends data to the Node.
                * @param {any} data The data to send.
                */
            send(data: any): Promise<boolean>;
            protected open(): void;
            protected close(code: number, reason: string): void;
            protected error(error: Error): void;
            protected message(d: Buffer | string): void;
            protected handleEvent(payload: any): void;
            protected trackEnd(player: Player, track: Track, payload: any): void;
            protected trackStart(player: Player, track: Track, payload: any): void;
            protected trackStuck(player: Player, track: Track, payload: any): void;
            protected trackError(player: Player, track: Track, payload: any): void;
            protected socketClosed(player: Player, payload: any): void;
    }
}

