import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📥 Received signup request');

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
      // Payment information
      paymentData,
      // Files (as base64 or FormData)
      files
    } = body;

    console.log('🔄 Step 1: Creating payment...');

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
    console.log('✅ Payment created:', paymentResult.objectId);

    console.log('🔄 Step 2: Uploading files...');

    // Step 2: Upload files
    const uploadedFiles: { [key: string]: string } = {};
    const userId = `user_${Date.now()}`;

    if (files) {
      // Upload profile photo
      if (files.profilePhoto) {
        try {
          const fileExtension = files.profilePhoto.name.split('.').pop() || 'jpeg';
          const filePath = `/profiles/${userId}/avatar/profile.${fileExtension}`;
          const uploadedUrl = await uploadFile(files.profilePhoto, filePath);
          uploadedFiles.imageUrl = uploadedUrl;
          console.log('✅ Profile photo uploaded');
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
          console.log('✅ ID front uploaded');
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
          console.log('✅ ID back uploaded');
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
          console.log('✅ Certificate uploaded');
        } catch (error) {
          console.error('❌ Certificate upload failed:', error);
        }
      }
    }

    console.log('🔄 Step 3: Creating service provider...');

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
    console.log('✅ Service provider created:', serviceProviderResult.objectId);

    return NextResponse.json({
      success: true,
      serviceProvider: serviceProviderResult,
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
async function uploadFile(fileData: any, filePath: string): Promise<string> {
  const uploadUrl = `${process.env.BUNNY_STORAGE_URL}${filePath}`;
  
  // Convert base64 to buffer if needed
  let fileBuffer: Buffer;
  if (typeof fileData === 'string') {
    // Base64 string
    fileBuffer = Buffer.from(fileData, 'base64');
  } else if (fileData.buffer) {
    // File buffer
    fileBuffer = Buffer.from(fileData.buffer);
  } else {
    throw new Error('Invalid file data format');
  }

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
