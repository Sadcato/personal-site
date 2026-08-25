export function assertGalleryUploadAuthorized(request: Request) {
  const expected = process.env.GALLERY_UPLOAD_SECRET
  if (!expected) {
    throw new Error('GALLERY_UPLOAD_SECRET is not configured')
  }

  const provided = request.headers.get('x-gallery-secret')
  if (!provided || provided !== expected) {
    throw new Error('Not authenticated')
  }
}
