/**
 * Fungsi delay
 * @param ms number, default 1s
 * @returns Promise<unknow>
 */
export async function delay(ms: number = 1000) {
	return new Promise((res) => setTimeout(res, ms));
}
