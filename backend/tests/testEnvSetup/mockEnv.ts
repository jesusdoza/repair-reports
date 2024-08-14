import { vi } from "vitest";
import { setupDatabase, uriEnv } from "./mockMongoDb";

// export const teardownDatabase = async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// };

vi.stubEnv("NODE_ENV", "development");
vi.stubEnv("session_secret", "fdasfsa");
await setupDatabase();

vi.stubEnv("connect_string", uriEnv);

// cloud_name = dafdsfad
// cloud_key = 12412412
// cloud_secret = 412341234213fdA7dfa
// cloud_folder = test
// PORT = 8000
// NODE_ENV = development
// search_index=""
// client_origin= "http://localhost:5173"
