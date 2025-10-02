import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Received file upload request');

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filePath = formData.get('filePath') as string;

    if (!file || !filePath) {
      return NextResponse.json(
        { error: 'File and filePath are required' },
        { status: 400 }
      );
    }

    console.log(`🔄 Uploading file: ${file.name} to ${filePath}`);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Upload to BunnyCDN
    const uploadUrl = `${process.env.BUNNY_STORAGE_URL}${filePath}`;
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': process.env.ACCESS_KEY!,
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer
    });

    if (!response.ok) {
      console.error(`❌ Upload failed: ${response.status}`);
      return NextResponse.json(
        { error: 'File upload failed', status: response.status },
        { status: 400 }
      );
    }

    const publicUrl = `${process.env.BUNNY_CDN_URL}${filePath}`;
    console.log(`✅ File uploaded successfully: ${publicUrl}`);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath
    });

  } catch (error) {
    console.error('❌ Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('📥 Received file delete request');

    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('filePath');

    if (!filePath) {
      return NextResponse.json(
        { error: 'filePath is required' },
        { status: 400 }
      );
    }

    console.log(`🗑️ Deleting file: ${filePath}`);

    // Delete from BunnyCDN
    const deleteUrl = `${process.env.BUNNY_STORAGE_URL}${filePath}`;
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'X-Parse-Application-Id': process.env.APPLICATION_ID!,
        'X-Parse-REST-API-Key': process.env.REST_API_KEY!,
        'AccessKey': process.env.ACCESS_KEY!
      }
    });

    if (!response.ok) {
      console.error(`❌ Delete failed: ${response.status}`);
      return NextResponse.json(
        { error: 'File deletion failed', status: response.status },
        { status: 400 }
      );
    }

    console.log(`✅ File deleted successfully: ${filePath}`);

    return NextResponse.json({
      success: true,
      filePath
    });

  } catch (error) {
    console.error('❌ Delete API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
