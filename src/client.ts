import axios from "axios";
import type { AxiosInstance } from "axios";
import sha1 from "crypto-js/sha1";
import type {
	PodcastIndexConfig,
	SearchParams,
	PodcastsByFeedIdParams,
	PodcastsByFeedUrlParams,
	PodcastsByGuidParams,
	PodcastsByItunesIdParams,
	PodcastsByMediumParams,
	EpisodesByFeedIdParams,
	EpisodesByFeedUrlParams,
	EpisodesByItunesIdParams,
	EpisodesByGuidParams,
	RecentEpisodesParams,
	RecentFeedsParams,
	ValueByFeedIdParams,
	ValueByFeedUrlParams,
	ApiResponse,
	PodcastFeed,
	Episode,
	Stats,
	Category,
} from "./types";

export class PodcastIndexClient {
	private client: AxiosInstance;
	private config: PodcastIndexConfig;

	constructor(config: PodcastIndexConfig) {
		this.config = {
			baseUrl: "https://api.podcastindex.org/api/1.0",
			userAgent: "PodcastIndexTS/1.0",
			...config,
		};

		this.client = axios.create({
			baseURL: this.config.baseUrl,
		});

		// Add request interceptor for authentication
		this.client.interceptors.request.use((config) => {
			const apiHeaderTime = Math.floor(Date.now() / 1000);
			const hash = sha1(
				this.config.authKey + this.config.secretKey + apiHeaderTime,
			).toString();

			config.headers.UserAgent = this.config.userAgent;
			config.headers["X-Auth-Key"] = this.config.authKey;
			config.headers["X-Auth-Date"] = apiHeaderTime;
			config.headers.Authorization = hash;

			return config;
		});
	}

	// Search endpoints
	async searchPodcasts(
		params: SearchParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/search/byterm", { params });
		return response.data;
	}

	async searchPodcastsByTitle(
		params: SearchParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/search/bytitle", { params });
		return response.data;
	}

	async searchEpisodesByPerson(
		params: SearchParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/search/byperson", { params });
		return response.data;
	}

	// Podcasts endpoints
	async getPodcastByFeedId(
		params: PodcastsByFeedIdParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/podcasts/byfeedid", { params });
		return response.data;
	}

	async getPodcastByFeedUrl(
		params: PodcastsByFeedUrlParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/podcasts/byfeedurl", { params });
		return response.data;
	}

	async getPodcastByGuid(
		params: PodcastsByGuidParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/podcasts/byguid", { params });
		return response.data;
	}

	async getPodcastByItunesId(
		params: PodcastsByItunesIdParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/podcasts/byitunesid", { params });
		return response.data;
	}

	async getPodcastsByMedium(
		params: PodcastsByMediumParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/podcasts/bymedium", { params });
		return response.data;
	}

	// Episodes endpoints
	async getEpisodesByFeedId(
		params: EpisodesByFeedIdParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/episodes/byfeedid", { params });
		return response.data;
	}

	async getEpisodesByFeedUrl(
		params: EpisodesByFeedUrlParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/episodes/byfeedurl", { params });
		return response.data;
	}

	async getEpisodesByItunesId(
		params: EpisodesByItunesIdParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/episodes/byitunesid", { params });
		return response.data;
	}

	async getEpisodesByGuid(
		params: EpisodesByGuidParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/episodes/byguid", { params });
		return response.data;
	}

	// Recent endpoints
	async getRecentEpisodes(
		params?: RecentEpisodesParams,
	): Promise<ApiResponse<Episode>> {
		const response = await this.client.get("/recent/episodes", { params });
		return response.data;
	}

	async getRecentFeeds(
		params?: RecentFeedsParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/recent/feeds", { params });
		return response.data;
	}

	// Value endpoints
	async getValueByFeedId(
		params: ValueByFeedIdParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/value/byfeedid", { params });
		return response.data;
	}

	async getValueByFeedUrl(
		params: ValueByFeedUrlParams,
	): Promise<ApiResponse<PodcastFeed>> {
		const response = await this.client.get("/value/byfeedurl", { params });
		return response.data;
	}

	// Stats endpoint
	async getStats(): Promise<ApiResponse<Stats>> {
		const response = await this.client.get("/stats/current");
		return response.data;
	}

	// Categories endpoint
	async getCategories(): Promise<ApiResponse<Category>> {
		const response = await this.client.get("/categories/list");
		return response.data;
	}
}

export default PodcastIndexClient;
