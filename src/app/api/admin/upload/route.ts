import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Guard: Ensure user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (must be image)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'Only image files are allowed' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Clean and generate a unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(originalName) || '.jpg';
    const baseName = path.basename(originalName, ext);
    const filename = `${baseName}-${uniqueSuffix}${ext}`;

    // Define and create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cars');
    await fs.mkdir(uploadDir, { recursive: true });

    // Save the file
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the relative URL of the uploaded image
    const imageUrl = `/uploads/cars/${filename}`;
    return NextResponse.json({ ok: true, url: imageUrl });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}
