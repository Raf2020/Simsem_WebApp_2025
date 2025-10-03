import { NextRequest, NextResponse } from 'next/server';

// Types for the request body
interface SignupRequestBody {
  // Basic information
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  about: string;
  firstLanguage: string;
  firstLanguageLevel: string;
  secondLanguage: string;
  secondLanguageLevel: string;
  thirdLanguage: string;
  thirdLanguageLevel: string;
  isLocalSeller: boolean;
  isFamilyHost: boolean;
  isTourGuide: boolean;
  isSocialAuth: boolean;
  // Optional password (defaults to temp password if not provided)
  password?: string;
  // Payment information
  paymentData: PaymentData;
  // Files
  files?: {
    profilePhoto?: FileData;
    idCardFrontSide?: FileData;
    idCardBackSide?: FileData;
    tourGuideCertificate?: FileData;
  };
}

interface PaymentData {
  type: string;
  phone: string;
  fullName: string;
  address: string;
  bankName: string;
  iban: string;
  swiftOrBic: string;
  bankAddress: string;
}

interface FileData {
  name: string;
  type: string;
  size: number;
  buffer: number[]; // Array of bytes from frontend
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequestBody = await request.json();
    console.log('🚀 Starting signup process for:', body.email);

    const {
      // Basic information
      name,
      email,
      phone,
      country,
      city,
      about,
      firstLanguage,
      firstLanguageLevel,
      secondLanguage,
      secondLanguageLevel,
      thirdLanguage,
      thirdLanguageLevel,
      isLocalSeller,
      isFamilyHost,
      isTourGuide,
      isSocialAuth,
      // Optional password
      password,
      // Payment information
      paymentData,
      // Files
      files
    } = body;

    // Step 1: Create payment
    const paymentResponse = await fetch(`${process.env.BACKEND_URL}/classes/ServiceProviderPayment`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
        'AccessKey': process.env.ACCESS_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    if (!paymentResponse.ok) {
      const paymentError = await paymentResponse.text();
      console.error('❌ Payment creation failed:', paymentError);
      return NextResponse.json(
        { error: 'Payment creation failed', details: paymentError },
        { status: 400 }
      );
    }

    const paymentResult = await paymentResponse.json();
    console.log('💳 Payment created:', paymentResult.objectId);

    // Step 2: Upload files
    const uploadedFiles: Record<string, string> = {};
    const userId = `user_${Date.now()}`;

    if (files) {
      // Upload profile photo
      if (files.profilePhoto) {
        try {
          const fileExtension = files.profilePhoto.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/avatar/profile.${fileExtension}`;
          const uploadedUrl = await uploadFile(files.profilePhoto, filePath);
          uploadedFiles.imageUrl = uploadedUrl;
        } catch (error) {
          console.error('❌ Profile photo upload failed:', error);
        }
      }

      // Upload ID card front
      if (files.idCardFrontSide) {
        try {
          const fileExtension = files.idCardFrontSide.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/documents/id_front.${fileExtension}`;
          const uploadedUrl = await uploadFile(files.idCardFrontSide, filePath);
          uploadedFiles.idFrontFileUrl = uploadedUrl;
        } catch (error) {
          console.error('❌ ID front upload failed:', error);
        }
      }

      // Upload ID card back
      if (files.idCardBackSide) {
        try {
          const fileExtension = files.idCardBackSide.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/documents/id_back.${fileExtension}`;
          const uploadedUrl = await uploadFile(files.idCardBackSide, filePath);
          uploadedFiles.idBackFileUrl = uploadedUrl;
        } catch (error) {
          console.error('❌ ID back upload failed:', error);
        }
      }

      // Upload certificate
      if (files.tourGuideCertificate) {
        try {
          const fileExtension = files.tourGuideCertificate.name.split('.').pop() || 'pdf';
          const filePath = `/profiles/${userId}/certificates/guide_cert.${fileExtension}`;
          const uploadedUrl = await uploadFile(files.tourGuideCertificate, filePath);
          uploadedFiles.certificateFileUrl = uploadedUrl;
        } catch (error) {
          console.error('❌ Certificate upload failed:', error);
        }
      }
    }

    // Step 3: Create service provider
    const serviceProviderData = {
      name,
      email,
      phone,
      country,
      city,
      about,
      firstLanguage,
      firstLanguageLevel,
      secondLanguage,
      secondLanguageLevel,
      thirdLanguage,
      thirdLanguageLevel,
      isLocalSeller,
      isFamilyHost,
      isTourGuide,
      isSocialAuth,
      ...uploadedFiles,
      payment: {
        __type: "Pointer",
        className: "ServiceProviderPayment",
        objectId: paymentResult.objectId
      }
    };

    const serviceProviderResponse = await fetch(`${process.env.BACKEND_URL}/classes/ServiceProvider`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceProviderData)
    });

    if (!serviceProviderResponse.ok) {
      const serviceProviderError = await serviceProviderResponse.text();
      console.error('❌ Service provider creation failed:', serviceProviderError);
      return NextResponse.json(
        { error: 'Service provider creation failed', details: serviceProviderError },
        { status: 400 }
      );
    }

    const serviceProviderResult = await serviceProviderResponse.json();
    console.log('👤 ServiceProvider created:', serviceProviderResult.objectId);

    // Step 4: Create tourist record
    const touristData = {
      phone,
      imageUrl: uploadedFiles.imageUrl || undefined,
      name,
      email,
      isSocialAuth
    };

    const touristResponse = await fetch(`${process.env.BACKEND_URL}/classes/Tourist`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(touristData)
    });

    if (!touristResponse.ok) {
      const touristError = await touristResponse.text();
      console.error('❌ Tourist creation failed:', touristError);
      return NextResponse.json(
        { error: 'Tourist creation failed', details: touristError },
        { status: 400 }
      );
    }

    const touristResult = await touristResponse.json();
    console.log('🧳 Tourist created:', touristResult.objectId);

    // Step 5: Create user account with both tourist and service provider relationships
    const userData = {
      username: phone, // Use phone as username
      email,
      password: password || 'temp@1234', // Use provided password or temporary default
      type: 'service_provider', // Primary type
      name,
      tourist: {
        __type: "Pointer",
        className: "Tourist",
        objectId: touristResult.objectId
      },
      service_provider: {
        __type: "Pointer",
        className: "ServiceProvider",
        objectId: serviceProviderResult.objectId
      },
      isSocialAuth
    };

    const userResponse = await fetch(`${process.env.BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!userResponse.ok) {
      const userError = await userResponse.text();
      console.error('❌ User creation failed:', userError);
      return NextResponse.json(
        { error: 'User creation failed', details: userError },
        { status: 400 }
      );
    }

    const userResult = await userResponse.json();
    console.log('✅ Signup completed successfully for:', body.email, '| User ID:', userResult.objectId);

    return NextResponse.json({
      success: true,
      user: userResult,
      serviceProvider: serviceProviderResult,
      tourist: touristResult,
      payment: paymentResult,
      uploadedFiles
    });

  } catch (error) {
    console.error('❌ Signup API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to upload files
async function uploadFile(fileData: FileData, filePath: string): Promise<string> {
  const uploadUrl = `${process.env.BUNNY_STORAGE_URL}${filePath}`;

  // Convert number array to Buffer
  const fileBuffer = Buffer.from(fileData.buffer);

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'AccessKey': process.env.ACCESS_KEY!,
      'Content-Type': 'application/octet-stream',
    },
    body: fileBuffer
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.status}`);
  }

  return `${process.env.BUNNY_CDN_URL}${filePath}`;
}
