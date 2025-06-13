export interface PodcastIndexConfig {
	authKey: string;
	secretKey: string;
	baseUrl?: string;
	userAgent?: string;
}

export interface SearchParams {
	q: string;
	val?: string;
	max?: number;
	aponly?: boolean;
	clean?: boolean;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface PodcastsByFeedIdParams {
	id: number;
	pretty?: boolean;
}

export interface PodcastsByFeedUrlParams {
	url: string;
	pretty?: boolean;
}

export interface PodcastsByGuidParams {
	guid: string;
	pretty?: boolean;
}

export interface PodcastsByItunesIdParams {
	id: number;
	pretty?: boolean;
}

export interface PodcastsByMediumParams {
	medium: "music" | "video" | "film" | "audiobook" | "newsletter" | "blog";
	max?: number;
	pretty?: boolean;
}

export interface EpisodesByFeedIdParams {
	id: number | string;
	since?: number;
	max?: number;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface EpisodesByFeedUrlParams {
	url: string;
	since?: number;
	max?: number;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface EpisodesByItunesIdParams {
	id: number;
	since?: number;
	max?: number;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface EpisodesByGuidParams {
	guid: string;
	feedid?: number;
	feedurl?: string;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface RecentEpisodesParams {
	max?: number;
	excludeString?: string;
	before?: number;
	fulltext?: boolean;
	pretty?: boolean;
}

export interface RecentFeedsParams {
	max?: number;
	since?: number;
	lang?: string;
	pretty?: boolean;
}

export interface ValueByFeedIdParams {
	id: number;
	pretty?: boolean;
}

export interface ValueByFeedUrlParams {
	url: string;
	pretty?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
	status: string;
	count: number;
	feeds?: T[];
	items?: T[];
	feed?: T;
	episode?: T;
	description?: string;
	query?: string;
}

export interface PodcastFeed {
	id: number;
	title: string;
	url: string;
	originalUrl: string;
	link: string;
	description: string;
	author: string;
	ownerName: string;
	image: string;
	artwork?: string;
	lastUpdateTime: number;
	lastCrawlTime: number;
	lastParseTime: number;
	lastGoodHttpStatusTime: number;
	lastHttpStatus: number;
	contentType: string;
	itunesId?: number;
	generator?: string;
	language?: string;
	type: number;
	dead: number;
	crawlErrors: number;
	parseErrors: number;
	categories?: { [key: string]: string };
	locked?: boolean;
	explicit?: boolean;
}

export interface Episode {
	id: number;
	title: string;
	link: string;
	description: string;
	guid: string;
	datePublished: number;
	datePublishedPretty: string;
	dateCrawled: number;
	enclosureUrl: string;
	enclosureType: string;
	enclosureLength: number;
	duration: number;
	explicit: number;
	episode: number;
	episodeType: string;
	season: number;
	image: string;
	feedItunesId: number;
	feedImage: string;
	feedId: number;
	feedTitle: string;
	feedLanguage: string;
}

export interface Stats {
	feedCountTotal: number;
	episodeCountTotal: number;
	feedsWithNewEpisodes: number;
	feedsWithValue: number;
	feedsWithLiveItems: number;
	feedsWithValueBlocks: number;
}

export interface Category {
	id: number;
	name: string;
}
