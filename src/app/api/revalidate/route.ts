import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = body.secret;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const paths = body.paths as string[] | undefined;

    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
      }
    } else {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
