import "server-only"; // Add this directive at the top
// import "server-only"; // Removed this line - This was the previous state comment
import fs from 'fs';
import path from 'path';
import { ProviderSummaryList, ProviderEvidence } from './types';

const dataDirectory = path.join(process.cwd(), 'public');
const providerInfoPath = path.join(dataDirectory, 'provider_info', 'providers.json');
const jsonInfoDirectory = path.join(dataDirectory, 'cleaned_providers_full');

export function getProviderSummaries(): ProviderSummaryList {
  try {
    const fileContents = fs.readFileSync(providerInfoPath, 'utf8');
    const data = JSON.parse(fileContents) as ProviderSummaryList;
    // Add basic validation or transformation if needed
    return data;
  } catch (error) {
    console.error("Error reading provider summaries:", error);
    return []; // Return empty array on error
  }
}

export function getAllProviderSlugs(): string[] {
    try {
        const fileNames = fs.readdirSync(jsonInfoDirectory);
        return fileNames
            .filter(fileName => fileName.endsWith('.json'))
            .map(fileName => fileName.replace(/\.json$/, ''));
    } catch (error) {
        console.error("Error reading json_info directory:", error);
        return [];
    }
}

export function getProviderData(slug: string): ProviderEvidence | null {
  const fullPath = path.join(jsonInfoDirectory, `${slug}.json`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents) as ProviderEvidence;
    // Add validation or transformation if needed
    return data;
  } catch (error) {
    console.error(`Error reading provider data for ${slug}:`, error);
    // Distinguish between file not found and other errors if necessary
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null; // File not found
    }
    // Optionally re-throw or handle other errors differently
    return null; // Return null on other errors for now
  }
} 