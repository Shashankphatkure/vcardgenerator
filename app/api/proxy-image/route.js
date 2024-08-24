export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
  
    if (!imageUrl) {
      return new Response('Image URL is required', { status: 400 });
    }
  
    try {
      const response = await fetch(imageUrl);
      const contentType = response.headers.get('content-type');
      const buffer = await response.arrayBuffer();
  
      return new Response(buffer, {
        headers: { 'Content-Type': contentType },
      });
    } catch (error) {
      return new Response('Error fetching image', { status: 500 });
    }
  }