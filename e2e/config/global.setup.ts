import type { FullConfig } from "@playwright/test";
import axios from "axios";

async function globalSetup(config: FullConfig) {
  try {
    await axios.post(
      `${process.env.VITE_API_BASE_URL}/auth/signup`,
      {
        email: "test@example.com",
        password: "Test123a1",
        name: "Test User",
      },
      {
        headers: {
          "x-api-key": process.env.VITE_API_KEY,
        },
      }
    );
  } catch (error) {
    console.log("Test user setup completed");
  }
}

export default globalSetup;
