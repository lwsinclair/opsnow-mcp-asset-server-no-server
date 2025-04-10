import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import path from "node:path";
import * as dotenv from "dotenv";
import { promises as fs } from 'fs';
dotenv.config({ path: path.join(__dirname, "../.env") });

// Helper function for reading usage data from API
async function readUsageData(): Promise<any | null> {
  try {
    const filePath = path.join(__dirname, "../data/usage.json");
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("Error reading usage data from file:", error);
    return null;
  }
}

// Create server instance
const server = new McpServer({
  name: "cloud-asset",
  version: "1.0.0",
});

server.tool(
  "get-usage",
  "Get cloud usage summary for multiple vendors and products",
  {
    vendors: z.array(z.string()).optional().describe("List of cloud vendor names (e.g. ['AWS', 'Azure'])"),
    products: z.array(z.string()).optional().describe("List of cloud product names (e.g. ['EC2', 'VM'])"),
  },
  async ({ vendors, products }) => {
    const data = await readUsageData();
    
    if (!data) {
      return {
        content: [
          { type: "text", text: "Failed to load usage data" }
        ],
      };
    }

    // 새로운 JSON 데이터 구조 처리
    const selectedVendors = vendors && vendors.length > 0 ? vendors : Object.keys(data);
    let responseText = "";

    for (const vendor of selectedVendors) {
      if (!data[vendor]) continue;
      
      responseText += `\n=== ${vendor} ===\n`;
      
      // 리소스 타입 정보 추가
      if (data[vendor].rsrcType) {
        responseText += `Resource Type: ${data[vendor].rsrcType}\n\n`;
      }
      
      // 각 결과 항목 처리
      if (data[vendor].result && Array.isArray(data[vendor].result)) {
        for (const resultItem of data[vendor].result) {
          if (resultItem.Option && resultItem.Data) {
            // 옵션 정보 출력
            responseText += `--- ${resultItem.Option.chartLabel} ---\n`;
            if (resultItem.Option.labelValue && resultItem.Option.labelUnit) {
              responseText += `Total: ${resultItem.Option.labelValue} ${resultItem.Option.labelUnit}\n`;
            }
            
            // 데이터 항목 출력
            if (Array.isArray(resultItem.Data) && resultItem.Data.length > 0) {
              for (const item of resultItem.Data) {
                responseText += `${item.value}: ${item.cnt}\n`;
              }
            } else {
              responseText += `No data available\n`;
            }
            responseText += `\n`;
          }
        }
      }
    }

    if (!responseText.trim()) {
      responseText = "No usage data found for the given parameters.";
    }

    return {
      content: [
        {
          type: "text",
          text: responseText,
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const args = process.argv.slice(2);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cloud Cost MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
