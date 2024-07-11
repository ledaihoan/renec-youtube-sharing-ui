export const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const isValidPassword = (password: string) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export function getYouTubeEmbedUrl(url: string) {
  // Regular expression to match YouTube URL patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    // If we have a match and the video ID is 11 characters long
    return `https://www.youtube.com/embed/${match[2]}`;
  }
    // Return null or some default value if the URL is invalid
    return null;
}

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

export function extractMetadata(html: string) {
  const titleRegex = /<title>(.*?)<\/title>/;
  const descriptionRegex = /<meta name="description" content="(.*?)">/;

  const titleMatch = html.match(titleRegex);
  const descriptionMatch = html.match(descriptionRegex);

  const title = titleMatch ? titleMatch[1] : null;
  const description = descriptionMatch ? descriptionMatch[1] : null;

  return { title, description };
}
