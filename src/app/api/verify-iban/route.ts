import { NextRequest, NextResponse } from 'next/server';

// IBAN verification response type from Parse API
interface IBANVerificationResponse {
  result: string; // JSON string containing verification data
}

interface IBANVerificationData {
  valid: boolean;
  iban: string;
  countryCode: string;
  bban: string;
  electronicFormat: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { iban } = body;

    if (!iban || typeof iban !== 'string') {
      return NextResponse.json(
        { error: 'IBAN is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('🔍 Verifying IBAN:', iban);

    // Clean IBAN (remove spaces)
    const cleanIban = iban.replace(/\s/g, '');

    if (cleanIban.length < 15) {
      return NextResponse.json(
        { error: 'IBAN must be at least 15 characters long' },
        { status: 400 }
      );
    }

    // Call Parse API to verify IBAN
    const response = await fetch(`${process.env.BACKEND_URL}/functions/verifyIBAN?iban=${cleanIban}`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
      },
      body: ''
    });

    if (!response.ok) {
      console.error('❌ Parse API IBAN verification failed:', response.status);
      return NextResponse.json(
        { error: 'Failed to verify IBAN with external service' },
        { status: 500 }
      );
    }

    const data: IBANVerificationResponse = await response.json();
    const verificationData: IBANVerificationData = JSON.parse(data.result);

    console.log('✅ IBAN verification result:', {
      valid: verificationData.valid,
      iban: verificationData.iban,
      countryCode: verificationData.countryCode
    });

    return NextResponse.json({
      success: true,
      data: verificationData
    });

  } catch (error) {
    console.error('❌ IBAN verification API error:', error);
    
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid response from verification service' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error during IBAN verification' },
      { status: 500 }
    );
  }
}

// Also support GET requests for simple verification
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const iban = searchParams.get('iban');

    if (!iban) {
      return NextResponse.json(
        { error: 'IBAN parameter is required' },
        { status: 400 }
      );
    }

    // Reuse the POST logic
    return POST(new NextRequest(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({ iban })
    }));

  } catch (error) {
    console.error('❌ IBAN verification GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
