import { type NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/server/auth';
import { db } from '@/server/db';
import * as path from 'path';
import * as fs from 'fs';
import { stat } from 'fs/promises';
import { type ReadableOptions } from 'stream';

function streamFile(path: string, options?: ReadableOptions): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      downloadStream.on('end', () => controller.close());
      downloadStream.on('error', (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'You must be logged in to upload files' }, { status: 401 });
  }

  const id = Number(params.id);

  const fileInfo = await db.file.findFirst({
    where: {
      id: id,
    },
  });

  if (!fileInfo) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  if (![ 'SUPERADMIN', 'ADMIN' ].includes(session.user.role) && fileInfo.uploadedById !== session.user.id) {
    return NextResponse.json({ error: 'You are not allowed to download this file' }, { status: 403 });
  }

  const uploadPath = path.join(process.cwd(), 'uploads', session.user.id);

  try {
    const fullPath = path.join(uploadPath, fileInfo.path);
    const stats = await stat(fullPath);
    const fileStream = streamFile(fullPath);
    return new NextResponse(fileStream, {
      headers: new Headers({
        'Content-Type': fileInfo.type,
        'Content-Length': stats.size.toString(),
      }),
    });
  } catch (e: any) {
    console.error('Error while reading file', e);
    return NextResponse.json({ error: 'Error while reading file' }, { status: 500 });
  }
}
