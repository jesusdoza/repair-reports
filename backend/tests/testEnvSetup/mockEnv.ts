//mock env variables for tests
import { vi } from "vitest";
import { setupDatabase, uriEnv } from "./mockMongoDb";

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
