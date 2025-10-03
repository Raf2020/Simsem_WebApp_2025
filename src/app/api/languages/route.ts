import { NextRequest, NextResponse } from 'next/server';

// Types for the language API response
interface Language {
  objectId: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface LanguagesResponse {
  results: Language[];
}

export async function GET(request: NextRequest) {
  try {
    console.log('📥 Fetching languages from Parse API');

    // Fetch languages from Parse API
    const response = await fetch(`${process.env.BACKEND_URL}/classes/Language`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
      },
    });

    if (!response.ok) {
      console.error('❌ Failed to fetch languages:', response.status);
      return NextResponse.json(
        { error: 'Failed to fetch languages from external service' },
        { status: 500 }
      );
    }

    const data: LanguagesResponse = await response.json();
    
    console.log(`✅ Successfully fetched ${data.results.length} languages`);

    // Transform the data for frontend use
    const languages = data.results.map(lang => ({
      value: lang.name,
      label: lang.name,
      code: lang.code,
      objectId: lang.objectId
    }));

    // Sort languages alphabetically
    languages.sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({
      success: true,
      languages
    });

  } catch (error) {
    console.error('❌ Languages API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching languages' },
      { status: 500 }
    );
  }
}

// Add caching headers for better performance
export const revalidate = 3600; // Cache for 1 hour
