import { ApiData } from "../types";

const DATA_API_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=JuRnItHQOVB3jyLJSo92GTMblWZDE336I15mFvhQpC8QnsySsji4LzmT4h_Wnwj776EMdN3zJDrISGhwkMnoZZWxUwGme9nsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNSqHr0AeMgDFEqKdgE0N5YTqg6PHT_ZBqYyVYAeLVZBwXAhU6v2PeZcZgr7aB3LDLHnLMlGlkwWbIh6v3y4hCB1xPb6kkQJYg&lib=MqxvYqYjE3p9MX406Ezcl_fjE1tO6e3DW";

export const fetchLightningData = async (): Promise<ApiData> => {
  try {
    const response = await fetch(DATA_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lightning data:", error);
    throw error;
  }
};

export const fetchBtcPrice = async (): Promise<number> => {
  try {
    const response = await fetch("https://api.coinbase.com/v2/prices/spot?currency=USD");
    const data = await response.json();
    return parseFloat(data.data.amount);
  } catch (error) {
    console.error("Error fetching BTC price:", error);
    return 0;
  }
};
