import axios from "axios";
import CryptoJS from "crypto-js";

export class PodcastIndexClient {
	private client;
	private apiKey: string;
	private apiSecret: string;
	private baseUrl = "https://api.podcastindex.org/api/1.0"; // Base URL from documentation

	constructor(apiKey: string, apiSecret: string) {
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;

		this.client = axios.create({
			baseURL: this.baseUrl,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Intercept requests to add authentication headers
		this.client.interceptors.request.use((config) => {
			const authHeaders = this.generateAuthHeaders();
			// Use the set method of AxiosHeaders to add authentication headers
			for (const key of Object.keys(authHeaders) as Array<
				keyof typeof authHeaders
			>) {
				config.headers.set(key, authHeaders[key]);
			}
			return config;
		});
	}

	private generateAuthHeaders() {
		const apiHeaderTime = Math.floor(Date.now() / 1000).toString(); // Unix timestamp
		const data4Hash = this.apiKey + this.apiSecret + apiHeaderTime;
		const hash = CryptoJS.SHA1(data4Hash).toString();

		return {
			"X-Auth-Date": apiHeaderTime,
			"X-API-KEY": this.apiKey,
			Authorization: hash,
		};
	}

	/**
	 * Get recent episodes.
	 * @param maxItems The maximum number of items to return.
	 */
	public async getRecentEpisodes(maxItems = 10) {
		try {
			const response = await this.client.get(`/recent/feeds?max=${maxItems}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching recent episodes:", error);
			throw error;
		}
	}

	/**
	 * Search for podcasts by a general query.
	 * @param query The search query.
	 */
	public async searchPodcasts(query: string) {
		try {
			const response = await this.client.get(
				`/search/byterm?q=${encodeURIComponent(query)}`,
			);
			return response.data;
		} catch (error) {
			console.error("Error searching podcasts:", error);
			throw error;
		}
	}

	/**
	 * Search for podcasts by title.
	 * @param title The podcast title to search for.
	 */
	public async searchPodcastsByTitle(title: string) {
		try {
			const response = await this.client.get(
				`/search/bytitle?q=${encodeURIComponent(title)}`,
			);
			return response.data;
		} catch (error) {
			console.error("Error searching podcasts by title:", error);
			throw error;
		}
	}

	/**
	 * Get details of a specific podcast by its ID.
	 * @param id The podcast ID.
	 */
	public async getPodcastById(id: string) {
		try {
			const response = await this.client.get(`/podcasts/byfeedid?id=${id}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching podcast by ID:", error);
			throw error;
		}
	}

	/**
	 * Get episodes for a specific podcast feed ID.
	 * @param feedId The podcast feed ID.
	 */
	public async getEpisodesByFeedId(feedId: string) {
		try {
			const response = await this.client.get(`/episodes/byfeedid?id=${feedId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching episodes by feed ID:", error);
			throw error;
		}
	}
}
