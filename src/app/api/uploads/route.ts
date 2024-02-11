import * as path from 'path';
import { type File } from 'buffer';
import { writeFile, stat, mkdir } from 'fs/promises';
import { type NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/server/auth';
import { format } from 'date-fns';
import { db } from '@/server/db';

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'You must be logged in to upload files' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const reason = formData.get('reason') as string | null ?? 'unknown';

  if (!file) {
    return NextResponse.json({ error: 'No file was provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativePath = path.join(process.cwd(), 'uploads');
  const uploadPath = path.join(relativePath, session.user.id);

  try {
    await stat(uploadPath);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadPath, { recursive: true });
    } else {
      console.error('Error while creating directory', e);
      return NextResponse.json({ error: 'Error while creating directory' }, { status: 500 });
    }
  }

  try {
    const uniqueSuffix = `${format(Date.now(), 'dd-MM-Y')}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${file.name.split('.').pop()}`;
    const filePath = path.join(uploadPath, filename);

    const fileInfo = await db.file.create({
      data: {
        name: file.name,
        path: filename,
        size: file.size,
        type: file.type,
        reason: reason,
        uploadedBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    await writeFile(filePath, buffer);

    return NextResponse.json(fileInfo);
  } catch (e: any) {
    console.error('Error while writing file', e);
    return NextResponse.json({ error: 'Error while writing file' }, { status: 500 });
  }
}
